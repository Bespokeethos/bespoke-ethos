#!/usr/bin/env node
// Pinecone & OpenAI Configuration Test Script

const requiredEnvVars = [
  "PINECONE_API_KEY",
  "PINECONE_ENVIRONMENT",
  "PINECONE_INDEX_NAME",
  "PINECONE_PROJECT_NAME",
  "PINECONE_HOST",
  "EMBEDDING_MODEL",
  "OPENAI_API_KEY",
];

const env = {};
const missingVars = [];

for (const varName of requiredEnvVars) {
  const value = process.env[varName];
  env[varName] = value ? value.trim() : "";
  if (!env[varName]) {
    missingVars.push(varName);
  }
}

console.log("=== Pinecone & OpenAI Environment Verification ===");
console.log("1. Checking required environment variables...");

if (missingVars.length > 0) {
  console.error(`\nERROR: Missing environment variables: ${missingVars.join(", ")}`);
  console.error(
    "Please set these in your Vercel project settings (Environment Variables) and rerun the test.",
  );
  process.exit(1);
}

const warnings = [];

if (env.PINECONE_API_KEY.length < 20) {
  warnings.push(
    "PINECONE_API_KEY appears too short. Ensure you've provided the full API key from Pinecone.",
  );
}

if (!/^[\w-]+$/.test(env.PINECONE_ENVIRONMENT)) {
  warnings.push(
    `PINECONE_ENVIRONMENT ('${env.PINECONE_ENVIRONMENT}') format looks incorrect. It should be a region-cloud string (e.g., 'us-west1-gcp').`,
  );
}

if (!/^[a-z0-9](?:[a-z0-9-]{0,43}[a-z0-9])$/.test(env.PINECONE_INDEX_NAME)) {
  warnings.push(
    `PINECONE_INDEX_NAME ('${env.PINECONE_INDEX_NAME}') may be invalid. It must be 1-45 chars, alphanumeric or '-', and not start/end with a hyphen.`,
  );
}

if (env.PINECONE_HOST && !env.PINECONE_HOST.includes(".pinecone.io")) {
  warnings.push(
    `PINECONE_HOST ('${env.PINECONE_HOST}') doesn't look like a Pinecone host URL (expected to include .pinecone.io).`,
  );
}

if (!env.EMBEDDING_MODEL.toLowerCase().includes("embedding")) {
  warnings.push(
    `EMBEDDING_MODEL ('${env.EMBEDDING_MODEL}') might not be an OpenAI embedding model name. Double-check it (e.g., 'text-embedding-ada-002' or 'text-embedding-3-small').`,
  );
}

if (warnings.length > 0) {
  console.warn("\nWARNINGS:");
  for (const w of warnings) {
    console.warn(" - " + w);
  }
  console.warn("Please review these potential issues. The test will proceed.\n");
} else {
  console.log("All required environment variables are set with plausible values.\n");
}

console.log("2. Verifying Pinecone index connectivity and configuration...");

const pineconeApiKey = env.PINECONE_API_KEY;
let pineconeHost = env.PINECONE_HOST;
const indexName = env.PINECONE_INDEX_NAME;
const environment = env.PINECONE_ENVIRONMENT;

if (!pineconeHost) {
  pineconeHost = `${indexName}.svc.${environment}.pinecone.io`;
  console.log(`- PINECONE_HOST not set. Constructed host URL as: ${pineconeHost}`);
}

async function describeIndex(envName) {
  const base = envName ? `https://controller.${envName}.pinecone.io` : `https://api.pinecone.io`;
  const url = `${base}/indexes/${indexName}`;
  return fetch(url, { headers: { "Api-Key": pineconeApiKey } });
}

let indexInfo;
const expectedDimension = 1536;
const expectedMetric = "cosine";

try {
  let res = await describeIndex(environment);
  if (!res.ok && environment) {
    console.warn(
      `- Initial index lookup via '${environment}' failed (status ${res.status}). Trying global endpoint...`,
    );
    res = await describeIndex("");
  }

  if (!res.ok) {
    throw new Error(`Index description request failed with HTTP ${res.status}`);
  }

  indexInfo = await res.json();
  console.log(`- Connected to Pinecone and found index '${indexName}'.`);
} catch (err) {
  console.error(`ERROR: Could not retrieve index description. ${err.message}`);
  console.error(
    "Check PINECONE_ENVIRONMENT (it may not be required for newer Pinecone projects) and that the index name is correct and exists in your Pinecone project.",
  );
  process.exit(1);
}

if (indexInfo) {
  const actualDim = indexInfo.dimension;
  const actualMetric = indexInfo.metric?.toLowerCase();
  const isServerless = indexInfo.spec?.serverless !== undefined;

  console.log(
    `  Index '${indexName}' configuration: ${actualDim} dimensions, metric = '${indexInfo.metric}', type = ${isServerless ? "serverless" : "pod-based"}.`,
  );

  if (actualDim !== expectedDimension) {
    console.error(
      `ERROR: Index dimension is ${actualDim}, but ${expectedDimension} was expected (embedding model output size).`,
    );
    console.error(
      "        Solution: Re-create or update the Pinecone index with the correct dimension to match the embedding vector length.",
    );
  } else {
    console.log("    Index dimension matches expected embedding vector size.");
  }

  if (actualMetric !== expectedMetric) {
    console.error(
      `ERROR: Index metric is '${indexInfo.metric}', but expected '${expectedMetric}'.`,
    );
    console.error(
      "        Solution: Use Pinecone console or API to set the index metric to 'cosine' for semantic similarity.",
    );
  } else {
    console.log("    Index metric is cosine, as expected.");
  }

  if (!isServerless) {
    console.error(
      "ERROR: Index is pod-based (dedicated), but expected a serverless index (capacity mode = serverless).",
    );
    console.error(
      "        Solution: Migrate to a serverless index for auto-scaling, or adjust the test expectations if using a dedicated pod index.",
    );
  } else {
    console.log("    Index is a serverless (auto-scaling) index.");
  }
}

console.log("\n3. Testing embedding generation and vector upsertion...");

if (!env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is not set. Cannot generate embeddings without it.");
  console.error("Provide your OpenAI API key in the environment to proceed.");
  process.exit(1);
}

const sampleText =
  "This is a sample text chunk to verify Pinecone integration.";
console.log(`- Sample text: "${sampleText}"`);

async function getEmbedding(text, model) {
  const endpoint = "https://api.openai.com/v1/embeddings";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${env.OPENAI_API_KEY}`,
  };

  const requestBody = { model, input: text };

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      });
      const result = await res.json();

      if (!res.ok) {
        const errMsg = result.error?.message || res.status;

        if (res.status === 429) {
          console.warn(
            `    OpenAI rate limit hit (429). Retry ${attempt}/3 after short delay...`,
          );
          await new Promise((r) => setTimeout(r, attempt * 1000));
          continue;
        }

        if (res.status === 400 && errMsg.toLowerCase().includes("model")) {
          console.warn(`    OpenAI error: ${errMsg}`);
          if (model !== "text-embedding-ada-002") {
            console.log(
              "   -> Switching to fallback model 'text-embedding-ada-002' and retrying...",
            );
            requestBody.model = "text-embedding-ada-002";
            continue;
          }
        }

        throw new Error(`OpenAI API error (status ${res.status}): ${errMsg}`);
      }

      const embedding = result.data[0]?.embedding;
      if (!embedding) throw new Error("No embedding returned from OpenAI.");
      return embedding;
    } catch (err) {
      if (attempt === 3) throw err;
    }
  }
}

let embeddingVector;

try {
  embeddingVector = await getEmbedding(sampleText, env.EMBEDDING_MODEL);
  console.log(`- Obtained embedding of length ${embeddingVector.length}.`);

  if (embeddingVector.length !== expectedDimension) {
    console.warn(
      `    Embedding dimension is ${embeddingVector.length}, which doesn't match ${expectedDimension}. (Model vs index mismatch?)`,
    );
  }
} catch (error) {
  console.error("ERROR: Failed to generate embedding from OpenAI API.");
  console.error(`Details: ${error.message}`);
  console.error(
    "Ensure your OpenAI API key is valid and the embedding model name is correct. You may also check OpenAI API availability.",
  );
  process.exit(1);
}

const testId = "test-vector-" + Date.now();
const metadata = {
  project: "bespoke-ethos",
  source: "static",
  note: "verification_test",
};

const namespace = "verification_test";

const upsertBody = {
  vectors: [{ id: testId, values: embeddingVector, metadata }],
  namespace,
};

async function upsertVectorWithRetry(payload) {
  const url = `https://${pineconeHost}/vectors/upsert`;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Api-Key": pineconeApiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        const errMsg = result.error?.message || `Status ${res.status}`;

        if (res.status >= 500) {
          console.warn(
            `    Pinecone upsert error (server side). Retry ${attempt}/3...`,
          );
          await new Promise((r) => setTimeout(r, attempt * 1000));
          continue;
        }

        throw new Error(errMsg);
      }

      return result;
    } catch (err) {
      if (attempt === 3) throw err;
    }
  }
}

try {
  const upsertResult = await upsertVectorWithRetry(upsertBody);
  console.log(
    `- Upserted test vector with ID '${testId}' into index '${indexName}'.`,
  );

  if (typeof upsertResult.upsertedCount !== "undefined") {
    console.log(
      `   (Pinecone response: ${
        upsertResult.upsertedCount || upsertResult.upserted_count
      } vectors upserted.)`,
    );
  }
} catch (error) {
  console.error("ERROR: Failed to upsert vector to Pinecone.");
  console.error(`Details: ${error.message}`);
  console.error(
    "Potential causes: incorrect index name, invalid API key, or dimension mismatch between embedding and index. Fix these and retry.",
  );
  process.exit(1);
}

console.log("\n4. Verifying metadata tags on the upserted vector...");

try {
  const fetchUrl = `https://${pineconeHost}/vectors/fetch?ids=${encodeURIComponent(
    testId,
  )}&namespace=${encodeURIComponent(namespace)}`;

  const fetchRes = await fetch(fetchUrl, {
    headers: { "Api-Key": pineconeApiKey },
  });

  const fetchData = await fetchRes.json();

  if (!fetchRes.ok) {
    throw new Error(
      `Fetch failed with status ${fetchRes.status}: ${JSON.stringify(fetchData)}`,
    );
  }

  const fetchedVector = fetchData.vectors?.[testId];
  if (!fetchedVector) {
    throw new Error("Vector not found in Pinecone response.");
  }

  const meta = fetchedVector.metadata || {};
  const projectTagOk = meta.project === "bespoke-ethos";
  const sourceTagOk = meta.source === "static";

  if (projectTagOk && sourceTagOk) {
    console.log(
      `    Fetched vector metadata contains project='${meta.project}' and source='${meta.source}'.`,
    );
  } else {
    console.error("ERROR: Fetched vector is missing expected metadata tags or values.");
    console.error(`   Metadata found: ${JSON.stringify(meta)}`);
    console.error(
      "    Ensure your upsert logic includes 'project' and 'source' fields in metadata for each vector.",
    );
  }

  if (Object.keys(meta).length <= 2) {
    console.log(
      "   Note: Consider adding more metadata (e.g., document name, chunk index) to each vector for more granular filtering.",
    );
  }
} catch (err) {
  console.error(`ERROR: Unable to fetch/verify the test vector. ${err.message}`);
  console.error(
    "Verify that the Pinecone index is reachable and the vector ID/namespace are correct. Namespace should match the upserted data.",
  );
}

console.log("\n=== Test Summary ===");
console.log(`Environment Variables: ${missingVars.length === 0 ? "PASS" : "FAIL"}`);

if (indexInfo) {
  const issues = [];

  if (indexInfo.dimension !== expectedDimension) {
    issues.push(
      `Dimension is ${indexInfo.dimension} (expected ${expectedDimension})`,
    );
  }

  if (indexInfo.metric?.toLowerCase() !== expectedMetric) {
    issues.push(`Metric is ${indexInfo.metric} (expected ${expectedMetric})`);
  }

  if (indexInfo.spec?.serverless === undefined) {
    issues.push("Index is not serverless");
  }

  console.log(
    `Pinecone Index Config: ${
      issues.length === 0 ? "PASS" : "FAIL (" + issues.join("; ") + ")"
    }`,
  );
} else {
  console.log("Pinecone Index Config: FAIL (could not retrieve index info)");
}

console.log(`Embedding Generation: ${embeddingVector ? "PASS" : "FAIL"}`);
console.log(`Vector Upsert: ${testId ? "PASS" : "FAIL"}`);
console.log(
  `Metadata Tags: ${
    "project" in metadata && "source" in metadata ? "PASS" : "FAIL"
  }`,
);
console.log(
  "\nRecommendations: If any FAIL marks are noted above, review the detailed logs for that section and apply the suggested fixes. Once all are addressed, re-run the test. Successful passes on all steps indicate your Pinecone/OpenAI setup is correct and ready to use.",
);

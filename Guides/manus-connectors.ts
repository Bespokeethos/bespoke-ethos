export const REPO = {
  owner: "Bespokeethos",
  name: "bespoke-ethos",
  defaultBranch: "main",
  url: "https://github.com/Bespokeethos/bespoke-ethos",
} as const;

export const VERCEL = {
  projectId: "prj_8cbai6JzE169NUytyFtCpSohZVka",
  productionUrl: "https://bespoke-ethos.vercel.app",
} as const;

export const AIRTABLE = {
  baseUrl: "https://airtable.com/appDG8eZQE9oG8gPY/pbd13eNY9OdAaliJa",
  baseId: "appDG8eZQE9oG8gPY",
  envToken: "AIRTABLE_PERSONAL_ACCESS_TOKEN",
  envBaseId: "AIRTABLE_BASE_ID",
  envTableName: "AIRTABLE_TABLE_NAME",
} as const;

export const GIT_POLICY = {
  allowedBranches: ["main"] as const,
  defaultBranch: "main" as const,
  branchingRules: {
    allowNewBranches: false,
    allowForcePushMain: false,
  },
  requiredPrePushCommands: [
    "git fetch origin",
    "git reset --hard origin/main",
    "pnpm install",
    "pnpm run check",
  ],
  rollbackStrategy: {
    preferred: [
      "Identify bad commit SHA",
      "git revert <bad-sha>",
      "git push origin main",
    ],
  },
} as const;

export interface ContactSubmission {
  name: string;
  email: string;
  company?: string;
  useCase?: string;
  timeline?: string;
  budget?: string;
  message: string;
  ip?: string;
  userAgent?: string;
  timestamp?: string;
}

export type WorkflowStepId =
  | "syncFromGitHub"
  | "runChecks"
  | "updateContactHandler"
  | "deployToVercel"
  | "verifyVercelLogs"
  | "verifyAirtableRow";

export interface WorkflowStep {
  id: WorkflowStepId;
  description: string;
  required: boolean;
}

export const CONTACT_PIPELINE_STEPS: WorkflowStep[] = [
  {
    id: "syncFromGitHub",
    required: true,
    description: "Sync local repo with origin/main; no new branches.",
  },
  {
    id: "runChecks",
    required: true,
    description:
      "Run pnpm install (if needed) and pnpm run check; abort if failing.",
  },
  {
    id: "updateContactHandler",
    required: true,
    description:
      "Ensure contact API handler logs and writes a row to Airtable using env-configured base and table.",
  },
  {
    id: "deployToVercel",
    required: true,
    description:
      "Push to main; wait for production deployment to reach READY.",
  },
  {
    id: "verifyVercelLogs",
    required: true,
    description:
      "Submit a test contact form; confirm correct log entry in Vercel logs.",
  },
  {
    id: "verifyAirtableRow",
    required: true,
    description:
      "Confirm Airtable has a new row with the expected field values.",
  },
];

export const AIRTABLE_AUTH_NOTES = {
  tokenType: "personal-access-token" as const,
  expectedEnv: {
    token: AIRTABLE.envToken,
    baseId: AIRTABLE.envBaseId,
    tableName: AIRTABLE.envTableName,
  },
};

#!/usr/bin/env node

/**
 * BRUTUS API TEST SUITE
 * Tests all API endpoints locally
 */

const API_BASE = 'http://localhost:3000';
const API_KEY = process.env.BRUTUS_API_KEY || 'test_key_brutus_local';

async function testOpenAI() {
    console.log('\n🧠 Testing OpenAI Endpoint...');

    const response = await fetch(`${API_BASE}/api/brutus/openai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify({
            prompt: 'Respond with exactly: BRUTUS_ONLINE',
            stream: false,
        }),
    });

    const data = await response.json();

    if (response.ok && data.text?.includes('BRUTUS_ONLINE')) {
        console.log('✅ OpenAI: OPERATIONAL');
        return true;
    } else {
        console.error('❌ OpenAI: FAILED', data);
        return false;
    }
}

async function testVision() {
    console.log('\n👁️  Testing Vision Endpoint...');

    // Simple 1x1 red pixel PNG (base64)
    const testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';

    const response = await fetch(`${API_BASE}/api/brutus/vision`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        },
        body: JSON.stringify({
            imageBase64: testImage,
            prompt: 'Describe this image briefly.',
        }),
    });

    const data = await response.json();

    if (response.ok && data.analysis) {
        console.log('✅ Vision: OPERATIONAL');
        console.log(`   Response: ${data.analysis.substring(0, 50)}...`);
        return true;
    } else {
        console.error('❌ Vision: FAILED', data);
        return false;
    }
}

async function runTests() {
    console.log('🔬 BRUTUS API TEST SUITE');
    console.log(`   Target: ${API_BASE}`);
    console.log(`   API Key: ${API_KEY.substring(0, 12)}...`);

    const results = await Promise.all([
        testOpenAI(),
        testVision(),
    ]);

    console.log('\n📊 RESULTS:');
    if (results.every(r => r)) {
        console.log('✅ ALL SYSTEMS OPERATIONAL');
        process.exit(0);
    } else {
        console.log('❌ SOME SYSTEMS FAILED');
        process.exit(1);
    }
}

runTests();

import { codingModel } from '@/lib/brutus-intelligence';
import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { logApiUsage } from '@/lib/brutus-usage';

/**
 * BRUTUS OPENAI REMOTE API
 * 
 * Exposes OpenAI GPT-4o capabilities via authenticated API endpoint.
 * This endpoint can be called from anywhere (Vercel, external services, etc.)
 */

export const runtime = 'edge';
export const maxDuration = 60;

// API Key validation
function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key');
  const validKey = process.env.BRUTUS_API_KEY;
  
  if (!validKey) {
    console.warn('⚠️ BRUTUS_API_KEY not set in environment');
    return false;
  }
  
  return apiKey === validKey;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  const apiKey = request.headers.get('x-api-key') || 'missing';
  
  // Validate API key
  if (!validateApiKey(request)) {
    await logApiUsage('/api/brutus/openai', apiKey, 401, Date.now() - startTime);
    return new Response(
      JSON.stringify({ 
        error: 'Unauthorized',
        message: 'Valid x-api-key header required. See BRUTUS_API.md for setup.'
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      await logApiUsage('/api/brutus/openai', apiKey, 400, Date.now() - startTime);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid JSON',
          message: 'Request body must be valid JSON'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { prompt, system, stream = true } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      await logApiUsage('/api/brutus/openai', apiKey, 400, Date.now() - startTime);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid prompt',
          message: 'Prompt must be a non-empty string'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate environment
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ OPENAI_API_KEY not configured');
      await logApiUsage('/api/brutus/openai', apiKey, 503, Date.now() - startTime);
      return new Response(
        JSON.stringify({ 
          error: 'Service unavailable',
          message: 'OpenAI service is not configured. Contact administrator.'
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = system || 'You are Brutus, a senior full-stack engineer working on the Bespoke Ethos platform.';

    // Stream response (recommended for real-time feedback)
    if (stream) {
      try {
        const result = streamText({
          model: codingModel,
          system: systemPrompt,
          prompt: prompt.trim(),
        });

        return result.toTextStreamResponse();
      } catch (streamError: any) {
        console.error('❌ Streaming failed, falling back to non-streaming:', streamError);
        // Graceful fallback to non-streaming
      }
    }

    // Non-streaming response (or fallback)
    const { generateText } = await import('ai');
    const { text } = await generateText({
      model: codingModel,
      system: systemPrompt,
      prompt: prompt.trim(),
    });

    await logApiUsage('/api/brutus/openai', apiKey, 200, Date.now() - startTime);
    
    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    await logApiUsage('/api/brutus/openai', apiKey, 500, Date.now() - startTime);
    console.error('❌ Brutus OpenAI API Error:', error);
    
    // Provide helpful error messages
    let errorMessage = 'An unexpected error occurred';
    if (error.message?.includes('API key')) {
      errorMessage = 'OpenAI API key is invalid or expired';
    } else if (error.message?.includes('rate limit')) {
      errorMessage = 'Rate limit exceeded. Please try again later.';
    } else if (error.message?.includes('timeout')) {
      errorMessage = 'Request timed out. Please try again.';
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

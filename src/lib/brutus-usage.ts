import { NextRequest, NextResponse } from 'next/server';

/**
 * BRUTUS API USAGE TRACKER
 * Tracks API calls for billing purposes
 */

interface UsageLog {
  timestamp: string;
  endpoint: string;
  apiKey: string;
  tokensUsed?: number;
  status: number;
  duration: number;
}

export async function logApiUsage(
  endpoint: string,
  apiKey: string,
  status: number,
  duration: number,
  tokensUsed?: number
) {
  const log: UsageLog = {
    timestamp: new Date().toISOString(),
    endpoint,
    apiKey: apiKey.substring(0, 12) + '...', // Partial key for security
    status,
    duration,
    tokensUsed,
  };

  // Log to console (Vercel logs)
  console.log('[BRUTUS USAGE]', JSON.stringify(log));

  // TODO: Send to analytics service (PostHog, Mixpanel, etc.)
  // await fetch('https://analytics.example.com/track', {
  //   method: 'POST',
  //   body: JSON.stringify(log),
  // });
}

export function withUsageTracking(
  handler: (req: NextRequest) => Promise<Response>
) {
  return async (req: NextRequest) => {
    const start = Date.now();
    const endpoint = req.nextUrl.pathname;
    const apiKey = req.headers.get('x-api-key') || 'MISSING';

    try {
      const response = await handler(req);
      const duration = Date.now() - start;

      await logApiUsage(endpoint, apiKey, response.status, duration);

      return response;
    } catch (error) {
      const duration = Date.now() - start;
      await logApiUsage(endpoint, apiKey, 500, duration);
      throw error;
    }
  };
}

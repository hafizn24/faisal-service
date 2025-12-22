import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only allow requests from your domain
  const origin = request.headers.get('origin');
  const allowedOrigins = [
    'https://faisal-service.netlify.app',
    process.env.NEXT_PUBLIC_SITE_URL
  ].filter(Boolean); // Remove undefined values
  
  // Allow same-origin requests (when origin is null)
  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: 'Forbidden' },
      { status: 403 }
    );
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
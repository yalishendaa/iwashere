import { NextRequest, NextResponse } from 'next/server';
import { MANIFEST_REVALIDATE_SECONDS, buildManifest } from '../lib/manifest';

export function GET(request: NextRequest) {
  const response = NextResponse.json(buildManifest(request.headers));
  response.headers.set(
    'Cache-Control',
    `public, max-age=${MANIFEST_REVALIDATE_SECONDS}`
  );
  return response;
}

export const revalidate = MANIFEST_REVALIDATE_SECONDS;
export const dynamic = 'force-dynamic';

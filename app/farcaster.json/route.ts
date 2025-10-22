import { NextResponse } from 'next/server';
import { buildManifest, manifestRevalidate } from '../lib/manifest';

export function GET() {
  const response = NextResponse.json(buildManifest());
  response.headers.set(
    'Cache-Control',
    `public, max-age=${manifestRevalidate}`
  );
  return response;
}

export const revalidate = manifestRevalidate;
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { buildManifest, manifestRevalidate } from '../lib/manifest';

export const revalidate = manifestRevalidate;

export function GET() {
  return NextResponse.json(buildManifest());
}

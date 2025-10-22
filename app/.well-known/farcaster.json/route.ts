import { NextResponse } from 'next/server';
import { minikitConfig } from '../../../minikit.config';

export const revalidate = 60;

export function GET() {
  return NextResponse.json({
    accountAssociation: minikitConfig.accountAssociation,
    ...minikitConfig.miniapp,
  });
}

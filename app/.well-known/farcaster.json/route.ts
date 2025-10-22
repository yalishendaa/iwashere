import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { minikitConfig } from '../../../minikit.config';

export const revalidate = 60;

export function GET() {
  const manifest = createManifestForRequest();
  return NextResponse.json(manifest);
}

function createManifestForRequest() {
  const headerList = headers();
  const forwardedProto = headerList.get('x-forwarded-proto');
  const proto = forwardedProto && forwardedProto.includes('https') ? 'https' : forwardedProto ?? 'https';
  const host = headerList.get('x-forwarded-host') ?? headerList.get('host') ?? '';
  const base = host ? `${proto}://${host}` : minikitConfig.miniapp.homeUrl;

  const absolutize = (value: string | undefined) => {
    if (!value) return value;
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    if (value.startsWith('/')) return `${base}${value}`;
    return `${base}/${value}`;
  };

  const { miniapp, accountAssociation } = minikitConfig;

  return {
    accountAssociation,
    version: miniapp.version,
    name: miniapp.name,
    subtitle: miniapp.subtitle,
    description: miniapp.description,
    screenshotUrls: miniapp.screenshotUrls.map(absolutize),
    iconUrl: absolutize(miniapp.iconUrl),
    splashImageUrl: absolutize(miniapp.splashImageUrl),
    splashBackgroundColor: miniapp.splashBackgroundColor,
    homeUrl: absolutize(miniapp.homeUrl),
    webhookUrl: absolutize(miniapp.webhookUrl),
    primaryCategory: miniapp.primaryCategory,
    tags: miniapp.tags,
    heroImageUrl: absolutize(miniapp.heroImageUrl),
    tagline: miniapp.tagline,
    ogTitle: miniapp.ogTitle,
    ogDescription: miniapp.ogDescription,
    ogImageUrl: absolutize(miniapp.ogImageUrl),
  };
}

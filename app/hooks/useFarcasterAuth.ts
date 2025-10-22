'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { quickAuth } from '@farcaster/miniapp-sdk';
import { decodeJwt } from '@farcaster/quick-auth/decodeJwt';
import type { JWTPayload } from '@farcaster/quick-auth';

type Session = {
  token: string;
  payload: JWTPayload;
};

const isRunningInMiniApp = () =>
  typeof window !== 'undefined' && Boolean((window as unknown as { farcaster?: unknown }).farcaster);

export function useFarcasterAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMiniApp, setIsMiniApp] = useState(false);

  useEffect(() => {
    setIsMiniApp(isRunningInMiniApp());
  }, []);

  useEffect(() => {
    if (!isMiniApp) return;
    const token = quickAuth.token;
    if (!token) return;

    try {
      const payload = decodeJwt(token);
      setSession({ token, payload });
    } catch (err) {
      console.error('Failed to decode Farcaster token', err);
    }
  }, [isMiniApp]);

  const signIn = useCallback(
    async ({ force = false }: { force?: boolean } = {}) => {
      if (!isRunningInMiniApp()) {
        setError('Farcaster sign-in is only available inside the Farcaster app.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { token } = force
          ? await quickAuth.getToken({ force: 'true' })
          : await quickAuth.getToken();
        const payload = decodeJwt(token);
        setSession({ token, payload });
      } catch (err) {
        console.error('Farcaster sign-in failed', err);
        if (err instanceof Error) {
          if (err.name === 'RejectedByUser') {
            setError('Sign-in was cancelled.');
          } else {
            setError(err.message);
          }
        } else {
          setError('Unexpected error during sign-in.');
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setSession(null);
    setError(null);
  }, []);

  const fid = useMemo(() => session?.payload.sub ?? null, [session]);

  return {
    session,
    fid,
    isMiniApp,
    isLoading,
    error,
    isAuthenticated: Boolean(session),
    signIn,
    reset,
  };
}

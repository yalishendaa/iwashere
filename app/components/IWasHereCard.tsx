'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useContract } from '@/hooks/useContract';
import { useFarcasterAuth } from '@/hooks/useFarcasterAuth';

export function IWasHereCard() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const {
    isMiniApp,
    isAuthenticated: isFarcasterAuthenticated,
    isLoading: isFarcasterLoading,
    fid,
    signIn,
    error: farcasterError,
  } = useFarcasterAuth();

  const {
    stopped,
    stopTime,
    stopper,
    userCount,
    timeRemaining,
    timeFormatted,
    canPress,
    press,
    isPending,
    isSuccess,
    error,
  } = useContract();

  const requiresFarcasterAuth = isMiniApp;
  const canPressWithAuth = canPress && (!requiresFarcasterAuth || isFarcasterAuthenticated);
  const walletConnectDisabled = requiresFarcasterAuth && !isFarcasterAuthenticated;

  const formatTimestamp = (timestamp: number) => {
    if (timestamp === 0) return 'Never';
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">I Was Here</h1>
        <p className="text-gray-600">
          Press the button once per 24 hours. Stops forever when Jesse presses.
        </p>
      </div>

      {/* Farcaster Auth */}
      <div className="bg-purple-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-purple-900 mb-2">Farcaster Account</h2>
        {isMiniApp ? (
          isFarcasterAuthenticated ? (
            <p className="text-sm text-purple-800">
              Signed in as FID <span className="font-semibold">{fid}</span>
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-purple-800">
                Sign in with Farcaster to link your account.
              </p>
              <button
                onClick={() => signIn()}
                disabled={isFarcasterLoading}
                className={`
                  w-full px-4 py-2 rounded-lg font-medium transition-colors
                  ${
                    isFarcasterLoading
                      ? 'bg-purple-200 text-purple-500 cursor-wait'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }
                `}
              >
                {isFarcasterLoading ? 'Waiting for Farcaster...' : 'Sign in with Farcaster'}
              </button>
            </div>
          )
        ) : (
          <p className="text-sm text-purple-800">
            Open this Mini App inside Farcaster to sign in with your account.
          </p>
        )}

        {farcasterError && (
          <p className="text-xs text-red-600 mt-2">
            {farcasterError}
          </p>
        )}
      </div>

      {/* Connect Wallet */}
      <div className="flex justify-center">
        {isConnected ? (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
            <button
              onClick={() => disconnect()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {walletConnectDisabled
                ? 'Sign in with Farcaster to enable wallet connections'
                : 'Connect to continue'}
            </p>
            {/* Prefer Farcaster connector inside Mini App */}
            {[...connectors]
              .sort((a, b) => (a.name.includes('Farcaster') ? -1 : b.name.includes('Farcaster') ? 1 : 0))
              .map((connector) => (
                <button
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                  disabled={walletConnectDisabled}
                  className={`
                    w-full px-4 py-2 rounded-lg transition-colors
                    ${
                      walletConnectDisabled
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }
                  `}
                >
                  Connect {connector.name}
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Global Status */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Global Status</h2>
        {stopped ? (
          <div className="space-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-red-600 font-medium">Stopped</span>
            </div>
            <div className="text-sm text-gray-600">
              <p>Stopped by: {stopper}</p>
              <p>Stopped at: {formatTimestamp(stopTime)}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-600 font-medium">Active</span>
          </div>
        )}
      </div>

      {/* User Status */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Status</h2>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-medium">Total presses:</span> {userCount}
          </p>
          {timeRemaining > 0 && (
            <p className="text-gray-700">
              <span className="font-medium">Next available in:</span>{' '}
              <span className="text-blue-600 font-mono">{timeFormatted}</span>
            </p>
          )}
          {timeRemaining === 0 && userCount > 0 && (
            <p className="text-green-600 font-medium">You can press now!</p>
          )}
          {userCount === 0 && (
            <p className="text-blue-600 font-medium">Press the button to get started!</p>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="text-center">
        {!isFarcasterAuthenticated && requiresFarcasterAuth && (
          <p className="text-sm text-purple-700 mb-2">
            Sign in with Farcaster before pressing the button.
          </p>
        )}
        <button
          onClick={press}
          disabled={!canPressWithAuth}
          className={`
            w-full py-3 px-6 rounded-lg font-semibold text-lg transition-all duration-200
            ${
              canPressWithAuth
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
            ${isPending ? 'animate-pulse' : ''}
          `}
        >
          {isPending ? 'Processing...' : isSuccess ? 'Success!' : 'I Was Here'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-600 text-sm">
            Transaction confirmed! You&apos;ve pressed the button.
          </p>
        </div>
      )}
    </div>
  );
}

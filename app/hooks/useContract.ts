import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { IWASHERE_ABI, CONTRACT_ADDRESS } from '@/lib/contract';
import { useTimeRemaining } from './useTimeRemaining';

/**
 * Hook to manage contract state and interactions
 */
export function useContract() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, error } = useWriteContract();

  // Read contract state
  const { data: stopped } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IWASHERE_ABI,
    functionName: 'stopped',
  });

  const { data: stopTime } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IWASHERE_ABI,
    functionName: 'stopTime',
  });

  const { data: stopper } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IWASHERE_ABI,
    functionName: 'stopper',
  });

  const { data: userStatus } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IWASHERE_ABI,
    functionName: 'status',
    args: address ? [address] : undefined,
  });

  const { data: nextAvailable } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: IWASHERE_ABI,
    functionName: 'nextAvailable',
    args: address ? [address] : undefined,
  });

  // Parse user status
  const userCount = userStatus?.[0] || 0n;
  const userLastPress = userStatus?.[1] || 0n;
  const userNextAvailable = userStatus?.[2] || 0n;

  // Time remaining hook
  const { timeRemaining, formatted: timeFormatted } = useTimeRemaining(
    Number(userNextAvailable)
  );

  // Determine if user can press
  const canPress = Boolean(
    address && 
    !stopped && 
    timeRemaining === 0 && 
    !isPending &&
    CONTRACT_ADDRESS
  );

  // Press function
  const press = () => {
    if (!canPress || !CONTRACT_ADDRESS) return;
    
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: IWASHERE_ABI,
      functionName: 'press',
    });
  };

  // Parse error message
  const getErrorMessage = () => {
    if (!error) return null;
    
    const errorMessage = error.message || error.toString();
    
    // Check for cooldown error
    if (errorMessage.includes('Cooldown')) {
      return 'You must wait 24 hours between presses';
    }
    
    if (errorMessage.includes('Stopped')) {
      return 'The contract has been stopped by Jesse';
    }
    
    return errorMessage;
  };

  return {
    // Contract state
    stopped: Boolean(stopped),
    stopTime: stopTime ? Number(stopTime) : 0,
    stopper: stopper as string,
    
    // User state
    userCount: Number(userCount),
    userLastPress: Number(userLastPress),
    userNextAvailable: Number(userNextAvailable),
    timeRemaining,
    timeFormatted,
    canPress,
    
    // Actions
    press,
    isPending,
    isSuccess,
    error: getErrorMessage(),
  };
}

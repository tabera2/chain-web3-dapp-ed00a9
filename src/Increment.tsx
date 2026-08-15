import { useAccount, useWriteContract, useWaitForTransactionReceipt, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { BaseError, ContractFunctionRevertedError, UserRejectedRequestError } from 'viem';
import { counterAbi, counterAddress } from './counter';

// The full real-world flow. Three things that ALWAYS happen in production and
// that a demo forgets: (1) the user rejects the signature, (2) the wallet is on
// the wrong chain — a contract call there is meaningless, so we block it and
// offer to switch, (3) the tx sits pending; we show a live pending state instead
// of a frozen button, and never conflate "pending" with "failed".
export function Increment() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { data: receipt, isLoading: isConfirming } =
    useWaitForTransactionReceipt({ hash });

  const wrongNetwork = isConnected && chainId !== sepolia.id;
  const reverted = receipt?.status === 'reverted';
  const confirmed = receipt?.status === 'success';

  // Classify the write error: rejection is a user choice, not a failure.
  let userRejected = false;
  let revertReason = '';
  if (error instanceof BaseError) {
    if (error.walk((e) => e instanceof UserRejectedRequestError)) {
      userRejected = true;
    }
    const revert = error.walk((e) => e instanceof ContractFunctionRevertedError);
    if (revert instanceof ContractFunctionRevertedError) {
      revertReason = revert.data?.errorName ?? revert.shortMessage;
    }
  }

  if (wrongNetwork) {
    return (
      <div>
        <p>⚠️ Wrong network. This contract lives on Sepolia.</p>
        <button onClick={() => switchChain({ chainId: sepolia.id })}>
          Switch to Sepolia
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        disabled={!isConnected || isPending || isConfirming}
        onClick={() =>
          writeContract({
            abi: counterAbi,
            address: counterAddress,
            functionName: 'increment',
          })
        }
      >
        {isPending ? 'Confirm in wallet…' : isConfirming ? 'Pending on-chain…' : 'Increment'}
      </button>

      {isConfirming && <p>⏳ Sent. Waiting for the network to confirm (can take ~30s)…</p>}
      {confirmed && <p>✅ Confirmed on-chain. The counter was incremented.</p>}
      {reverted && <p>❌ Transaction reverted on-chain. State unchanged.</p>}
      {revertReason && <p>Reason: {revertReason}</p>}
      {userRejected && <p>You rejected the signature. Nothing was sent.</p>}
    </div>
  );
}

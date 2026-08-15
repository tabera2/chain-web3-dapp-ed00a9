import { useAccount, useConnect, useDisconnect, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';

// The connect surface. Every value here comes from a wagmi hook that reads the
// live wallet state — no local useState mirrors it, because the wallet is the
// source of truth for "am I connected and to what".
export function Connect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <p>Chain id: {chainId} {chainId === sepolia.id ? '(Sepolia)' : ''}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          disabled={isPending}
          onClick={() => connect({ connector })}
        >
          {isPending ? 'Connecting…' : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  );
}

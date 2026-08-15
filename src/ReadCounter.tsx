import { useReadContract } from 'wagmi';
import { counterAbi, counterAddress } from './counter';

// A VIEW call reads state without changing it. It costs no gas, needs no
// signature, and runs against a public RPC node — so it works even before the
// user connects a wallet. useReadContract encodes the call from the ABI and
// decodes the result for us.
export function ReadCounter() {
  const { data, isLoading, isError, refetch } = useReadContract({
    abi: counterAbi,
    address: counterAddress,
    functionName: 'number',
  });

  if (isLoading) return <p>Reading counter…</p>;
  if (isError) return <p>Could not read the counter.</p>;

  return (
    <div>
      <p>Counter value: {data?.toString()}</p>
      <button onClick={() => refetch()}>Refresh</button>
    </div>
  );
}

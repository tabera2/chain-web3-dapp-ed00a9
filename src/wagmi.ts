import { http, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';

// wagmi's config is the single place that knows WHICH chains we support and HOW
// we talk to them. `injected()` is the connector for a browser wallet that
// injects itself into the page (MetaMask, Rabbit, Coinbase Wallet extension).
// `http()` is the read transport — a plain JSON-RPC endpoint we use for view
// calls. Note the asymmetry: reads go over http; writes go through the wallet.
export const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

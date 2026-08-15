import { Connect } from './Connect';
import { ReadCounter } from './ReadCounter';
import { Increment } from './Increment';

// The full dApp: connect a wallet, read on-chain state for free, and send a
// verified write that tells the truth about what happened on-chain — including
// every way it can fail.
export function App() {
  return (
    <main>
      <h1>Web3 dApp</h1>
      <Connect />
      <hr />
      <ReadCounter />
      <Increment />
    </main>
  );
}

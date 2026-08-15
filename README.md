# Wire a Wallet to a Contract: Web3 Frontend Integration

An intermediate Web3 frontend project. You take a plain React app and wire it to the blockchain the way a real dApp does — connect MetaMask with wagmi, read on-chain state through an ABI, and send a state-changing transaction. Then the failure beat that separates a demo from a product: your UI renders "Success!" the instant it sends, so a transaction that reverts on-chain leaves the interface lying to the user. You fix it by awaiting the receipt and decoding the revert reason, then harden the flow against the three things that actually happen in production — the user rejecting the signature, the wallet being on the wrong network, and a transaction sitting pending for thirty seconds. The through-line is the one idea Web3 forces you to internalize: the frontend is untrusted and the chain is the only source of truth. A read-only IDE walkthrough with a tutor and a sharp student debating each decision.

Built step-by-step with [KhwajaLabs Build](https://khwajalabs.com).

## Stack
- TypeScript
- React
- viem
- wagmi
- MetaMask

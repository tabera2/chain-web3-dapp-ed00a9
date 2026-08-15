// A contract's ABI (Application Binary Interface) is the typed description of its
// functions — names, inputs, outputs, and whether each one reads or writes. viem
// uses it to ENCODE a call into calldata and DECODE the raw bytes that come back
// into real JS values. Without the ABI, a contract is an opaque address.
//
// This is a tiny Counter: a public `number()` view and an `increment()` that
// costs gas. `as const` is required so viem can infer exact types from the ABI.
export const counterAbi = [
  {
    type: 'function',
    name: 'number',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'increment',
    stateMutability: 'nonpayable',
    inputs: [],
    outputs: [],
  },
] as const;

// Deployed on Sepolia. On a different chain this address is meaningless.
export const counterAddress = '0x3d8f2ac4bE7B4b5a1f0a2C1234567890AbCdEf12' as const;

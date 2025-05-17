// ABI do contrato DonationManager
export const DONATION_MANAGER_ABI = [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "createDonation",
    inputs: [
      { name: "recipient", type: "address", internalType: "address payable" },
      { name: "title", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "suggestedAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "donate",
    inputs: [{ name: "donationId", type: "uint256", internalType: "uint256" }],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "donationCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "donations",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "recipient", type: "address", internalType: "address payable" },
      { name: "title", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "suggestedAmount", type: "uint256", internalType: "uint256" },
      { name: "totalReceived", type: "uint256", internalType: "uint256" },
      { name: "exists", type: "bool", internalType: "bool" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "editDonation",
    inputs: [
      { name: "donationId", type: "uint256", internalType: "uint256" },
      { name: "newTitle", type: "string", internalType: "string" },
      { name: "newDescription", type: "string", internalType: "string" },
      { name: "newSuggestedAmount", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDonation",
    inputs: [{ name: "donationId", type: "uint256", internalType: "uint256" }],
    outputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "title", type: "string", internalType: "string" },
      { name: "description", type: "string", internalType: "string" },
      { name: "suggestedAmount", type: "uint256", internalType: "uint256" },
      { name: "totalReceived", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DonationCreated",
    inputs: [
      {
        name: "donationId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      { name: "title", type: "string", indexed: false, internalType: "string" },
      {
        name: "suggestedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DonationEdited",
    inputs: [
      {
        name: "donationId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "newTitle",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "newDescription",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "newSuggestedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DonationReceived",
    inputs: [
      {
        name: "donationId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "donor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
];

// Endereço do contrato na rede local Anvil (31337)
export const DONATION_MANAGER_ADDRESS =
  "0x5FbDB2315678afecb367f032d93F642f64180aa3";

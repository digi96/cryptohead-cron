const headProfileAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "email",
        type: "string",
      },
    ],
    name: "EmailVerificationRequested",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "userId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum HeadProfile.HeadType",
        name: "userType",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "string",
        name: "displayName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "email",
        type: "string",
      },
    ],
    name: "ProfileCreated",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "userId",
            type: "uint256",
          },
          {
            internalType: "enum HeadProfile.HeadType",
            name: "userType",
            type: "uint8",
          },
          {
            internalType: "address payable",
            name: "userAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "displayName",
            type: "string",
          },
          {
            internalType: "string",
            name: "email",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isEmailVerified",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "lastUpdate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "emailVerifyNumber",
            type: "uint256",
          },
        ],
        internalType: "struct HeadProfile.ProfileInfo",
        name: "_profile",
        type: "tuple",
      },
    ],
    name: "createProfile",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getProfileInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "userId",
        type: "uint256",
      },
      {
        internalType: "enum HeadProfile.HeadType",
        name: "headType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "displayName",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isEmailVerified",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_address",
        type: "address",
      },
    ],
    name: "getProfileInfoByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "userId",
        type: "uint256",
      },
      {
        internalType: "enum HeadProfile.HeadType",
        name: "headType",
        type: "uint8",
      },
      {
        internalType: "string",
        name: "displayName",
        type: "string",
      },
      {
        internalType: "string",
        name: "email",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isEmailVerified",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "emailVerifyNumber",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSixDigitRandom",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "requestEmailVerificationCode",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "verificationCode",
        type: "uint256",
      },
    ],
    name: "verifyEmail",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export { headProfileAbi };

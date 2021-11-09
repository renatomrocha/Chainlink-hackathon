/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ERC1155, ERC1155Interface } from "../ERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620029923803806200299283398181016040528101906200003791906200018d565b62000048816200004f60201b60201c565b5062000342565b8060029080519060200190620000679291906200006b565b5050565b828054620000799062000267565b90600052602060002090601f0160209004810192826200009d5760008555620000e9565b82601f10620000b857805160ff1916838001178555620000e9565b82800160010185558215620000e9579182015b82811115620000e8578251825591602001919060010190620000cb565b5b509050620000f89190620000fc565b5090565b5b8082111562000117576000816000905550600101620000fd565b5090565b6000620001326200012c84620001fb565b620001d2565b9050828152602081018484840111156200014b57600080fd5b6200015884828562000231565b509392505050565b600082601f8301126200017257600080fd5b8151620001848482602086016200011b565b91505092915050565b600060208284031215620001a057600080fd5b600082015167ffffffffffffffff811115620001bb57600080fd5b620001c98482850162000160565b91505092915050565b6000620001de620001f1565b9050620001ec82826200029d565b919050565b6000604051905090565b600067ffffffffffffffff82111562000219576200021862000302565b5b620002248262000331565b9050602081019050919050565b60005b838110156200025157808201518184015260208101905062000234565b8381111562000261576000848401525b50505050565b600060028204905060018216806200028057607f821691505b60208210811415620002975762000296620002d3565b5b50919050565b620002a88262000331565b810181811067ffffffffffffffff82111715620002ca57620002c962000302565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61264080620003526000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f414610138578063a22cb46514610168578063e985e9c514610184578063f242432a146101b457610087565b8062fdd58e1461008c57806301ffc9a7146100bc5780630e89341c146100ec5780632eb2c2d61461011c575b600080fd5b6100a660048036038101906100a191906117dd565b6101d0565b6040516100b39190611e1a565b60405180910390f35b6100d660048036038101906100d19190611885565b610299565b6040516100e39190611c9d565b60405180910390f35b610106600480360381019061010191906118d7565b61037b565b6040516101139190611cb8565b60405180910390f35b61013660048036038101906101319190611653565b61040f565b005b610152600480360381019061014d9190611819565b6104b0565b60405161015f9190611c44565b60405180910390f35b610182600480360381019061017d91906117a1565b610661565b005b61019e60048036038101906101999190611617565b6107e2565b6040516101ab9190611c9d565b60405180910390f35b6101ce60048036038101906101c99190611712565b610876565b005b60008073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610241576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161023890611d1a565b60405180910390fd5b60008083815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007fd9b67a26000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916148061036457507f0e89341c000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916145b80610374575061037382610917565b5b9050919050565b60606002805461038a90612089565b80601f01602080910402602001604051908101604052809291908181526020018280546103b690612089565b80156104035780601f106103d857610100808354040283529160200191610403565b820191906000526020600020905b8154815290600101906020018083116103e657829003601f168201915b50505050509050919050565b610417610981565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff16148061045d575061045c85610457610981565b6107e2565b5b61049c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049390611d7a565b60405180910390fd5b6104a98585858585610989565b5050505050565b606081518351146104f6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ed90611dda565b60405180910390fd5b6000835167ffffffffffffffff811115610539577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156105675781602001602082028036833780820191505090505b50905060005b8451811015610656576106008582815181106105b2577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101518583815181106105f3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101516101d0565b828281518110610639577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010181815250508061064f906120ec565b905061056d565b508091505092915050565b8173ffffffffffffffffffffffffffffffffffffffff16610680610981565b73ffffffffffffffffffffffffffffffffffffffff1614156106d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ce90611dba565b60405180910390fd5b80600160006106e4610981565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508173ffffffffffffffffffffffffffffffffffffffff16610791610981565b73ffffffffffffffffffffffffffffffffffffffff167f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31836040516107d69190611c9d565b60405180910390a35050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b61087e610981565b73ffffffffffffffffffffffffffffffffffffffff168573ffffffffffffffffffffffffffffffffffffffff1614806108c457506108c3856108be610981565b6107e2565b5b610903576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108fa90611d3a565b60405180910390fd5b6109108585858585610ce9565b5050505050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b81518351146109cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c490611dfa565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610a3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3490611d5a565b60405180910390fd5b6000610a47610981565b9050610a57818787878787610f6b565b60005b8451811015610c54576000858281518110610a9e577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015190506000858381518110610ae3577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101519050600080600084815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610b84576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b7b90611d9a565b60405180910390fd5b81810360008085815260200190815260200160002060008c73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160008085815260200190815260200160002060008b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610c399190611f7d565b9250508190555050505080610c4d906120ec565b9050610a5a565b508473ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb8787604051610ccb929190611c66565b60405180910390a4610ce1818787878787610f73565b505050505050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff161415610d59576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d5090611d5a565b60405180910390fd5b6000610d63610981565b9050610d83818787610d748861115a565b610d7d8861115a565b87610f6b565b600080600086815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905083811015610e1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1190611d9a565b60405180910390fd5b83810360008087815260200190815260200160002060008973ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508360008087815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610ecf9190611f7d565b925050819055508573ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628888604051610f4c929190611e35565b60405180910390a4610f62828888888888611220565b50505050505050565b505050505050565b610f928473ffffffffffffffffffffffffffffffffffffffff16611407565b15611152578373ffffffffffffffffffffffffffffffffffffffff1663bc197c8187878686866040518663ffffffff1660e01b8152600401610fd8959493929190611b82565b602060405180830381600087803b158015610ff257600080fd5b505af192505050801561102357506040513d601f19601f8201168201806040525081019061102091906118ae565b60015b6110c95761102f6121c2565b806308c379a0141561108c5750611044612518565b8061104f575061108e565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110839190611cb8565b60405180910390fd5b505b6040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110c090611cda565b60405180910390fd5b63bc197c8160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614611150576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161114790611cfa565b60405180910390fd5b505b505050505050565b60606000600167ffffffffffffffff81111561119f577f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040519080825280602002602001820160405280156111cd5781602001602082028036833780820191505090505b509050828160008151811061120b577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60200260200101818152505080915050919050565b61123f8473ffffffffffffffffffffffffffffffffffffffff16611407565b156113ff578373ffffffffffffffffffffffffffffffffffffffff1663f23a6e6187878686866040518663ffffffff1660e01b8152600401611285959493929190611bea565b602060405180830381600087803b15801561129f57600080fd5b505af19250505080156112d057506040513d601f19601f820116820180604052508101906112cd91906118ae565b60015b611376576112dc6121c2565b806308c379a0141561133957506112f1612518565b806112fc575061133b565b806040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113309190611cb8565b60405180910390fd5b505b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161136d90611cda565b60405180910390fd5b63f23a6e6160e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916817bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916146113fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113f490611cfa565b60405180910390fd5b505b505050505050565b600080823b905060008111915050919050565b600061142d61142884611e83565b611e5e565b9050808382526020820190508285602086028201111561144c57600080fd5b60005b8581101561147c57816114628882611530565b84526020840193506020830192505060018101905061144f565b5050509392505050565b600061149961149484611eaf565b611e5e565b905080838252602082019050828560208602820111156114b857600080fd5b60005b858110156114e857816114ce8882611602565b8452602084019350602083019250506001810190506114bb565b5050509392505050565b600061150561150084611edb565b611e5e565b90508281526020810184848401111561151d57600080fd5b611528848285612047565b509392505050565b60008135905061153f816125ae565b92915050565b600082601f83011261155657600080fd5b813561156684826020860161141a565b91505092915050565b600082601f83011261158057600080fd5b8135611590848260208601611486565b91505092915050565b6000813590506115a8816125c5565b92915050565b6000813590506115bd816125dc565b92915050565b6000815190506115d2816125dc565b92915050565b600082601f8301126115e957600080fd5b81356115f98482602086016114f2565b91505092915050565b600081359050611611816125f3565b92915050565b6000806040838503121561162a57600080fd5b600061163885828601611530565b925050602061164985828601611530565b9150509250929050565b600080600080600060a0868803121561166b57600080fd5b600061167988828901611530565b955050602061168a88828901611530565b945050604086013567ffffffffffffffff8111156116a757600080fd5b6116b38882890161156f565b935050606086013567ffffffffffffffff8111156116d057600080fd5b6116dc8882890161156f565b925050608086013567ffffffffffffffff8111156116f957600080fd5b611705888289016115d8565b9150509295509295909350565b600080600080600060a0868803121561172a57600080fd5b600061173888828901611530565b955050602061174988828901611530565b945050604061175a88828901611602565b935050606061176b88828901611602565b925050608086013567ffffffffffffffff81111561178857600080fd5b611794888289016115d8565b9150509295509295909350565b600080604083850312156117b457600080fd5b60006117c285828601611530565b92505060206117d385828601611599565b9150509250929050565b600080604083850312156117f057600080fd5b60006117fe85828601611530565b925050602061180f85828601611602565b9150509250929050565b6000806040838503121561182c57600080fd5b600083013567ffffffffffffffff81111561184657600080fd5b61185285828601611545565b925050602083013567ffffffffffffffff81111561186f57600080fd5b61187b8582860161156f565b9150509250929050565b60006020828403121561189757600080fd5b60006118a5848285016115ae565b91505092915050565b6000602082840312156118c057600080fd5b60006118ce848285016115c3565b91505092915050565b6000602082840312156118e957600080fd5b60006118f784828501611602565b91505092915050565b600061190c8383611b64565b60208301905092915050565b61192181611fd3565b82525050565b600061193282611f1c565b61193c8185611f4a565b935061194783611f0c565b8060005b8381101561197857815161195f8882611900565b975061196a83611f3d565b92505060018101905061194b565b5085935050505092915050565b61198e81611fe5565b82525050565b600061199f82611f27565b6119a98185611f5b565b93506119b9818560208601612056565b6119c2816121e4565b840191505092915050565b60006119d882611f32565b6119e28185611f6c565b93506119f2818560208601612056565b6119fb816121e4565b840191505092915050565b6000611a13603483611f6c565b9150611a1e82612202565b604082019050919050565b6000611a36602883611f6c565b9150611a4182612251565b604082019050919050565b6000611a59602b83611f6c565b9150611a64826122a0565b604082019050919050565b6000611a7c602983611f6c565b9150611a87826122ef565b604082019050919050565b6000611a9f602583611f6c565b9150611aaa8261233e565b604082019050919050565b6000611ac2603283611f6c565b9150611acd8261238d565b604082019050919050565b6000611ae5602a83611f6c565b9150611af0826123dc565b604082019050919050565b6000611b08602983611f6c565b9150611b138261242b565b604082019050919050565b6000611b2b602983611f6c565b9150611b368261247a565b604082019050919050565b6000611b4e602883611f6c565b9150611b59826124c9565b604082019050919050565b611b6d8161203d565b82525050565b611b7c8161203d565b82525050565b600060a082019050611b976000830188611918565b611ba46020830187611918565b8181036040830152611bb68186611927565b90508181036060830152611bca8185611927565b90508181036080830152611bde8184611994565b90509695505050505050565b600060a082019050611bff6000830188611918565b611c0c6020830187611918565b611c196040830186611b73565b611c266060830185611b73565b8181036080830152611c388184611994565b90509695505050505050565b60006020820190508181036000830152611c5e8184611927565b905092915050565b60006040820190508181036000830152611c808185611927565b90508181036020830152611c948184611927565b90509392505050565b6000602082019050611cb26000830184611985565b92915050565b60006020820190508181036000830152611cd281846119cd565b905092915050565b60006020820190508181036000830152611cf381611a06565b9050919050565b60006020820190508181036000830152611d1381611a29565b9050919050565b60006020820190508181036000830152611d3381611a4c565b9050919050565b60006020820190508181036000830152611d5381611a6f565b9050919050565b60006020820190508181036000830152611d7381611a92565b9050919050565b60006020820190508181036000830152611d9381611ab5565b9050919050565b60006020820190508181036000830152611db381611ad8565b9050919050565b60006020820190508181036000830152611dd381611afb565b9050919050565b60006020820190508181036000830152611df381611b1e565b9050919050565b60006020820190508181036000830152611e1381611b41565b9050919050565b6000602082019050611e2f6000830184611b73565b92915050565b6000604082019050611e4a6000830185611b73565b611e576020830184611b73565b9392505050565b6000611e68611e79565b9050611e7482826120bb565b919050565b6000604051905090565b600067ffffffffffffffff821115611e9e57611e9d612193565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611eca57611ec9612193565b5b602082029050602081019050919050565b600067ffffffffffffffff821115611ef657611ef5612193565b5b611eff826121e4565b9050602081019050919050565b6000819050602082019050919050565b600081519050919050565b600081519050919050565b600081519050919050565b6000602082019050919050565b600082825260208201905092915050565b600082825260208201905092915050565b600082825260208201905092915050565b6000611f888261203d565b9150611f938361203d565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611fc857611fc7612135565b5b828201905092915050565b6000611fde8261201d565b9050919050565b60008115159050919050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b82818337600083830152505050565b60005b83811015612074578082015181840152602081019050612059565b83811115612083576000848401525b50505050565b600060028204905060018216806120a157607f821691505b602082108114156120b5576120b4612164565b5b50919050565b6120c4826121e4565b810181811067ffffffffffffffff821117156120e3576120e2612193565b5b80604052505050565b60006120f78261203d565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561212a57612129612135565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600060033d11156121e15760046000803e6121de6000516121f5565b90505b90565b6000601f19601f8301169050919050565b60008160e01c9050919050565b7f455243313135353a207472616e7366657220746f206e6f6e204552433131353560008201527f526563656976657220696d706c656d656e746572000000000000000000000000602082015250565b7f455243313135353a204552433131353552656365697665722072656a6563746560008201527f6420746f6b656e73000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2062616c616e636520717565727920666f7220746865207a60008201527f65726f2061646472657373000000000000000000000000000000000000000000602082015250565b7f455243313135353a2063616c6c6572206973206e6f74206f776e6572206e6f7260008201527f20617070726f7665640000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e7366657220746f20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f455243313135353a207472616e736665722063616c6c6572206973206e6f742060008201527f6f776e6572206e6f7220617070726f7665640000000000000000000000000000602082015250565b7f455243313135353a20696e73756666696369656e742062616c616e636520666f60008201527f72207472616e7366657200000000000000000000000000000000000000000000602082015250565b7f455243313135353a2073657474696e6720617070726f76616c2073746174757360008201527f20666f722073656c660000000000000000000000000000000000000000000000602082015250565b7f455243313135353a206163636f756e747320616e6420696473206c656e67746860008201527f206d69736d617463680000000000000000000000000000000000000000000000602082015250565b7f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060008201527f6d69736d61746368000000000000000000000000000000000000000000000000602082015250565b600060443d1015612528576125ab565b612530611e79565b60043d036004823e80513d602482011167ffffffffffffffff821117156125585750506125ab565b808201805167ffffffffffffffff81111561257657505050506125ab565b80602083010160043d0385018111156125935750505050506125ab565b6125a2826020018501866120bb565b82955050505050505b90565b6125b781611fd3565b81146125c257600080fd5b50565b6125ce81611fe5565b81146125d957600080fd5b50565b6125e581611ff1565b81146125f057600080fd5b50565b6125fc8161203d565b811461260757600080fd5b5056fea2646970667358221220f0f20460f864d91324aced0bccc3b52755d74e530b4f6037028a72c63f2f75ef64736f6c63430008040033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155> {
    return super.deploy(uri_, overrides || {}) as Promise<ERC1155>;
  }
  getDeployTransaction(
    uri_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  attach(address: string): ERC1155 {
    return super.attach(address) as ERC1155;
  }
  connect(signer: Signer): ERC1155__factory {
    return super.connect(signer) as ERC1155__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new utils.Interface(_abi) as ERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155 {
    return new Contract(address, _abi, signerOrProvider) as ERC1155;
  }
}

var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "_to",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "acceptOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "ownerAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "betterAuctionAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "biddingPeriod",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "recoveryAfterPeriod",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "ENSName",
				"type": "string"
			}
		],
		"name": "BetterAuctionListing",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_biddingPeriod",
				"type": "uint256"
			},
			{
				"name": "_recoveryAfterPeriod",
				"type": "uint256"
			},
			{
				"name": "_ENSName",
				"type": "string"
			}
		],
		"name": "deployBetterAuctionContract",
		"outputs": [
			{
				"name": "betterAuctionAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnershipImmediately",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [
			{
				"name": "_ensRegistrarAddr",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "deployedAuctions",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "ensRegistrarAddr",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getAuction",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "newOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfDeployedAuctions",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];




const c = {
	abi:abi,
	addrs: {
		1:'',
		3:'0x7f54D9893F470F8d221b1f130a9EBeAc0d1ec945',
		4:'', 
	}
}
export default c;

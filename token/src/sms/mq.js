var abi = [
	{
		"constant": true,
		"inputs": [],
		"name": "organiserAddress",
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
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_userName",
				"type": "bytes32"
			}
		],
		"name": "createUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"name": "_maxCapacity",
				"type": "uint256"
			},
			{
				"name": "_topic",
				"type": "string"
			},
			{
				"name": "_presenters",
				"type": "address[]"
			}
		],
		"name": "createMeetup",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_meetupId",
				"type": "uint256"
			}
		],
		"name": "checkIn",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
				"name": "",
				"type": "uint256"
			}
		],
		"name": "meetups",
		"outputs": [
			{
				"name": "createTime",
				"type": "uint256"
			},
			{
				"name": "startTime",
				"type": "uint256"
			},
			{
				"name": "maxCapacity",
				"type": "uint256"
			},
			{
				"name": "remainingCapacity",
				"type": "uint256"
			},
			{
				"name": "topic",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unpause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getMeetup",
		"outputs": [
			{
				"name": "meetupCreateTime",
				"type": "uint256"
			},
			{
				"name": "meetupStartTime",
				"type": "uint256"
			},
			{
				"name": "meetupMaxCapacity",
				"type": "uint256"
			},
			{
				"name": "remainingCapacity",
				"type": "uint256"
			},
			{
				"name": "meetupTopic",
				"type": "string"
			},
			{
				"name": "meetupPresenters",
				"type": "address[]"
			},
			{
				"name": "meetupRegistrationList",
				"type": "address[]"
			},
			{
				"name": "meetupWaitingList",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMeetupCount",
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
		"constant": false,
		"inputs": [
			{
				"name": "_newAssistant",
				"type": "address"
			}
		],
		"name": "setAssistant_1",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "pause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOrganiser",
				"type": "address"
			}
		],
		"name": "setOrganiser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "removeUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserCount",
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
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "userIndex",
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
		"name": "assistantAddress_1",
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
		"constant": false,
		"inputs": [
			{
				"name": "_meetupId",
				"type": "uint256"
			}
		],
		"name": "registerForMeetup",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newAssistant",
				"type": "address"
			}
		],
		"name": "setAssistant_2",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "assistantAddress_2",
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
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getUserData",
		"outputs": [
			{
				"name": "_exists",
				"type": "bool"
			},
			{
				"name": "_index",
				"type": "uint256"
			},
			{
				"name": "_name",
				"type": "bytes32"
			},
			{
				"name": "userCreateTime",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_maxCapacity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_remainingCapacity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_topic",
				"type": "string"
			}
		],
		"name": "MeeupEventCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_userName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "userCreateTime",
				"type": "uint256"
			}
		],
		"name": "UserCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_removeIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "userName",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"name": "removalTime",
				"type": "uint256"
			}
		],
		"name": "UserRemoved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_startTime",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_maxCapacity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_remainingCapacity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_topic",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_waitingListLength",
				"type": "uint256"
			}
		],
		"name": "MeetupEventUpdated",
		"type": "event"
	}
];

const meetq = {
	code:'MQ',
	not_token:true,
	abi:abi,
	addr:'0xAF2B36437890Bb1b1155e4D201C1a498E436712f'
}

export default meetq;

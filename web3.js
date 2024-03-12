// Import Web3.js library
const Web3 = require('web3');

// Initialize Web3 instance
const web3 = new Web3('https://mainnet.infura.io/v3/your-infura-project-id');

// Load contract ABI (replace with your ABI)
const contractABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_message",
                "type": "string"
            }
        ],
        "name": "setMessage",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getMessage",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

// Contract address (replace with your contract address)
const contractAddress = '0x1234567890123456789012345678901234567890';

// Create contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Example: Call contract method to get message
contract.methods.getMessage().call()
    .then(message => {
        console.log('Current message:', message);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Example: Call contract method to set message (requires account with unlocked private key)
const messageToSet = 'Hello, blockchain!';
web3.eth.getAccounts()
    .then(accounts => {
        const account = accounts[0]; // Assuming the first account is used
        return contract.methods.setMessage(messageToSet).send({ from: account });
    })
    .then(transactionReceipt => {
        console.log('Transaction receipt:', transactionReceipt);
    })
    .catch(error => {
        console.error('Error:', error);
    });

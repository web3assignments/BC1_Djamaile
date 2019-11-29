const Web3 = require('web3');
const options = {
    transactionConfirmationBlocks: 1
};
const web3 = new Web3('https://ropsten.infura.io', null, options);
const TestPayABI = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_foodName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_cal",
                "type": "uint256"
            }
        ],
        "name": "addFoodItem",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cal",
                "type": "uint256"
            }
        ],
        "name": "burnCal",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "foodName",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cal",
                "type": "uint256"
            }
        ],
        "name": "NewFoodItem",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cal",
                "type": "uint256"
            }
        ],
        "name": "calorieBurned",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "dateSearched",
                "type": "uint256"
            }
        ],
        "name": "checkedCalByDate",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "paid",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "userBalance",
                "type": "uint256"
            }
        ],
        "name": "paidUser",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "eth",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "contractBalance",
                "type": "uint256"
            }
        ],
        "name": "contractGot",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "payOutTheUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "transferFundsToContract",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "burnedCal",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "dailyLimit",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "eatenCal",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "getContractBalance",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "getFoodItemFromUser",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
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
                "internalType": "uint256",
                "name": "year",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "month",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "day",
                "type": "uint256"
            }
        ],
        "name": "getTotalCalEatenByDate",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "getUserBalance",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "totalCal",
        "outputs": [
            {
                "internalType": "uint256",
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
        "name": "user",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const ContractAddress = "0xFeC496C300601D6309c647A05Fb71b57be6E91cF";
const CreateContract = new web3.eth.Contract(TestPayABI, ContractAddress);
const privateKey = 'e0f3440344e4814d0dea8a65c1b9c488bab4295571c72fb879f5c29c8c861937';
const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;

async function getTotalCal() {
    let totalCal = await CreateContract.methods.totalCal().call();
    console.log(`User has ${totalCal} total calories consumed`);
}

async function burnCalories(){
    const burned = await CreateContract.methods.burnCal(100).send({
        from: web3.eth.defaultAccount,
        gas: 3000000
    }).catch(e => {console.log(e)});
    console.log(burned);
    console.log(`Transaction hash: ${burned.events.calorieBurned.transactionHash} of burned calories`);
    getBurnedCalories();
}

async function getBurnedCalories(){
    const burnedCal = await CreateContract.methods.burnedCal().call();
    console.log(`User has burned ${burnedCal} calories`);
}

async function getUserBalance(){
    let balance =await CreateContract.methods.getUserBalance().call();
    balance = web3.utils.fromWei(balance, 'ether');
    console.log(`User has ${balance} ether`);
}

async function transferFundsToContract(){
    let contractBalance =await CreateContract.methods.getContractBalance().call();
    console.log(`Contract has a value of: ${contractBalance}`);
    const funds =  web3.utils.toWei("1");
    await  CreateContract.methods.transferFundsToContract().send({
        from: web3.eth.defaultAccount,
        gas: 24,
        value: funds
    }).catch(e => {console.log(e)});

    contractBalance =await CreateContract.methods.getContractBalance().call();
    console.log(`Contract has a value of: ${contractBalance}`);
}



//getTotalCal();
//getUserBalance();
burnCalories();
//transferFundsToContract();


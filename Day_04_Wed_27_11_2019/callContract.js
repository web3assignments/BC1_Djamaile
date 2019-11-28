const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io');
const TestPayABI = [
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
];

async function getTotalCal() {
    const ContractAddress = "0xB7005405101E61fcD81ec1322AE72c54a99AED7A";
    const CreateContract = new web3.eth.Contract(TestPayABI, ContractAddress);

    let totalCal = await CreateContract.methods.totalCal().call();

    console.log(`User has ${totalCal} total calories consumed`);
}

async function burnCalories(){
    const privateKey = 'e0f3440344e4814d0dea8a65c1b9c488bab4295571c72fb879f5c29c8c861937';
    const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const ContractAddress = "0x288191b6e0B4BCC6Baba6620B60E20871ae629c2";
    const CreateContract = new web3.eth.Contract(TestPayABI, ContractAddress);


     const burned = await CreateContract.methods.burnCal(100).send({from: this.web3.eth.defaultAccount,
         gas:1,
         gasPrice: 1});
     console.log(burned);
}

async function getUserBalance(){
    const ContractAddress = "0x288191b6e0B4BCC6Baba6620B60E20871ae629c2";
    const CreateContract = new web3.eth.Contract(TestPayABI, ContractAddress);

    let balance = await CreateContract.methods.getUserBalance().call();
    balance = parseInt(balance);
    console.log(`User has ${balance} ether`);
}

//getTotalCal();
//getUserBalance();
burnCalories();
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
    }
];

async function getTotalCal() {
    const ContractAddress = "0xB7005405101E61fcD81ec1322AE72c54a99AED7A";
    const CreateContract = new web3.eth.Contract(TestPayABI, ContractAddress);
    
    let totalCal = await CreateContract.methods.totalCal().call();

    console.log(`User has ${totalCal} total calories consumed`);
}

getTotalCal();
const Web3 = require('web3');
const web3 = new Web3('wss://ropsten.infura.io/ws');

const calorieContract = "0x28Ab37c5B84B3c1e9517b3d4724de2a55eeD9E0c";
const ABILogTypes=[
    {"indexed": false,"internalType": "string","name": "message","type": "string"},
    {"indexed": false,"internalType": "uint256","name": "id","type": "uint256"},
    {"indexed": false,"internalType": "string","name": "foodName","type": "string"},
    {"indexed": false,"internalType": "uint256","name": "cal","type": "uint256"}
];

async function f(object){
    const decoded = web3.eth.abi.decodeParameters(ABILogTypes, object.data);
    console.log(`message=${decoded[0]} id=${decoded[1]} foodName=${decoded[2]} cal=${decoded[3]}`)
}

web3.eth.subscribe('logs', {fromBlock: '0x0', address: calorieContract})
    .on("data", f)
    .on("changed", console.log)
    .on("error", console.log);

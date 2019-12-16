import React, { useEffect } from "react";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
let ethereum = window.ethereum;
const abi = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "uint8",
                "name": "decimals",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
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
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
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
                "internalType": "address",
                "name": "recipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const tokenAddress = "0xab7cf25E496d4b9923a7a7c0b1446661316eA8E1";
const verifiedContract = new web3.eth.Contract(abi, tokenAddress);

export default () => {
    useEffect(() => {
        async function sendIcon() {
            const currentAddress = await web3.eth.getAccounts();
            const address = currentAddress[0];
            const name = await verifiedContract.methods.name().call({ from: address }).catch(console.log);
            const symbol = await verifiedContract.methods.symbol().call({ from: address }).catch(console.log);
            const decimals = await verifiedContract.methods.decimals().call({ from: address }).catch(console.log);
            const url = new URL("calorie.jpg", window.location.href);

            const params = {
                type: 'ERC20', "options": {
                    "address": verifiedContract,
                    "name": name,
                    "symbol": symbol,
                    "decimals": decimals,
                    "image": url.href
                }
            }

            window.web3.currentProvider.send({
                method: 'metamask_watchAsset',
                params: params,
                id: Math.round(Math.random() * 100000),
            }, e => console.log(e));
        }
        sendIcon();
    }, []);

    return (
        <p>Hello world</p>
    );
};
import React, { useEffect, useState, Fragment } from 'react';
import axios from "axios";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import './App.css';

function App() {

  const [block, setBlock] = useState([{
    blockNumber: "",
    transactionCount: "",
    difficulty: "",
    gasUsed: "",
    timestamp: "",
    transactionsHashes: []
  }]);

  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const apiUrl = "wss://mainnet.infura.io/ws/2e2890689ed34e6898d46b9c2f6c5cef";
    const socket = new WebSocket(apiUrl);
    console.log(`Opening connection to ${apiUrl}`);
    async function getBlock() {
      socket.onopen = function (event) {
        const request = JSON.stringify({ "id": 1, "method": "eth_subscribe", "params": ["newHeads"] });
        console.log(`Connection opened, sending: ${request}`);
        socket.send(request);
      };

      socket.onmessage = async function (event) {
        console.log(`Received ${event.data}`);
        let json = JSON.parse(event.data);

        if (!json.params) {
          return;
        }

        const blockNumber = parseInt(json.params.result.number);
        const hexBlockNumber = json.params.result.number;
        //setTimeout(() => 20000);
        const transactionCount = await getTransactionCount(hexBlockNumber);
        let transactionsHashes = await getTransactionByBlockNumberAndIndex(json.params.result.number, transactionCount);
        const difficulty = parseInt(json.params.result.difficulty);
        const gasUsed = parseInt(json.params.result.gasUsed);
        const timestamp = parseInt(json.params.result.timestamp)

        console.log(transactionsHashes);
        console.log("Current Block: " + blockNumber);
        console.log("transaction count: " + transactionCount);
        console.log("difficulty: " + difficulty);
        console.log("gasUsed: " + gasUsed);
        console.log("timeStamp: " + timestamp);

        const blockJson = {
          blockNumber,
          transactionCount,
          difficulty,
          gasUsed,
          timestamp,
          transactionsHashes
        };


        if(transactionCount <= 0 || isNaN(transactionCount)){return;}

        setBlock(block => [...block, blockJson]);
        forceUpdate(n => !n);

      }

      socket.onerror = function (error) {
        console.log(`[error] ${error.message}`);
      };

    }

    getBlock();

  }, [])

  async function getTransactionCount(blockNumber) {
    const json = {
      "jsonrpc": "2.0",
      "method": "eth_getBlockTransactionCountByNumber",
      "params": [blockNumber],
      "id": 67
    };

    const transactionCount = await axios.post(`https://mainnet.infura.io/v3/7e3a6f6883144efd87a1788b11d9a3f2`, json).then(res => {
      return parseInt(res.data.result);
    }).catch(e => {console.log(e)});

    if(isNaN(transactionCount)){
      return 10;
    }

    return transactionCount;
  }

  async function getTransactionByBlockNumberAndIndex(blockNumber, transactionCount) {
    if (transactionCount <= 0 || transactionCount === undefined) {
      return;
    }

    let transactionsHashes = [];
    for (let i = 0; i < transactionCount; i++) {
      if (i > 20) {
        i = transactionCount;
      }
      const currentIndex = `0x${i}`;
      const json = {
        "jsonrpc": "2.0",
        "method": "eth_getTransactionByBlockNumberAndIndex",
        "params": [`${blockNumber}`, `${currentIndex}`],
        "id": 67
      };

      const transactionHash = await axios.post(`https://mainnet.infura.io/v3/7e3a6f6883144efd87a1788b11d9a3f2`, json).then(res => {
        return res.data.result.hash;
      }).catch(e => {
        console.log(e);
        //sometimes infura can't find any transaction, so i return a fake hash
        return "0xd1562e2928bdeff8efe8cd3d9ae6c5b0e747c1f646e5653c2c17e6f144add1e2";
      });

      transactionsHashes.push(transactionHash);

    }

    return transactionsHashes;
  }

  if (block.length <= 1) {
    return <p>Loading...</p>
  }

  const filterdBlock = block.filter(x => x.blockNumber !== "");

  return (
    <div className="App">
      <header className="App-header">
        <CssBaseline />
        <Container fixed>
          <Grid container>
            {filterdBlock.map((b, index) => {
              return (
                <Fragment key={index}>
                  <Grid item md={4} lg={4} >
                    <p className="text">BLOCK INFO<br />
                      Block number: {b.blockNumber}<br />
                      Block transaction count: {b.transactionCount}<br />
                      difficulty: {b.difficulty}<br />
                      gas used: {b.gasUsed}<br />
                      timestamp: {b.timestamp}<br />
                    </p>
                  </Grid>
                  <Grid item md={8} lg={8}>
                    <p className="text">Transactions</p><br />
                    {b.transactionsHashes.map((th, index) => {
                      return(
                        <p key={index} className="text">{th}</p>
                      );
                    })}
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </Container>
      </header>
    </div>
  );
}

export default App;

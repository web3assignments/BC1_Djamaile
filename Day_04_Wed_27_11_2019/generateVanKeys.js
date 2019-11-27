Web3 = require("web3");
web3 = new Web3();

function findAddressWithPrefix(prefix) {

    let found = false;
    let address = "";
    let time = 0;
    let start = new Date();

    do{
        let newAddress = web3.eth.accounts.create();
        const length = prefix.length + 2;
        let currentPrefix=newAddress.address.slice(2,length).toLowerCase();

        console.log("current address: " + newAddress.address);
        console.log("current prefix: " + currentPrefix);
        
        if(currentPrefix === prefix){
            address = newAddress.address;
            let end = new Date();
            time = end - start;
            time = Math.floor(time /= 1000);
            found = true;
        }
    }while(found === false);

    console.log(`Found a address: ${address}`)
    console.log(`Operation took: ${time} seconds long`)
}

findAddressWithPrefix("12387");
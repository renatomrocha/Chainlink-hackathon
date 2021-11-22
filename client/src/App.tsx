import React, {useEffect, useState} from 'react';
import './App.css';
import NFTContract, {loadBlockchainData, connectWallet, initContract} from './modules/web3_utils'
import NFTicketsNavbar from "./components/Navbar";
import {getInterval, getTicketsOwned, mintNFTIcket, numTicketsOwned} from "./modules/nfticket_utils";

import Canvas from './modules/image_processing';
import ipfsClient from './modules/ipfs_utils';


function App() {



    const [web3, setWeb3] = useState<any>(null)
    const [network, setNetwork] = useState<any>(null)
    const [account, setAccount] = useState<any>(null)
    const [contract, setContract] = useState<any>(null);



    const updateConnectionCallback = (data: {"web3": any, "network": string, "accounts": string[]}) => {
        console.log("Will upload with data: ", data);
        setWeb3(data.web3)
        setNetwork(data["network"])
        setAccount(data["accounts"][0])
        console.log("Web3 is: ", web3);
        console.log("Network is: ", network);
        console.log("Account is: ", account);
    }

    useEffect(()=> {
        loadBlockchainData()
            .then((data)=> {
                updateConnectionCallback(data);
                if(web3!== null) {
                    console.log("Starting contract")
                    const initializedContract = initContract(web3,NFTContract);
                    console.log("Initialized contract is: ", initializedContract);
                    setContract(initializedContract)
                    console.log("contract is: ", contract)
                }
            })
    }, [])

    const connectToMetamask = ()=> {
        connectWallet()
            .then((data)=> {
                updateConnectionCallback(data);
                console.log("Connecting to metamask!");
                if(web3!== null) {
                    setContract(initContract(web3,NFTContract))
                }
            })
    }


  return (
    <div className="container">
        <NFTicketsNavbar/>
        <h1>You are connected to {network} network</h1>
        <h2>Your account is: {account}</h2>
        <div>
        <Canvas props={{uri:"http://bafybeigblofriz5b4zg4xil45t36snirvpzvja63r2yxybwm5ncuphane4.ipfs.localhost:8080/", badge_uri:"http://bafybeie6j2dwmpkcsmg3anx3v3oj4ojogndw3lcmylq6z6wgr3btcschrm.ipfs.localhost:8080/"}}></Canvas>
        </div>
            {/*<img src={"http://bafybeigblofriz5b4zg4xil45t36snirvpzvja63r2yxybwm5ncuphane4.ipfs.localhost:8080/"}></img>*/}
        <div>
        <button onClick={connectToMetamask}>Connect your wallet</button>
        <button onClick={()=> mintNFTIcket(contract, account)}>Mint tickets</button>
        <button onClick={()=> getInterval(contract, account)}>Interval</button>
        <button onClick={()=> getTicketsOwned(contract, account)}>Tickets owned</button>
        </div>
    </div>
  );
}

export default App;

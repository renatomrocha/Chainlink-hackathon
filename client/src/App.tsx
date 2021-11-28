import React, {useEffect, useState} from 'react';
import './App.css';
import NFTicketsNavbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyTickets from "./components/MyTickets";
import Home from "./components/Home";
import TicketCanvas from "./components/TicketCanvas";
import Events from "./components/Events";
import BuyTickets from "./components/BuyTickets";
import * as NFTicketContract from "./artifacts/contracts/NFTickets.json";
import {MUMBAI_CONTRACT_ADDRESS} from "./modules/web3_utils";
import MyFunds from "./components/MyFunds";
import MarketPlace from "./components/MarketPlace";


function App() {

    const [web3, setWeb3] = useState<any>(null)
    const [network, setNetwork] = useState<any>(null)
    const [account, setAccount] = useState<any>(null)
    const [contract, setContract] = useState<any>(null);
    const [isNetworkInvalid, setIsNetworkInvalid] = useState<boolean>(false);

    const web3States = [web3, account, network, isNetworkInvalid];
    const maskUpdateFunctions = [setWeb3, setAccount, setNetwork];



    useEffect(()=> {
        console.log("Network is: ", network);
        if(network!=80001) {
            setIsNetworkInvalid(true);
            // setAccount(null);
        } else {
            setIsNetworkInvalid(false);
            const abi = (NFTicketContract as any).default.abi;
            const contractAddress = MUMBAI_CONTRACT_ADDRESS
            const contract: any = new web3.eth.Contract(abi, contractAddress)
            setContract(contract);
        }
    }, [network, account])


  return (
    <div style={{width:"100%"}}>
        <BrowserRouter>
            <div style={{marginBottom:"20px"}}>
            <NFTicketsNavbar maskUpdateFunctions={maskUpdateFunctions} web3States={web3States}/>
            </div>
                {/*{network && <div><p>Connected to {network}</p><p>Your address is: {account}</p></div>}*/}
            {/*{contract && <p>Connected to contract</p>}*/}
            <Routes>
                <Route  path="/" element={<Home account={account} network={network} contract={contract}/>} />

                <Route path="mint-tickets" element={<TicketCanvas account={account} network={network} contract={contract}
                                                                    uri="https://ipfs.io/ipfs/QmYEowFCRGFsuzhhwMdijZ1sqUfZd28gcJ7bx3Vydgso9x"/>} />
                <Route path="/events" element={<Events account={account} network={network} contract={contract}/>}/>
                <Route path="my-tickets" element={<MyTickets account={account} network={network} contract={contract}/>} />
                {/*<Route path="my-funds" element={<MyFunds account={account} network={network} contract={contract}/>} />*/}

                <Route path="/buy-ticket/:ticketId" element={<BuyTickets account={account} network={network} contract={contract}/>} />
                <Route path="/marketplace" element={<MarketPlace account={account} contract={contract}/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

// https://ipfs.infura.io:5001/QmZw2UvYKRUt2cwHMuF5bW5Ku1PUqKHduF2sMAJ7ns6C4u

    //
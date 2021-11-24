import React, {useEffect, useState} from 'react';
import './App.css';
import NFTicketsNavbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyTickets from "./components/MyTickets";
import Home from "./components/Home";
import TicketCanvas from "./components/TicketCanvas";


function App() {

    const [web3, setWeb3] = useState<any>(null)
    const [network, setNetwork] = useState<any>(null)
    const [account, setAccount] = useState<any>(null)
    const [contract, setContract] = useState<any>(null);

    const web3States = [web3, account, network];
    const maskUpdateFunctions = [setWeb3, setAccount, setNetwork, setContract];

  return (
    <div className="container-fluid">
        <BrowserRouter>
            <NFTicketsNavbar maskUpdateFunctions={maskUpdateFunctions} web3States={web3States}/>
            {network && <div><p>Connected to {network}</p><p>Your address is: {account}</p></div>}
            {contract && <p>Connected to contract</p>}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="create-tickets" element={<TicketCanvas account={account} network={network} contract={contract}
                                                                    uri="https://ipfs.io/ipfs/QmYEowFCRGFsuzhhwMdijZ1sqUfZd28gcJ7bx3Vydgso9x"/>} />
                <Route path="my-tickets" element={<MyTickets account={account} network={network} contract={contract}/>} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;

// https://ipfs.infura.io:5001/QmZw2UvYKRUt2cwHMuF5bW5Ku1PUqKHduF2sMAJ7ns6C4u

    //
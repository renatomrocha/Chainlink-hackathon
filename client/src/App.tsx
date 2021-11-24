import React, {useEffect, useState} from 'react';
import './App.css';
import NFTicketsNavbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyTickets from "./components/MyTickets";
import Home from "./components/Home";
import NFTContract, {initContract} from "./modules/web3_utils";
import TicketCanvas from "./components/TicketCanvas";


function App() {

    const [web3, setWeb3] = useState<any>(null)
    const [network, setNetwork] = useState<any>(null)
    const [account, setAccount] = useState<any>(null)
    const [contract, setContract] = useState<any>(null);

    const web3States = [web3, account, network];
    const maskUpdateFunctions = [setWeb3, setAccount, setNetwork];

  return (
    <div className="container-fluid">
        <BrowserRouter>
            <NFTicketsNavbar maskUpdateFunctions={maskUpdateFunctions} web3States={web3States}/>
            {network && <div><p>Connected to {network}</p><p>Your address is: {account}</p></div>}
            {contract && <p>Connected to contract</p>}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="create-tickets" element={<TicketCanvas account={account} network={network} contract={contract}
                                                                    uri="http://bafybeigblofriz5b4zg4xil45t36snirvpzvja63r2yxybwm5ncuphane4.ipfs.localhost:8080/"/>} />
                <Route path="my-tickets" element={<MyTickets account={account} network={network} contract={contract}/>} />
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;

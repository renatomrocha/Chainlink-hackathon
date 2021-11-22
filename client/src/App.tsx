import React, {useEffect, useState} from 'react';
import './App.css';
import NFTContract, {loadBlockchainData, connectWallet, initContract} from './modules/web3_utils'
import NFTicketsNavbar from "./components/Navbar";
import TicketGenerator from "./components/TicketGenerator";
import {Button, Col, Row} from "react-bootstrap";



function App() {

    const [web3, setWeb3] = useState<any>(null)
    const [network, setNetwork] = useState<any>(null)
    const [account, setAccount] = useState<any>(null)
    const [contract, setContract] = useState<any>(null);

    const [loadingBlockchainData, setLoadingBlockchainData] = useState<boolean>(false);



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
        console.log("Loading data from blockchain...");
        setLoadingBlockchainData(true);
        loadBlockchainData()
            .then((data)=> {
                updateConnectionCallback(data);
                setLoadingBlockchainData(false);
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
    <div className="container-fluid">
        <NFTicketsNavbar/>
        <Row>
            <Col>
                <h4>Connection state : {web3!=null?<span>Connected</span>:<span>Not Connected</span>}</h4>
                {network!=null &&
                    <div>
                    <p>Current network: {network}</p>
                    <p>Connected account: {account}</p>
                    </div>
                        }
                {network == null &&
                <p>No connection found</p>}

            </Col>
            <Col>
                <Button onClick={connectToMetamask}>Connect your wallet</Button>
            </Col>
        </Row>
        {loadingBlockchainData && <h2>Loading blockchain data... </h2>}
        {!loadingBlockchainData && <TicketGenerator props={{account: account, contract: contract}}/>}
    </div>
  );
}

export default App;

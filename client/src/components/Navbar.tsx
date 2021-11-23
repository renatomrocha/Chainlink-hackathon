import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";

import NFTContract, {loadBlockchainData, connectWallet, initContract} from '../modules/web3_utils';


export default function NFTicketsNavbar(props: any) {

    const [web3, setWeb3] = useState<any>(null)
    const [network, setNetwork] = useState<any>(null)
    const [account, setAccount] = useState<any>(null)

    const [loadingBlockchainData, setLoadingBlockchainData] = useState<boolean>(false);

    // useEffect(()=> {
    //     console.log("Loading data from blockchain...");
    //     setLoadingBlockchainData(true);
    //     loadBlockchainData()
    //         .then((data: any)=> {
    //             updateConnectionCallback(data);
    //             setLoadingBlockchainData(false);
    //         })
    // }, [])


    function passDataToParent(){
        const buildOutputData = {"web3":web3, "account":account, "network" : network};
        props.onStateChange(buildOutputData) // the name of props we pass from top component
    }

    async function connectLocalBlockchain(){
        console.log("Loading data from blockchain...");
        setLoadingBlockchainData(true);
        const data = await loadBlockchainData();
        updateConnectionCallback(data);
        setLoadingBlockchainData(false);
    }

    const updateConnectionCallback = (data: {"web3": any, "network": string, "accounts": string[]}) => {
        console.log("Will upload with data: ", data);
        setWeb3(data.web3)
        setNetwork(data["network"])
        setAccount(data["accounts"][0])
        passDataToParent()
        console.log("Web3 is: ", web3);
        console.log("Network is: ", network);
        console.log("Account is: ", account);
    }


    const connectToMetamask = ()=> {
        connectWallet()
            .then((data)=> {
                updateConnectionCallback(data);
                console.log("Connecting to metamask!");
            })
    }


    return (<Navbar bg="light" expand="lg">
    <Container>
        <Navbar.Brand>NFTickets</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
        <Link to="/" className="mx-3 mt-6" style={{color:"grey"}}>Home</Link>

        <Link to="my-tickets" className="mx-3 mt-6" style={{color:"grey"}}>My Tickets</Link>
        <Link to="create-tickets" className="mx-3 mt-6" style={{color:"grey"}}>Create tickets</Link>
    {/*    <NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
    {/*<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
    {/*    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
    {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
    {/*<NavDropdown.Divider />*/}
    {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
    {/*</NavDropdown>*/}


    <span>Connection state : {web3!=null?<span>Connected</span>:<span>Not Connected</span>}</span>
    {/*{network!=null &&*/}
    {/*<div>*/}
    {/*    <p>Current network: {network}</p>*/}
    {/*    <p>Connected account: {account}</p>*/}
    {/*</div>*/}
    {/*}*/}
    {/*{network == null &&*/}
    {/*<p>No connection found</p>}*/}


        <Button onClick={connectToMetamask}>Connect your wallet</Button>
        <Button onClick={connectLocalBlockchain}>Connect local</Button>

    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>)
}

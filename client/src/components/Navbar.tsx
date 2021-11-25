import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";

import NFTContract, {loadBlockchainData, connectWallet, initContract} from '../modules/web3_utils';


export default function NFTicketsNavbar(props: any) {


    const [loadingBlockchainData, setLoadingBlockchainData] = useState<boolean>(false);


    const connectToMetamask = async()=> {
        await connectWallet(props.maskUpdateFunctions[0],props.maskUpdateFunctions[1],props.maskUpdateFunctions[2], props.maskUpdateFunctions[3]);

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



    <span>Connection state : {props.web3States[0]!=null?<span>Connected</span>:<span>Not Connected</span>}</span>


        <Button onClick={connectToMetamask}>Connect your wallet</Button>

    </Nav>
    </Navbar.Collapse>
    </Container>
    </Navbar>)
}

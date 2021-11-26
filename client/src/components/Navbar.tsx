import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";

import NFTContract, {loadBlockchainData, connectWallet, initContract} from '../modules/web3_utils';


export default function NFTicketsNavbar(props: any) {


    const [loadingBlockchainData, setLoadingBlockchainData] = useState<boolean>(false);


    const connectToMetamask = async()=> {
        await connectWallet(props.maskUpdateFunctions[0],props.maskUpdateFunctions[1],props.maskUpdateFunctions[2], props.maskUpdateFunctions[3]);

    }

    return (
        <Navbar bg="light">
            <Container>
                <Navbar.Brand className="justify-content-start" href="#home">NFTickets</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                                 <Nav className="me-auto">
                                 <Link to="/" className="mx-3 mt-6" style={{color:"grey"}}>Home</Link>
                                 <Link to="events" className="mx-3 mt-6" style={{color:"grey"}}>Events</Link>
                                <Link to="my-tickets" className="mx-3 mt-6" style={{color:"grey"}}>My Tickets</Link>
                            <Link to="mint-tickets" className="mx-3 mt-6" style={{color:"grey"}}>Mint NFTickets</Link>

                              </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <div className="mr-2">
                        <span >Connection state : {props.web3States[0]!=null?<span>Connected</span>:<span>Not Connected</span>}</span>
                    </div>
                    <Button onClick={connectToMetamask}>Connect your wallet</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>

)
}



// <Navbar  bg="light" expand="lg">
//
//     <Row>
//         <Col xs={12} md={8}>
//             <Navbar.Brand>NFTickets</Navbar.Brand>
//
//
//             {/*<Navbar.Toggle aria-controls="basic-navbar-nav" />*/}
//             {/*<Navbar.Collapse id="basic-navbar-nav">*/}
//             {/*<Nav className="me-auto">*/}
//             <Link to="/" className="mx-3 mt-6" style={{color:"grey"}}>Home</Link>
//             <Link to="events" className="mx-3 mt-6" style={{color:"grey"}}>Events</Link>
//             <Link to="my-tickets" className="mx-3 mt-6" style={{color:"grey"}}>My Tickets</Link>
//             <Link to="mint-tickets" className="mx-3 mt-6" style={{color:"grey"}}>Mint NFTickets</Link>
//
//             {/*</Nav>*/}
//         </Col>
//
//
//         <Navbar.Collapse className="justify-content-end">
//             <Button onClick={connectToMetamask}>Connect your wallet</Button>
//             <div>
//                 <span>Connection state : {props.web3States[0]!=null?<span>Connected</span>:<span>Not Connected</span>}</span>
//             </div>
//         </Navbar.Collapse>
//
//         {/*</Navbar.Collapse>*/}
//
//     </Row>
//
// </Navbar>
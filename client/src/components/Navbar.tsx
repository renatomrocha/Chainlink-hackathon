import {Button, Col, Container, Nav, Navbar, NavDropdown, Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import React, {useEffect, useState} from "react";

import NFTContract, {loadBlockchainData, connectWallet, initContract} from '../modules/web3_utils';
import {ColorPalette} from "../styles/color_palette";


export default function NFTicketsNavbar(props: any) {


    const [loadingBlockchainData, setLoadingBlockchainData] = useState<boolean>(false);


    const connectToMetamask = async()=> {
        await connectWallet(props.maskUpdateFunctions[0],props.maskUpdateFunctions[1],props.maskUpdateFunctions[2]);

    }

    return (
        <Navbar  bg="dark">
            <Container>
                <Navbar.Brand className="justify-content-start" style={{color:"white"}} href="#home">NFTickets</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                             <Nav className="me-auto">
                                <Link  to="/" className="mx-3 mt-6" style={{color:"white"}}>Home</Link>
                                 {props.web3States[1]!=null && <Link to="events" className="mx-3 mt-6" style={{color: "white"}}>Events</Link>}
                                 {props.web3States[1]!=null && <Link to="my-tickets" className="mx-3 mt-6" style={{color:"white"}}>My Tickets</Link>}
                                 {props.web3States[1]!=null && <Link to="mint-tickets" className="mx-3 mt-6" style={{color:"white"}}>Mint NFTickets</Link>}
                                 {props.web3States[1]!=null && <Link to="my-funds" className="mx-3 mt-6" style={{color:"white"}}>My Funds</Link>}


                              </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <div style={{marginRight:"50px", color: "white"}}>
                        <div>
                            <span >{props.web3States[0]!=null?<span >Connected</span>:<span>Not Connected</span>}</span>
                        </div>
                        <div>
                            {props.web3States[1] && <span>Account: {props.web3States[1]}</span>}
                        </div>
                    </div>
                    <Button disabled={props.web3States[1]} style={{backgroundColor: ColorPalette.secondaryColor, borderColor: ColorPalette.secondaryColor}} onClick={connectToMetamask}>Connect your wallet</Button>
                    

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
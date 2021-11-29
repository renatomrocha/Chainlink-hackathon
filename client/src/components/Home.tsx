import React, {useEffect, useState} from "react";
import {ColorPalette} from "../styles/color_palette";
import {Col, Row} from "react-bootstrap";
import MyFunds from "./MyFunds";


function Home(props: any) {


    return (
            <div  className="container-fluid">
                <Row>
                    <Col >
                <h1>Welcome to NFTickets</h1>
                        <div >
                <h3>A platform for NFT based ticket emission and marketplace</h3>
                        <div  style={{marginTop:"5%"}}>
                            <span style={{fontSize:"1.3em"}}>Start emitting your event tickets today!</span>
                            <ul style={{fontSize:"1.3em"}}>

                    <li>Connect to Mumbai Testnet</li>
                    <li>Mint your own tickets</li>
                    <li>Buy Tickets for your favorite events!</li>
                </ul>
                        </div>
                        </div>
                    </Col>
                    <Col>
                        {props.contract &&
                        <MyFunds account={props.account} network={props.network} contract={props.contract}/>
                        }
                    </Col>
                </Row>
            </div>
    );
}

export default Home;

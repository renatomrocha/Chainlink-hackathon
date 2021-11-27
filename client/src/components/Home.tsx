import React, {useEffect, useState} from "react";
import {ColorPalette} from "../styles/color_palette";
import {Col, Row} from "react-bootstrap";
import MyFunds from "./MyFunds";


function Home(props: any) {


    return (
            <div  className="container-fluid">
                <Row>
                    <Col>
                <h1>Welcome to NFTickets</h1>
                <h3>A platform for NFT based ticket emission and marketplace</h3>
                        <div style={{marginTop:"5%"}}>
                            <span>Start emitting your event tickets today!</span>
                            <ul>

                    <li>Connect to Mumbai Testnet</li>
                    <li>Mint your own tickets</li>
                    <li>Buy Tickets for your favorite events!</li>
                </ul>
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

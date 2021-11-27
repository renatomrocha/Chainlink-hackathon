import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {BASE_EXPIRED_IMAGE_URL, BASE_IMAGE_URL, IPFS_BASE_URL} from "../modules/ipfs_utils";
import {balanceOf, getInterval} from "../modules/nfticket_utils";
import { useNavigate } from 'react-router-dom';

export default function EventDisplay(props: any) {

    const [availableForSale, setAvailableForSale] = useState<any>(0);

    const navigate = useNavigate();

    const getAvailableForSale = async () => {
        const _availableForSable = await balanceOf(props.contract, props.ticket.owner, props.ticket.ticketId);
        setAvailableForSale(_availableForSable)
    }

    useEffect(()=> {
        const _availableForSable = getAvailableForSale().then(()=>{})
        console.log("Balance is: ", availableForSale);
    },[])

    const routeChange=()=> {
        let path = `../buy-ticket/${props.ticket.ticketId}`;
        navigate(path);
    }

    // getBalance().then((b)=>console.log("Received balance: ", b));

    return (<div className="mt-2" style={{border: '2px solid rgba(0, 0, 0, 0.5)',
        borderRadius:'10px'}}>
        <div style={{padding:"10px"}}>
            <Row>
                <Col>
                    <h2>{props.ticket.metadata.eventName}</h2>
                    <p>Available tickets for sale: {availableForSale}</p>
                    <p>Price: {props.ticket.tokenSalePrice} $</p>
                    <p>Event date: {props.ticket.expirationDateTimestamp}</p>
                    <p>Maximum supply: {props.ticket.maxSupply}</p>
                    <p><span>State: </span>{props.ticket.expired?<span>Expired</span>:<span>Valid</span>}</p>
                    {props.ticket.expired?<h3>Not for sale</h3>:null}
                    {!props.ticket.expired && props.ticket.owner.toUpperCase()!=props.account.toUpperCase()?<Button onClick={routeChange}>Buy Tickets</Button>:null}
                </Col>
                <Col>
                    <img  src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="300" height="300"/>

                    {/*<img  style={{marginLeft:"-370px", marginTop:"-170px",zIndex:-1}} src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="80" height="80"/>*/}
                </Col>

            </Row>
        </div>
    </div>)

}
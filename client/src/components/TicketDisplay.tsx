import React, {useEffect, useState} from "react";
import {Col, Row} from "react-bootstrap";
import {BASE_EXPIRED_IMAGE_URL, BASE_IMAGE_URL, IPFS_BASE_URL} from "../modules/ipfs_utils";
import {balanceOf} from "../modules/nfticket_utils";
import {ColorPalette} from "../styles/color_palette";



export default function TicketDisplay(props: any) {

    const [balance, setBalance] = useState<any>(0);
    const [formatedDate, setFormatedDate] = useState<any>(null);

    useEffect(()=> {
        getExipirationDateFromTimestamp(props.ticket.expirationDateTimestamp);

    },[])

    const getExipirationDateFromTimestamp = (timestamp: number) => {
        let yourDate = new Date(timestamp);
        console.log("Formatted date is: ", );
        setFormatedDate(yourDate.toString());
    }

    const getBalance = async () => {
        const _balance = await balanceOf(props.contract, props.account, props.ticket.ticketId);
        setBalance(_balance)

    }

    const getBalance = async () => {
        const _balance = await balanceOf(props.contract, props.account, props.ticket.ticketId);
        setBalance(_balance)
    }









    useEffect(()=> {
        const _balance = getBalance().then(()=>{})
        console.log("Balance is: ", balance);
        console.log("Ticket owner: ", props.ticket.owner);
        console.log("Account: ", props.account);
        console.log("Own? ", props.account == props.ticket.owner);
    },[])

    // getBalance().then((b)=>console.log("Received balance: ", b));

    return (<div className="mt-2" style={{border: '2px solid rgba(0, 0, 0, 0.5)',
                    borderRadius:'10px', backgroundColor: ColorPalette.mainColor}}>
        <div style={{padding:"10px"}}>
            <Row>
                <Col>
                    <h2>{props.ticket.metadata.eventName}</h2>
                    {props.ticket.expired?<img  src={BASE_EXPIRED_IMAGE_URL} width="400" height="300"/>:<img  src={BASE_IMAGE_URL} width="400" height="300"/>}
                    <img  style={{marginLeft:"-370px", marginTop:"-170px",zIndex:-1}} src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="80" height="80"/>
                </Col>
                <Col>

                    <p>Ticket Id: {props.ticket.ticketId}</p>
                    <p>Maximum supply: {props.ticket.maxSupply}</p>
                    <p>Price: {props.ticket.tokenSalePrice} $</p>
                    <p>Expiration date: {formatedDate}</p>
                    <p>Balance: {balance}</p>
                    <p><span>State: </span>{props.ticket.expired?<span>Expired</span>:<span>Valid</span>}</p>
                    {props.ticket.owner.toUpperCase()==props.account.toUpperCase()?<p>Minted by me!</p>:<p>Usable</p>}

                </Col>

            </Row>
        </div>
    </div>)

}
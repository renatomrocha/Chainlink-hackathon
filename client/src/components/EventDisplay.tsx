import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {BASE_EXPIRED_IMAGE_URL, BASE_IMAGE_URL, IPFS_BASE_URL} from "../modules/ipfs_utils";
import {balanceOf, getInterval} from "../modules/nfticket_utils";
import { useNavigate } from 'react-router-dom';
import {ColorPalette} from "../styles/color_palette";

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

    const infoStyle = {
        fontSize:"1.2em",

    }

    return (<div className="mt-2" style={{border: '2px solid rgba(0, 0, 0, 0.5)',
        borderRadius:'10px' ,backgroundColor: ColorPalette.mainColor}}>
        <div style={{padding:"10px"}}>
            <Row>
                <Col>
                    <div style={{marginLeft:"10%"}}>
                    <h2>{props.ticket.metadata.eventName}</h2>
                    <img  src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="200" height="200"/>
                    {props.ticket.expired?<h3>Not for sale</h3>:null}
                    </div>
                </Col>
                <Col>

                    <p style={infoStyle}>Tickets for sale: {availableForSale}</p>
                    <p style={infoStyle}>Price: {props.ticket.tokenSalePrice} $</p>
                    <p style={infoStyle}>Event date: {props.ticket.expirationDateTimestamp}</p>
                    <p style={infoStyle}>Maximum supply: {props.ticket.maxSupply}</p>
                    <p style={infoStyle}><span>State: </span>{props.ticket.expired?<span>Expired</span>:<span>Valid</span>}</p>
                    {!props.ticket.expired && props.ticket.owner.toUpperCase()!=props.account.toUpperCase()?<Button style={{backgroundColor: ColorPalette.secondaryColor, borderColor: ColorPalette.secondaryColor}} onClick={routeChange}>Buy Tickets</Button>:null}


                    {/*<img  style={{marginLeft:"-370px", marginTop:"-170px",zIndex:-1}} src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="80" height="80"/>*/}
                </Col>

            </Row>
        </div>
    </div>)

}
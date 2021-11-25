import React from "react";
import {Col, Row} from "react-bootstrap";
import {BASE_EXPIRED_IMAGE_URL, BASE_IMAGE_URL, IPFS_BASE_URL} from "../modules/ipfs_utils";


export default function TicketDisplay(props: any) {


    const getExipirationDateFromTimestamp = (timestamp: number) => {
        return new Date(timestamp*1000);
    }



    return (<div className="mt-2" style={{border: '2px solid rgba(0, 0, 0, 0.5)',
                    borderRadius:'10px'}}>
        <div style={{padding:"10px"}}>
            <Row>
                <Col>
                    <p>Event name: {props.ticket.metadata.eventName}</p>
                    <p>Maximum supply: {props.ticket.maxSupply}</p>
                    <p>Price: {props.ticket.tokenSalePrice} $</p>
                    <p>Expiration date: {props.ticket.expirationDateTimestamp}</p>
                    <p><span>State: </span>{props.ticket.expired?<span>Expired</span>:<span>Valid</span>}</p>

                </Col>
                <Col>
                    {props.ticket.expired?<img  src={BASE_EXPIRED_IMAGE_URL} width="400" height="300"/>:<img  src={BASE_IMAGE_URL} width="400" height="300"/>}
                    <img  style={{marginLeft:"-370px", marginTop:"-170px",zIndex:-1}} src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="80" height="80"/>
                </Col>

            </Row>
        </div>
    </div>)

}
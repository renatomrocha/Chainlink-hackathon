import React, {useEffect, useState} from "react";
import {getOwnedTickets, getTicket, buyTickets} from "../modules/nfticket_utils";
import {Button} from "react-bootstrap";
import {IPFS_NODE_URL} from "../modules/ipfs_utils";
import TicketDisplay from "./TicketDisplay";
import axios from "axios";
import {useParams} from "react-router-dom";
import {processSmartContractResponseTuple} from "../modules/web3_utils";

const BuyTickets = (props: any) => {

    const {ticketId} = useParams();
    const [ticketCounter, setTicketCounter] = useState<number>(0);
    console.log("Is is : ", ticketId);
    console.log("Props: ", props);

    const [ticket, setTicket] = useState<any>(null);

    useEffect(()=> {
        loadTicket()
            .then((data)=> {
                console.log("Got ticket: ", ticket);
            })
    },[])


    const processIpfsString = (str: string) => {
        const str1 = str.split("{")[1];
        const str2 = str1.split("}")[0]
        const finalStirng = "{" + str2 + "}";
        console.log("Final string is: ", str2);
        return finalStirng;
    }

    const _buyTickets = () => {
        buyTickets(props.contract,ticketId,ticketCounter, props.account,ticketCounter*ticket.tokenSalePrice)
            .then(()=>console.log("Tickets successfully transferes!!"))
    }


    const loadTicket = async() => {
        console.log("Loading Ticket...");

        let scTicket: any = await getTicket(props.contract,ticketId);
        const urlPieces = scTicket.metadataURI.split("/");
        const uriPt1 = urlPieces[urlPieces.length -1];
        const finalUrl = IPFS_NODE_URL + "/api/v0/object/get?arg=" + uriPt1 + '&data-encoding=text';
        const ticketRawMetadata = await axios.post(finalUrl);
        const ticketMetadata = JSON.parse(processIpfsString(ticketRawMetadata.data.Data));
        scTicket = Object.assign(scTicket, {metadata: ticketMetadata});
        setTicket(scTicket)
    }

    return (<div>
        <h2>Buy Tickets</h2>
        {ticket!= null && <div><TicketDisplay ticket={ticket} account={props.account} contract={props.contract}></TicketDisplay>
        <div>
            <h3>Order: {ticketCounter} ({ticket.metadata.eventName}) tickets</h3>
            <h3>Amount to pay: {ticketCounter*ticket.tokenSalePrice} $</h3>
        </div>
        <div>
        <Button onClick={()=>{ticketCounter==0?setTicketCounter(ticketCounter):setTicketCounter(ticketCounter-1)}}>-</Button>

            <Button onClick={()=>{setTicketCounter(ticketCounter+1)}}>+</Button>
        </div>
        <div className="d-inline-flex p-2 col-example" style={{width:"100%"}}>
        <Button onClick={_buyTickets}>Buy</Button>
        </div>
        </div> }
    </div>)
}


export default BuyTickets;
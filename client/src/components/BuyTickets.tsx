import React, {useEffect, useState} from "react";
import {getOwnedTickets, getTicket, buyTickets, getMaticPrice} from "../modules/nfticket_utils";
import {Button} from "react-bootstrap";
import {IPFS_NODE_URL} from "../modules/ipfs_utils";
import TicketDisplay from "./TicketDisplay";
import axios from "axios";
import {useParams} from "react-router-dom";
import {processSmartContractResponseTuple} from "../modules/web3_utils";
import {ColorPalette} from "../styles/color_palette";
import NFTicketSpinner from "./NFTicketSpinner";

const BuyTickets = (props: any) => {

    const {ticketId} = useParams();
    const [ticketCounter, setTicketCounter] = useState<number>(0);
    const [maticPrice, setMaticPrice] = useState<any>(null);
    const [buying, setBuying] = useState<boolean>(false);
    const [buyingError, setBuyingError] = useState<boolean>(false);
    const [buyingSuccess, setBuyingSuccess] = useState<boolean>(false);
    console.log("Is is : ", ticketId);
    console.log("Props: ", props);

    const [ticket, setTicket] = useState<any>(null);

    useEffect(()=> {
        getMaticPrice(props.contract)
            .then(r=> {
                const _maticRealPrice = r*10**-8;
                setMaticPrice(_maticRealPrice);
                console.log("Received matic price: ", maticPrice);
            })
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
        const valueToSend = ticketCounter*ticket.tokenSalePrice / maticPrice;
        const valueInWei = valueToSend*10**18;
        console.log("Value in wei is: ", valueInWei);
        setBuying(true);
        buyTickets(props.contract,ticketId,ticketCounter, props.account,Math.ceil(valueInWei))
            .then(()=>{
                setBuying(false);
                setBuyingSuccess(true);
                setTimeout(()=> {
                    setBuyingSuccess(false);
                },4000)
                console.log("Tickets successfully transfered!!")
            })
            .catch(()=>{
                setBuying(false);
                setBuyingError(true);
                setTimeout(()=> {
                    setBuyingError(false);
                },4000)
                console.log("Error buying tickets");
            })
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
            <h4>Value in MATIC: ~{Math.round((ticketCounter*ticket.tokenSalePrice/maticPrice)*100)/100} @ {maticPrice} USD/MATIC</h4>
        </div>
            {!buying && !(buyingError || buyingSuccess) &&<div style={{width:"50%"}}>
            <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor, width:"10%", marginRight:"20px"}} onClick={()=>{ticketCounter==0?setTicketCounter(ticketCounter):setTicketCounter(ticketCounter-1)}}>-</Button>
              <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor,  width:"20%",  marginRight:"20px"}} onClick={_buyTickets}>Buy</Button>
            <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor, width:"10%"}} onClick={()=>{setTicketCounter(ticketCounter+1)}}>+</Button>
        </div>}

            {buyingError && <span style={{color:ColorPalette.warning, fontSize:"1.3em"}}>Something went wrong while with the purchase transaction</span>}
            {buyingSuccess && <span style={{color:ColorPalette.success, fontSize:"1.3em"}}>NFTickets successfully purchased! </span>}

            {buying && <NFTicketSpinner message="Getting your NFTickets ready!"/>}
        </div> }
    </div>)
}


export default BuyTickets;
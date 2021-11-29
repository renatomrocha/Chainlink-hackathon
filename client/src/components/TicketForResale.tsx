import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {BASE_EXPIRED_IMAGE_URL, BASE_IMAGE_URL, IPFS_BASE_URL, IPFS_NODE_URL} from "../modules/ipfs_utils";
import {balanceOf, getMaticPrice, getResaleTickets, getTicket} from "../modules/nfticket_utils";
import {ColorPalette} from "../styles/color_palette";
import Modal from 'react-modal';
import axios from "axios";


const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export default function TicketForResale(props: any) {

    const [balance, setBalance] = useState<any>(0);
    const [formatedDate, setFormatedDate] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [buyAmountCounter,setBuyAmountCounter] = useState(0);
    const [resalePrice, setResalePrice] = useState(null);
    const [ticket, setTicket] = useState<any>(null);
    const [ticketBuilt, setTicketBuilt] = useState<any>(false);
    const [maticPrice, setMaticPrice] = useState<any>(null);

    useEffect(()=> {
        loadTicket()
            .then(()=> {
                var date = new Date(ticket.expirationDateTimestamp *1);
                var datePieces = date.toString().split(" ");
                var formattedDate = datePieces[0] + " " + datePieces[1] + " " + datePieces[2] + " " + datePieces[3]
                setFormatedDate(formattedDate);
            })

        getMaticPrice(props.contract)
            .then(r=> {
                const _maticRealPrice = r*10**-8;
                setMaticPrice(_maticRealPrice);
                console.log("Received matic price: ", maticPrice);
            })
    },[])


    function closeModal() {
        setModalIsOpen(false);
        console.log("Received info: ", resalePrice, " and amount: ", buyAmountCounter);
    }
    function openModal() {
        setModalIsOpen(true);
    }

    const processIpfsString = (str: string) => {
        const str1 = str.split("{")[1];
        const str2 = str1.split("}")[0]
        const finalStirng = "{" + str2 + "}";
        console.log("Final string is: ", str2);
        return finalStirng;
    }

    const loadTicket = async() => {
        console.log("Loading Ticket...");

        let scTicket: any = await getTicket(props.contract,props.resaleInfo.tokenId);
        const urlPieces = scTicket.metadataURI.split("/");
        const uriPt1 = urlPieces[urlPieces.length -1];
        const finalUrl = IPFS_NODE_URL + "/api/v0/object/get?arg=" + uriPt1 + '&data-encoding=text';
        const ticketRawMetadata = await axios.post(finalUrl);
        const ticketMetadata = JSON.parse(processIpfsString(ticketRawMetadata.data.Data));
        scTicket = Object.assign(scTicket, {metadata: ticketMetadata});
        console.log("Loaded ticket: ", scTicket);
        const fullTicket = Object.assign(scTicket, props.resaleInfo);
        setTicket(fullTicket);
        setTicketBuilt(true);
    }


    async function buyTicket() {
        const valueToSend = buyAmountCounter*ticket.resalePrice / maticPrice;
        console.log("Matic price: ", maticPrice);
        console.log("Value to send: ", valueToSend);
        const valueInWei = valueToSend*10**18;
        console.log("Value in wei is: ", Math.ceil(valueInWei))
        const success = await props.contract.methods["buyFromReseller(uint256,address,uint256)"](ticket.tokenId,ticket.seller,buyAmountCounter).send({from: props.account, value:Math.ceil(valueInWei)});

        if (success){
            window.alert("Transaction Successful!")
        } else {
            window.alert("Transaction Failed!")
        }

    }






    const infoStyle = {
        fontSize:"1.2em",

    }


    return (<div>
        {ticket &&
                <div className="mt-2" style={{border: '2px solid rgba(0, 0, 0, 0.5)', margin:"20px",
            borderRadius:'10px', backgroundColor: ColorPalette.mainColor, width:"80%"}}>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyles}
                contentLabel="Resell Tickets"
            ><div>
                <h4>Buy Tickets on resale</h4>
                <p>Amount: {buyAmountCounter}</p>
                <p>Amount to pay: {buyAmountCounter*ticket.resalePrice} $</p>
                <p>Value in MATIC: ~{Math.round((buyAmountCounter*ticket.resalePrice/maticPrice)*100)/100} @ {maticPrice} USD/MATIC</p>
                <div style={{width:"60%"}}>
                    <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor, marginRight:"20px"}} onClick={()=>{buyAmountCounter==0?setBuyAmountCounter(buyAmountCounter):setBuyAmountCounter(buyAmountCounter-1)}}>-</Button>
                    <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor}} onClick={()=>{buyAmountCounter==ticket.numTickets?setBuyAmountCounter(buyAmountCounter):setBuyAmountCounter(buyAmountCounter+1)}}>+</Button>
                </div>
                <Button disabled={buyAmountCounter==0} onClick={buyTicket} style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor}}>Buy Tickets</Button>
            </div>
            </Modal>
            <div style={{padding:"10px"}}>
                <Row>
                    <Col>
                        <h2>{ticket.metadata.eventName}</h2>
                        {ticket.expired?<img  src={BASE_EXPIRED_IMAGE_URL} width="400" height="300"/>:<img  src={BASE_IMAGE_URL} width="400" height="300"/>}
                        <img  style={{marginLeft:"-370px", marginTop:"-170px",zIndex:-1}} src={IPFS_BASE_URL + "/" + ticket.metadata.badge_uri} width="80" height="80"/>
                    </Col>
                    <Col>

                        <p style={infoStyle}>Ticket Id: {ticket.ticketId}</p>
                        <p style={infoStyle}>Seller: {ticket.seller}</p>
                        <p style={infoStyle}>Maximum supply: {ticket.maxSupply}</p>
                        <p style={infoStyle}>Resale price: {ticket.resalePrice} $</p>
                        <p style={infoStyle}>Expiration date: {formatedDate}</p>
                        <p style={infoStyle}>Reselling amount: {ticket.numTickets}</p>
                        <p><span>State: </span>{ticket.expired?<span>Expired</span>:<span>Valid</span>}</p>
                        {ticket.seller.toUpperCase()!=props.account.toUpperCase() && <Button onClick={openModal} style={{backgroundColor:ColorPalette.secondaryColor, borderColor: ColorPalette.secondaryColor}}>Buy Tickets on resale</Button>}
                    </Col>
                </Row>
            </div>
        </div>}</div>)
}
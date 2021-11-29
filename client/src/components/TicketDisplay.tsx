import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {BASE_EXPIRED_IMAGE_URL, BASE_IMAGE_URL, IPFS_BASE_URL} from "../modules/ipfs_utils";
import {balanceOf, getResaleTickets} from "../modules/nfticket_utils";
import {ColorPalette} from "../styles/color_palette";
import Modal from 'react-modal';


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

export default function TicketDisplay(props: any) {

    const [balance, setBalance] = useState<any>(0);
    const [formatedDate, setFormatedDate] = useState<any>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [resellAmountCounter,setResellAmountCounter] = useState(0);
    const [resalePrice, setResalePrice] = useState(null);


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

    useEffect(()=> {
        const _balance = getBalance().then(()=>{})
        console.log("Balance is: ", balance);
        console.log("Ticket owner: ", props.ticket.owner);
        console.log("Account: ", props.account);
        console.log("Own? ", props.account == props.ticket.owner);
    },[])

    async function resellTicket() {
        setModalIsOpen(false);
        const success = await props.contract.methods["putOnResale(uint256,uint256,uint256)"](...[props.ticket.ticketId,resellAmountCounter,resalePrice]).send({from: props.account});

        if (success){
            window.alert("Transaction Successful!")
        } else {
            window.alert("Transaction Failed!")
        }
    }

    function closeModal() {
        setModalIsOpen(false);
        console.log("Received info: ", resalePrice, " and amount: ", resellAmountCounter);
    }
    function openModal() {
        setModalIsOpen(true);
    }

    function changeResalePrice(event: any) {
        console.log("Event value is: ", event.target.value);
        setResalePrice(event.target.value);
    }



    const infoStyle = {
        fontSize:"1.2em",

    }

    // getBalance().then((b)=>console.log("Received balance: ", b));

    return (<div className="mt-2" style={{border: '2px solid rgba(0, 0, 0, 0.5)', margin:"20px",
                    borderRadius:'10px', backgroundColor: ColorPalette.mainColor, width:"80%"}}>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Resell Tickets"
        ><div>
            <h4>Resell Tickets</h4>
            <Form className="mt-3" >
                <Form.Group className="mb-3" controlId="formEventName">
                    <Form.Label>Resale price</Form.Label>
                    <Form.Control type="resale_price" placeholder="Resale price ($)" onChange={changeResalePrice}/>
                </Form.Group>
            </Form>
            <span>Amount: {resellAmountCounter}</span>
            <div>
                <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor, marginRight:"20px"}} onClick={()=>{resellAmountCounter==0?setResellAmountCounter(resellAmountCounter):setResellAmountCounter(resellAmountCounter-1)}}>-</Button>
                <Button style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor}} onClick={()=>{resellAmountCounter==balance?setResellAmountCounter(resellAmountCounter):setResellAmountCounter(resellAmountCounter+1)}}>+</Button>
            </div>
            <Button disabled={resalePrice==null || resellAmountCounter==0} onClick={resellTicket} style={{backgroundColor:ColorPalette.secondaryColor, borderColor:ColorPalette.secondaryColor}}>Set tickets for resale</Button>
        </div>
        </Modal>
        {props.ticket != null &&
        <div style={{padding:"10px"}}>
            <Row>
                <Col>
                    <h2>{props.ticket.metadata.eventName}</h2>
                    {props.ticket.expired?<img  src={BASE_EXPIRED_IMAGE_URL} width="400" height="300"/>:<img  src={BASE_IMAGE_URL} width="400" height="300"/>}
                    <img  style={{marginLeft:"-370px", marginTop:"-170px",zIndex:-1}} src={IPFS_BASE_URL + "/" + props.ticket.metadata.badge_uri} width="80" height="80"/>
                </Col>
                <Col>

                    <p style={infoStyle}>Ticket Id: {props.ticket.ticketId}</p>
                    <p style={infoStyle}>Maximum supply: {props.ticket.maxSupply}</p>
                    <p style={infoStyle}>Price: {props.ticket.tokenSalePrice} $</p>
                    <p style={infoStyle}>Expiration date: {props.ticket.expirationDateTimestamp}</p>
                    <p style={infoStyle}>Balance: {balance}</p>
                    <p><span>State: </span>{props.ticket.expired?<span>Expired</span>:<span>Valid</span>}</p>
                    {props.ticket.owner.toUpperCase()==props.account.toUpperCase()?<p>Minted by me!</p>:<p>Usable</p>}
                    {(props.allowResell && props.ticket.owner.toUpperCase()!=props.account.toUpperCase()) && <Button onClick={openModal} style={{backgroundColor:ColorPalette.secondaryColor, borderColor: ColorPalette.secondaryColor}}>Resell Tickets</Button>}
                </Col>
            </Row>
        </div>}
    </div>)

}
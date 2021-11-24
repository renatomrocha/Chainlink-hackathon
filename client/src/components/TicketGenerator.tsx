import TicketCanvas from "./TicketCanvas";
import {
    getkeeperVerificationCounter,
    getUpdatesCounter,
    getInterval,
    mintNFTicket,
    subscribeTicketsUpdated, getOwnedTickets
} from "../modules/nfticket_utils";
import React from "react";
import {Button} from "react-bootstrap";


const TicketGenerator = (props: any) => {

    console.log("Ticket Generator received props: ", props);
    if (props.contract != null) {
        console.log("SUBSCRIBING TO UPDATE EVENT!!!")
        props.contract.events.TicketsUpdated((data: any)=> {
            console.log("Tickets updated");
            console.log("Data is: ", data);
        });
    }

    return (<div>
                <div>
                    <TicketCanvas props={{uri:"http://bafybeigblofriz5b4zg4xil45t36snirvpzvja63r2yxybwm5ncuphane4.ipfs.localhost:8080/"}}></TicketCanvas>
                </div>
                <div>
                    <Button onClick={()=> getInterval(props.contract)}>Interval</Button>
                    <Button onClick={()=> getUpdatesCounter(props.contract)}>Updates counter</Button>
                    <Button onClick={()=> getkeeperVerificationCounter(props.contract)}>Keeper verifications</Button>
                    <Button onClick={()=> getOwnedTickets(props.contract, props.account)}>Owned Ids</Button>
                </div>
            </div>
    )
}

export default TicketGenerator;
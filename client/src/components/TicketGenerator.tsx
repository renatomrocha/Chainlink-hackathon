import TicketCanvas from "./TicketCanvas";
import {getInterval, getTicketsOwned, mintNFTIcket} from "../modules/nfticket_utils";
import React from "react";
import {Button} from "react-bootstrap";


const TicketGenerator = (props: any) => {

    console.log("Ticket Generator received props: ", props);

    return (<div>
        <div>
            <TicketCanvas props={{uri:"http://bafybeigblofriz5b4zg4xil45t36snirvpzvja63r2yxybwm5ncuphane4.ipfs.localhost:8080/"}}></TicketCanvas>
        </div>
        <div>
        <Button onClick={()=> mintNFTIcket(props.contract, props.account)}>Mint tickets</Button>
        <Button onClick={()=> getInterval(props.contract, props.account)}>Interval</Button>
        <Button onClick={()=> getTicketsOwned(props.contract, props.account)}>Tickets owned</Button>
            </div>
        </div>
    )


}

export default TicketGenerator;
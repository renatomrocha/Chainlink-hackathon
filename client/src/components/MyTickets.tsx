import React, {useEffect, useState} from "react";
import {getOwnedTickets} from "../modules/nfticket_utils";
import {Button} from "react-bootstrap";
import {IPFS_NODE_URL} from "../modules/ipfs_utils";
import TicketDisplay from "./TicketDisplay";
import axios from "axios";
import NFTicketSpinner from "./NFTicketSpinner";

const MyTickets = (props: any) => {

        const [myTickets, setMyTickets] = useState<any>([]);
        const [loading, setLoading] = useState<boolean>(false);



    useEffect(()=> {
        setLoading(true);
            loadTickets()
                .then((data)=> {
                    setLoading(false);
                    console.log("Got tickets: ", data);
                })
        },[])


    const processIpfsString = (str: string) => {
            const str1 = str.split("{")[1];
            const str2 = str1.split("}")[0]
            const finalStirng = "{" + str2 + "}";
            console.log("Final string is: ", str2);
            return finalStirng;
    }


    const loadTickets = async() => {
        console.log("Loading Tickets...");

        let scTickets: any[] = await getOwnedTickets(props.contract, props.account);
        let processedScTickets : any[] = [];
        for(let a = 0; a<scTickets.length; a++) {
            let key : any;
            let ticketObj: any = new Object();
            for (key in scTickets[a]) {
            ticketObj[key.toString()] = scTickets[a][key];
            }
            processedScTickets.push(ticketObj);
        }

        for(let i = 0; i< processedScTickets.length; i++) {
            // const ticket = Object.fromEntries(scTickets[i])
            const ticket:any = processedScTickets[i];
            const urlPieces = ticket.metadataURI.split("/");
            const uriPt1 = urlPieces[urlPieces.length -1];
            const finalUrl = IPFS_NODE_URL + "/api/v0/object/get?arg=" + uriPt1 + '&data-encoding=text';
            const ticketRawMetadata = await axios.post(finalUrl);
            const ticketMetadata = JSON.parse(processIpfsString(ticketRawMetadata.data.Data));
            processedScTickets[i] = Object.assign(processedScTickets[i], {metadata: ticketMetadata});
        }
        setMyTickets(processedScTickets)

    }

    return (<div>
        <h2 style={{marginBottom:"50px"}}>My Tickets</h2>
        {/*<Button onClick={loadTickets}>Load Tickets</Button>*/}
        {loading && <NFTicketSpinner message="Loading ticket collection..." spinnerSize="100"></NFTicketSpinner>}

        {myTickets != null && myTickets.map((ticket:any, idx: number) => {
            console.log("Ticket is: ", ticket);
                return <TicketDisplay  key={idx} ticket={ticket} account={props.account} contract={props.contract}/>
            })}
    </div>)
}


export default MyTickets;
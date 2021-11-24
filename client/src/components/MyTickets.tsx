import React, {useEffect, useState} from "react";
import {getOwnedTickets} from "../modules/nfticket_utils";
import {Button} from "react-bootstrap";
import {IPFS_NODE_URL} from "../modules/ipfs_utils";


const MyTickets = (props: any) => {

        const [myTickets, setMyTickets] = useState<any>([]);

        useEffect(()=> {
            getOwnedTickets(props.contract, props.account)
                .then((data)=> {
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
        const myTickets = await getOwnedTickets(props.contract, props.account);
        setMyTickets(myTickets);
        console.log("My tickets after get owned: ", myTickets);
        myTickets.map((async (ticket:any) => {
            const urlPieces = ticket.metadataURI.split("/");
            console.log("urlPieces: ", urlPieces)
            const uriPt1 = urlPieces[urlPieces.length -1];
            const finalUrl = IPFS_NODE_URL + "/api/v0/object/get?arg=" + uriPt1 + '&data-encoding=text';
            console.log("Loading fron url: ", finalUrl);
            const ticketsArray = [];
            const promise = await fetch(finalUrl, {method: 'POST'});
            const response = await promise;


            console.log("Response is: ", promise);
                // .then(r=> r.json())
                // .then(resp => {
                //     const a = JSON.parse(processIpfsString(resp.Data));
                //     ticketsArray.push()
                //     ticketsArray.push({...ticket, metadata:a});
                // });
        }))
    }


    return (<div>
        <h2>My Tickets</h2>
        <Button onClick={loadTickets}>Load Tickets</Button>
        {myTickets != null && myTickets.map((ticket:any) => {
            console.log("Ticket is: ", ticket);
                return <div key={ticket}>
                    <p>Event name: {ticket.eventName}</p>
                    <p>Maximum supply: {ticket.maxSupply}</p>
                    <p>Price: {ticket.tokenSalePrice} $</p>

                </div>
            })}

    </div>)
}


export default MyTickets;
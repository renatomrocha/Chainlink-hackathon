import React, {useEffect, useState} from "react";
import {getOwnedTickets, getResaleTickets, getTicket} from "../modules/nfticket_utils";
import TicketDisplay from "./TicketDisplay";
import {IPFS_NODE_URL} from "../modules/ipfs_utils";
import axios from "axios";
import TicketForResale from "./TicketForResale";


function MarketPlace(props: any) {

    const [resaleList, setResaleList] = useState<any[]>([]);
    const [buyTicketsNum, setBuyTicketsNum] = useState<any>(0);
    const [inputs, setInputs] = useState<any>(["", "", ""]);
    const [resaleTickets, setResaleTickets] = useState<any>(null);

    const inputNames = ["Token Id", "Number Of Tickets", "Re-Sale Price"]

    useEffect(() => {
        getResaleTickets(props.web3, props.contract).then((data) => {
            console.log(data)
            setResaleList(data.filter(v => {
                console.log(v.numTickets);
                return v.numTickets != 0;
            }));
            const ticketIds = []
            for (let ticket of resaleList) {
                console.log("Looping on ticket: ", ticket);
                ticketIds.push(ticket.tokenId);
            }
        })
    },[])

    function handleInputChange(i:any, v:any) {
      setInputs(Object.assign([...inputs], { [i]: v }));
    }

    async function resellTicket() {
      const success = await props.contract.methods["putOnResale(uint256,uint256,uint256)"](...inputs).send({from: props.account});

    if (success){
        window.alert("Transaction Successful!")
    } else {
      window.alert("Transaction Failed!")
    }
    
    setInputs(["", "", ""]);

    getResaleTickets(props.web3, props.contract).then((data) => {
      // console.log(data)
      setResaleList(data.filter(v => {
          // console.log(v.numTickets);
          return v.numTickets != 0;
      }));
    })

    }


    function buyInputChange(e:any) {
        setBuyTicketsNum(e.target.value);
    }



    return (
      <div>
          <h2>MarketPlace</h2>
        <div  style={{"width": "100%", "alignItems": "center"}}>
            {resaleList && resaleList.map((resaleInfo:any,i:any) => {
                return (<div>
                        <TicketForResale key={i} resaleInfo={resaleInfo} account={props.account} contract={props.contract}></TicketForResale>

                    </div>
                    )
        })}
        </div>
      </div>
        
        
    )
}



// <div key={i}>
//     <div className="card">
//         <div className="card-body">
//             <h5 className="card-title fs-5">{"Ticket ID: " + v.tokenId}</h5>
//             <p className="card-text fs-6">{"Seller: " + v.seller}</p>
//             <p className="card-text fs-6">{"Ticket(s) For Sale: " + v.numTickets}</p>
//             <p className="card-text fs-6">{"Re-sale Price: " + v.resalePrice}</p>
//             <div className="input-group mb-3">
//                 <span className="input-group-text" id="basic-addon3">{"Number of Tickets to Buy: "}</span>
//                 <input type="text" className="form-control" id="basic-url" value={buyTicketsNum} onChange={buyInputChange}/>
//             </div>
//             <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={() =>
//                     buyTicket(i,buyTicketsNum)
//                 }
//             >
//                 Buy Ticket(s)
//             </button>
//         </div>
//     </div>
// </div>

export default MarketPlace;
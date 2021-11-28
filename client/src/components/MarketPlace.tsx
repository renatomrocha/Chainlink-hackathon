import React, {useEffect, useState} from "react";
import {getResaleTickets} from "../modules/nfticket_utils";


function MarketPlace(props: any) {

    const [resaleList, setResaleList] = useState<any>([]);
    const [buyTicketsNum, setBuyTicketsNum] = useState<any>(0);
    const [inputs, setInputs] = useState<any>(["", "", ""]);

    const inputNames = ["Token Id", "Number Of Tickets", "Re-Sale Price"]

    useEffect(() => {
        getResaleTickets(props.contract).then((data) => {
            console.log(data)
            setResaleList(data.filter(v => {
                console.log(v.numTickets);
                return v.numTickets != 0;
            }));
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

    getResaleTickets(props.contract).then((data) => {
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

    async function buyTicket(id:any, num:any) {
        const ticket = resaleList[id];

        const t = await props.contract.methods["nfTickets(uint256)"](ticket.tokenId).call();
        const value = num * ticket.resalePrice * (1 + t.percentageOnResale/100);

        console.log(value);
        
        const success = await props.contract.methods["buyFromReseller(uint256,address,uint256)"](ticket.tokenId,ticket.seller,buyTicketsNum).send({from: props.account, value:value});

        if (success){
            window.alert("Transaction Successful!")
        } else {
          window.alert("Transaction Failed!")
        }

        setBuyTicketsNum(0)

        getResaleTickets(props.contract).then((data) => {
            // console.log(data)
            setResaleList(data.filter(v => {
                console.log(v.numTickets);
                return v.numTickets != 0;
            }));
        })
    }
    
    return (
      <div>
        <div  style={{"width": "50%", "alignItems": "center"}} >
          {inputs.map((v:any,i:any) => {
          return (<div className="input-group mb-3" key={i}>
                <span className="input-group-text" id="basic-addon3">{inputNames[i]}</span>
                <input type="text" className="form-control" id="basic-url" value={v} onChange={(e) => handleInputChange(i, e.target.value)}/>
          </div>)})}
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            resellTicket()
          }
          >
            Re-Sell Ticket(s)
        </button>
        </div>
        {(resaleList.length !== 0) && (
        <div
          className="form-text fs-2"
          style={{
            width: "100%",
            height: 20 + "px",
            borderBottom: 1 + "px solid black",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "40px",
              backgroundColor: "#fff",
              padding: "0 5px",
            }}
          >
            OR
          </span>
        </div>
      )}

      {(resaleList.length !== 0) && <div style={{ paddingTop: "70px" }}>
          Buy A Ticket On Re-Sale Below
      </div>}
        <div  style={{"width": "50%", "alignItems": "center"}}>
            {resaleList.map((v:any,i:any) => {
            return (
            <div key={i}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title fs-5">{"Ticket ID: " + v.tokenId}</h5>
                <p className="card-text fs-6">{"Seller: " + v.seller}</p>
                <p className="card-text fs-6">{"Ticket(s) For Sale: " + v.numTickets}</p>
                <p className="card-text fs-6">{"Re-sale Price: " + v.resalePrice}</p>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">{"Number of Tickets to Buy: "}</span>
                    <input type="text" className="form-control" id="basic-url" value={buyTicketsNum} onChange={buyInputChange}/>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    buyTicket(i,buyTicketsNum)
                  }
                >
                  Buy Ticket(s)
                </button>
              </div>
            </div>
          </div>)
        })}
        </div>
      </div>
        
        
    )
}

export default MarketPlace;
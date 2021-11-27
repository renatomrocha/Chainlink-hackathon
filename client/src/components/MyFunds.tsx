import React, {useEffect, useState} from "react";
import {getMaticPrice, getRevenue, withdrawFunds} from "../modules/nfticket_utils";
import {Button} from "react-bootstrap";
import {ColorPalette} from "../styles/color_palette";
import NFTicketSpinner from "./NFTicketSpinner";

const MyFunds = (props: any) => {

    const [funds, setFunds] = useState<number>(0);
    const [maticPrice, setMaticPrice] = useState<number>(0);
    const [withdrawSuccessful, setWithdrawSuccessful] = useState<boolean>(false);
    const [withdrawError, setWithdrawError] = useState<boolean>(false);

    const [withdrawing, setWithdrawing] = useState<boolean>(false);


    const _getRevenue = () => {
        getRevenue(props.contract, props.account)
            .then(r=>{
                setFunds(Math.round(r*10**-18*100)/100);
                console.log("Revenue: ", r)});
    }

    useEffect(()=> {
        getMaticPrice(props.contract)
            .then(r=> {
                setMaticPrice(Math.round(r*10**-8*100)/100);
            })

        _getRevenue();
    },[])

    const _withdrawFunds = () => {
        setWithdrawing(true);
        withdrawFunds(props.contract, props.account)
            .then(()=>{
                setWithdrawing(false);
                setWithdrawSuccessful(true);
                _getRevenue();
                setTimeout(()=>{
                    setWithdrawSuccessful(false);
                },4000)

            })
            .catch(()=>{
                setWithdrawing(false);
                setWithdrawError(true);
                setTimeout(()=>{
                    setWithdrawError(false);
                },4000)
            })
    }

    return (<div>
        <h1>My Funds</h1>
        <div style={{marginTop:"20px"}}>
            <span style={{fontSize:"1.2em"}}>Current funds: {Math.round(funds*maticPrice*100)/100} $ ({funds}) MATIC</span>
        </div>
        <div style={{marginTop:"10px"}}>
            { !withdrawing && !(withdrawError || withdrawSuccessful) &&<Button disabled={funds===0} style={{backgroundColor: ColorPalette.secondaryColor, borderColor: ColorPalette.secondaryColor}} onClick={_withdrawFunds}>Withdraw funds</Button>}
            {withdrawError && <span style={{color:ColorPalette.warning, fontSize:"1.3em"}}>Something went wrong while withdrawing your funds</span>}
            {withdrawSuccessful && <span style={{color:ColorPalette.success, fontSize:"1.3em"}}>Funds successfully withdrawn! </span>}
            {withdrawing && <NFTicketSpinner message="Getting your NFTickets ready!"/>}
        </div>
    </div>)

}


export default MyFunds;
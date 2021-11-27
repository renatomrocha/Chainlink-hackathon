import {SpinnerDotted} from "spinners-react";
import {ColorPalette} from "../styles/color_palette";
import React from "react";


const NFTicketSpinner = (props:any) => {

    return(
        <div className="align-content-center" style={{width:"100%"}}>
            <SpinnerDotted size={props.spinnerSize?props.spinnerSize:"60"} color={ColorPalette.secondaryColor}/>
            <span style={{color:ColorPalette.secondaryColor,  marginLeft:"20px"}}>{props.message}</span>
        </div>
    )


}

export default NFTicketSpinner;
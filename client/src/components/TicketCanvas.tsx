import React, {useRef, useEffect, useState} from 'react'
import {BASE_IMAGE_URL, uploadToIPFS} from '../modules/ipfs_utils';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {getInterval, getkeeperVerificationCounter, getUpdatesCounter, mintNFTicket} from "../modules/nfticket_utils";
// @ts-ignore
import DatePicker from "react-datepicker";
import {ColorPalette} from "../styles/color_palette";
import "react-datepicker/dist/react-datepicker.css";
import { SpinnerDiamond, SpinnerInfinity, SpinnerDotted } from 'spinners-react';
import NFTicketSpinner from "./NFTicketSpinner";

const TicketCanvas = (props:any) => {

    console.log("Received props: ", props);
    const [badgerUrl,setBadgerUrl] = useState<any>(null);
    const [uploadedBadgeUrl, setUploadedBadgeUrl] = useState<any>(null);
    const [currentBadgeFile, setCurrentBadgeFile] = useState<any>(null);
    const [badger, setBadger] = useState<any>(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const badgeRef = useRef(null)

    //Form states
    const [eventMetadata, setEventMetadata] = useState<any>({});
    const [eventData, setEventData] = useState<any>({});
    const [expirationDateTimestamp, setExpirationDateTimestamp] = useState(new Date());
    const [minting, setMinting] = useState<boolean>(false);

    const [mintingError, setMintingError] = useState<boolean>(false);
    const [mintingSuccessful, setMintingSuccessful] = useState<boolean>(false);



    const styles = {
        border: '2px solid rgba(0, 0, 0, 0.5)',
        borderRadius:'10px',
        padding:'20px',
        marginBottom:'50px'
    };

    const drawTicket = (canvas: any, image:any, badge: any) => {

        const ctx = canvas.getContext('2d')
        ctx.canvas.width = image.width
        ctx.canvas.height = image.height
        ctx.drawImage(image,0,0);
        if (badge !== null) {
            ctx.drawImage(badge, image.width/4 - badge.width/2, image.height/3-badge.height/2, 200, 200)
            printMetadata(canvas, image);
        }
    }


    const printMetadata = (canvas: any, image:any) => {
        const ctx = canvas.getContext('2d')
        const startX = image.width/10;
        const startY = image.height-(image.height/6);
        const increment = 40;
        ctx.font = "22pt Calibri";
        ctx.fillText(`Event name: ${eventMetadata.eventName?eventMetadata.eventName:'-'}`, startX, startY )
        ctx.fillText(`Unit price: ${eventData.unitPrice?eventData.unitPrice+' $':'-'}`, startX, startY + 1*increment)
        ctx.fillText(`Max supply: ${eventData.maxSupply?eventData.maxSupply:'-'}`, startX, startY + 2*increment)
        ctx.fillText(`Percentage on resale: ${eventData.percentageOnResale?eventData.percentageOnResale:'-'}`, startX, startY + 3*increment)


    }


    const onImageChange = async (event:any) => {
        console.log("Image changed!");
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            const local_url = URL.createObjectURL(file);
            console.log(local_url)
            // Set badger file
            setCurrentBadgeFile(file);
            // Set local url for
            setUploadedBadgeUrl(local_url);
            setBadger(badgeRef.current);
        }
    };

    const saveTicket = async () => {
        const url = await uploadToIPFS(currentBadgeFile);
        setBadgerUrl(url);
        setBadger(badgeRef.current);
        // Save on smart contract

    }


    const updateImage = () => {
        const canvas : any = canvasRef.current
        const image : any = imageRef.current
        console.log("Will draw with badger: ", badger);
        drawTicket(canvas, image, badger);
    }

    const changeEventNameHandler = (event:any) => {
        setEventMetadata(Object.assign(eventMetadata,{"eventName": event.target.value}));
        console.log("Metadata now is: ", eventMetadata);
        updateImage()
    }

    const changeEventUnitPriceHandler = (event:any) => {
        setEventData(Object.assign(eventData,{"unitPrice": event.target.value}));
        console.log("Metadata now is: ", eventData);
        updateImage()
    }

    const changeEventMaxSupplyHandler = (event:any) => {
        setEventData(Object.assign(eventData,{"maxSupply": event.target.value}));
        console.log("Metadata now is: ", eventData);
        updateImage()
    }

    const changeEventResalePercHandler = (event: any) => {
        setEventData(Object.assign(eventData,{"percentageOnResale": event.target.value}));
        updateImage()
    }

    useEffect(() => {
        console.log("Running use effect")
        const canvas : any = canvasRef.current
        const image : any = imageRef.current
        // const badge : any = badgeRef.current
        drawTicket(canvas, image, badger);
    }, [])

    const _mintNFTicket = () => {
        setMinting(true);
        mintNFTicket(props.contract, props.account, eventData, eventMetadata, expirationDateTimestamp,currentBadgeFile)
            .then(()=> {
                setMinting(false);
                setMintingSuccessful(true);
                setTimeout(()=>{
                    setMintingSuccessful(false);

                }, 4000)
            })
            .catch(()=>{
                setMinting(false);
                setMintingError(true);
                setTimeout(()=>{
                    setMintingError(false);
                }, 4000)
            })

    }



    return (
        <Container fluid className="justify-content-md-center" style={styles}>
            <h3>Ticket Editor</h3>
            <Row>
                <Col>
                    <canvas className="align-self-center" ref={canvasRef} {...props}/>
                    <img ref={imageRef} src={BASE_IMAGE_URL} hidden={true} />
                    <img ref={badgeRef} src={uploadedBadgeUrl} hidden={true} />
                </Col>

                <Col>
                    <Row>
                        <h4>Ticket badge</h4>
                        <label className="mx-3">Choose file: </label>
                        <input type="file" name="myImage" onChange={onImageChange} />
                    </Row>
                    <Form className="mt-3">
                        <h4>Ticket metadata</h4>
                        <Form.Group className="mb-3" controlId="formEventName">
                            <Form.Label>Event name</Form.Label>
                            <Form.Control type="event_name" placeholder="Enter event name" value={eventMetadata.eventName} onChange={changeEventNameHandler}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUnitPrice">
                            <Form.Label>Unit Price</Form.Label>
                            <Form.Control type="unit_price" placeholder="Uni price in dollars"  value={eventMetadata.unitPrice} onChange={changeEventUnitPriceHandler}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMaxSupply">
                            <Form.Label>Maximum supply</Form.Label>
                            <Form.Control type="max_supply" placeholder="Maximum ticket supply" value={eventMetadata.maxSupply} onChange={changeEventMaxSupplyHandler}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formMaxSupply">
                            <Form.Label>Percentage on resale</Form.Label>
                            <Form.Control type="perc_resale" placeholder="Percentage on resale" value={eventMetadata.percentageOnResale} onChange={changeEventResalePercHandler}/>
                        </Form.Group>

                        <DatePicker selected={expirationDateTimestamp} onChange={(date: any) => setExpirationDateTimestamp(date)} />
                    </Form>
                    <Row className="mt-3">
                        {!minting && !(mintingError || mintingSuccessful) && <Button style={{backgroundColor: ColorPalette.secondaryColor, borderColor: ColorPalette.secondaryColor}} onClick={_mintNFTicket}>Mint tickets</Button>}

                        {mintingError && <span style={{color: ColorPalette.warning, fontSize:"1.3em"}}>Something went wrong while minting your tickets</span>}
                        {mintingSuccessful && <span style={{color: ColorPalette.success , fontSize:"1.3em"}}>NFTickets successfully minted! </span>}

                        {minting && <NFTicketSpinner message="Minting your NFTickets..."/>}


                    </Row>
                </Col>
                </Row>
            {/*<div>*/}
            {/*    <Button onClick={()=> getInterval(props.contract)}>Interval</Button>*/}
            {/*    <Button onClick={()=> getUpdatesCounter(props.contract)}>Updates counter</Button>*/}
            {/*    <Button onClick={()=> getkeeperVerificationCounter(props.contract)}>Keeper verifications</Button>*/}
            {/*</div>*/}
        </Container>)
}


export default TicketCanvas;
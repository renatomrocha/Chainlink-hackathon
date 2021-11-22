import React, {useRef, useEffect, useState} from 'react'
import {uploadToIPFS} from './ipfs_utils';
import {Button, Col, Container, Form, Row} from "react-bootstrap";

const TicketCanvas = (props:any) => {

    console.log("Received props: ", props.props);
    const [badgerUrl,setBadgerUrl] = useState<any>(null);
    const [uploadedBadgeUrl, setUploadedBadgeUrl] = useState<any>(null);
    const [currentBadgeFile, setCurrentBadgeFile] = useState<any>(null);
    const [badger, setBadger] = useState<any>(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const badgeRef = useRef(null)

    //Form states
    const [eventMetadata, setEventMetadata] = useState<any>({});


    const styles = {
        border: '2px solid rgba(0, 0, 0, 0.5)',
        borderRadius:'10px',
        padding:'20px'
    };

    const drawTicket = (canvas: any, image:any, badge: any) => {

        const ctx = canvas.getContext('2d')
        ctx.canvas.width = image.width
        ctx.canvas.height = image.height
        ctx.drawImage(image,0,0);
        // ctx.fillStyle = "#ffffff";
        // ctx.arc(image.width/4, image.height/3, 100, 0, 2* Math.PI);

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
        ctx.font = "30pt Calibri";
        ctx.fillText("Metadata", startX  , startY );
        ctx.font = "22pt Calibri";
        ctx.fillText(`Event name: ${eventMetadata.eventName?eventMetadata.eventName:'-'}`, startX, startY + increment)
        ctx.fillText(`Unit price: ${eventMetadata.unitPrice?eventMetadata.unitPrice+' $':'-'}`, startX, startY + 2*increment)
        ctx.fillText(`Max supply: ${eventMetadata.maxSupply?eventMetadata.maxSupply:'-'}`, startX, startY + 3*increment)


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
        setEventMetadata(Object.assign(eventMetadata,{"unitPrice": event.target.value}));
        console.log("Metadata now is: ", eventMetadata);
        updateImage()
    }

    const changeEventMaxSupplyHandler = (event:any) => {
        setEventMetadata(Object.assign(eventMetadata,{"maxSupply": event.target.value}));
        console.log("Metadata now is: ", eventMetadata);
        updateImage()
    }


    useEffect(() => {
        console.log("Running use effect")
        const canvas : any = canvasRef.current
        const image : any = imageRef.current
        // const badge : any = badgeRef.current
        drawTicket(canvas, image, badger);
    }, [])


    return (
        <Container fluid className="justify-content-md-center" style={styles}>
            <h3>Ticket Editor</h3>
            <Row>
                <Col>
                    <canvas className="align-self-center" ref={canvasRef} {...props}/>
                    <img ref={imageRef} src={props.props.uri} hidden={true} />
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
                            {/*<Form.Text className="text-muted">*/}
                            {/*    We'll never share your email with anyone else.*/}
                            {/*</Form.Text>*/}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUnitPrice">
                            <Form.Label>Unit Price</Form.Label>
                            <Form.Control type="unit_price" placeholder="Uni price in dollars"  value={eventMetadata.unitPrice} onChange={changeEventUnitPriceHandler}/>
                        </Form.Group>

                        {/*<Form.Group className="mb-3" controlId="formUnitPrice">*/}
                        {/*    <Form.Label>Unit Price</Form.Label>*/}
                        {/*    <Form.Control type="unit_price" placeholder="Unit price in dollars" />*/}
                        {/*</Form.Group>*/}

                        <Form.Group className="mb-3" controlId="formMaxSupply">
                            <Form.Label>Maximum supply</Form.Label>
                            <Form.Control type="max_supply" placeholder="Maximum ticket supply" value={eventMetadata.maxSupply} onChange={changeEventMaxSupplyHandler}/>
                        </Form.Group>

                    </Form>
                    <Row className="mt-3">
                        <Col>
                            <Button disabled={uploadedBadgeUrl==null} onClick={updateImage}>Preview</Button>
                        </Col>
                        <Col>
                            <Button onClick={saveTicket}>Save Changes</Button>
                        </Col>
                    </Row>
                </Col>
                </Row>
        </Container>)
}




export default TicketCanvas;
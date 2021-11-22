import React, {useRef, useEffect, useState} from 'react'
import {uploadToIPFS} from './ipfs_utils';

const Canvas = (props:any) => {

    console.log("Received props: ", props.props);
    const [badgerUrl,setBadgerUrl] = useState<any>(null);
    const [uploadedBadgeUrl, setUploadedBadgeUrl] = useState<any>(null);
    const [currentBadgeFile, setCurrentBadgeFile] = useState<any>(null);
    const [badger, setBadger] = useState<any>(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const badgeRef = useRef(null)

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



    useEffect(() => {
        console.log("Running use effect")
        const canvas : any = canvasRef.current
        const image : any = imageRef.current
        // const badge : any = badgeRef.current
        drawTicket(canvas, image, badger);
    }, [])

    return (<div>
        <canvas ref={canvasRef} {...props}/>
        <img ref={imageRef} src={props.props.uri} hidden={true} />
        <img ref={badgeRef} src={uploadedBadgeUrl} hidden={true} />
        <h1>Select Image</h1>
        <input type="file" name="myImage" onChange={onImageChange} />
        <button onClick={updateImage}>Preview</button>
        <button onClick={saveTicket}>Save Changes</button>
    </div>)
}


const drawTicket = (canvas: any, image:any, badge: any) => {

    const ctx = canvas.getContext('2d')
    ctx.canvas.width = image.width
    ctx.canvas.height = image.height
    ctx.drawImage(image,0,0);
    // ctx.fillStyle = "#ffffff";
    // ctx.arc(image.width/4, image.height/3, 100, 0, 2* Math.PI);

    if (badge !== null) {
        ctx.drawImage(badge, image.width/4 - badge.width/2, image.height/3-badge.height/2, 200, 200)
        ctx.font = "40pt Calibri";
        ctx.fillText("Metadata", image.width/2-(image.width/10) , image.height-(image.height/10) );
    }

}

export default Canvas;
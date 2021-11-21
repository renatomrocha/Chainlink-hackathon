import React, {useRef, useEffect, useState} from 'react'

const Canvas = (props:any) => {

    console.log("Received props: ", props.props);
    const [badgerUrl,setBadgerUrl] = useState<any>(null);
    const [badger, setBadger] = useState<any>(null)
    const canvasRef = useRef(null)
    const imageRef = useRef(null)
    const badgeRef = useRef(null)

    const onImageChange = (event:any) => {
        console.log("Image changed!");
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            const url = URL.createObjectURL(file)
            setBadgerUrl(url)

            setBadger(badgeRef.current)
        }
    };

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
        <img ref={badgeRef} src={badgerUrl} hidden={true} />
        <h1>Select Image</h1>
        <input type="file" name="myImage" onChange={onImageChange} />
        <button onClick={updateImage}>UpdateImage</button>
    </div>)
}


const drawTicket = (canvas: any, image:any, badge: any) => {

    const ctx = canvas.getContext('2d')
    ctx.canvas.width = image.width
    ctx.canvas.height = image.height
    ctx.drawImage(image,0,0);

    if (badge !== null) {
        ctx.drawImage(badge, image.width/4 - badge.width/2, image.height/3-badge.height/2, 200, 200)
        ctx.font = "40pt Calibri";
        ctx.fillText("Metadata", image.width/2-(image.width/10) , image.height-(image.height/10) );
    }

}

export default Canvas;
import {uploadToIPFS} from "./ipfs_utils";


export const mintNFTicket = async (nftContract: any, account: string, data: any, metadata: any, expirationDateTimestamp: Date, badge: any) => {
    // Store info on ipfs
    console.log("Received metadata: ", metadata);
    console.log("Received image: ", badge);
    console.log("Received date: ", expirationDateTimestamp.getTime());
    const badge_uri = await uploadToIPFS(badge);
    console.log("badge_uri: ", badge_uri);
    metadata.badge_uri = badge_uri;
    const metadataDoc = JSON.stringify(metadata);
    const metadata_url = await uploadToIPFS(metadataDoc);
    console.log("Metadata url: ", metadata_url);
    nftContract.methods.createEventTickets(data.unitPrice,data.maxSupply,data.percentageOnResale, expirationDateTimestamp.getTime(),metadata_url).send({from: account})
        .then(()=> {
            console.log("Tickets created")
        })
}





export const subscribeTicketsUpdated = (nftContract: any) => {
    nftContract.events.TicketsUpdated(null, (data: any)=> {
        console.log("Tickets updated");
        console.log("Data is: ", data);
    });
}


export const getInterval = async (nftContract: any, account: string) => {
    const interval = nftContract.methods.interval.call().call();
    console.log("Interval is: ", interval);
}

export const getkeeperVerificationCounter = async (nftContract: any) => {
    const counter = await nftContract.methods.keeperVerificationCounter.call().call();
    console.log("Counter value is: ", counter)
}

export const getUpdatesCounter = async (nftContract: any) => {
    const counter = await nftContract.methods.updatesCounter.call().call();
    console.log("Counter value is: ", counter)
}


export const getOwnedTickets = async (nftContract: any, account: string) => {
    const ownedTickets = await nftContract.methods.getOwnedTickets(account).call();
    return ownedTickets;
}


export const numTicketsOwned = (nftContract: any, index: number, account: string) => {
    nftContract.methods.numTicketsOwned(index).send({from: account})
        .then((response: any)=> {
            console.log("Number of tickets: ", response);
        })
}


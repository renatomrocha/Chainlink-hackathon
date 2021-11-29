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
    console.log("Making request with account: ", account);
    return await nftContract.methods.createEventTickets(data.unitPrice,data.maxSupply,data.percentageOnResale, expirationDateTimestamp.getTime(),metadata_url).send({from: account})

}


export const subscribeTicketsUpdated = (nftContract: any) => {
    nftContract.events.TicketsUpdated(null, (data: any)=> {
        console.log("Tickets updated");
        console.log("Data is: ", data);
    });
}


export const getInterval = async (nftContract: any) => {
    const interval = await nftContract.methods.interval.call().call();
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

export const getAllEvents = async (nftContract: any, account: string) => {
    const events = await nftContract.methods.getAllEvents().call();
    return events;
}


export const numTicketsOwned = (nftContract: any, index: number, account: string) => {
    nftContract.methods.numTicketsOwned(index).send({from: account})
        .then((response: any)=> {
            console.log("Number of tickets: ", response);
        })
}


export const balanceOf = async (nftContract: any, account: any, ticketId: any) => {
    const balance = await nftContract.methods.balanceOf(account, ticketId).call();
    return balance;
}

export const getTicket = async (nftContract: any, ticketId: any) => {
    const ticket = await nftContract.methods.nfTickets(ticketId).call();
    return ticket;
}

export const buyTickets = async (nftContract: any, ticketId: any, amount: number, account: any, amountToPay: number) => {
    return await nftContract.methods.buyFromOwner(ticketId, amount).send({from: account, value: amountToPay});
}

export const getMaticPrice = async (nftContract: any) => {
    return await nftContract.methods.getMaticPrice().call();
}

export const getRevenue = async (nftContract: any, account: any) => {
    return await nftContract.methods.getRevenue(account).call();
}

export const withdrawFunds = async (nftContract: any, account: any) => {
    return await nftContract.methods.withdrawProceeds().send({from:account});

}

export const getResaleTickets = async(web3:any, contract: any) => {
    let resaleTickets = [];
    const eventList = await contract.getPastEvents("TicketOnResale", {
            fromBlock:  await web3.eth.getBlockNumber() - 950,
            toBlock: "latest",
          }).catch((e: any) => window.alert(e));


    for (let i=0; i<eventList.length; i++){
        const element = eventList[i]["returnValues"];

        // console.log(element);

        const resale = await contract.methods["resale(uint256,address)"](element._tokenId, element._seller).call();
        // console.log(resale);
        if (resale.num !== 0) {
            const obj = {
                tokenId: element._tokenId,
                seller: element._seller,
                numTickets: resale.num,
                resalePrice: resale.resalePrice
            }
            // console.log(obj);


            resaleTickets.push(obj);
        }
        // console.log(resaleTickets)
    }
    return resaleTickets;
}
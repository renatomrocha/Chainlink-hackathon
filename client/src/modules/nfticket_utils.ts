

export const mintNFTIcket = (nftContract: any, account: string) => {
    nftContract.methods.createEventTickets([10,200,"Event",[65436536,"type1","url",[true]]]).send({from: account})
        .then(()=> {
            console.log("Tickets created")
        })
}

export const getInterval = async (nftContract: any, account: string) => {
    const interval = nftContract.methods.interval.call();
    console.log("Interval is: ", interval);
}

export const getTicketsOwned = async (nftContract: any, account: string) => {
    const numTokensOwned = await nftContract.methods.numTicketsOwned(0).send({from: account})
    console.log("Tokens owned: ", numTokensOwned);
}



export const numTicketsOwned = (nftContract: any, index: number, account: string) => {
    nftContract.methods.numTicketsOwned(index).send({from: account})
        .then((response: any)=> {
            console.log("Number of tickets: ", response);
        })
}
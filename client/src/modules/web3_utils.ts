import * as NFTTicketContract from '../artifacts/contracts/NFTickets.json';
import Web3 from "web3";
declare const window :any;

const MUMBAI_CONTRACT_ADDRESS = "0x0c7861dc982B2B2BA2f5f56d286617C6cb727aFD";

export const initContract = (web3: any, contractDefinition: any) => {
    console.log("Deploying contract with web3: ", web3);
    const networkId = web3.eth.net.getId()
    const abi = contractDefinition.default.abi;
    console.log("COntract definition is: ", contractDefinition)
    const contractAddress = MUMBAI_CONTRACT_ADDRESS
    const contract: any = new web3.eth.Contract(abi, contractAddress)
    console.log("Contract after init is: ", contract);
    return contract;
}



export const loadBlockchainData = async () => {
    let web3: any;
    let accounts: string[];
    web3 = new Web3("http://localhost:8545")
    accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType()
    return {"web3":web3,"network":network,"accounts":accounts}
}

export const connectWallet = async () => {
    const provider : any = window.ethereum;
    let web3: any;
    let accounts: string[] = [];
    if (typeof(provider) !== undefined) {
        web3 = new Web3(provider)
        console.log("Metamask is installed! ")
        accounts = await provider.request({method:'eth_requestAccounts'})
        window.ethereum.on('accountChanged', (accounts: string[])=> {
            console.log("Account is: ",accounts);
        })
    } else {
        console.warn("Unable to find waller")
    }
    const network = await web3.eth.net.getNetworkType()
    return {"web3":web3,"network":network,"accounts":accounts}
}


export default NFTTicketContract;
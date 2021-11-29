import * as NFTicketContract from '../artifacts/contracts/NFTickets.json';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
declare const window :any;

export const MUMBAI_CONTRACT_ADDRESS = "0x491Ff03837e433baF74BbdEbED84165888dbB1EF";

// export const PRODUCTION_MUMBAI_CONTRACT_ADDRESS = "0xe7160776F2b517Ca27F5a9A649991F8De646701C";

export const initContract = (web3: any, contractSetter: Function, contractDefinition: any) => {
    const abi = contractDefinition.default.abi;
    const contractAddress = MUMBAI_CONTRACT_ADDRESS
    const contract: any = new web3.eth.Contract(abi, contractAddress)
    contractSetter(contract);

}



export const loadBlockchainData = async () => {
    let web3: any;
    let accounts: string[];
    web3 = new Web3("http://localhost:8545")
    accounts = await web3.eth.getAccounts();
    const network = await web3.eth.net.getNetworkType()
    return {"web3":web3,"network":network,"accounts":accounts}
}



export const connectWallet = async (web3UpdateFunction:any, accountUpdateFunction:any, chainUpdateFunction:any) => {
    let provider : any;
    let web3: any;
    let accounts: string[] = [];
    let chainId: any;


    // Initiate the Web3 Provider
    provider = await detectEthereumProvider().catch((e:any) => {
        window.alert(e.message);
        console.warn("Unable to find waller");
    })

    // Set Web3
    if (provider === window.ethereum) {
        web3 = new Web3(provider);
        console.log("Metamask is installed! ");
    } else {
        web3 = new Web3("http://localhost:8545"); // Local Ganache
    }
    web3UpdateFunction(web3);




    // Set Account and change event listener
    accounts = await provider.request({method:'eth_requestAccounts'})
    accountUpdateFunction(accounts[0]);
    web3.currentProvider.on('accountsChanged', (account:any)=> {
        accountUpdateFunction(account[0]);
    })
        
    // Set Network and change event listener
    chainId = await web3.eth.getChainId();
    chainUpdateFunction(chainId);
    web3.currentProvider.on("chainChanged", async (chain:any) => {
        chainUpdateFunction(chain);
    })

    return Promise.all([web3, accounts, chainId]);
}



export const processSmartContractResponseTuple = (tuple: any[]) => {
    let key : any;
    let ticketObj: any = new Object();
    for (key in tuple) {
        ticketObj[key.toString()] = tuple[key];
    }
    return ticketObj;
}



export default NFTicketContract;
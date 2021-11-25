import * as NFTicketContract from '../artifacts/contracts/NFTickets.json';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
declare const window :any;

const MUMBAI_CONTRACT_ADDRESS = "0xaA166E029f1fD19d2053abccdBEe1cE6141f469c";


const MUMBAI_CONTRACT_ADDRESS_REMIX = "0x43f96e3d0B205D971C83F55481739F7807385fFE"

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

export const connectWallet = async (web3UpdateFunction:any, accountUpdateFunction:any, chainUpdateFunction:any, contractUpdateFunction: any) => {
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

    const abi = (NFTicketContract as any).default.abi;
    const contractAddress = MUMBAI_CONTRACT_ADDRESS
    const contract: any = new web3.eth.Contract(abi, contractAddress)
    contractUpdateFunction(contract);


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
}


export default NFTicketContract;
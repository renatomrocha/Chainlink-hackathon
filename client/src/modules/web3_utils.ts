import * as NFTTicketContract from '../artifacts/contracts/NFTickets.json';
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
declare const window :any;

const MUMBAI_CONTRACT_ADDRESS = "0x40e6282442Ea51E2f56c08e2E5eA47106C3c0dA1";

const MUMBAI_CONTRACT_ADDRESS_REMIX = "0x43f96e3d0B205D971C83F55481739F7807385fFE"

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
    accountUpdateFunction(accounts);
    web3.currentProvider.on('accountsChanged', (account:any)=> {
        accountUpdateFunction(account);
    })
        
    // Set Network and change event listener
    chainId = await web3.eth.getChainId();
    chainUpdateFunction(chainId);
    web3.currentProvider.on("chainChanged", async (chain:any) => {
        chainUpdateFunction(chain);
    })
}


export default NFTTicketContract;
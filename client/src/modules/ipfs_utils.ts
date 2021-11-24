import ipfsHttpClient, { create } from 'ipfs-http-client';

export const IPFS_NODE_URL = 'https://ipfs.infura.io:5001'

const ipfsClient = create({url: IPFS_NODE_URL})


export const uploadToIPFS = async (file:any) => {
    const added = await ipfsClient.add(file)
    console.log("File uploaded to ipfs");
    const url = `${IPFS_NODE_URL}/${added.path}`
    console.log("Image url is: ", url);
    return url;
}


export default ipfsClient;
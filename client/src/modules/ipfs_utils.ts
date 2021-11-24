import ipfsHttpClient, { create } from 'ipfs-http-client';

export const IPFS_NODE_URL = 'https://ipfs.infura.io:5001'
export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

export const BASE_IMAGE_HASH = "QmYEowFCRGFsuzhhwMdijZ1sqUfZd28gcJ7bx3Vydgso9x";

export const BASE_IMAGE_URL = `${IPFS_BASE_URL}/${BASE_IMAGE_HASH}`

const ipfsClient = create({url: IPFS_NODE_URL})


export const uploadToIPFS = async (file:any) => {
    const added = await ipfsClient.add(file)
    console.log("File uploaded to ipfs");
    const url = `${IPFS_NODE_URL}/${added.path}`
    console.log("Image url is: ", url);
    return added.path;
}


export const downloadFromIPFS = async (url: string) => {


}


export default ipfsClient;
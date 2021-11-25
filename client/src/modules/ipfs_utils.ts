import ipfsHttpClient, { create } from 'ipfs-http-client';

export const IPFS_NODE_URL = 'https://ipfs.infura.io:5001'
export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

// QmYEowFCRGFsuzhhwMdijZ1sqUfZd28gcJ7bx3Vydgso9x Old image

export const BASE_IMAGE_HASH = "QmTyPBRhmbaoyzP8HaqK1JyqKNhkaTZXJpTsfe58bot6wb";

export const EXPIRED_IMAGE_HASH = "QmYZe4QX6UEB26GaN4vR3UHXnaHtwgW4d1a77zvrGae6te"

export const BASE_IMAGE_URL = `${IPFS_BASE_URL}/${BASE_IMAGE_HASH}`

export const BASE_EXPIRED_IMAGE_URL = `${IPFS_BASE_URL}/${EXPIRED_IMAGE_HASH}`


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
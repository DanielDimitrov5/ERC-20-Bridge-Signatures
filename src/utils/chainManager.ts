import { ethers } from 'ethers';
import Bridge from "../contract/Bridge.json";

import dotenv from 'dotenv';
dotenv.config();

export const chains: { [key: number]: string | undefined } = {
    1: process.env.RPC_URL_MAINNET,
    5: process.env.RPC_URL_GOERLI,
    11155111: process.env.RPC_URL_SEPOLIA
}

export const getProvider = (chainId: number) => {
    return new ethers.JsonRpcProvider(chains[chainId]);
}

export const getContractInstance = (chainId: number, privateKey: string) => {
    const wallet = new ethers.Wallet(privateKey, getProvider(chainId));

    if(!(chainId == 1 || chainId == 5 || chainId == 11155111)) {
        throw new Error('Invalid chain ID.');
    }
    
    const address = Bridge.chains[chainId];

    return new ethers.Contract(address, Bridge.abi, wallet);
}
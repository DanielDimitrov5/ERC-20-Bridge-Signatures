import { ethers } from 'ethers';
import Bridge from "../contract/Bridge.json";

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
    return new ethers.Contract(Bridge.contractAddress, Bridge.abi, wallet);
}
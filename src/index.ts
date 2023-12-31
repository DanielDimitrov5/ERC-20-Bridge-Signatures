import { AddressLike, BigNumberish, Wallet, ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import Bridge from "./contract/Bridge.json";
import { signBridgeMintMessage, signBridgeReleaseMessage } from './utils/messageSigning';

import dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL_SEPOLIA);
// const provider = new ethers.JsonRpcProvider("HTTP://127.0.0.1:7545");
const privateKey = process.env.PRIVATE_KEY;

if (!provider) {
    throw new Error('RPC URL is not defined in environment variables.');
}

if (!privateKey) {
    throw new Error('Private key is not defined in environment variables.');
}

const wallet = new ethers.Wallet(privateKey, provider);


const bridgeContract = new ethers.Contract(Bridge.contractAddress, Bridge.abi, wallet);

interface WrapData {
    name: string;
    symbol: string;
}

bridgeContract.on("Lock", async (token: AddressLike, sender: AddressLike, amount: BigNumberish, chainId: BigNumberish, wrapData: WrapData) => {
    const sig = await signBridgeMintMessage(wallet, token, sender, amount, chainId, 0);
    console.log(sig);
});

bridgeContract.on("Burn", async (token: AddressLike, from: AddressLike, amount: BigNumberish) => {
    const sig = await signBridgeReleaseMessage(wallet, token, from, amount, 1);
    console.log(sig);
});
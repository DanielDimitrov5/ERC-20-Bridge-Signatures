import { AddressLike, BigNumberish, ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import { getContractInstance, getProvider } from '../utils/chainManager';
import { signBridgeMintMessage, signBridgeReleaseMessage } from '../utils/messageSigning';

import dotenv from 'dotenv';
dotenv.config();

const CHAIN_ID = 5;

const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
    throw new Error('Private key is not defined in environment variables.');
}

const provider = getProvider(CHAIN_ID);

if (!provider) {
    throw new Error('RPC URL is not defined in environment variables.');
}

const wallet = new ethers.Wallet(privateKey, provider);

const bridgeContract = getContractInstance(CHAIN_ID, privateKey);

interface WrapData {
    name: string;
    symbol: string;
}

export const goerliListener = async () => {
    bridgeContract.on("Lock", async (token: AddressLike, sender: AddressLike, amount: BigNumberish, chainId: BigNumberish, wrapData: WrapData) => {
        const sig = await signBridgeMintMessage(wallet, token, sender, amount, chainId, 0);
        console.log(sig);
    });

    bridgeContract.on("Burn", async (token: AddressLike, from: AddressLike, amount: BigNumberish) => {
        const sig = await signBridgeReleaseMessage(wallet, token, from, amount, 1);
        console.log(sig);
    });
}
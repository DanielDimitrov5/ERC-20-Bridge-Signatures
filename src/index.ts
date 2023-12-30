import { AddressLike, BigNumberish, Wallet, ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import Bridge from "./contract/Bridge.json";

import dotenv from 'dotenv';
dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL_SEPOLIA);
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

bridgeContract.on("Lock", async (token: string, sender: string, amount: BigNumberish, chainId: BigNumberish, wrapData: WrapData) => {
    const sig = await signBridgeMintMessage(wallet, token, sender, amount, 1, 0);
    console.log(sig);
});

async function signBridgeMintMessage(wallet: Wallet, tokenAddress: AddressLike, senderAddress: AddressLike, amount: BigNumberish, chainId: BigNumberish, nonce: BigNumberish) {
    const message = ethers.solidityPackedKeccak256(
        ['address', 'address', 'uint256', 'uint256', 'uint256'],
        [tokenAddress, senderAddress, amount, chainId, nonce]
    );
    const signature = await wallet.signMessage(ethers.getBytes(message));
    return signature;
}
import { AddressLike, BigNumberish, ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import { chains, getContractInstance, getProvider } from '../utils/chainManager';
import { signBridgeMintMessage, signBridgeReleaseMessage } from '../utils/messageSigning';
import { WrapData } from '../types/types';

import dotenv from 'dotenv';
dotenv.config();

export class Listener {
    private prisma: PrismaClient;
    private bridgeContract: ethers.Contract;
    private wallet: ethers.Wallet;
    private chainId: number;
    private privateKey: string;

    constructor(chainId: number) {
        this.chainId = chainId;

        if (!process.env.PRIVATE_KEY) {
            throw new Error("No private key provided");
        }

        this.privateKey = process.env.PRIVATE_KEY;

        this.prisma = new PrismaClient();
        this.bridgeContract = getContractInstance(chainId, this.privateKey);
        this.wallet = new ethers.Wallet(this.privateKey, getProvider(chainId));
    }


    public async start() {
        this.bridgeContract.on("Lock", async (token: AddressLike, sender: AddressLike, amount: BigNumberish, chainId: BigNumberish, wrapData: WrapData) => {
            
            const nonce = await getContractInstance(this.chainId, this.privateKey).nonces(sender);
            
            const sig = await signBridgeMintMessage(this.wallet, token, sender, amount, chainId, nonce);
            console.log(sig);
        });
    
        this.bridgeContract.on("Burn", async (token: AddressLike, from: AddressLike, amount: BigNumberish) => {
            const sig = await signBridgeReleaseMessage(this.wallet, token, from, amount, 1);
            console.log(sig);
        });
    }
}
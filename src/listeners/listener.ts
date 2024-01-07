import { AddressLike, BigNumberish, ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';
import { getContractInstance, getProvider } from '../utils/chainManager';
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
        await this.queryPastEvents();
        await this.startEventListener();
    }

    private async queryPastEvents() {
        const lastProcessedBlock = await this.getLastProcessedBlock();

        let pastLockEvents: any[] = [];
        try {
            pastLockEvents = await this.bridgeContract.queryFilter(
                this.bridgeContract.filters.Lock(),
                lastProcessedBlock + 1
            );
        } catch (error: any) {
            console.log("Error querying past lock events:", error.message);
            return;
        }

        for (const event of pastLockEvents) {
            const parsedLog = this.bridgeContract.interface.parseLog({
                topics: [...event.topics],
                data: event.data,
            });

            const { token, sender, amount, chainId, wrapData }: any = parsedLog?.args;

            await this.processLockEvent({ token, sender, amount, chainId, wrapData });
        }

        // const pastBurnEvents = await this.bridgeContract.queryFilter(
        //     this.bridgeContract.filters.Burn(),
        //     lastProcessedBlock + 1
        // );

        // for (const event of pastBurnEvents) {
        //     // ... Your existing logic for processing "Burn" events
        // }

        console.log(pastLockEvents[pastLockEvents.length - 1].blockNumber);
        await this.setLastProcessedBlock(pastLockEvents[pastLockEvents.length - 1].blockNumber);
    }

    private async startEventListener() {
        this.bridgeContract.on("Lock", async (token: AddressLike, sender: AddressLike, amount: BigNumberish, chainId: BigNumberish, wrapData: WrapData) => {
            await this.processLockEvent({ token, sender, amount, chainId, wrapData });
        });

        this.bridgeContract.on("Burn", async (token: AddressLike, from: AddressLike, amount: BigNumberish) => {
            const nonce = await getContractInstance(this.chainId, this.privateKey).nonces(from);

            const sig = await signBridgeReleaseMessage(this.wallet, token, from, amount, nonce);

            const release = await this.prisma.releaseSignature.create({
                data: {
                    tokenAddress: token.toString(),
                    userAddress: from.toString(),
                    amount: BigInt(amount),
                    nonce: nonce,
                    signature: sig
                }
            });

            console.log(this.formatBurnEventOutput(release));
        });
    }

    private async processLockEvent({ token, sender, amount, chainId, wrapData }: any) {
        try {
            const nonce = await getContractInstance(chainId, this.privateKey).nonces(sender);

            const sig = await signBridgeMintMessage(this.wallet, token, sender, amount, chainId, nonce);

            const mint = await this.prisma.mintSignature.create({
                data: {
                    tokenAddress: token.toString(),
                    userAddress: sender.toString(),
                    amount: BigInt(amount),
                    nonce: nonce,
                    signature: sig,
                    targetChainId: BigInt(chainId),
                    tokenName: wrapData.name,
                    tokenSymbol: wrapData.symbol
                }
            });

            console.log(`Processed lock event: ${this.formatLockEventOutput(mint)}`);
        } catch (error) {
            console.log(`Failed to process lock event: [${token}, ${sender}, ${amount}, ${chainId}, ${wrapData}]`);
            console.log(error);
        }

    }

    private async getLastProcessedBlock(): Promise<number> {
        const record = (await this.prisma.configurationData.findFirst({
            where: { id: 1 }, select: {
                lastProcessedBlockNumber: true,
            },
        }));
        return Number(record?.lastProcessedBlockNumber) || 0;
    }

    private async setLastProcessedBlock(blockNumber: number): Promise<void> {
        await this.prisma.configurationData.update({
            where: { id: 1 },
            data: { lastProcessedBlockNumber: BigInt(blockNumber) },
        });
    }

    private formatLockEventOutput(mint: any) {
        return `["${mint.tokenAddress}", "${mint.userAddress}", ${mint.amount}, ${mint.nonce}, "${mint.signature}", ${mint.targetChainId}, ["${mint.tokenName}", "${mint.tokenSymbol}"]]`;
    }

    private formatBurnEventOutput(release: any) {
        return `["${release.tokenAddress}", "${release.userAddress}", ${release.amount}, ${release.nonce}, "${release.signature}"]`;
    }
}
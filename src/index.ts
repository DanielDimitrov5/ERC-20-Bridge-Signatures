import { ethers } from 'ethers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



async function main() {
    const newSig = await prisma.signatures.create({
        data: {
            address: "0x1234567890123456789012345678901234567890",
            signature: "0x000215e1AEbBB1f4DE1b9c5f68C03d5E6f6B39A8"
        },
    });

    console.log(newSig);
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
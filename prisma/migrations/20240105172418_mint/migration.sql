/*
  Warnings:

  - You are about to drop the `Signatures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Signatures`;

-- CreateTable
CREATE TABLE `MintSignatures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userAddress` VARCHAR(42) NOT NULL,
    `tokenAddress` VARCHAR(42) NOT NULL,
    `amount` INTEGER NOT NULL,
    `nonce` INTEGER NOT NULL,
    `signature` VARCHAR(191) NOT NULL,
    `sourceChainId` INTEGER NOT NULL,
    `tokenName` VARCHAR(191) NOT NULL,
    `tokenSymbol` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

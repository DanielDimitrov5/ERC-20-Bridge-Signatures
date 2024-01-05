-- CreateTable
CREATE TABLE `ReleaseSignature` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tokenAddress` VARCHAR(42) NOT NULL,
    `userAddress` VARCHAR(42) NOT NULL,
    `amount` INTEGER NOT NULL,
    `nonce` INTEGER NOT NULL,
    `signature` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

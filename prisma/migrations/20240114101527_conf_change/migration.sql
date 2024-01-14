/*
  Warnings:

  - You are about to drop the column `lastProcessedBlockNumberGoerli` on the `ConfigurationData` table. All the data in the column will be lost.
  - You are about to drop the column `lastProcessedBlockNumberSepolia` on the `ConfigurationData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ConfigurationData` DROP COLUMN `lastProcessedBlockNumberGoerli`,
    DROP COLUMN `lastProcessedBlockNumberSepolia`,
    ADD COLUMN `lastProcessedBlockNumber1115511` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `lastProcessedBlockNumber5` BIGINT NOT NULL DEFAULT 0;

/*
  Warnings:

  - You are about to drop the column `lastProcessedBlockNumber` on the `ConfigurationData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ConfigurationData` DROP COLUMN `lastProcessedBlockNumber`,
    ADD COLUMN `lastProcessedBlockNumberGoerli` BIGINT NOT NULL DEFAULT 0,
    ADD COLUMN `lastProcessedBlockNumberSepolia` BIGINT NOT NULL DEFAULT 0;

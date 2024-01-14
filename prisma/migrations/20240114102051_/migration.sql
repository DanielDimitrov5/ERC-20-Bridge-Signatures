/*
  Warnings:

  - You are about to drop the column `lastProcessedBlockNumber1115511` on the `ConfigurationData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ConfigurationData` DROP COLUMN `lastProcessedBlockNumber1115511`,
    ADD COLUMN `lastProcessedBlockNumber11155111` BIGINT NOT NULL DEFAULT 0;

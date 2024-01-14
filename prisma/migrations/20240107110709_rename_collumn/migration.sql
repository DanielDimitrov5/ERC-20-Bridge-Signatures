/*
  Warnings:

  - You are about to drop the column `sourceChainId` on the `MintSignature` table. All the data in the column will be lost.
  - Added the required column `targetChainId` to the `MintSignature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MintSignature` 
RENAME COLUMN `sourceChainId` TO `targetChainId`;


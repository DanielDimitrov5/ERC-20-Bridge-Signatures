/*
  Warnings:

  - You are about to alter the column `address` on the `Signatures` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(42)`.

*/
-- AlterTable
ALTER TABLE `Signatures` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `address` CHAR(42) NOT NULL;

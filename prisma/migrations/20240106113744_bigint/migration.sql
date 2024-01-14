-- AlterTable
ALTER TABLE `MintSignature` MODIFY `amount` BIGINT NOT NULL,
    MODIFY `nonce` BIGINT NOT NULL,
    MODIFY `sourceChainId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `ReleaseSignature` MODIFY `amount` BIGINT NOT NULL,
    MODIFY `nonce` BIGINT NOT NULL;

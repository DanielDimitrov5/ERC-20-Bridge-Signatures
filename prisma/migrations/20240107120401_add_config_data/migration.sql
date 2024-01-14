-- CreateTable
CREATE TABLE `ConfigurationData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lastProcessedBlockNumber` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insert
INSERT INTO `ConfigurationData` (`id`, `lastProcessedBlockNumber`) VALUES (1, 0);


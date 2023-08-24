/*
  Warnings:

  - You are about to drop the `blacklistedtokens` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `blacklistedtokens`;

-- CreateTable
CREATE TABLE `BlackListedToken` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

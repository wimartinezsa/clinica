-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
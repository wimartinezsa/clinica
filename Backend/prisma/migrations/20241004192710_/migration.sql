/*
  Warnings:

  - Added the required column `acuerdo` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `acuerdo` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_acuerdo_fkey` FOREIGN KEY (`acuerdo`) REFERENCES `Acuerdos`(`id_acuerdo`) ON DELETE RESTRICT ON UPDATE CASCADE;

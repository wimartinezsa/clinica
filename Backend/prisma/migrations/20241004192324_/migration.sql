/*
  Warnings:

  - You are about to drop the column `servicio` on the `acuerdos` table. All the data in the column will be lost.
  - Added the required column `tarifa` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `acuerdos` DROP FOREIGN KEY `Acuerdos_servicio_fkey`;

-- AlterTable
ALTER TABLE `acuerdos` DROP COLUMN `servicio`,
    ADD COLUMN `tarifa` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Acuerdos` ADD CONSTRAINT `Acuerdos_tarifa_fkey` FOREIGN KEY (`tarifa`) REFERENCES `tarifas`(`id_tarifa`) ON DELETE RESTRICT ON UPDATE CASCADE;

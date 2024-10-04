/*
  Warnings:

  - Added the required column `valor` to the `Acuerdos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `autorizacion` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precio` to the `tarifas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `acuerdos` ADD COLUMN `valor` DECIMAL(10, 2) NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `autorizacion` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `tarifas` ADD COLUMN `precio` DECIMAL(10, 2) NOT NULL;

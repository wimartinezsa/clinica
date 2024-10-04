/*
  Warnings:

  - You are about to drop the column `autorizacion` on the `procedimientos` table. All the data in the column will be lost.
  - Added the required column `factura` to the `procedimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `procedimientos` DROP COLUMN `autorizacion`,
    ADD COLUMN `factura` INTEGER NOT NULL;

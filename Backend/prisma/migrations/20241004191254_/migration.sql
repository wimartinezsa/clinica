/*
  Warnings:

  - Added the required column `tipo` to the `Empresas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empresas` ADD COLUMN `tipo` ENUM('Particular', 'Empresa', 'Eps', 'Esess') NOT NULL;

-- CreateTable
CREATE TABLE `Contratos` (
    `id_contrato` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `empresa` INTEGER NOT NULL,

    PRIMARY KEY (`id_contrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contratos` ADD CONSTRAINT `Contratos_empresa_fkey` FOREIGN KEY (`empresa`) REFERENCES `Empresas`(`id_empresa`) ON DELETE RESTRICT ON UPDATE CASCADE;

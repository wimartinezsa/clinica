/*
  Warnings:

  - Added the required column `codigo` to the `eps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `consecutivo` to the `procedimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prestador` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `eps` ADD COLUMN `codigo` VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE `procedimientos` ADD COLUMN `consecutivo` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `servicios` ADD COLUMN `prestador` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Prestadores` (
    `id_prestador` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` BIGINT NOT NULL,
    `razon_social` VARCHAR(50) NOT NULL,
    `consecutivo` INTEGER NOT NULL,

    PRIMARY KEY (`id_prestador`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresas` (
    `id_empresa` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `sigla` VARCHAR(50) NOT NULL,
    `nit` VARCHAR(530) NOT NULL,
    `estado` ENUM('Activo', 'Inactivo') NOT NULL,
    `municipio` INTEGER NOT NULL,

    PRIMARY KEY (`id_empresa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Servicios` ADD CONSTRAINT `Servicios_prestador_fkey` FOREIGN KEY (`prestador`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empresas` ADD CONSTRAINT `Empresas_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

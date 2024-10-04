-- CreateTable
CREATE TABLE `Empleados` (
    `id_empleado` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` BIGINT NOT NULL,
    `nombre` VARCHAR(30) NOT NULL,
    `cargo` VARCHAR(50) NOT NULL,
    `rol` ENUM('Administrador', 'Facturacion', 'Bacteriologo') NOT NULL,
    `password` VARCHAR(20) NOT NULL,
    `prestador` INTEGER NOT NULL,

    PRIMARY KEY (`id_empleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_prestador_fkey` FOREIGN KEY (`prestador`) REFERENCES `Prestadores`(`id_prestador`) ON DELETE RESTRICT ON UPDATE CASCADE;

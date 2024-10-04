-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_identificacion` ENUM('AS', 'CC', 'CE', 'MV', 'RC', 'TI') NOT NULL,
    `identificacion` BIGINT NOT NULL,
    `primer_nombre` VARCHAR(50) NOT NULL,
    `segundo_nombre` VARCHAR(50) NULL,
    `primer_apellido` VARCHAR(50) NOT NULL,
    `segundo_apellido` VARCHAR(50) NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `sexo` ENUM('Femenino', 'Masculino', 'Indetermidado') NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefono` VARCHAR(191) NULL,
    `tipo_usuario` ENUM('Contributivo', 'Subsidiado', 'Vinculado', 'Particular', 'Otro') NOT NULL,
    `municipio` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_identificacion_key`(`identificacion`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procedimientos` (
    `id_procedimiento` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL,
    `usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_procedimiento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `departamentos` (
    `id_departamento` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_departamento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Municipios` (
    `id_municipio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `departamento` INTEGER NOT NULL,

    PRIMARY KEY (`id_municipio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_municipio_fkey` FOREIGN KEY (`municipio`) REFERENCES `Municipios`(`id_municipio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procedimientos` ADD CONSTRAINT `procedimientos_usuario_fkey` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Municipios` ADD CONSTRAINT `Municipios_departamento_fkey` FOREIGN KEY (`departamento`) REFERENCES `departamentos`(`id_departamento`) ON DELETE RESTRICT ON UPDATE CASCADE;

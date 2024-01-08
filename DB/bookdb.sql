-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MyLibrary
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `MyLibrary` ;

-- -----------------------------------------------------
-- Schema MyLibrary
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MyLibrary` DEFAULT CHARACTER SET utf8 ;
USE `MyLibrary` ;

-- -----------------------------------------------------
-- Table `book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `book` ;

CREATE TABLE IF NOT EXISTS `book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `author` VARCHAR(45) NOT NULL,
  `genre` VARCHAR(45) NOT NULL,
  `format` VARCHAR(45) NULL,
  `length` INT NULL,
  `description` VARCHAR(400) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS mylibrary@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'mylibrary'@'localhost' IDENTIFIED BY 'books';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'mylibrary'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `book`
-- -----------------------------------------------------
START TRANSACTION;
USE `MyLibrary`;
INSERT INTO `book` (`id`, `name`, `author`, `genre`, `format`, `length`, `description`) VALUES (1, 'A wise mans fear', 'Patrick Rothfuss', 'fantasy', 'audiobook', 40, 'a very good story');
INSERT INTO `book` (`id`, `name`, `author`, `genre`, `format`, `length`, `description`) VALUES (2, 'Name of the Wind', 'Patrick Rothfuss', 'fantasy', 'audiobook', 35, 'a good story');

COMMIT;


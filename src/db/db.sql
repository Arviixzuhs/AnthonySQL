CREATE DATABASE IF NOT EXISTS anthony;

USE anthony;

CREATE TABLE
    humano (
        id INT (20) NOT NULL AUTO_INCREMENT,
        cedula int NOT NULL UNIQUE,
        nombre VARCHAR(25) DEFAULT NULL,
        apellido VARCHAR(25) DEFAULT NULL,
        PRIMARY KEY (id)
    );

DESCRIBE humano;

INSERT INTO
    humano
VALUES
    (1, 141241, "Anthonyasd", "Ramoasds"),
    (2, 789781, "Victor", "Pandolfi"),
    (3, 432342, "Jose", "Soria");

SELECT
    *
FROM
    humano;
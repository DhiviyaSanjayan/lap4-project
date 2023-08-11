DROP TYPE IF EXISTS animal_list CASCADE;

DROP TABLE IF EXISTS animal CASCADE;

DROP TABLE IF EXISTS plant CASCADE;

DROP TABLE IF EXISTS garden CASCADE;

DROP TABLE IF EXISTS display CASCADE;

DROP TABLE IF EXISTS token CASCADE;

DROP TABLE IF EXISTS user_account CASCADE;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    exp INT DEFAULT 0 NOT NULL,
    coins INT DEFAULT 0 NOT NULL,
    creation_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE plant (
    plant_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    pet_name VARCHAR(200) NOT NULL,
    plant_name VARCHAR(200) NOT NULL,
    perenual_id INT NOT NULL,
    wellbeing FLOAT NOT NULL DEFAULT 100 CHECK (
        wellbeing BETWEEN 0
        AND 100
    ),
    plant_exp INT NOT NULL DEFAULT 0,
    plant_beauty INT NOT NULL DEFAULT 1 CHECK (
        plant_beauty BETWEEN 1
        AND 10
    ),
    soil_moisture FLOAT NOT NULL DEFAULT 100 CHECK (
        soil_moisture BETWEEN 0
        AND 100
    ),
    soil_fertility FLOAT NOT NULL DEFAULT 100 CHECK (
        soil_fertility BETWEEN 0
        AND 100
    ),
    creation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (plant_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE display (
    display_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    air_quality INT NOT NULL DEFAULT 10 CHECK (
        air_quality BETWEEN 0
        AND 10
    ),
    sun_intensity INT NOT NULL DEFAULT 10 CHECK (
        sun_intensity BETWEEN 0
        AND 10
    ),
    capacity INT NOT NULL DEFAULT 5 CHECK (
        capacity BETWEEN 1
        AND 25
    ),
    pest_level FLOAT NOT NULL DEFAULT 0 CHECK (
        pest_level BETWEEN 0
        AND 10
    ),
    PRIMARY KEY (display_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TYPE animal_list AS ENUM ('Lady Bugs', 'Bees', 'Birds');

CREATE TABLE animal (
    animal_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    animal_type animal_list,
    count INT NOT NULL DEFAULT 1,
    wellbeing FLOAT NOT NULL DEFAULT 50 CHECK (
        wellbeing BETWEEN 0
        AND 100
    ),
    influence FLOAT NOT NULL DEFAULT 50 CHECK (
        influence BETWEEN 0
        AND 100
    ),
    PRIMARY KEY (animal_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

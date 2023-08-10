DROP TABLE IF EXISTS animal CASCADE;

DROP TABLE IF EXISTS plant CASCADE;

DROP TABLE IF EXISTS garden CASCADE;

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
    nickname VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL,
    trefle_id INT,
    wellbeing_rating FLOAT DEFAULT 100 CHECK (
        wellbeing_rating BETWEEN 0
        AND 100
    ),
    water_satisfaction INT DEFAULT 100 CHECK (
        water_satisfaction BETWEEN 0
        AND 100
    ),
    nutrient_satisfaction INT DEFAULT 100 CHECK (
        nutrient_satisfaction BETWEEN 0
        AND 100
    ),
    light_satisfaction INT DEFAULT 100 CHECK (
        light_satisfaction BETWEEN 0
        AND 100
    ),
    air_satisfaction INT DEFAULT 100 CHECK (
        air_satisfaction BETWEEN 0
        AND 100
    ),
    space_satisfaction INT DEFAULT 100 CHECK (
        space_satisfaction BETWEEN 0
        AND 100
    ),
    creation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_check_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_update_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (plant_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE garden (
    garden_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    weather INT NOT NULL DEFAULT 10 CHECK (
        weather BETWEEN 0
        AND 10
    ),
    soil_quality FLOAT NOT NULL DEFAULT 100 CHECK (
        soil_quality BETWEEN 0
        AND 100
    ),
    pest_level FLOAT NOT NULL DEFAULT 0 CHECK (
        pest_level BETWEEN 0
        AND 100
    ),
    water_level FLOAT NOT NULL DEFAULT 50 CHECK (
        water_level BETWEEN 0
        AND 100
    ),
    PRIMARY KEY (garden_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE animal (
    animal_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name VARCHAR(100),
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

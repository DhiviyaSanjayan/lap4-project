DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS plants;

DROP TABLE IF EXISTS plant;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS garden;

DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    exp INT DEFAULT 0 NOT NULL,
    coins INT DEFAULT 0 NOT NULL,
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
    last_update_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (plant_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TABLE garden(
    garden_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    weather INT,
    soil_quality INT,
    pest_level INT CHECK (pest_level BETWEEN 0 AND 100),
    water_level INT,
    PRIMARY KEY (garden_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);    

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
    water_satisfaction FLOAT NOT NULL DEFAULT 100 CHECK (
        water_satisfaction BETWEEN 0
        AND 100
    ),
    nutrient_satisfaction FLOAT NOT NULL DEFAULT 100 CHECK (
        nutrient_satisfaction BETWEEN 0
        AND 100
    ),
    light_satisfaction FLOAT NOT NULL DEFAULT 100 CHECK (
        light_satisfaction BETWEEN 0
        AND 100
    ),
    air_satisfaction FLOAT NOT NULL DEFAULT 100 CHECK (
        air_satisfaction BETWEEN 0
        AND 100
    ),
    space_satisfaction FLOAT NOT NULL DEFAULT 100 CHECK (
        space_satisfaction BETWEEN 0
        AND 100
    ),
    creation_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- the password is 1
INSERT INTO
    user_account (username, password)
VALUES
    (
        'cors',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC'
    );

INSERT INTO
    animal (user_id, name, wellbeing, influence)
VALUES
    (1, 'bird', 100, 10);

INSERT INTO
    plant (user_id, nickname, name, trefle_id)
VALUES
    (1, 'Steven', 'Rubus arcticus', 266630);

INSERT INTO plant (user_id, nickname, name, trefle_id, wellbeing_rating, water_satisfaction, nutrient_satisfaction, light_satisfaction, air_satisfaction, space_satisfaction)
VALUES
    (1, 'Plant 1', 'Sunflower', 123, 90, 80, 95, 70, 85, 90),
    (1, 'Plant 2', 'Rose', 456, 85, 70, 80, 90, 75, 80),
    (1, 'Plant 3', 'Lavender', 789, 95, 90, 75, 85, 80, 95);

INSERT INTO animal (user_id, name, wellbeing, influence)
VALUES
    (1, 'Dog', 85, 5),
    (1, 'Cat', 80, 4),
    (1, 'Parrot', 90, 3);

INSERT INTO garden (user_id, name, weather, soil_quality, pest_level, water_level)
VALUES
    (1, 'My Garden', 2, 3, 50, 70);

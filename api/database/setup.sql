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
    pic_filename VARCHAR NOT NULL,
    wellbeing FLOAT NOT NULL DEFAULT 100 CHECK (
        wellbeing BETWEEN 0
        AND 100
    ),
    plant_exp INT NOT NULL DEFAULT 0,
    plant_beauty INT NOT NULL DEFAULT 1 CHECK (
        plant_beauty BETWEEN 1
        AND 10
    ),
    soil_moisture FLOAT NOT NULL DEFAULT 50 CHECK (
        soil_moisture BETWEEN 0
        AND 100
    ),
    soil_fertility FLOAT NOT NULL DEFAULT 50 CHECK (
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
    weather INT NOT NULL DEFAULT 10 CHECK (
        weather BETWEEN 0
        AND 10
    ),
    capacity INT NOT NULL DEFAULT 5 CHECK (
        capacity BETWEEN 1
        AND 25
    ),
    pest_level FLOAT NOT NULL DEFAULT 0 CHECK (
        pest_level BETWEEN 0
        AND 100
    ),
    PRIMARY KEY (display_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

CREATE TYPE animal_list AS ENUM ('Lady Bugs', 'Bees', 'Birds');

CREATE TABLE animal (
    animal_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    animal_type animal_list NOT NULL,
    count INT NOT NULL DEFAULT 1,
    wellbeing FLOAT NOT NULL DEFAULT 50 CHECK (
        wellbeing BETWEEN 0
        AND 100
    ),
    influence FLOAT NOT NULL DEFAULT 50 CHECK (
        influence BETWEEN 0
        AND 100
    ),
    info VARCHAR,
    PRIMARY KEY (animal_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

-- the password is 1
INSERT INTO
    user_account (username, password, exp, coins)
VALUES
    (
        'cors',
        '$2b$10$.pj1LTt4HxpVVg6fZDhdFOMBfiywBTikuDqx3KjDy85aJNyZ4IoJC',
        1000000,
        90000
    );

INSERT INTO
    animal (user_id, animal_type, wellbeing, count, influence, info)
VALUES
    (1, 'Birds', 100, 5, 60, 'They improve the wellbeing of your plants by singing to them'),
    (1, 'Bees', 85, 60, 10, 'The pollinate your plant allowing them to grow better'),
    (1, 'Lady Bugs', 85, 100, 50, 'They feed on the bugs which damage your plants');

INSERT INTO
    plant (user_id, pet_name, plant_name, perenual_id, pic_filename)
VALUES
    (1, 'Steven', 'European Silver Fir', 1, 'cartoon--rose.png'),
    (1, 'Jason', 'windflower', 808, 'cartoon--rose.png'),
    (1, 'Barbara', 'African daisy', 924, 'cartoon--rose.png'),
    (1, 'Rebecca', 'Dahlia', 2301, 'cartoon--rose.png');

INSERT INTO
    display (
        user_id,
        name,
        weather,
        pest_level
    )
VALUES
    (1, 'Harmony Meadows', 6, 56);

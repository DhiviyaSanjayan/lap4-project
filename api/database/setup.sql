DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS plants;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS user_account;

DROP TABLE IF EXISTS garden;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
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

-- CREATE TABLE plants (
--     plant_id INT GENERATED ALWAYS AS IDENTITY,
--     plant_name VARCHAR(200) UNIQUE NOT NULL,
--     image VARCHAR(200) NULL,
--     user_id INT NOT NULL,
--     PRIMARY KEY (plant_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );


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
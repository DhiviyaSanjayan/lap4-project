DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS user_account;

DROP TABLE IF EXISTS animal;

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

CREATE TABLE animal (
    animal_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    name VARCHAR(100),
    wellbeing INT CHECK (wellbeing >= 1 AND wellbeing <= 100),
    influence INT CHECK (influence >= 1 AND influence <= 10),
    PRIMARY KEY (animal_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);

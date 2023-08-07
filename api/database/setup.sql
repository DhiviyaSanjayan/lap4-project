DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password CHAR(60) UNIQUE NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO users (first_name, last_name, email, password)
VALUES ('Nastasia', 'Smith', 'nsm@mail.com', '123'),
       ('Tom', 'Jerry', 'tom@mail.com', '789');

-- CREATE TABLE plants (
--     plant_id INT GENERATED ALWAYS AS IDENTITY,
--     plant_name VARCHAR(200) UNIQUE NOT NULL,
--     image VARCHAR(200) NULL,
--     user_id INT NOT NULL,
--     PRIMARY KEY (plant_id),
--     FOREIGN KEY (user_id) REFERENCES users(user_id)

-- );

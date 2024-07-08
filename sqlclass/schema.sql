-- SHOW TABLES;
-- -- To use the sql from sql file contaiing the query we use source filename.sql
CREATE TABLE user(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL
)
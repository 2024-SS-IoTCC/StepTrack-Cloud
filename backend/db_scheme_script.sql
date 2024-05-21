-- Create DB and table (including indexes)
CREATE DATABASE step_data;
USE step_data;
CREATE TABLE steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    steps INT,
    start datetime,
    end datetime,
    INDEX (username),
    INDEX (start),
    INDEX (end)
);
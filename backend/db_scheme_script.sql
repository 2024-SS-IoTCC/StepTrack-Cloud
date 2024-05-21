-- Create DB and table (including indexes)
DROP DATABASE IF EXISTS step_data;
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
-- Grant permission to user "iotcc"
GRANT ALL PRIVILEGES ON step_data.* TO 'iotcc'@'localhost';
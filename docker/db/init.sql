-- init.sql

CREATE DATABASE IF NOT EXISTS loveero;

-- ユーザー作成（MySQL 8.0以降）
CREATE USER IF NOT EXISTS 'loveero_user'@'%' IDENTIFIED BY 'loveero_pass';
CREATE USER IF NOT EXISTS 'loveero_user'@'localhost' IDENTIFIED BY 'loveero_pass';

-- ユーザーに権限付与（ユーザー作成後に実行）
GRANT ALL PRIVILEGES ON loveero.* TO 'loveero_user'@'%';
GRANT ALL PRIVILEGES ON loveero.* TO 'loveero_user'@'localhost';

GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'loveero_user'@'%';
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'loveero_user'@'localhost';

FLUSH PRIVILEGES;
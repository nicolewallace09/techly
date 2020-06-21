-- For Testing locally ONLY:
--------------------------------------------------------
-- Run this seeds.sql script to seed the tables 
-- Note, once running in Heroku, the tables will be empty
-- You'll need to seed the tables via MySQL Workbench

-- Other:
------------
-- check tables in mysql command line after running NPM START
-- seed tables
-- in bash, CD db, then create a backup:  mydump -u root -p  techly_db   >  techly_db.sql
-- Login into MySQL command line: $ mysql -u root -p

show tables;

-- expected result
-- +---------------------+
-- | Tables_in_techly_db |
-- +---------------------+
-- | comment             |
-- | post                |
-- | session             |
-- | user                |
-- | vote                |
-- +---------------------+

-- view table schema
describe comment;describe post;describe session;describe user;describe vote;

-- expected results:

-- mysql> describe comment;describe post;describe session;describe user;describe vote;

-- comment table
-- +--------------+--------------+------+-----+---------+----------------+
-- | Field        | Type         | Null | Key | Default | Extra          |
-- +--------------+--------------+------+-----+---------+----------------+
-- | id           | int          | NO   | PRI | NULL    | auto_increment |
-- | comment_text | varchar(255) | NO   |     | NULL    |                |
-- | user_id      | int          | NO   | MUL | NULL    |                |
-- | post_id      | int          | NO   | MUL | NULL    |                |
-- | created_at   | datetime     | NO   |     | NULL    |                |
-- | updated_at   | datetime     | NO   |     | NULL    |                |
-- +--------------+--------------+------+-----+---------+----------------+
-- 6 rows in set (0.00 sec)

-- post table
-- +------------+--------------+------+-----+---------+----------------+
-- | Field      | Type         | Null | Key | Default | Extra          |
-- +------------+--------------+------+-----+---------+----------------+
-- | id         | int          | NO   | PRI | NULL    | auto_increment |
-- | title      | varchar(255) | NO   |     | NULL    |                |
-- | post_text  | varchar(255) | NO   |     | NULL    |                |
-- | user_id    | int          | YES  | MUL | NULL    |                |
-- | created_at | datetime     | NO   |     | NULL    |                |
-- | updated_at | datetime     | NO   |     | NULL    |                |
-- +------------+--------------+------+-----+---------+----------------+
-- 6 rows in set (0.00 sec)

-- session table

-- +-----------+-------------+------+-----+---------+-------+
-- | Field     | Type        | Null | Key | Default | Extra |
-- +-----------+-------------+------+-----+---------+-------+
-- | sid       | varchar(36) | NO   | PRI | NULL    |       |
-- | expires   | datetime    | YES  |     | NULL    |       |
-- | data      | text        | YES  |     | NULL    |       |
-- | createdAt | datetime    | NO   |     | NULL    |       |
-- | updatedAt | datetime    | NO   |     | NULL    |       |
-- +-----------+-------------+------+-----+---------+-------+
-- 5 rows in set (0.00 sec)

-- user  table
-- +----------+--------------+------+-----+---------+----------------+
-- | Field    | Type         | Null | Key | Default | Extra          |
-- +----------+--------------+------+-----+---------+----------------+
-- | id       | int          | NO   | PRI | NULL    | auto_increment |
-- | username | varchar(255) | NO   |     | NULL    |                |
-- | email    | varchar(255) | NO   | UNI | NULL    |                |
-- | password | varchar(255) | NO   |     | NULL    |                |
-- | github   | varchar(255) | YES  |     | NULL    |                |
-- | linkedin | varchar(255) | YES  |     | NULL    |                |
-- | bio      | text         | YES  |     | NULL    |                |
-- +----------+--------------+------+-----+---------+----------------+
-- 7 rows in set (0.00 sec)

-- vote table
-- +---------+------+------+-----+---------+----------------+
-- | Field   | Type | Null | Key | Default | Extra          |
-- +---------+------+------+-----+---------+----------------+
-- | id      | int  | NO   | PRI | NULL    | auto_increment |
-- | user_id | int  | NO   | MUL | NULL    |                |
-- | post_id | int  | NO   | MUL | NULL    |                |
-- +---------+------+------+-----+---------+----------------+
-- 3 rows in set (0.00 sec)


-- insert sample data into tables:

------------------------------------------------------------------

-- INSERT INTO USER TABLE
INSERT INTO `user` VALUES (1,'Lenny','lenny@gmail.com','$2b$10$3WVxxkG5bLH648VW8XEm3.q.3oswwl.iwhwKUyFfeO7Dt1ZO3dUPG',NULL,NULL,NULL);
INSERT INTO `user` VALUES (1,'Sue','sue@gmail.com','$2b$10$aut3PiaABoh2ZRstMLkJeeLt5xRKF47pPZ8LtSc/HIWBsp3ODWPeu',NULL,NULL,NULL);


-- same POST value in Insomnia http://localhost:3001/api/users
-- {
--   "id": 1,
--   "username": "Lenny",
--   "email": "lenny@gmail.com",
--   "password": "$2b$10$8b.WI48uWpMzvpwhtMFIRuM3AxgvbhV3b1zQwVlwTiWd.yZy6b6CG"
-- }

-- GET value http://localhost:3001/api/users
-- [
--   {
--     "id": 1,
--     "username": "Lenny",
--     "email": "lenny@gmail.com",
--     "password": "$2b$10$8b.WI48uWpMzvpwhtMFIRuM3AxgvbhV3b1zQwVlwTiWd.yZy6b6CG",
--     "github": null,
--     "linkedin": null,
--     "bio": null
--   }
-- ]

-- mysql db result
-- mysql> select * from user;
-- +----+----------+-----------------+--------------------------------------------------------------+--------+----------+------+
-- | id | username | email           | password                                                     | github | linkedin | bio  |
-- +----+----------+-----------------+--------------------------------------------------------------+--------+----------+------+
-- |  1 | Lenny    | lenny@gmail.com | $2b$10$3WVxxkG5bLH648VW8XEm3.q.3oswwl.iwhwKUyFfeO7Dt1ZO3dUPG | NULL   | NULL     | NULL |
-- +----+----------+-----------------+--------------------------------------------------------------+--------+----------+------+
-- 1 row in set (0.00 sec)


-- #2 POST http://localhost:3001/api/users

--   {
--     "username": "Sue",
--     "email": "sue@gmail.com",
-- 		"password":"1234"
--   }

-- GET http://localhost:3001/api/users

-- [
--   {
--     "id": 1,
--     "username": "Lenny",
--     "email": "lenny@gmail.com",
--     "password": "$2b$10$3WVxxkG5bLH648VW8XEm3.q.3oswwl.iwhwKUyFfeO7Dt1ZO3dUPG",
--     "github": null,
--     "linkedin": null,
--     "bio": null
--   },
--   {
--     "id": 2,
--     "username": "Sue",
--     "email": "sue@gmail.com",
--     "password": "$2b$10$nOmdjPR9V1ZysB6twHmBLuWlURZYePG28e69.G4HhdHH5.8KZVrHi",
--     "github": null,
--     "linkedin": null,
--     "bio": null
--   }
-- ]

------------------------------------------------------------------

-- INSERT INTO POST TABLE

INSERT INTO `post` VALUES (1,'testing1','https://testing.com/press',1,'2020-06-21 09:28:43','2020-06-21 09:28:43');


-- Insomnia POST http://localhost:3001/api/posts
-- {
--   "title": "testing1",
--   "post_text": "https://testing.com/press",
--   "user_id": 1
-- }


-- Insomnia result
-- {
--   "id": 1,
--   "title": "testing1",
--   "post_text": "https://testing.com/press",
--   "user_id": 1,
--   "updatedAt": "2020-06-21T09:28:43.768Z",
--   "createdAt": "2020-06-21T09:28:43.768Z"
-- }

-- db result
-- mysql> select * from post;
-- +----+----------+---------------------------+---------+---------------------+---------------------+
-- | id | title    | post_text                 | user_id | created_at          | updated_at          |
-- +----+----------+---------------------------+---------+---------------------+---------------------+
-- |  1 | testing1 | https://testing.com/press |       1 | 2020-06-21 09:28:43 | 2020-06-21 09:28:43 |
-- +----+----------+---------------------------+---------+---------------------+---------------------+
-- 1 row in set (0.00 sec)
------------------------------------------------------------------

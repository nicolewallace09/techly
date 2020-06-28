-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: techly_db
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment_text` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'That may be there are no tables created. Try to recreate tables in Heroku, and redeploy',1,1,'2020-06-24 06:59:34','2020-06-24 06:59:34'),(2,'Try: git add -A and git commit -m prior to running git push heroku master',6,3,'2020-06-24 07:08:13','2020-06-24 07:08:13'),(3,'Thanks, that worked!!',5,3,'2020-06-24 07:09:19','2020-06-24 07:09:19'),(4,'Congrats!',1,4,'2020-06-24 07:11:11','2020-06-24 07:11:11'),(5,'Locally restart your Express server or npm start in bash.',4,7,'2020-06-27 23:48:05','2020-06-27 23:48:05'),(6,'Thanks, post and response helped me!',4,1,'2020-06-27 23:48:36','2020-06-27 23:48:36'),(7,'Cool!',1,3,'2020-06-28 01:52:36','2020-06-28 01:52:36'),(8,'Use a map function here is a useful link https://stackoverflow.com/questions/21961818/sequelize-convert-entity-to-plain-object',8,8,'2020-06-28 09:04:56','2020-06-28 09:04:56'),(9,'Thank, Jun! The link had the map function used with cast and plain: true to resolve my findAll. Thanks!!',7,8,'2020-06-28 09:08:21','2020-06-28 09:08:21');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_text` varchar(255) NOT NULL,
  `user_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Insomnia is giving me this error: 503 service unavailable, any ideas?',2,'2020-06-24 06:58:03','2020-06-24 06:58:03'),(2,'Thanks, Ed, that helped!  ',2,'2020-06-24 07:00:45','2020-06-24 07:00:45'),(3,'Anyone had this error on Heroku logs tail?  This page isn?t workingtechly.herokuapp.com didn?t send any data. ERR_EMPTY_RESPONSE',5,'2020-06-24 07:04:11','2020-06-24 07:04:11'),(4,'Techly is live!',4,'2020-06-24 07:10:44','2020-06-24 07:10:44'),(5,'Run Buddy is live!',1,'2020-06-25 09:53:45','2020-06-25 09:53:45'),(6,'Bamboo works great!',1,'2020-06-26 04:07:12','2020-06-26 04:07:12'),(7,'Can anyone help with this error when working locally - This site can’t be reached localhost refused to connect. ',1,'2020-06-27 23:29:21','2020-06-27 23:29:21'),(8,'The findAll within my route is not working when querying the db through the Sequelize ORM.  I am getting to many results.',7,'2020-06-28 09:01:28','2020-06-28 09:01:28');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('828Jmr4vggPcUaeK0GKpvw3qKMOYuJwm','2020-06-29 01:09:11','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"Ed\",\"loggedIn\":true}','2020-06-28 00:43:42','2020-06-28 01:09:11'),('mdb2h5YM7NBXThBx5_cOzSU45gxW0u68','2020-06-28 23:48:43','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":4,\"username\":\"Sonia\",\"loggedIn\":true}','2020-06-27 23:47:40','2020-06-27 23:48:43'),('o0r7D6jk8q6sXo77vC2h9tQfSajSOtvv','2020-06-29 02:01:18','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"Ed\",\"loggedIn\":true}','2020-06-28 01:51:56','2020-06-28 02:01:18'),('qU0Egtuo4-PNfRFlcsH4itiqqj3AXtsf','2020-06-29 09:58:18','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2020-06-28 09:24:20','2020-06-28 09:58:18'),('Wop8q-GfqU8HU1orrkXxhGj7k2FR0yLt','2020-06-29 10:22:58','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2020-06-28 10:22:58','2020-06-28 10:22:58');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `github` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `bio` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ed','ed@gmail.com','$2b$10$G8IhpFr58MKzznDKWst.t.p665UiBcuuyp/MYM5kmX6xsvLtT1jF2','','',''),(2,'Mary','mary@gmail.com','$2b$10$BcjfANEtxK7gTwBgpKR7aOVXgIrBu3N1lCkPNvsTLz99aWkp7jo8m','','',''),(3,'Safron','safron@gmail.com','$2b$10$dVM3vKf5OAzkjVTm8tYm3ePX5GCJlresYg4vzp9fxWHx1jdunudky','','',''),(4,'Sonia','sonia@company.ca','$2b$10$4zcnvNjRaIZn29MpB5Prz.uqHFvrOgSifC0MBNIjLO7ULYi1WxYba','','',''),(5,'Fred','fred@live.com','$2b$10$lxuXdHIqiy3H5mtXZSm7HeQW1IOqlwf1LenN4t8FDld1h3S0L/IBm','','',''),(6,'Sue','sue@techshop.com','$2b$10$0iVFEoA633M5.NTQeD8uAeixzV1b7Yh8XWGR3YKom1hTyTDGEdY3m','','',''),(7,'Roger','roger@sound.com','$2b$10$lsGIxaYTA6emdfFrpvydk.g/FwrEwbxHSQgQUXRHfnO4pDQ5csFyC','https://github.com/rogersound/sample','https://github.com/rogersound/sample','Full Stack Developer at Cloud ZonSoft.'),(8,'Jun','junhana@seataca.com','$2b$10$Ka5/YM.xxmZbSxChRZni6O4fN0bZYp9bF9h1T8uvEmMTI2WQB4WYC','github.com/junhanna','github.com/junhanna','Frontend developer living within the Puget Sound in the northwest.');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `post_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vote_post_id_user_id_unique` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `vote_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vote_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (6,1,3),(4,1,4),(1,2,2),(5,4,1),(3,5,3),(8,7,8),(7,8,8);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-28  3:28:25

-- MariaDB dump 10.19  Distrib 10.11.5-MariaDB, for Win64 (AMD64)
--
-- Host: j9a103.p.ssafy.io    Database: daengdb
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB-1:11.1.2+maria~ubu2204

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `keyword`
--

DROP TABLE IF EXISTS `keyword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `keyword` (
  `keyword_id` int(11) NOT NULL AUTO_INCREMENT,
  `keyword` varchar(30) NOT NULL,
  `category_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`keyword_id`),
  KEY `FKse6wgrjrgucgx8ilwrk43a4rr` (`category_id`),
  CONSTRAINT `FKse6wgrjrgucgx8ilwrk43a4rr` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `keyword`
--

LOCK TABLES `keyword` WRITE;
/*!40000 ALTER TABLE `keyword` DISABLE KEYS */;
INSERT INTO `keyword` VALUES
(1,'쾌적해요',1),
(2,'뛰어놀기 좋아요',1),
(3,'친절해요',1),
(4,'청결해요',1),
(5,'주차하기 좋아요',1),
(6,'가격이 좋아요',1),
(7,'청결해요',2),
(8,'친절해요',2),
(9,'빨라요',2),
(10,'실력이 좋아요',2),
(11,'주차하기 좋아요',2),
(12,'가격이 명확해요',2),
(13,'청결해요',3),
(14,'친절해요',3),
(15,'빨라요',3),
(16,'다양해요',3),
(17,'주차하기 좋아요',3),
(18,'가격이 좋아요',3),
(19,'맛있어요',4),
(20,'청결해요',4),
(21,'분위기가 좋아요',4),
(22,'친절해요',4),
(23,'가격이 좋아요',4),
(24,'주차하기 좋아요',4),
(25,'편안해요',5),
(26,'친절해요',5),
(27,'깨끗해요',5),
(28,'접근성이 좋아요',5),
(29,'가격이 좋아요',5),
(30,'주차하기 좋아요',5);
/*!40000 ALTER TABLE `keyword` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06  9:50:27

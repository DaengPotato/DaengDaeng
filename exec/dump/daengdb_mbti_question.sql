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
-- Table structure for table `mbti_question`
--

DROP TABLE IF EXISTS `mbti_question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mbti_question` (
  `question_id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `answera` varchar(255) NOT NULL,
  `answerb` varchar(255) NOT NULL,
  `question` varchar(255) NOT NULL,
  `type_id` tinyint(4) NOT NULL,
  PRIMARY KEY (`question_id`),
  KEY `FK1lqj8482fxa99pnibmnjrq7nn` (`type_id`),
  CONSTRAINT `FK1lqj8482fxa99pnibmnjrq7nn` FOREIGN KEY (`type_id`) REFERENCES `mbti_type` (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mbti_question`
--

LOCK TABLES `mbti_question` WRITE;
/*!40000 ALTER TABLE `mbti_question` DISABLE KEYS */;
INSERT INTO `mbti_question` VALUES
(1,'나는 물 싫어.. 무서워(크으응)','물 좋아!!! 아싸','목욕을 하자고 할 때,',1),
(2,'꺼내줘ㅠㅠ','퐁당!','물 웅덩이에 장난감이 빠졌다.',1),
(3,'끄응...헥헥','폴폴폴폴','물 속에서 나는',1),
(4,'산책 좋아 (폴짝폴짝)','귀찮아…','산책을 할 때',2),
(5,'주인 날 잡지마 (와다다)','우와... 초원이다...(어쩌라고)','드넓은 초원을 마주했을 때',2),
(6,'(벌떡) 문앞으로 나간다.','(쿨쿨) …','(자고있을 때) 산책갈까?',2),
(7,'친구 하자! 다가가기','왈왈! 너 누구야?!','처음 만나는 강아지가 있을 때',3),
(8,'이게 뭐야? 여기저기 탐색하기','아르르... 경계하기','낯선 장소에 갔을 때',3),
(9,'우왕.. 여기 최고야 또 오자(폴짝폴짝)','도망갈래.. 나 좀 안아줘ㅠ','강아지가 많은 장소에 갔을 때',3),
(10,'호다닥 뛰어간다','언제 오나 지켜본다','주인이 다가오면',4),
(11,'뛰어 놀아 (뛰뛰)','바닥 좋아 (눕눕)','심심할 때 나는',4),
(12,'안돼! 멈춰!','어딨니~?','내가 안보일 때 주인이 나에게 하는 말은?',4);
/*!40000 ALTER TABLE `mbti_question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-06  9:50:26

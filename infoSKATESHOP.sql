-- MySQL dump 10.13  Distrib 8.0.27, for Linux (x86_64)
--
-- Host: localhost    Database: infoSKATESHOP
-- ------------------------------------------------------
-- Server version	8.0.27-0ubuntu0.21.10.1

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
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `telephone` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_b48860677afe62cd96e1265948` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES ('19afeaee-ee01-4257-980f-48b40b1cfe92','João Pedro','joaojoaojoao@gmail.com','$2b$10$L/e5lEH/ibvmc4bGYle6v.f8yW0obu/l/OuVNQqSCHDELpgCqdSw2','Rua Tenente Fernando Tuy, 56','Apto 1401 Torre B',123456789),('2bb68e81-62eb-471b-9bba-fa31402398f4','Carlos Eduardo','ce.cesc01@gmail.com','$2b$10$ee1mJxdzP1paHao7BgH8KeasF.ZJIz0CK.gxSe1qpnYQHMlTz9QH.','Rua Tenente Fernando Tuy, 56','Apto 1403 Torre B',9999999),('d3bf09c8-b188-425d-a12c-4577395900f4','Maria Antonia','maria@gmail.com','$2b$10$0t1rnUsloK4EXsxK15bZ4epkzHkvKqLAhdbisOVBP80ASuZBKeI46','Rua 12','Apto 1402 Torre A',123456780),('faa589c8-cc98-48bf-b153-54528ca46bed','Nathalia Tomita','nathalia@gmail.com','$2b$10$DHH2o2w3Ta7TcTEaSwecsevBsJ/IHwgIV3GMkDCvFB6FVWw6E8reK','Rua Tenente Fernando Tuy, 56','Apto 1404 Torre B',123456789);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` varchar(36) NOT NULL,
  `isPaid` tinyint NOT NULL DEFAULT '0',
  `amount` int NOT NULL,
  `clientId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1457f286d91f271313fded23e53` (`clientId`),
  KEY `FK_8624dad595ae567818ad9983b33` (`productId`),
  CONSTRAINT `FK_1457f286d91f271313fded23e53` FOREIGN KEY (`clientId`) REFERENCES `clients` (`id`),
  CONSTRAINT `FK_8624dad595ae567818ad9983b33` FOREIGN KEY (`productId`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES ('03cbd60f-e510-4ae9-a543-0e70cae2e8fc',0,1,'d3bf09c8-b188-425d-a12c-4577395900f4','855c53fa-311b-4410-afed-29c0c5e9dac6'),('ed24001b-282d-4305-830c-883386ccf715',0,2,'2bb68e81-62eb-471b-9bba-fa31402398f4','a345798d-8ebb-4b5b-bc5d-b7af2250073d');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `amountInStock` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('11785d9f-3540-44c5-b6f0-babcfba83155','shape nacional',100,'Shape de madeira nacional',10),('855c53fa-311b-4410-afed-29c0c5e9dac6','lixa',70,NULL,24),('a345798d-8ebb-4b5b-bc5d-b7af2250073d','shape nacional',100,'Shape de madeira nacional',8),('ed8e5adb-a760-40e2-ac0f-5ad6bc4a963e','shape maple',300,'Shape de madeira canadense',6);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-24 14:42:21

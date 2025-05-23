-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: mindblogdb
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `author_id` int NOT NULL,
  `published_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_312c63be865c81b922e39c2475e` (`author_id`),
  CONSTRAINT `FK_312c63be865c81b922e39c2475e` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Meu Primeiro Post no Blog','Este é o conteúdo do meu primeiro post no blog, cheio de informações interessantes.',5,'2025-05-22 00:59:21.462978','2025-05-22 00:59:21.462978'),(2,'Meu Primeiro Post no Blog','Este é o conteúdo do meu primeiro post no blog, cheio de informações interessantes.',5,'2025-05-22 22:28:06.666057','2025-05-22 22:28:06.666057'),(3,'Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales leo nisi, at scelerisque metus pharetra sed. Nulla eu efficitur dolor. Integer sit amet dui ornare, tempor risus a, vestibulum purus. Morbi lacus magna, molestie varius elit a, dignissim volutpat dui. Nam sit amet sem condimentum, hendrerit tortor nec, ultricies eros. Curabitur eget sodales odio, non tempor ex. Vestibulum id fringilla est. Praesent id urna nisi. Phasellus ac odio eros. Vestibulum dictum erat nibh, vel placerat est condimentum vel. Phasellus malesuada, leo et commodo hendrerit, nisi tortor tincidunt ipsum, ut tincidunt enim sapien vel neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus eu auctor felis. Proin vitae malesuada mauris. Morbi quis ex ligula. Aenean consectetur mauris non iaculis porta. Nunc ultrices, mauris tincidunt pulvinar scelerisque, dolor est condimentum metus, ut interdum est nisl ut ante. Cras rhoncus lacus eu finibus convallis. Ut varius lacus eros, eget suscipit odio aliquet nec. Nam sem eros, ornare ac erat eu, pharetra finibus ex. Donec in massa vitae lectus blandit posuere. Cras ut risus id metus mattis dictum. Pellentesque at urna feugiat, accumsan diam vel, condimentum mi. Fusce ac semper arcu, vel pellentesque ante. Aenean et volutpat orci. Donec vitae feugiat odio. Aenean vel luctus sem, vitae cursus urna. Suspendisse consectetur urna vitae aliquam ornare. Donec mattis nisl id lectus sollicitudin, pulvinar dictum velit lacinia. Quisque finibus justo a nibh rhoncus, a efficitur purus maximus. Etiam posuere libero id fringilla maximus. Morbi molestie quam fermentum dolor hendrerit condimentum. Suspendisse accumsan semper pretium. Donec nisi lacus, feugiat eu sem at, pretium consequat dolor. Integer commodo massa nisi, quis viverra massa interdum ac. Ut commodo et magna vel lobortis. Nullam varius enim nec ultricies lacinia. Proin egestas tempus est. Cras ac ex ac ex auctor semper ac quis metus. Praesent et tempus nibh. Nam a efficitur risus. Cras nibh ex, lobortis at aliquam et, varius vitae turpis. Duis consequat velit varius velit mattis, non maximus est elementum. Donec vel tellus cursus enim posuere tempus ac at velit. Maecenas quis eros purus. Proin vulputate ante vitae placerat varius. Maecenas vitae ligula nec tortor tempor lobortis non quis velit. Sed vulputate et erat id laoreet. Etiam erat mi, bibendum non mauris id, aliquet malesuada urna. Nam ex est, vehicula eget consequat in, bibendum ac elit. Fusce porta pellentesque placerat. Suspendisse potenti. Sed pulvinar facilisis libero vitae gravida. Nam quis pellentesque sapien. Pellentesque venenatis vel ipsum tincidunt hendrerit. Vestibulum eleifend erat nec sem aliquam, aliquet lacinia est congue. Fusce a nisl non massa congue vestibulum sed nec nisl. Vestibulum id maximus nibh. Aliquam ante sapien, dapibus ac vestibulum interdum, lacinia vitae mauris. Etiam non posuere orci, non semper risus. Aenean non facilisis urna. Praesent ut dui nibh. Morbi lacus dolor, egestas facilisis pellentesque in, cursus pretium ligula. Praesent rutrum turpis in nisl blandit, a euismod lectus suscipit. Vivamus ut ullamcorper odio, vel vulputate lacus.',6,'2025-05-22 23:36:39.632753','2025-05-22 23:36:39.632753'),(4,'Dominando TypeScript: Por que a Tipagem Estática Está Transformando o Desenvolvimento JavaScript','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales leo nisi, at scelerisque metus pharetra sed. Nulla eu efficitur dolor. Integer sit amet dui ornare, tempor risus a, vestibulum purus. Morbi lacus magna, molestie varius elit a, dignissim volutpat dui. Nam sit amet sem condimentum, hendrerit tortor nec, ultricies eros. Curabitur eget sodales odio, non tempor ex. Vestibulum id fringilla est. Praesent id urna nisi. Phasellus ac odio eros. Vestibulum dictum erat nibh, vel placerat est condimentum vel. Phasellus malesuada, leo et commodo hendrerit, nisi tortor tincidunt ipsum, ut tincidunt enim sapien vel neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus eu auctor felis. Proin vitae malesuada mauris. Morbi quis ex ligula. Aenean consectetur mauris non iaculis porta. Nunc ultrices, mauris tincidunt pulvinar scelerisque, dolor est condimentum metus, ut interdum est nisl ut ante. Cras rhoncus lacus eu finibus convallis. Ut varius lacus eros, eget suscipit odio aliquet nec. Nam sem eros, ornare ac erat eu, pharetra finibus ex. Donec in massa vitae lectus blandit posuere. Cras ut risus id metus mattis dictum. Pellentesque at urna feugiat, accumsan diam vel, condimentum mi. Fusce ac semper arcu, vel pellentesque ante. Aenean et volutpat orci. Donec vitae feugiat odio. Aenean vel luctus sem, vitae cursus urna. Suspendisse consectetur urna vitae aliquam ornare. Donec mattis nisl id lectus sollicitudin, pulvinar dictum velit lacinia. Quisque finibus justo a nibh rhoncus, a efficitur purus maximus. Etiam posuere libero id fringilla maximus. Morbi molestie quam fermentum dolor hendrerit condimentum. Suspendisse accumsan semper pretium. Donec nisi lacus, feugiat eu sem at, pretium consequat dolor. Integer commodo massa nisi, quis viverra massa interdum ac. Ut commodo et magna vel lobortis. Nullam varius enim nec ultricies lacinia. Proin egestas tempus est. Cras ac ex ac ex auctor semper ac quis metus. Praesent et tempus nibh. Nam a efficitur risus. Cras nibh ex, lobortis at aliquam et, varius vitae turpis. Duis consequat velit varius velit mattis, non maximus est elementum. Donec vel tellus cursus enim posuere tempus ac at velit. Maecenas quis eros purus. Proin vulputate ante vitae placerat varius. Maecenas vitae ligula nec tortor tempor lobortis non quis velit. Sed vulputate et erat id laoreet. Etiam erat mi, bibendum non mauris id, aliquet malesuada urna. Nam ex est, vehicula eget consequat in, bibendum ac elit. Fusce porta pellentesque placerat. Suspendisse potenti. Sed pulvinar facilisis libero vitae gravida. Nam quis pellentesque sapien. Pellentesque venenatis vel ipsum tincidunt hendrerit. Vestibulum eleifend erat nec sem aliquam, aliquet lacinia est congue. Fusce a nisl non massa congue vestibulum sed nec nisl. Vestibulum id maximus nibh. Aliquam ante sapien, dapibus ac vestibulum interdum, lacinia vitae mauris. Etiam non posuere orci, non semper risus. Aenean non facilisis urna. Praesent ut dui nibh. Morbi lacus dolor, egestas facilisis pellentesque in, cursus pretium ligula. Praesent rutrum turpis in nisl blandit, a euismod lectus suscipit. Vivamus ut ullamcorper odio, vel vulputate lacus.',6,'2025-05-22 23:58:54.771753','2025-05-22 23:58:54.771753'),(5,'Titulo 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sodales leo nisi, at scelerisque metus pharetra sed. Nulla eu efficitur dolor. Integer sit amet dui ornare, tempor risus a, vestibulum purus. Morbi lacus magna, molestie varius elit a, dignissim volutpat dui. Nam sit amet sem condimentum, hendrerit tortor nec, ultricies eros. Curabitur eget sodales odio, non tempor ex. Vestibulum id fringilla est. Praesent id urna nisi. Phasellus ac odio eros. Vestibulum dictum erat nibh, vel placerat est condimentum vel. Phasellus malesuada, leo et commodo hendrerit, nisi tortor tincidunt ipsum, ut tincidunt enim sapien vel neque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus eu auctor felis. Proin vitae malesuada mauris. Morbi quis ex ligula. Aenean consectetur mauris non iaculis porta. Nunc ultrices, mauris tincidunt pulvinar scelerisque, dolor est condimentum metus, ut interdum est nisl ut ante. Cras rhoncus lacus eu finibus convallis. Ut varius lacus eros, eget suscipit odio aliquet nec. Nam sem eros, ornare ac erat eu, pharetra finibus ex. Donec in massa vitae lectus blandit posuere. Cras ut risus id metus mattis dictum. Pellentesque at urna feugiat, accumsan diam vel, condimentum mi. Fusce ac semper arcu, vel pellentesque ante. Aenean et volutpat orci. Donec vitae feugiat odio. Aenean vel luctus sem, vitae cursus urna. Suspendisse consectetur urna vitae aliquam ornare. Donec mattis nisl id lectus sollicitudin, pulvinar dictum velit lacinia. Quisque finibus justo a nibh rhoncus, a efficitur purus maximus. Etiam posuere libero id fringilla maximus. Morbi molestie quam fermentum dolor hendrerit condimentum. Suspendisse accumsan semper pretium. Donec nisi lacus, feugiat eu sem at, pretium consequat dolor. Integer commodo massa nisi, quis viverra massa interdum ac. Ut commodo et magna vel lobortis. Nullam varius enim nec ultricies lacinia. Proin egestas tempus est. Cras ac ex ac ex auctor semper ac quis metus. Praesent et tempus nibh. Nam a efficitur risus. Cras nibh ex, lobortis at aliquam et, varius vitae turpis. Duis consequat velit varius velit mattis, non maximus est elementum. Donec vel tellus cursus enim posuere tempus ac at velit. Maecenas quis eros purus. Proin vulputate ante vitae placerat varius. Maecenas vitae ligula nec tortor tempor lobortis non quis velit. Sed vulputate et erat id laoreet. Etiam erat mi, bibendum non mauris id, aliquet malesuada urna. Nam ex est, vehicula eget consequat in, bibendum ac elit. Fusce porta pellentesque placerat. Suspendisse potenti. Sed pulvinar facilisis libero vitae gravida. Nam quis pellentesque sapien. Pellentesque venenatis vel ipsum tincidunt hendrerit. Vestibulum eleifend erat nec sem aliquam, aliquet lacinia est congue. Fusce a nisl non massa congue vestibulum sed nec nisl. Vestibulum id maximus nibh. Aliquam ante sapien, dapibus ac vestibulum interdum, lacinia vitae mauris. Etiam non posuere orci, non semper risus. Aenean non facilisis urna. Praesent ut dui nibh. Morbi lacus dolor, egestas facilisis pellentesque in, cursus pretium ligula. Praesent rutrum turpis in nisl blandit, a euismod lectus suscipit. Vivamus ut ullamcorper odio, vel vulputate lacus.',6,'2025-05-22 23:59:05.236491','2025-05-22 23:59:05.236491');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Garry Gorczany','Nash71@yahoo.com','xBMAzaRoB0lIlqW','2025-05-21 20:44:57','2025-05-21 20:44:57'),(2,'Marcos Greenholt','Shayne93@yahoo.com','SZXR2WY8q8hBQan','2025-05-21 20:48:43','2025-05-21 20:48:43'),(3,'Austin Shields','Taya_Block48@hotmail.com','$2b$10$IxYEP3HtVBooiRfHa7QPjeYm6BQmpkvyZi2MOWdzcwpyhvprJYUGe','2025-05-21 20:52:58','2025-05-21 20:52:58'),(4,'Bob Weber','Everardo_Nolan8@gmail.com','$2b$10$rYB.60QwWM5wnIuYO9eL4.gpJhGkFwZfPjRrKXlTsDQBfOteBkhEm','2025-05-21 22:46:37','2025-05-21 22:46:37'),(5,'Ernest Ruecker','Ettie94@yahoo.com','$2b$10$fjgqPmeUXrOHVQJqMiiiku99jc5TJyuPxFa1w8rV83K91C/NxHTLu','2025-05-22 00:07:10','2025-05-22 00:07:10'),(6,'Gustavo de Campos Antunes','gustavodecante@me.com','$2b$10$Maj.uFEn0kvNz0UuDTMqEuYz/JcR.tVdwm6bNu2oMwmUYsi8nCI4a','2025-05-22 22:09:44','2025-05-22 22:09:44');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-23  0:36:38

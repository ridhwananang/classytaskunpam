-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: classytaskunpam
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `absensis`
--

DROP TABLE IF EXISTS `absensis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absensis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `jadwal_id` bigint unsigned NOT NULL,
  `pertemuan_id` bigint unsigned DEFAULT NULL,
  `status` enum('hadir','tidak_hadir') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'tidak_hadir',
  `waktu` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `absensis_user_id_foreign` (`user_id`),
  KEY `absensis_jadwal_id_foreign` (`jadwal_id`),
  KEY `absensis_pertemuan_id_foreign` (`pertemuan_id`),
  CONSTRAINT `absensis_jadwal_id_foreign` FOREIGN KEY (`jadwal_id`) REFERENCES `jadwals` (`id`),
  CONSTRAINT `absensis_pertemuan_id_foreign` FOREIGN KEY (`pertemuan_id`) REFERENCES `pertemuans` (`id`) ON DELETE CASCADE,
  CONSTRAINT `absensis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absensis`
--

LOCK TABLES `absensis` WRITE;
/*!40000 ALTER TABLE `absensis` DISABLE KEYS */;
INSERT INTO `absensis` VALUES (1,1,2,2,'hadir','2025-07-16 19:01:38','2025-07-16 19:01:38','2025-07-16 19:01:38'),(2,2,2,2,'hadir','2025-07-16 19:03:18','2025-07-16 19:03:18','2025-07-16 19:03:18'),(3,4,2,2,'hadir','2025-07-16 19:04:08','2025-07-16 19:04:08','2025-07-16 19:04:08');
/*!40000 ALTER TABLE `absensis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `forum_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_forum_id_foreign` (`forum_id`),
  KEY `comments_user_id_foreign` (`user_id`),
  CONSTRAINT `comments_forum_id_foreign` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussions`
--

DROP TABLE IF EXISTS `discussions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `forum_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `discussions_forum_id_foreign` (`forum_id`),
  KEY `discussions_user_id_foreign` (`user_id`),
  CONSTRAINT `discussions_forum_id_foreign` FOREIGN KEY (`forum_id`) REFERENCES `forums` (`id`) ON DELETE CASCADE,
  CONSTRAINT `discussions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussions`
--

LOCK TABLES `discussions` WRITE;
/*!40000 ALTER TABLE `discussions` DISABLE KEYS */;
/*!40000 ALTER TABLE `discussions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forums`
--

DROP TABLE IF EXISTS `forums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forums` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `kelas_id` bigint unsigned NOT NULL,
  `judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forums_slug_unique` (`slug`),
  KEY `forums_user_id_foreign` (`user_id`),
  KEY `forums_kelas_id_foreign` (`kelas_id`),
  CONSTRAINT `forums_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forums_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forums`
--

LOCK TABLES `forums` WRITE;
/*!40000 ALTER TABLE `forums` DISABLE KEYS */;
/*!40000 ALTER TABLE `forums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jadwals`
--

DROP TABLE IF EXISTS `jadwals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jadwals` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_matkul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ruang` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hari` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `waktu_mulai` datetime NOT NULL,
  `waktu_selesai` datetime NOT NULL,
  `sks` int NOT NULL,
  `whatsapp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kelas_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `dosen_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jadwals_kelas_id_foreign` (`kelas_id`),
  KEY `jadwals_dosen_id_foreign` (`dosen_id`),
  CONSTRAINT `jadwals_dosen_id_foreign` FOREIGN KEY (`dosen_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `jadwals_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jadwals`
--

LOCK TABLES `jadwals` WRITE;
/*!40000 ALTER TABLE `jadwals` DISABLE KEYS */;
INSERT INTO `jadwals` VALUES (1,'Pemrograman Web','V.118','Senin','2025-07-16 11:30:00','2025-12-16 11:30:00',3,'+6298777772222',1,'2025-07-16 04:31:07','2025-07-16 04:31:07',3),(2,'Laravel 12','V.881','Jumat','2025-07-17 01:54:00','2025-12-17 01:55:00',3,'087655552222',1,'2025-07-16 18:55:18','2025-07-16 18:55:18',3);
/*!40000 ALTER TABLE `jadwals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelas`
--

DROP TABLE IF EXISTS `kelas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_kelas` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelas`
--

LOCK TABLES `kelas` WRITE;
/*!40000 ALTER TABLE `kelas` DISABLE KEYS */;
INSERT INTO `kelas` VALUES (1,'TPLM003','2025-07-15 19:27:16','2025-07-15 19:27:16'),(2,'Dosen','2025-07-16 04:28:38','2025-07-16 04:28:38');
/*!40000 ALTER TABLE `kelas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelompok_tugas`
--

DROP TABLE IF EXISTS `kelompok_tugas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelompok_tugas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tugas_id` bigint unsigned NOT NULL,
  `nama_kelompok` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kelompok_tugas_tugas_id_foreign` (`tugas_id`),
  CONSTRAINT `kelompok_tugas_tugas_id_foreign` FOREIGN KEY (`tugas_id`) REFERENCES `tugas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelompok_tugas`
--

LOCK TABLES `kelompok_tugas` WRITE;
/*!40000 ALTER TABLE `kelompok_tugas` DISABLE KEYS */;
/*!40000 ALTER TABLE `kelompok_tugas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kelompok_tugas_user`
--

DROP TABLE IF EXISTS `kelompok_tugas_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kelompok_tugas_user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kelompok_tugas_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `kelompok_tugas_user_kelompok_tugas_id_foreign` (`kelompok_tugas_id`),
  KEY `kelompok_tugas_user_user_id_foreign` (`user_id`),
  CONSTRAINT `kelompok_tugas_user_kelompok_tugas_id_foreign` FOREIGN KEY (`kelompok_tugas_id`) REFERENCES `kelompok_tugas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `kelompok_tugas_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kelompok_tugas_user`
--

LOCK TABLES `kelompok_tugas_user` WRITE;
/*!40000 ALTER TABLE `kelompok_tugas_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `kelompok_tugas_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0000_01_01_000000_create_kelas_table',1),(2,'0001_01_01_000000_create_users_table',1),(3,'0001_01_01_000001_create_cache_table',1),(4,'0001_01_01_000002_create_jobs_table',1),(5,'2025_03_09_160815_add_role_to_users_table',1),(6,'2025_03_09_182413_create_jadwals_table',1),(7,'2025_03_12_164857_create_categories_table',1),(8,'2025_03_13_183739_create_tugas_table',1),(9,'2025_03_21_145156_add_last_active_to_users_table',1),(10,'2025_03_21_151955_add_is_online_to_users_table',1),(11,'2025_04_05_161228_create_forums_table',1),(12,'2025_04_05_162010_create_comments_table',1),(13,'2025_04_05_174755_create_discussions_table',1),(14,'2025_04_05_182604_add_slug_to_forums_table',1),(15,'2025_04_08_190104_create_kelompok_tugas_table',1),(16,'2025_04_09_171330_create_kelompok_tugas_user_table',1),(17,'2025_04_11_134721_remove_user_id_from_kelompok_tugas_table',1),(18,'2025_07_07_135719_create_votes_table',1),(19,'2025_07_07_135805_create_vote_results_table',1),(20,'2025_07_07_144524_create_vote_options_table',1),(21,'2025_07_07_144604_add_vote_option_id_to_vote_results_table',1),(22,'2025_07_11_183938_add_two_factor_columns_to_users_table',1),(23,'2025_07_12_132404_add_kelas_id_to_votes_table',1),(24,'2025_07_13_113811_create_absensis_table',1),(25,'2025_07_13_115654_add_totp_secret_to_users',1),(26,'2025_07_13_125407_add_jadwal_id_to_absensis_table',1),(27,'2025_07_13_131116_modify_waktu_nullable_in_absensis_table',1),(28,'2025_07_13_142026_create_pertemuans_table',1),(29,'2025_07_13_142103_add_pertemuan_id_to_absensis_table',1),(30,'2025_07_13_221054_alter_users_change_totp_secret_column',1),(31,'2025_07_14_021428_add_dosen_id_to_jadwals_table',1),(32,'2025_07_14_021918_remove_nama_dosen_from_jadwals_table',1),(33,'2025_07_14_205104_create_rekap_nilais_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pertemuans`
--

DROP TABLE IF EXISTS `pertemuans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pertemuans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `jadwal_id` bigint unsigned NOT NULL,
  `topik` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `waktu_dibuka` timestamp NOT NULL,
  `waktu_ditutup` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `pertemuans_jadwal_id_foreign` (`jadwal_id`),
  CONSTRAINT `pertemuans_jadwal_id_foreign` FOREIGN KEY (`jadwal_id`) REFERENCES `jadwals` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pertemuans`
--

LOCK TABLES `pertemuans` WRITE;
/*!40000 ALTER TABLE `pertemuans` DISABLE KEYS */;
INSERT INTO `pertemuans` VALUES (1,1,'pertemuan 2','2025-07-16 04:32:00','2025-07-16 04:34:00','2025-07-16 04:32:25','2025-07-16 04:32:25'),(2,2,'Pertemuan 1 - Blade','2025-07-16 18:57:00','2025-07-16 19:05:00','2025-07-16 18:58:33','2025-07-16 18:58:33');
/*!40000 ALTER TABLE `pertemuans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rekap_nilais`
--

DROP TABLE IF EXISTS `rekap_nilais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rekap_nilais` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `jadwal_id` bigint unsigned NOT NULL,
  `tugas` tinyint unsigned DEFAULT NULL,
  `uts` tinyint unsigned DEFAULT NULL,
  `uas` tinyint unsigned DEFAULT NULL,
  `kehadiran` tinyint unsigned NOT NULL DEFAULT '0',
  `nilai` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rekap_nilais_user_id_jadwal_id_unique` (`user_id`,`jadwal_id`),
  KEY `rekap_nilais_jadwal_id_foreign` (`jadwal_id`),
  CONSTRAINT `rekap_nilais_jadwal_id_foreign` FOREIGN KEY (`jadwal_id`) REFERENCES `jadwals` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rekap_nilais_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rekap_nilais`
--

LOCK TABLES `rekap_nilais` WRITE;
/*!40000 ALTER TABLE `rekap_nilais` DISABLE KEYS */;
INSERT INTO `rekap_nilais` VALUES (1,1,1,100,100,80,0,'A','2025-07-16 18:43:17','2025-07-16 18:43:17'),(2,2,1,75,90,85,0,'B','2025-07-16 18:43:18','2025-07-16 18:43:18'),(3,1,2,80,90,55,1,'B','2025-07-16 19:12:52','2025-07-16 19:12:52'),(4,2,2,100,67,87,1,'B','2025-07-16 19:12:52','2025-07-16 19:12:52'),(5,4,2,66,76,40,1,'C','2025-07-16 19:12:52','2025-07-16 19:12:52');
/*!40000 ALTER TABLE `rekap_nilais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('14S0D6CczM9kdVLSuaaZvhCZrmmys0W530h3h4vt',4,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0','YTo1OntzOjY6Il90b2tlbiI7czo0MDoic1JjM2FVWlZSRXJXV0t0SjRoYzV5RU5XU2s4bFV3WmhCRGt4VFBZWSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjQ7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VyLzQvb25saW5lIjt9fQ==',1752695043),('4nQTL1XvD0WirG8bpPLrtQdIvRAf9Wcr3teFtVPA',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoiQWlmcEVQUk5TYnd6U0VrZGRwVzgxMVFaTXh4Z2RzRXZBV3VWYUJ5TCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMToiaHR0cDovLzEyNy4wLjAuMTo4MDAwL2Rhc2hib2FyZCI7fX0=',1752692702),('71VK6haraj5XtBOktF3SxhxYrvOSry7waM9jzLkE',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiV1RuNGpUdXBrMWt2NlVhRkRaZkJZS1hITzg0ZmJQeFdNSXJoYUFQSiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VyLzIvb25saW5lIjt9fQ==',1752695041),('e8Tzyixq7atUcAAx9ZpxHvDpY9x0UMfhmRTlGF6I',NULL,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0','YTozOntzOjY6Il90b2tlbiI7czo0MDoieUNuejRSMThOY0tRWlFINHdUWmg2cGk4S1JBb1lOa2tCMEpGNFlrdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VyLzEvb25saW5lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1752692523),('nFYzZch2HOcd8B4VyN1LWCONOftGWk3l9kWoeUwn',2,'127.0.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNjQ0Q0trZVA0REhVVzdieGFNa2dLYmxCaEhORTZEYktzZmt1aUZEaSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czozOiJ1cmwiO2E6MDp7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC91c2VyLzIvb25saW5lIjt9fQ==',1752694438);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tugas`
--

DROP TABLE IF EXISTS `tugas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tugas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nama_tugas` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deadline` datetime NOT NULL,
  `kelas_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `jadwals_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tugas_kelas_id_foreign` (`kelas_id`),
  KEY `tugas_category_id_foreign` (`category_id`),
  KEY `tugas_jadwals_id_foreign` (`jadwals_id`),
  CONSTRAINT `tugas_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `tugas_jadwals_id_foreign` FOREIGN KEY (`jadwals_id`) REFERENCES `jadwals` (`id`),
  CONSTRAINT `tugas_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tugas`
--

LOCK TABLES `tugas` WRITE;
/*!40000 ALTER TABLE `tugas` DISABLE KEYS */;
/*!40000 ALTER TABLE `tugas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nim` bigint NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','kelasAdmin','mahasiswa','dosen') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'mahasiswa',
  `kelas_id` bigint unsigned NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `is_online` tinyint(1) NOT NULL DEFAULT '0',
  `totp_secret` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_nim_unique` (`nim`),
  UNIQUE KEY `users_email_unique` (`email`),
  KEY `users_kelas_id_foreign` (`kelas_id`),
  CONSTRAINT `users_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,231011450670,'An','jakartacodese@gmail.com','2025-07-15 19:27:17','admin',1,'$2y$12$Z594VhhuMlO6gjgzybDDUO94G3qZgYknFODuD.CqzeZWvfGdfe6oK',NULL,NULL,NULL,NULL,'2025-07-15 19:27:18','2025-07-16 19:38:27',0,'eyJpdiI6IjAzMDlUNzNMVWVVYWxqREVYUGVyZUE9PSIsInZhbHVlIjoicVg0UkZPYUJBZ0ErQjJqeDlZdW1VNVhWWkh2anB0SFprNTV6dE1CTk56RGUxWHBXblBxaFdrcFZYTXphOEV3Mk1waE9iNUNDZDU0ZFlFWVNrd1FYQ3VtR1lSb1h4am5qY3ZGeFU3Yi9TVVJmeDdGT0tRRkFkWVJjS0IzK3FEOElmVEl1aTlCNEVCa2FhZ3YxYnNneTREd3R2QVNad25sRVZPYU5oQXRxSGtrPSIsIm1hYyI6ImM2ZDBmMGJjMTIyZTNmYWFmOGEzZDdjNjRjZmQ4ZWJlMjdjYTkyNWJhMzI0ZTYwNTg1NjIxNWMwNTgwZGUzZDkiLCJ0YWciOiIifQ=='),(2,155441185809,'Test User','test@example.com','2025-07-15 19:27:18','mahasiswa',1,'$2y$12$A2qjj4RyONU6mUP4t4BmsOOZwSX8WUq.NqD.vvTS7MFGLW.orQt4C',NULL,NULL,NULL,'fEgKICIra45YBbfaJNOCquH1DqtPPjDwwD5eZjjFxgb1tPWfaqGGph9UbVvA','2025-07-15 19:27:18','2025-07-16 19:34:59',1,'eyJpdiI6ImlRRVdKSURDenV1NG1kdzIwMkVTbnc9PSIsInZhbHVlIjoiZHh3N3h6UTdhVXFDbkpJclVkSWptaGJzKzVpSjNZMHZCTldvRTMzdGYxNjdMVllVOFB2R2dSeWhoMS9tT0NIY2ZReWtIRnU4Qy9oc1dic3B3Mld4Si9vaGlCOFBHL3FWRVR3bzRVQXYrazhvaE9Qb014ZzN3Syt5MDNyQnVqSkxFNXlKZi9ncTlLYlRpRTBpSGJLVHpFU1BsQTRaSEJ0SXI2R2RNUVcwZTdBPSIsIm1hYyI6IjdjYjVjOWRhNGZjYTQyYWFkN2I4OWYwYjU4ZWQ2M2Y1Yjk2ZWYzMDRmNmZhNjdiM2EwZmRjNTY4NGQ5ZjczYjYiLCJ0YWciOiIifQ=='),(3,12345678,'Pak Dosen','dosen@gmail.com','2025-07-16 04:29:16','dosen',2,'$2y$12$0e830rqJ5LxG/uQHNecjWudrd4q6cJmqsFUxGEjN9W5lRw.W7FOmK',NULL,NULL,NULL,'OWCgJESfqlNbn8BSHrgCD8dBzd2DhInGOf2Nx4Nxo1CDmp1N3ryyv5wSk8iX','2025-07-16 04:29:16','2025-07-16 19:21:28',0,NULL),(4,55554444,'ketua kelas','kelas03@gmail.com','2025-07-16 19:00:08','kelasAdmin',1,'$2y$12$Lgt/uTvpa3m2aF9S7We.c.gdp9LWNeqdC5IkmNNSOzhXYpl9VMdBO',NULL,NULL,NULL,'WTwhPBJXw9JBIai9is0sJXFC1SedElHOAtF5ZOvYti2KelLlrHfJAsolzjda','2025-07-16 19:00:08','2025-07-16 19:39:08',1,'eyJpdiI6IkNXMW9IVmFzZ0V0SnNxU2VENUg3TUE9PSIsInZhbHVlIjoiU0ZJaUtIV3h6RDRkNlNCNFdSNGhJNkpaVGJla2c4Z0dQQnYvZVVlazdWeVJIWWtQVFRFOEg0NmxHbGwvY2RLcnVHY28rMjZVTEt3ZmFVM21DZktuZWovNWdEL2lhVkt0Sy9Hay9NVEhVd1pOK0psdFhVV2xpQTBuNUlUWTFiNGkvR3A1djhLT2d2NlprdWU4TThzTHZGaW5FcUtzUjFuMzh5N085SnFFU0hnPSIsIm1hYyI6ImJkMjhiZDg3ZGQ2NDNhMzMzYzlkN2M4YWJkNjcwMjMxY2M4ZjlmZjdmZGNiZGU3Y2MxZmJiYjA5Y2RiODA2ZGYiLCJ0YWciOiIifQ==');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_options`
--

DROP TABLE IF EXISTS `vote_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `vote_id` bigint unsigned NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vote_options_vote_id_foreign` (`vote_id`),
  CONSTRAINT `vote_options_vote_id_foreign` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_options`
--

LOCK TABLES `vote_options` WRITE;
/*!40000 ALTER TABLE `vote_options` DISABLE KEYS */;
INSERT INTO `vote_options` VALUES (1,1,'Full Project','2025-07-16 19:26:31','2025-07-16 19:26:31'),(2,1,'Project Work','2025-07-16 19:26:31','2025-07-16 19:26:31'),(3,1,'Full Project Work','2025-07-16 19:26:31','2025-07-16 19:26:31'),(4,2,'Project Work','2025-07-16 19:40:33','2025-07-16 19:40:33'),(5,2,'Full Project','2025-07-16 19:40:33','2025-07-16 19:40:33'),(6,2,'Full Project Work','2025-07-16 19:40:33','2025-07-16 19:40:33');
/*!40000 ALTER TABLE `vote_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_results`
--

DROP TABLE IF EXISTS `vote_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_results` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `vote_id` bigint unsigned NOT NULL,
  `type` enum('up','down') COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `vote_option_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `vote_results_user_id_vote_id_unique` (`user_id`,`vote_id`),
  KEY `vote_results_vote_id_foreign` (`vote_id`),
  KEY `vote_results_vote_option_id_foreign` (`vote_option_id`),
  CONSTRAINT `vote_results_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vote_results_vote_id_foreign` FOREIGN KEY (`vote_id`) REFERENCES `votes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `vote_results_vote_option_id_foreign` FOREIGN KEY (`vote_option_id`) REFERENCES `vote_options` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_results`
--

LOCK TABLES `vote_results` WRITE;
/*!40000 ALTER TABLE `vote_results` DISABLE KEYS */;
INSERT INTO `vote_results` VALUES (1,1,1,'up','2025-07-16 19:26:45','2025-07-16 19:26:45',3),(2,4,2,'up','2025-07-16 19:40:49','2025-07-16 19:40:49',6),(3,2,2,'up','2025-07-16 19:41:35','2025-07-16 19:41:35',6);
/*!40000 ALTER TABLE `vote_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci,
  `deadline` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `kelas_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `votes_kelas_id_foreign` (`kelas_id`),
  CONSTRAINT `votes_kelas_id_foreign` FOREIGN KEY (`kelas_id`) REFERENCES `kelas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,'Project Laravel 12 Starter Kit React','1. Full Project\nMelanjutkan project website yang sebelumnya pernah dibuat untuk tugas kuliah, dengan membuat ulang dari awal menggunakan Framework Laravel 12 yang dilengkapi starter kit React + TypeScript + Inertia. Rencananya, di akhir pengerjaan semua project akan digabungkan (merge) menjadi satu aplikasi web yang utuh sehingga tampak lebih kompleks dan terstruktur.\n\n2. Project Work\nMembuat satu aplikasi web dari awal yang dikerjakan secara bersama-sama menggunakan Framework Laravel 12 dengan starter kit React + TypeScript + Inertia. Fokus utama adalah membangun satu project yang kompleks dan lengkap.\n\n3. Teamwork Full Project\nMelanjutkan project website yang sebelumnya pernah dibuat untuk tugas kuliah, dengan membuat ulang dari awal menggunakan Framework Laravel 12 yang dilengkapi starter kit React + TypeScript + Inertia. Rencananya, di akhir pengerjaan semua project akan digabungkan (merge) menjadi satu aplikasi web yang utuh sehingga tampak lebih kompleks dan terstruktur. terintegrasi dengan sistem ClassyTask untuk menambah kompleksitas dan nilai kolaboratif.\n\n#Catatan:\n-Opsi 2 : 1 Project tapi lebih kompleks\n-Opsi 3 : sama seperti Opsi 1, perbedaannya adalah terintegrasi dengan classytask','2025-07-21 05:00:00','2025-07-16 19:26:31','2025-07-16 19:26:31',NULL),(2,'Project Laravel 12','1. Full Project\nMelanjutkan project website yang sebelumnya pernah dibuat untuk tugas kuliah, dengan membuat ulang dari awal menggunakan Framework Laravel 12 yang dilengkapi starter kit React + TypeScript + Inertia. Rencananya, di akhir pengerjaan semua project akan digabungkan (merge) menjadi satu aplikasi web yang utuh sehingga tampak lebih kompleks dan terstruktur.\n\n2. Project Work\nMembuat satu aplikasi web dari awal yang dikerjakan secara bersama-sama menggunakan Framework Laravel 12 dengan starter kit React + TypeScript + Inertia. Fokus utama adalah membangun satu project yang kompleks dan lengkap.\n\n3. Teamwork Full Project\nMelanjutkan project website yang sebelumnya pernah dibuat untuk tugas kuliah, dengan membuat ulang dari awal menggunakan Framework Laravel 12 yang dilengkapi starter kit React + TypeScript + Inertia. Rencananya, di akhir pengerjaan semua project akan digabungkan (merge) menjadi satu aplikasi web yang utuh sehingga tampak lebih kompleks dan terstruktur. terintegrasi dengan sistem ClassyTask untuk menambah kompleksitas dan nilai kolaboratif.\n\n#Catatan:\n-Opsi 2 : 1 Project tapi lebih kompleks\n-Opsi 3 : sama seperti Opsi 1, perbedaannya adalah terintegrasi dengan classytask','2025-07-19 19:40:00','2025-07-16 19:40:33','2025-07-16 19:40:33',1);
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-17  2:45:12

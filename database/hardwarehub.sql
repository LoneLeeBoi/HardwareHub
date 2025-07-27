-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 27, 2025 at 05:33 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hardwarehub`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `row` int(10) UNSIGNED NOT NULL,
  `id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`row`, `id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '20b68568-7915-4f05-bdd5-294fec83ed7f', 'test1', '2025-07-25 15:56:55', '2025-07-27 13:39:32', NULL),
(2, '0c4dadf0-e9a4-4c52-9899-e4bab0335bc1', 'test2', '2025-07-25 17:38:10', '2025-07-25 17:38:10', NULL),
(3, 'c6d443f4-6357-4ce1-9778-72514fcf8547', 'HELLo', '2025-07-27 14:25:53', '2025-07-27 14:25:53', NULL),
(4, '7c74ff57-ea3d-43e0-b091-048f3fd41417', 'asdsd', '2025-07-27 14:29:59', '2025-07-27 14:29:59', NULL),
(5, '1fed81d4-8b7f-41c4-92d9-982e301dec49', 'asdsad', '2025-07-27 14:33:48', '2025-07-27 14:33:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `row` bigint(20) UNSIGNED NOT NULL,
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` varchar(36) NOT NULL,
  `image` varchar(255) NOT NULL,
  `units` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`row`, `id`, `user_id`, `name`, `price`, `category_id`, `image`, `units`, `updated_at`, `deleted_at`) VALUES
(1, '58e6c88c-0529-412f-a703-3727fb869317', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'Lansang', 10.12, '20b68568-7915-4f05-bdd5-294fec83ed7f', '/uploads/1753466390120-76308119-b923-401b-942c-e136bae49f8b.jpg', '10', '2025-07-27 21:40:02', NULL),
(2, 'ef31e349-91cb-46d7-8a45-2171379c284e', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'kutsilyo', 10.12, '20b68568-7915-4f05-bdd5-294fec83ed7f', '/uploads/1753465759699-b445a57d-e439-4cfb-8ee1-a43ddacfa0c3.jpg', '100', '2025-07-27 21:40:05', NULL),
(3, 'ee37cbf7-00d2-4cc6-a198-f235cbb762c6', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'martilyo', 10.12, '20b68568-7915-4f05-bdd5-294fec83ed7f', '/uploads/1753466447130-3bbbedae-c15b-497f-a3e7-1980dc57b944.jpg', '99', '2025-07-27 21:40:08', NULL),
(4, '8d148662-20d4-4b4e-be29-aebe27a16e36', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'secret', 100.00, '20b68568-7915-4f05-bdd5-294fec83ed7f', '/uploads/1753621963084-397642de-d771-4145-aad0-dd8f62d10f38.webp', '50', '2025-07-27 21:40:11', NULL),
(8, 'c19bfcca-2595-4d5f-a1f8-6e53c35fc4ba', 'c550eb10-2ec5-466e-b4c7-2540325ad438', 'qweqwe', 1234.00, 'c6d443f4-6357-4ce1-9778-72514fcf8547', '/uploads/1753626842124-738649e8-f1bf-45e9-aabf-fbbd2fcf3670.jpg', NULL, '2025-07-27 22:34:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `row` int(11) NOT NULL,
  `id` varchar(36) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`row`, `id`, `username`, `email`, `password`, `role`) VALUES
(7, '39a9da54-f61e-4346-a2ca-58fdb23d64bf', 'Clifford', 'c.iyac12345@gmail.com', '$2b$10$vB2ZwGj8ALUtE.D9NIbvOu32jq5KKOpiLUIeHhhsdFx3gkPt6rAvW', 'user'),
(4, '89f3f9cd-aef2-4691-8092-42d164b63ada', NULL, 'c.iyac123@gmail.com', '$2b$10$MdVvAguvOX5sV1GNP2zkxe21uq05gzj1Oz39EoyvWJ7sT6IJsSfsK', 'user'),
(5, 'bea39c9b-a427-44cf-8a23-7cf60386f6af', NULL, 'c.iyac1234@gmail.com', '$2b$10$cP14c3vxb78DC6SsuGj/1.X8ySuPRYrSgR5Gmxg1pIIig/bHtcHfO', 'user'),
(6, 'c550eb10-2ec5-466e-b4c7-2540325ad438', NULL, 'c1234@gmail.com', '$2b$10$pGnxF9IQFz.UfVdLwKnxaOTFqtV2cGzgwT2kxIPE5gBIgp.TFNJUi', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`row`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`row`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `row` (`row`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `row` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `row` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2025 at 06:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
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
(2, '0c4dadf0-e9a4-4c52-9899-e4bab0335bc1', 'test2', '2025-07-25 17:38:10', '2025-07-25 17:38:10', NULL),
(1, '20b68568-7915-4f05-bdd5-294fec83ed7f', 'test1', '2025-07-25 15:56:55', '2025-07-25 17:37:43', '2025-07-25 17:37:43');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `row` int(11) NOT NULL,
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` varchar(50) NOT NULL,
  `category_id` varchar(100) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`row`, `id`, `user_id`, `name`, `amount`, `date`, `category`, `updated_at`, `deleted_at`) VALUES
(1, '2e24fe56-2709-4b2b-bb51-7e9f3480fdb5', 'abc123', 'macdo12', 149.75, '2025-07-26', 'like', '2025-07-26 14:26:47', '2025-07-26 14:26:47'),
(2, 'eba44b19-94af-4ab0-9af0-f1085417add5', 'test', 'macdo', 149.75, '2025-07-26', 'like', '2025-07-26 14:19:46', NULL),
(3, 'fae3c02f-d29b-4574-a183-5eadd50c9d9c', 'test22', 'macdo12', 149.75, '2025-07-26', 'like', '2025-07-26 14:25:35', NULL);

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
(4, '11c4854d-a6e5-414e-a87d-f2376fa5a1a1', '123456', 'test', 12.99, '12213213', '/uploads/1753509619304-3399585a-a23c-44ff-a7a0-299ed136ce28.jpg', NULL, '2025-07-26 14:00:19', NULL),
(1, '58e6c88c-0529-412f-a703-3727fb869317', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'Lansang', 10.12, '1', '/uploads/1753466390120-76308119-b923-401b-942c-e136bae49f8b.jpg', NULL, '2025-07-26 13:52:30', '2025-07-26 13:52:30'),
(3, 'ee37cbf7-00d2-4cc6-a198-f235cbb762c6', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'martilyo', 10.12, '20b68568-7915-4f05-bdd5-294fec83ed7f', '/uploads/1753466447130-3bbbedae-c15b-497f-a3e7-1980dc57b944.jpg', NULL, '2025-07-26 02:00:47', NULL),
(2, 'ef31e349-91cb-46d7-8a45-2171379c284e', 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', 'kutsilyo', 10.12, '20b68568-7915-4f05-bdd5-294fec83ed7f', '/uploads/1753465759699-b445a57d-e439-4cfb-8ee1-a43ddacfa0c3.jpg', NULL, '2025-07-26 01:50:16', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `row` int(11) NOT NULL,
  `id` varchar(36) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`row`, `id`, `username`, `email`, `password`) VALUES
(5, '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', NULL, 'john@example.com', '$2b$10$olHo6sMcEqAMdwxfFZEII.Owd5VmYgETMdN3U/FlN9ngEPzpZwXOK'),
(1, 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', '', 'mark@example.com', '$2b$10$S2HD8QTiqVfIXezHIVFi0O7RgYUwUeS5fJ2SvQajSHAuTUaLbXv6i');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `row` (`row`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `row` (`row`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `row` (`row`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `deleted_at` (`deleted_at`);

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
  MODIFY `row` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `row` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
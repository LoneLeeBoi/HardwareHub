-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 09, 2025 at 05:45 AM
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
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `row` int(11) NOT NULL,
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`row`, `id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`, `deleted_at`) VALUES
(36, '6caf9695-2859-46d7-8942-9ef5d8bd0e32', '3cb1ecec-a719-4315-92b6-88db72fcdfe9', 'a48db5fc-02af-48e8-972f-696bfcb7c6ff', 1, '2025-08-06 20:52:34', '2025-08-06 20:52:34', NULL),
(37, '7df9a4b2-782a-4dac-8e6a-9b0ca1157056', '3cb1ecec-a719-4315-92b6-88db72fcdfe9', '07be17c4-41c6-4771-aae1-1a7f6eafc309', 1, '2025-08-06 20:54:37', '2025-08-06 20:54:37', NULL),
(34, '9c88e07e-c95f-4ae9-856c-eb33fe2398ef', '3cb1ecec-a719-4315-92b6-88db72fcdfe9', 'f384a883-cf17-49f8-84b6-1603d41d1741', 1, '2025-08-06 20:49:07', '2025-08-06 20:49:07', NULL),
(35, 'bfff9034-075e-49b0-b929-04cb2ab57a7f', '3cb1ecec-a719-4315-92b6-88db72fcdfe9', 'c64e1aa4-14ed-4611-a117-cb52a1616746', 1, '2025-08-06 20:51:29', '2025-08-06 20:51:29', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `row` int(10) UNSIGNED NOT NULL,
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`row`, `id`, `user_id`, `name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(7, '0a9432bf-932d-4e9d-abfb-c1cd57e6d678', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'Hand Tools', '2025-08-02 07:38:52', '2025-08-02 07:38:52', NULL),
(8, 'a217ed37-ef24-4adb-b13f-87f2dae2d6e5', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'Power Tools', '2025-08-02 07:39:17', '2025-08-02 07:39:17', NULL),
(10, 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'Building Materials', '2025-08-02 07:41:10', '2025-08-02 07:41:10', NULL),
(9, 'fa2b8ebe-6748-48f2-8bcb-fb7a6db7d025', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'Electrical Supplies', '2025-08-02 07:39:45', '2025-08-02 07:39:45', NULL);

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
  `category` varchar(100) NOT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`row`, `id`, `user_id`, `name`, `amount`, `date`, `category`, `updated_at`, `deleted_at`, `created_at`) VALUES
(30, '20574666-9d64-479b-a5db-78fd62d7609c', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'FDGFDGFD', 435.00, '2025-07-30', '543', '2025-08-09 13:18:42', NULL, '2025-08-09 13:18:42'),
(29, '21bfb882-5130-4a69-95ca-63af2f22fd0d', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'sdasd', 1123123.00, '2025-07-31', 'lala', '2025-08-09 12:58:02', NULL, '2025-08-09 12:51:52'),
(23, '404fb819-424b-4f13-b90d-fe932bca20e8', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'Cement Bag 40kg', 200.00, '2025-08-15', 'teszt3', '2025-08-09 12:22:03', NULL, '2025-08-02 15:53:59'),
(25, '4a9e218d-a764-4477-b717-5864e12a95de', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'test3', 213.00, '2025-07-30', 'sadasd', '2025-08-09 12:44:47', NULL, '2025-08-09 12:44:47'),
(26, '4d99aa6c-ef31-4b16-80a8-fca7857e51be', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'test3', 213.00, '2025-07-30', 'sadasd', '2025-08-09 12:45:02', NULL, '2025-08-09 12:45:02'),
(27, '8af60e97-f338-4ee1-9082-ab9891de7eb7', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'wdawd', 214342.00, '2025-07-29', 'ewqwewqe', '2025-08-09 12:46:03', NULL, '2025-08-09 12:46:03'),
(28, '9d59416c-1697-4a98-a673-95b653d8e1c6', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'sadadas', 123123.00, '2025-08-06', 'hGgGFg', '2025-08-09 12:54:25', NULL, '2025-08-09 12:48:49'),
(24, 'b809f7ff-7a88-4896-a815-835a780ac5be', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'test1', 1000.00, '2025-08-14', 'test me', '2025-08-09 12:25:36', NULL, '2025-08-09 12:21:46');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `row` int(11) NOT NULL,
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `acquisition` decimal(10,2) DEFAULT NULL,
  `retail` decimal(10,2) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`row`, `id`, `user_id`, `product_id`, `stock`, `acquisition`, `retail`, `updated_at`, `deleted_at`) VALUES
(7, '03662552-7cfa-44fe-9080-d9df3a9dc684', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'f384a883-cf17-49f8-84b6-1603d41d1741', 12, 12.00, 12.00, '2025-08-06 00:53:19', '2025-08-06 00:53:19'),
(6, '08d4baa7-3ad4-4b17-b7a9-a538afef0e67', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', '12303e9e-808c-4ff5-9f8b-d39811889c88', 2000, 4000.00, 400.50, '2025-08-06 01:07:07', NULL),
(8, '1aeef656-f6bc-4585-8647-d6a4d0ea9abc', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'c64e1aa4-14ed-4611-a117-cb52a1616746', 10, 100.00, 1000.00, '2025-08-06 00:53:31', NULL),
(10, '6b98b544-c409-4495-8cb4-1cb521606648', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'f384a883-cf17-49f8-84b6-1603d41d1741', 12, 12.00, 12.00, '2025-08-06 01:07:16', NULL),
(9, 'b059bb9c-d66d-4dae-b1d1-e45a8cd27e52', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'c64e1aa4-14ed-4611-a117-cb52a1616746', 23, 23.00, 23.00, '2025-08-06 01:06:54', '2025-08-06 01:06:54'),
(5, 'e4c259f3-e31d-4d9c-88d0-9ad7da41763f', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'c64e1aa4-14ed-4611-a117-cb52a1616746', 60, 120.00, 200.00, '2025-08-04 22:42:37', '2025-08-04 22:42:37');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `row` bigint(20) UNSIGNED NOT NULL,
  `id` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `acquisition_cost` decimal(10,2) NOT NULL DEFAULT 0.00,
  `price` decimal(10,2) NOT NULL,
  `stock` varchar(50) DEFAULT NULL,
  `category_id` varchar(36) NOT NULL,
  `image` varchar(255) NOT NULL,
  `units` varchar(255) DEFAULT NULL,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`row`, `id`, `user_id`, `name`, `acquisition_cost`, `price`, `stock`, `category_id`, `image`, `units`, `updated_at`, `deleted_at`, `created_at`) VALUES
(27, '4ee6cebd-c1ed-4e9e-9481-e882668d9444', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'fdgfdgfd', 123.00, 213.00, '123', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754716238532-c3e9c8b1-4a8c-4084-abf0-b4f8f0164708.jpg', '123', '2025-08-09 13:10:38', NULL, '2025-08-09 13:10:38'),
(32, '57e1a628-1f5e-4f3a-955d-a325acfa908b', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'asdasd', 123.00, 213.00, '123', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754717219258-90bd5bd5-816a-4ee3-99b2-da15de614e83.png', '123', '2025-08-09 13:26:59', NULL, '2025-08-09 13:26:59'),
(31, '73604424-6045-49f6-b447-08149a994f85', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'SADSAD', 12.00, 12.00, '12', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754717015059-dd650028-32bd-4791-8387-0d166e48e19b.png', '12', '2025-08-09 13:23:35', NULL, '2025-08-09 13:23:35'),
(28, '884b38a8-6dc8-45d8-aabe-4d10c07fdacb', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'aSAsaS', 22.00, 12.00, '12', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754716541486-dbe736f5-df95-40a6-a36f-93d838dbf107.png', '`12', '2025-08-09 13:15:41', NULL, '2025-08-09 13:15:41'),
(29, '8f04ed64-fc56-4966-849a-7b452fe48c81', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'GFHFGHFGH', 34.00, 343.00, '4', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754716743600-d95f1b08-1009-4e30-9e9c-143baf98662c.png', '43', '2025-08-09 13:19:03', NULL, '2025-08-09 13:19:03'),
(26, 'a6c3b4d5-26f2-4627-aeaf-1cc8db3d4d11', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'test 1', 250.00, 300.00, '12', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754711334497-cf6cc49b-4bfa-48f5-864f-4d268361301d.png', 'pcs', '2025-08-09 11:48:54', NULL, '2025-08-09 11:48:54'),
(30, 'ae5e6636-9a6b-4996-ab9b-5b6e40394eca', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', 'SADASD', 12.00, 12.00, '12', 'fa2b8ebe-6748-48f2-8bcb-fb7a6db7d025', '/uploads/1754716921135-7cacee68-201a-47ab-a22c-e4d03fe0e398.png', '12', '2025-08-09 13:22:01', NULL, '2025-08-09 13:22:01'),
(33, 'ca2d82ca-84a7-4454-93e9-af6c5c84c598', '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', '23qwe', 213.00, 213.00, '123', 'dbaadc5a-0ab4-4fd7-a0f7-23b2b00a413e', '/uploads/1754717237971-ba4012b2-3270-40f4-a84f-94bfa91bcdb3.png', '213', '2025-08-09 13:27:17', NULL, '2025-08-09 13:27:17');

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
(7, '3cb1ecec-a719-4315-92b6-88db72fcdfe9', 'mark', 'hehe@example.com', '$2b$10$D5j8UE8.DTwaM86OppIXEe4LZGO9tbAMREvvDpbKlFPWSFL5Uj466', 'user'),
(6, '7ba2bfc5-a1fb-4558-a2c6-54e9e197b352', NULL, 'test@example.com', '$2b$10$njtJs/WuUpw939VRXQgOQ.EMKa/rwyyoYEBJQXG3t33gFJJfinrV2', 'user'),
(8, '80c6f163-13c6-4c1e-8e00-821b4a27c63f', 'Nick@example.com', 'Nick@example.com', '$2b$10$Kz8Y4.BUeHJMVuBtVKvwq.MwRkMKXtA244YYKEltmC9.DfNmmv47i', 'user'),
(5, '91a277ac-2218-4bdc-9934-8cf9a5f8aadf', NULL, 'john@example.com', '$2b$10$olHo6sMcEqAMdwxfFZEII.Owd5VmYgETMdN3U/FlN9ngEPzpZwXOK', 'admin'),
(1, 'a95067e7-37b2-4b7e-aa15-3e7a757a90cc', '', 'mark@example.com', '$2b$10$S2HD8QTiqVfIXezHIVFi0O7RgYUwUeS5fJ2SvQajSHAuTUaLbXv6i', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `row` (`row`);

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
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
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
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `row` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `row` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `row` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

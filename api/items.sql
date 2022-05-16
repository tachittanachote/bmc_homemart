-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2022 at 06:03 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `items`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title_thai` varchar(256) NOT NULL,
  `title_english` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title_thai`, `title_english`, `created_at`, `updated_at`) VALUES
(1, 'หินธรรมชาติ', 'Natural Stone', '2021-12-24 09:37:49', '2021-12-24 09:37:49'),
(2, 'หินสังเคราะห์', 'Artificial Stone', '2021-12-24 23:14:14', '2021-12-24 23:14:14'),
(3, 'หินขัด', 'Terrazzo', '2021-12-24 23:14:14', '2021-12-24 23:14:14'),
(4, 'หิน Slab', 'Slab Stone', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(5, 'กระเบื้อง', 'Tiles', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(6, 'โมเสค', 'Mosaic', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(7, 'ไม้ปูพื้น', 'Wood flooring', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(8, 'พื้นไม้เทียม', 'Wooden artificial', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(9, 'เฟอร์นิเจอร์', 'Furniture', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(10, 'ประตูและอุปกรณ์', 'Door and Device', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(11, 'เครื่องมือช่าง', 'Technical Tool', '2021-12-24 23:17:51', '2021-12-24 23:17:51'),
(12, 'น้ำยาเคมี', 'Chemicals', '2021-12-24 23:17:51', '2021-12-24 23:17:51');

-- --------------------------------------------------------

--
-- Table structure for table `details`
--

CREATE TABLE `details` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `price` varchar(256) NOT NULL,
  `brand` varchar(256) NOT NULL,
  `color` varchar(256) NOT NULL,
  `size` varchar(256) NOT NULL,
  `unit` varchar(256) NOT NULL,
  `material` varchar(256) NOT NULL,
  `status` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `property` text NOT NULL,
  `delivery` text NOT NULL,
  `language` varchar(256) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `details`
--


-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--


--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_key` varchar(256) NOT NULL,
  `shopee_link` varchar(256) NOT NULL,
  `recommend` varchar(256) NOT NULL,
  `type_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--


-- --------------------------------------------------------

--
-- Table structure for table `promotions`
--

CREATE TABLE `promotions` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promotions`
--


-- --------------------------------------------------------

--
-- Table structure for table `slide`
--

CREATE TABLE `slide` (
  `id` int(11) NOT NULL,
  `title_thai` varchar(256) NOT NULL,
  `subtitle_thai` text NOT NULL,
  `title_english` varchar(256) NOT NULL,
  `subtitle_english` text NOT NULL,
  `link` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slide`
--

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `id` int(11) NOT NULL,
  `title_thai` varchar(256) NOT NULL,
  `title_english` varchar(256) NOT NULL,
  `category_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`id`, `title_thai`, `title_english`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 'หินอ่อน', 'Marble', 1, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(2, 'หินแกรนิต', 'Granite', 1, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(3, 'หินพื้นผิวพิเศษ', 'Specialty Surface process', 1, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(4, 'หินลูกเต๋า', 'Cobble Stone', 1, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(5, 'หินอ่อนควอทซ์', 'Quartz Marble', 2, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(6, 'หินอ่อนอัด', 'Compress Marble', 2, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(7, 'หินอ่อนคริสตัลไวท์', 'Crystal White', 2, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(8, 'หินขัด', 'Terrazzo', 3, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(9, 'Slab หินแกรนิต', 'Granite Slab', 4, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(10, 'Slab หินอ่อน', 'Slab Marble', 4, '2021-12-25 11:31:05', '2021-12-25 11:31:05'),
(11, 'กระเบื้องปูพื้น', 'Floor Tile', 5, '2021-12-25 11:32:23', '2021-12-25 11:32:23'),
(12, 'กระเบื้ืองห้องน้ำ', 'Bathroom Tile', 5, '2021-12-25 11:32:23', '2021-12-25 11:32:23'),
(13, 'กระเบื้องหินอ่อน', 'Marble Glazed Tiles', 5, '2021-12-25 11:32:23', '2021-12-25 11:32:23'),
(14, 'โมเสคแก้ว', 'Glass Mosaic', 6, '2021-12-25 11:32:58', '2021-12-25 11:32:58'),
(15, 'โมเสคหิน', 'Stone Mosaic', 6, '2021-12-25 11:32:58', '2021-12-25 11:32:58'),
(16, 'พื้นไม้โซลิด', 'Solid Floor', 7, '2021-12-25 11:33:51', '2021-12-25 11:33:51'),
(17, 'พื้นไม้เอ็นจิเนียร์', 'Engineered Floor', 7, '2021-12-25 11:33:51', '2021-12-25 11:33:51'),
(18, 'พื้นไม้ลามิเนต', 'Laminate Floor', 7, '2021-12-25 11:33:51', '2021-12-25 11:33:51'),
(19, 'พื้นไม้เทียม', 'Wooden floor artificial', 8, '2021-12-25 11:34:14', '2021-12-25 11:34:14'),
(20, 'สุขภัณฑ์ห้องน้ำ', 'sanitary ware', 9, '2021-12-25 11:35:36', '2021-12-25 11:35:36'),
(21, 'ชุดครัว', 'kitchen', 9, '2021-12-25 11:35:36', '2021-12-25 11:35:36'),
(22, 'เตียงนอน', 'Bed', 9, '2021-12-25 11:35:36', '2021-12-25 11:35:36'),
(23, 'โต๊ะเก้าอี้และโซฟา', 'Table Chair & Sofa', 9, '2021-12-25 11:35:36', '2021-12-25 11:35:36'),
(24, 'ตู้และชั้นวางของ', 'Cabinet&Shelves', 9, '2021-12-25 11:35:36', '2021-12-25 11:35:36'),
(25, 'ประตูไม้จริง', 'Solid Door', 10, '2021-12-25 11:36:57', '2021-12-25 11:36:57'),
(26, 'ประตูปิดผิวลามิเนต', 'Laminate Door', 10, '2021-12-25 11:36:57', '2021-12-25 11:36:57'),
(27, 'ประตูปิดผิววีเนียร์', 'Veneer Door', 10, '2021-12-25 11:36:57', '2021-12-25 11:36:57'),
(28, 'ประตู HDF', 'HDF Door', 10, '2021-12-25 11:36:57', '2021-12-25 11:36:57'),
(29, 'อุปกรณ์ประตู', 'Door Hardware', 10, '2021-12-25 11:36:57', '2021-12-25 11:36:57'),
(30, 'ใบตัด,ใบเจียร', 'The cutting and grinding blade', 11, '2021-12-25 11:37:57', '2021-12-25 11:37:57'),
(31, 'เครื่องขัดพื้น', 'Floor Polishers machine', 11, '2021-12-25 11:37:57', '2021-12-25 11:37:57'),
(32, 'แผ่นขัดพื้น', 'Floor Polishing Disc', 11, '2021-12-25 11:37:57', '2021-12-25 11:37:57'),
(33, 'น้ำยาเคมีและสารยึดติด', 'Chemicals and adhesives', 12, '2021-12-25 11:38:13', '2021-12-25 11:38:13');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2b$10$mB0M6MQkJFwbMrwLe8aFrOt2GU663ngYBk0jc6yMgr2rcpIK06yqq', '2021-12-26 04:47:56', '2021-12-26 04:47:56');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `details`
--
ALTER TABLE `details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `key` (`product_key`),
  ADD UNIQUE KEY `product_key` (`product_key`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `promotions`
--
ALTER TABLE `promotions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `details`
--
ALTER TABLE `details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `promotions`
--
ALTER TABLE `promotions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `slide`
--
ALTER TABLE `slide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `details`
--
ALTER TABLE `details`
  ADD CONSTRAINT `fk_detail_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `fk_image_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_product_type_id` FOREIGN KEY (`type_id`) REFERENCES `types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promotions`
--
ALTER TABLE `promotions`
  ADD CONSTRAINT `fk_promotion_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `types`
--
ALTER TABLE `types`
  ADD CONSTRAINT `fk_type_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

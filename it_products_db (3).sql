-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2023 at 04:25 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `it_products_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `isDelete`, `date`) VALUES
(22, 'Laptop', 'not', '2023-11-08 19:03:07'),
(23, 'Computers', 'not', '2023-11-08 19:03:26'),
(24, 'Electronics', 'not', '2023-11-11 00:52:40'),
(25, 'Clothing', 'Deleted', '2023-11-11 00:52:49'),
(26, 'Smartphones', 'not', '2023-11-11 00:53:41'),
(27, 'Tablets', 'not', '2023-11-11 00:53:49'),
(28, 'Audio Devices', 'not', '2023-11-11 00:53:56'),
(29, 'Cameras', 'not', '2023-11-11 00:54:05'),
(30, 'Gaming Consoles', 'Deleted', '2023-11-11 00:54:12'),
(31, 'Accessories', 'not', '2023-11-11 00:54:18');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `ratings` int(11) NOT NULL,
  `comments` text NOT NULL,
  `is_like` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `user_id`, `product_id`, `ratings`, `comments`, `is_like`, `date`, `isDelete`) VALUES
(1, 8, 8, 7, 'just for this commentss', 0, '2023-11-12 06:14:56', 'not'),
(2, 8, 7, 9, 'sdf', 0, '2023-11-12 06:17:47', 'not'),
(3, 8, 8, 4, 'sdf', 0, '2023-11-12 06:22:26', 'not'),
(4, 8, 7, 8, 'udpated comment', 0, '2023-11-12 07:26:07', 'not'),
(5, 8, 7, 5, 'sdf', 0, '2023-11-12 07:36:09', 'not'),
(6, 8, 8, 1, 'sdf', 0, '2023-11-12 08:07:11', 'not'),
(7, 8, 8, 2, 'kj', 0, '2023-11-12 08:09:38', 'not'),
(8, 8, 8, 1, 'test', 0, '2023-11-15 22:16:14', 'not'),
(9, 8, 8, 2, 'sssssssssss', 0, '2023-11-15 22:17:51', 'not'),
(10, 8, 8, 1, '1 comment', 0, '2023-11-15 22:26:33', 'not'),
(11, 8, 8, 1, 'ss', 0, '2023-11-15 22:41:04', 'not'),
(12, 10, 8, 5, 'other user comments', 0, '2023-11-17 00:34:54', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `my_cart`
--

CREATE TABLE `my_cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `my_cart`
--

INSERT INTO `my_cart` (`id`, `user_id`, `product_id`, `quantity`, `date`, `isDelete`) VALUES
(1, 0, 6, 11, '2023-11-09 05:03:49', 'Deleted'),
(2, 0, 5, 1, '2023-11-09 05:09:15', 'Deleted'),
(7, 0, 3, 1, '2023-11-09 06:00:56', 'Deleted'),
(8, 0, 2, 1, '2023-11-09 06:02:26', 'Deleted'),
(9, 0, 2, 2, '2023-11-10 21:23:57', 'Deleted'),
(10, 0, 3, 1, '2023-11-10 21:24:28', 'Deleted'),
(11, 0, 6, 2, '2023-11-10 21:24:30', 'Deleted'),
(12, 0, 6, 1, '2023-11-10 21:25:18', 'Deleted'),
(13, 0, 5, 1, '2023-11-10 21:25:26', 'Deleted'),
(14, 0, 6, 1, '2023-11-10 21:25:58', 'Deleted'),
(15, 0, 3, 1, '2023-11-10 21:27:24', 'Deleted'),
(16, 0, 2, 1, '2023-11-10 21:27:51', 'Deleted'),
(17, 0, 6, 1, '2023-11-10 21:52:32', 'Deleted'),
(18, 0, 6, 2, '2023-11-10 22:38:43', 'Deleted'),
(19, 0, 5, 2, '2023-11-10 23:03:54', 'not'),
(20, 0, 3, 2, '2023-11-10 23:20:05', 'Deleted'),
(21, 0, 2, 1, '2023-11-11 06:58:33', 'Deleted'),
(22, 8, 7, 1, '2023-11-11 07:09:18', 'Deleted'),
(23, 5, 3, 1, '2023-11-11 07:11:42', 'Deleted'),
(24, 8, 8, 1, '2023-11-11 07:36:03', 'Deleted'),
(25, 9, 8, 2, '2023-11-11 19:05:04', 'Deleted'),
(26, 8, 6, 1, '2023-11-11 21:40:16', 'Deleted'),
(27, 8, 2, 1, '2023-11-12 03:56:14', 'Deleted'),
(28, 8, 3, 1, '2023-11-12 03:57:57', 'Deleted'),
(29, 8, 2, 1, '2023-11-12 03:58:29', 'Deleted'),
(30, 8, 6, 1, '2023-11-12 03:59:43', 'Deleted'),
(31, 8, 7, 1, '2023-11-12 03:59:52', 'Deleted'),
(32, 8, 6, 1, '2023-11-12 04:00:12', 'Deleted'),
(33, 8, 3, 1, '2023-11-12 04:00:20', 'Deleted'),
(34, 8, 2, 2, '2023-11-12 04:00:32', 'Deleted'),
(35, 8, 8, 1, '2023-11-12 04:00:49', 'Deleted'),
(36, 8, 2, 1, '2023-11-12 04:01:09', 'Deleted'),
(37, 8, 3, 2, '2023-11-12 04:01:18', 'Deleted'),
(38, 8, 2, 1, '2023-11-12 04:01:31', 'Deleted'),
(39, 8, 3, 2, '2023-11-12 04:01:35', 'Deleted'),
(40, 8, 3, 1, '2023-11-12 04:03:44', 'Deleted'),
(41, 8, 2, 2, '2023-11-12 04:03:47', 'Deleted'),
(42, 8, 6, 2, '2023-11-12 04:03:51', 'Deleted'),
(43, 8, 7, 1, '2023-11-12 08:40:24', 'Deleted'),
(44, 5, 3, 1, '2023-11-14 06:03:27', 'Deleted'),
(45, 5, 2, 1, '2023-11-14 06:29:11', 'Deleted'),
(46, 8, 2, 1, '2023-11-15 00:28:41', 'Deleted'),
(47, 8, 3, 2, '2023-11-15 00:28:44', 'Deleted'),
(48, 8, 6, 2, '2023-11-15 00:28:46', 'Deleted'),
(49, 8, 7, 2, '2023-11-15 00:28:49', 'Deleted'),
(50, 8, 8, 1, '2023-11-15 00:28:54', 'Deleted'),
(51, 8, 9, 1, '2023-11-15 00:30:00', 'Deleted'),
(52, 8, 3, 1, '2023-11-15 13:30:37', 'Deleted'),
(53, 8, 6, 2, '2023-11-15 13:31:09', 'not'),
(54, 8, 7, 1, '2023-11-15 13:31:38', 'not'),
(55, 8, 3, 1, '2023-11-16 03:51:05', 'Deleted'),
(56, 8, 2, 2, '2023-11-16 04:18:24', 'Deleted'),
(57, 8, 3, 1, '2023-11-16 04:18:58', 'Deleted'),
(58, 10, 7, 1, '2023-11-16 04:36:28', 'not'),
(59, 10, 3, 2, '2023-11-16 04:48:55', 'Deleted'),
(60, 10, 8, 1, '2023-11-16 11:32:12', 'not'),
(61, 10, 2, 1, '2023-11-16 11:33:11', 'not'),
(62, 10, 3, 1, '2023-11-16 11:48:07', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type` varchar(50) NOT NULL,
  `content` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `url` varchar(255) NOT NULL,
  `seen` int(11) NOT NULL DEFAULT 0 COMMENT '0 => not seen\r\n1 => seen',
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `notification_type`, `content`, `date`, `url`, `seen`, `isDelete`) VALUES
(90, 5, 'Order Status', 'Your order status was updated to To Ship.', '2023-11-12 04:45:14', '', 0, 'not'),
(91, 8, 'Order Status', 'Your order status was updated to To Ship.', '2023-11-12 04:46:07', '', 0, 'not'),
(92, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-12 06:14:56', '', 0, 'not'),
(93, 1, 'feedback', 'i am customer added feedback on Laptop', '2023-11-12 06:17:47', '', 0, 'not'),
(94, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-12 06:22:26', '', 0, 'not'),
(95, 1, 'feedback', 'i am customer added feedback on Laptop', '2023-11-12 07:26:07', '', 0, 'not'),
(96, 1, 'feedback', 'i am customer added feedback on Laptop', '2023-11-12 07:36:09', '', 0, 'not'),
(97, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-12 08:07:11', '', 0, 'not'),
(98, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-12 08:09:38', '', 0, 'not'),
(99, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:40:34', '', 0, 'not'),
(100, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:41:30', '', 0, 'not'),
(101, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:43:26', '', 0, 'not'),
(102, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:43:55', '', 0, 'not'),
(103, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:46:10', '', 0, 'not'),
(104, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:46:19', '', 0, 'not'),
(105, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:47:01', '', 0, 'not'),
(106, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:48:17', '', 0, 'not'),
(107, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:48:47', '', 0, 'not'),
(108, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:49:02', '', 0, 'not'),
(109, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:49:15', '', 0, 'not'),
(110, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:49:30', '', 0, 'not'),
(111, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:50:29', '', 0, 'not'),
(112, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:51:02', '', 0, 'not'),
(113, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:53:41', '', 0, 'not'),
(114, 1, 'Place Order', 'i am customer had new order!', '2023-11-12 08:54:27', '', 0, 'not'),
(115, 1, 'Place Order', 'dsf sdf sdf had new order!', '2023-11-14 06:03:37', '', 0, 'not'),
(116, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-15 22:16:14', '', 0, 'not'),
(117, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-15 22:17:51', '', 0, 'not'),
(118, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-15 22:26:33', '', 0, 'not'),
(119, 1, 'feedback', 'i am customer added feedback on Dell', '2023-11-15 22:41:04', '', 0, 'not'),
(120, 1, 'Products', 'You\'ve successfully deleted sdf', '2023-11-15 22:51:11', '', 0, 'not'),
(121, 1, 'Place Order', 'testing testing testing had new order!', '2023-11-16 09:41:46', '', 0, 'not'),
(122, 1, 'Place Order', 'testing testing testing had new order!', '2023-11-17 00:26:12', '', 0, 'not'),
(123, 10, 'Order Status', 'Your order status was updated to Received.', '2023-11-17 00:31:12', '', 0, 'not'),
(124, 1, 'feedback', 'testing testing testing added feedback on Dell', '2023-11-17 00:34:54', '', 0, 'not');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `product_id` varchar(255) NOT NULL,
  `product_info` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `each_amount` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `payment_type` varchar(20) NOT NULL,
  `shipping` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` varchar(20) NOT NULL DEFAULT 'Pending',
  `isDelete` varchar(20) NOT NULL DEFAULT 'not',
  `total_amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `fullname`, `product_id`, `product_info`, `quantity`, `each_amount`, `address`, `payment_type`, `shipping`, `date`, `status`, `isDelete`, `total_amount`) VALUES
(12, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-10 23:31:11', 'Received', 'not', 32150),
(13, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-10 23:32:47', 'Received', 'not', 32150),
(14, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 00:02:27', 'To Ship', 'not', 32130),
(15, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 00:02:43', 'Pending', 'not', 32130),
(16, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:04:29', 'To Ship', 'not', 32130),
(17, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:04:58', 'To Receive', 'not', 32130),
(18, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:05:11', 'Pending', 'not', 32130),
(19, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:05:37', 'To Ship', 'not', 32130),
(20, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:06:00', 'To Receive', 'not', 32130),
(21, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:06:08', 'Pending', 'not', 32150),
(22, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:07:01', 'Pending', 'not', 32150),
(23, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:07:09', 'Pending', 'not', 32150),
(24, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:10:50', 'Pending', 'not', 32150),
(25, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:11:39', 'Pending', 'not', 32150),
(26, 5, 'dsf sdf sdf', '5,6', 'Lenovo,testing with prize', '2,2', '20.00,32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:16:33', 'Pending', 'not', 32150),
(27, 5, 'dsf sdf sdf', '6', 'Lenovo', '2', '32000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:22:15', 'Pending', 'not', 32130),
(28, 5, 'dsf sdf sdf', '6', 'Lenovo', '16', '256000.00', 'Sta. Cruz. Libertad Aurora, Zamboanga Del Sur', 'Cash on Delivery', 130, '2023-11-11 00:25:26', 'Pending', 'not', 256130),
(29, 8, 'i am customer', '8', 'Dell', '1', '20000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 07:36:39', 'Received', 'not', 20130),
(30, 9, 'no internet', '8', 'Dell', '2', '40000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 19:05:18', 'Received', 'not', 40130),
(31, 8, 'i am customer', '7,8', 'Laptop,Dell', '2,2', '67998.00,40000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 21:32:17', 'Pending', 'not', 108128),
(32, 8, 'i am customer', '7,8', 'Laptop,Dell', '1,1', '33999.00,20000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 21:33:26', 'Received', 'not', 54129),
(33, 8, 'i am customer', '6,7,8', 'Laptop,Dell,Lenovo', '1,1,1', '16000.00,33999.00,20000.00', 'Address', 'Cash on Delivery', 130, '2023-11-11 21:40:29', 'To Ship', 'not', 70129),
(34, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:40:34', 'Pending', 'not', 66129),
(35, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:41:30', 'Pending', 'not', 66129),
(36, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:43:26', 'Pending', 'not', 66129),
(37, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:43:55', 'Pending', 'not', 66129),
(38, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:46:10', 'Pending', 'not', 66129),
(39, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:46:19', 'Pending', 'not', 66129),
(40, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:47:01', 'Pending', 'not', 66129),
(41, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:48:17', 'Pending', 'not', 66129),
(42, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:48:47', 'Pending', 'not', 66129),
(43, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:49:02', 'Pending', 'not', 66129),
(44, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:49:15', 'Pending', 'not', 66129),
(45, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:49:30', 'Pending', 'not', 66129),
(46, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:50:29', 'Pending', 'not', 66129),
(47, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:51:01', 'Pending', 'not', 66129),
(48, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:53:41', 'Pending', 'not', 66129),
(49, 8, 'i am customer', '2,3,6,7', 'sample,sample,Lenovo,Laptop', '2,1,2,1', '0.00,0.00,32000.00,33999.00', 'Address', 'Cash on Delivery', 130, '2023-11-12 08:54:27', 'Pending', 'not', 66129),
(50, 5, 'dsf sdf sdf', '3', 'sample', '1', '0.00', 'lsdfj. lsjdflksj lkjslfkj, lkjdflksjd', 'Cash on Delivery', 130, '2023-11-14 06:03:37', 'Pending', 'not', 130),
(51, 10, 'testing testing testing', '3', 'sample', '2', '0.00', 'sdf. sdf sdf, sdf', 'Cash on Delivery', 130, '2023-11-16 09:41:46', 'Pending', 'not', 130),
(52, 10, 'testing testing testing', '8', 'Dell', '1', '20000.00', 'sdf. sdf sdf, sdf', 'G-Cash', 130, '2023-11-17 00:26:12', 'Received', 'not', 20130);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `category` varchar(200) NOT NULL,
  `image` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `stock` int(11) NOT NULL,
  `prize` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `sold` int(11) NOT NULL,
  `ratings` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `category`, `image`, `name`, `description`, `address`, `stock`, `prize`, `discount`, `sold`, `ratings`, `date`, `isDelete`) VALUES
(1, 'Laptop', 'assets/product image/1699500429905_+_download.jpeg', 'Dell', 'New ! Dell Inspiron i3583 15.6\" HD Touch-Screen Laptop - Intel i3-8145U - 8GB DDR4-128GB SSD ', 'Sta. Cruz Libertad, Aurora, Zamboanga Del Sur', 0, 20000, 0, 5, 7, '2023-11-09 00:36:53', 'not'),
(2, 'Computers', 'assets/product image/1699490323015_+_logo.png', 'sample', 'description', '', 7, 0, 0, 2, 8, '2023-11-09 00:38:43', 'not'),
(3, 'Computers', 'assets/product image/1699490521978_+_Ede_vZbXsAc8zpM.png', 'sample', 'description', '', 4, 0, 0, 2, 10, '2023-11-09 00:42:01', 'not'),
(4, 'Computers', 'assets/product image/1699492425110_+_jrmsuOffice.jpeg', 'sdf', '', '', 111, 0, 0, 0, 10, '2023-11-09 01:13:45', 'Deleted'),
(5, 'Laptop', 'assets/product image/1699498721464_+_PAGLINAWAN, SHELO562060.jpg', 'testing with prize', '20', '', 48, 10, 0, 2, 0, '2023-11-09 02:56:11', 'Deleted'),
(6, 'Computers', 'assets/product image/1699500268440_+_1345811b-a96b-417d-892f-998e3c7b0103.png', 'Lenovo', 'OS: Windows 11, RAM: 8GB, SSD: 256GB, Proccessor: Core I5', 'Sta. Cruz, Dapitan City', 12, 16000, 2000, 2, 0, '2023-11-09 02:59:03', 'not'),
(7, 'Laptop', 'assets/product image/1699663547176_+_uploaded_998291359696390a9611ca1eb1c3a58079b1c933.jpg', 'Laptop', 'LENOVO IDEAPAD SLIM 3I 14ITL05 81X700ERPH | CORE I3-1115G4 | 8GB RAM | 512GB SSD | PLATINUM GRAY WITH FREE LENOVO HU75, M120 PRO AND GCASH WORTH P1,000', 'Sta. Cruz Dapitan City', 11, 33999, 40000, 1, 7, '2023-11-11 00:45:47', 'not'),
(8, 'Laptop', 'assets/product image/1699663877607_+_71D3y82w27L._SL1500_.jpg', 'Dell', 'Dell Inspiron 15 3525 15.6\" FHD Laptop Ryzen 7 5700U 16GB RAM/1TB SSD Win11 Carbon Black', 'Sta. Cruz Dapitan City', 0, 20000, 25000, 1, 3, '2023-11-11 00:51:17', 'not'),
(9, 'Computers', 'assets/product image/1700008190100_+_Ede_vZbXsAc8zpM.png', 'sdf', 'sf', 'sd', 21, 123, 213, 0, 0, '2023-11-15 00:29:50', 'Deleted');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `given_image` varchar(255) NOT NULL,
  `user_type` varchar(50) NOT NULL,
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `middle_name`, `last_name`, `username`, `password`, `given_image`, `user_type`, `last_login`, `date`, `isDelete`) VALUES
(1, 'Shelos', 'Mora', 'Paglinawan', 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9', 'assets/image upload/1699666882654_uploaded_998291359696390a9611ca1eb1c3a58079b1c933.jpg', 'Admin', '2023-11-06 21:47:27', '2023-11-06 21:47:27', 'not'),
(2, 'eloy', '', 'user', 'user1', '58be779b29eb49f5cacaf55f1c77ef9b651c61359c0a9a956c39b33842eb3920', '', '', '2023-11-07 12:41:17', '2023-11-07 12:41:17', 'not'),
(3, 'eloy', 'the', 'user', 'user2', 'b8c871d486f147a9d99be27ab59c64c8781bb53c0472afd9804cbe00e174f648', '', 'Customer', '2023-11-07 12:46:38', '2023-11-07 12:46:38', 'Deleted'),
(4, 'register', 'register', 'register', 'register', '87780fa5de684e87cb92b279f0bc07b14f572851e73b8943a097c1770a5f38e6', '', 'Customer', '2023-11-08 00:56:37', '2023-11-08 00:56:37', 'not'),
(5, 'dsf', 'sdf', 'sdf', 'username123', 'd6866eafc24e6bfe751f968eba0653949bf7554b29a888bb5e79bea277c5b76e', 'assets/image upload/1699562224498_1345811b-a96b-417d-892f-998e3c7b0103.png', 'Customer', '2023-11-08 01:43:55', '2023-11-08 01:43:55', 'not'),
(6, 'sdf', 'sdf', 'sdf', 'sdf124sdf', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f', '', 'Customer', '2023-11-08 01:53:35', '2023-11-08 01:53:35', 'not'),
(7, 'testing', 'testing', 'tresting', 'testing123', '2161a35ac37e1ce9783f38d3db875af27ef02db3f6c62d455c55cc64c53a81f1', '', 'Customer', '2023-11-08 22:13:12', '2023-11-08 22:13:12', 'not'),
(8, 'i ams', 'test', 'customer', 'customer123', 'b041c0aeb35bb0fa4aa668ca5a920b590196fdaf9a00eb852c9b7f4d123cc6d6', 'assets/image upload/1699773924100_Ede_vZbXsAc8zpM.png', 'Customer', '2023-11-11 06:54:18', '2023-11-11 06:54:18', 'not'),
(9, 'no', '', 'internet', 'internet123', 'dfea575fa55e08c9a0466cc9d00cea092e1761d2f9dc191b094d349cdbda0037', '', 'Customer', '2023-11-11 19:04:53', '2023-11-11 19:04:53', 'not'),
(10, 'testing', 'testing', 'testing', 'testing321', '852285e65dbd468798be3a43afe81481e2d4c8a2a45b6b71acebe4588bd6acb2', 'assets/image upload/1700127639941_download.png', 'Customer', '2023-11-16 04:36:15', '2023-11-16 04:36:15', 'not');

-- --------------------------------------------------------

--
-- Table structure for table `user_address`
--

CREATE TABLE `user_address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `street` text NOT NULL,
  `barangay` varchar(255) NOT NULL,
  `municipality` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `zip_code` int(11) NOT NULL,
  `country` varchar(100) NOT NULL,
  `land_mark` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `isDelete` varchar(20) NOT NULL DEFAULT 'not'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_address`
--

INSERT INTO `user_address` (`id`, `user_id`, `street`, `barangay`, `municipality`, `province`, `zip_code`, `country`, `land_mark`, `date`, `isDelete`) VALUES
(4, 5, 'Sta. Cruz', 'Libertad', 'Aurora', 'Zamboanga Del Sur', 7020, 'Phillippines', 'Inside from the company name Cortes Mailing Corporation', '2023-11-09 21:33:38', 'not'),
(5, 5, 'lsdfj', 'lsjdflksj', 'lkjslfkj', 'lkjdflksjd', 123, 'kljsdf', 'klsdjf', '2023-11-09 22:26:44', 'not'),
(6, 5, 'sdf', 'sdfs', 'dfs', 'df', 123, '123', 'f', '2023-11-09 22:35:37', 'not'),
(7, 8, 'sdf', 'sdf', 'sdf', 'sdf', 123, 'sdf', 'sdf', '2023-11-15 13:45:03', 'not'),
(8, 10, 'sdf', 'sdf', 'sdf', 'sdf', 23, 'dsf', 'sfd', '2023-11-16 09:41:31', 'not');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId_comments` (`user_id`),
  ADD KEY `productId_comments` (`product_id`);

--
-- Indexes for table `my_cart`
--
ALTER TABLE `my_cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_with_product` (`product_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_with_users` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_address`
--
ALTER TABLE `user_address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `relationship_with_user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `my_cart`
--
ALTER TABLE `my_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `user_address`
--
ALTER TABLE `user_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `productId_comments` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `userId_comments` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `my_cart`
--
ALTER TABLE `my_cart`
  ADD CONSTRAINT `relationship_with_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `relationship_with_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `user_address`
--
ALTER TABLE `user_address`
  ADD CONSTRAINT `relationship_with_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

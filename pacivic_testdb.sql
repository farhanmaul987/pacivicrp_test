-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 27, 2025 at 04:17 AM
-- Server version: 8.3.0
-- PHP Version: 8.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pacivic_testdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `ID` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(150) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `lastActive` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`ID`, `username`, `password`, `email`, `first_name`, `last_name`, `registerDate`, `lastActive`) VALUES
(1, 'admin', '$2a$10$3QYJzAIr9lnBEhZQNFF.weMt4zkXVPtnOO2ge4mpSsKDAfP3HfO.K', 'admin@gmail.com', 'Admin', 'Pacivic', '2025-07-20 01:06:31', '2025-07-27 11:04:04'),
(2, 'revz', '$2b$10$TaMlArTRhTQIoaKLRg3ExubABmXLnmR5j2fnpLGZCskn3RVsGdw7u', 'amerta@gmail.com', 'Amerta', 'Koskova', '2025-07-27 10:19:13', '2025-07-27 10:54:01'),
(3, 'romero', '$2b$10$M0Owl5PXGQEuwLDXPRXwo.40V/UGLq/tKdA.LAMr9GjoTHKjJS4TO', 'ara@gmail.com', 'Roma', 'Asada', '2025-07-27 11:06:30', '2025-07-27 11:06:30');

-- --------------------------------------------------------

--
-- Table structure for table `players_stuff`
--

CREATE TABLE `players_stuff` (
  `id_stuff` int NOT NULL,
  `id_player` int NOT NULL,
  `bank_id` varchar(255) NOT NULL,
  `cash_balance` int NOT NULL,
  `bank_balance` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `players_stuff`
--

INSERT INTO `players_stuff` (`id_stuff`, `id_player`, `bank_id`, `cash_balance`, `bank_balance`) VALUES
(1, 1, '8237461092', 100000, 250000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `players_stuff`
--
ALTER TABLE `players_stuff`
  ADD PRIMARY KEY (`id_stuff`),
  ADD KEY `players_stuff_accounts_FK` (`id_player`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `players_stuff`
--
ALTER TABLE `players_stuff`
  MODIFY `id_stuff` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `players_stuff`
--
ALTER TABLE `players_stuff`
  ADD CONSTRAINT `players_stuff_accounts_FK` FOREIGN KEY (`id_player`) REFERENCES `accounts` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

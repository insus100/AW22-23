-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-12-2022 a las 21:05:47
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `UCM_CAU`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('2vXjGpJM9GtPBNovRiL60ghs3hVKOt69', 1670787537, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":2,\"email\":\"test@ucm.es\",\"role\":1,\"username\":\"Felipe Ferras Gómez\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UCM_AW_CAU_AVI_Avisos`
--

CREATE TABLE `UCM_AW_CAU_AVI_Avisos` (
  `id` int(11) NOT NULL,
  `creador` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `texto` text NOT NULL,
  `comentario` text NOT NULL,
  `tipo` tinyint(4) NOT NULL,
  `tecnico` int(11) DEFAULT NULL,
  `resuelto` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_AVI_Avisos`
--

INSERT INTO `UCM_AW_CAU_AVI_Avisos` (`id`, `creador`, `fecha`, `texto`, `comentario`, `tipo`, `tecnico`, `resuelto`) VALUES
(1, 1, '2022-12-10 17:26:55', 'cgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggaddddddddddddddddddddddddddd', 'cgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggaddddddddddddddddddddddddddd', 0, NULL, 0),
(2, 1, '2022-12-10 17:27:26', 'cgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggaddddddddddddddddddddddddddd', 'cgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggaddddddddddddddddddddddddddd', 1, 2, 0),
(3, 1, '2022-12-10 19:13:58', 'fhhddfhdhfhfd', '', 2, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `UCM_AW_CAU_USU_Usuarios`
--

CREATE TABLE `UCM_AW_CAU_USU_Usuarios` (
  `id` int(11) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `username` text NOT NULL,
  `uniprofile` text NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0,
  `employeenumber` varchar(32) DEFAULT NULL,
  `img` text NOT NULL,
  `rep` text NOT NULL,
  `incidence` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_USU_Usuarios`
--

INSERT INTO `UCM_AW_CAU_USU_Usuarios` (`id`, `email`, `password`, `username`, `uniprofile`, `role`, `employeenumber`, `img`, `rep`, `incidence`) VALUES
(1, 'inivelas@ucm.es', 'ojete', 'Íñigo', 'Alumno', 0, '', '', '', ''),
(2, 'test@ucm.es', 'ojete', 'Felipe Ferras Gómez', 'PAS', 1, '1234-abc', '', '', ''),
(3, 'test1@ucm.es', 'ojete', 'Felipe Ferras Gómez', 'PAS', 0, '', '', '', ''),
(4, 'ajajaj@ucm.es', 'ojete', 'Oooooo', 'Alumno', 0, '', '', '', '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tecnico` (`tecnico`),
  ADD KEY `creador` (`creador`);

--
-- Indices de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `UCM_AW_CAU_AVI_Avisos`
--
ALTER TABLE `UCM_AW_CAU_AVI_Avisos`
  ADD CONSTRAINT `ucm_aw_cau_avi_avisos_ibfk_1` FOREIGN KEY (`tecnico`) REFERENCES `UCM_AW_CAU_USU_Usuarios` (`id`),
  ADD CONSTRAINT `ucm_aw_cau_avi_avisos_ibfk_2` FOREIGN KEY (`creador`) REFERENCES `UCM_AW_CAU_USU_Usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

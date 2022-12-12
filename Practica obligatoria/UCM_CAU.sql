-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-12-2022 a las 17:32:50
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
('tvfhRIpw-qTtm2Q_WTOBwALad2ZPqXpA', 1670949045, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":1,\"email\":\"inivelas@ucm.es\",\"role\":0,\"username\":\"Íñigo\"}');

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
  `categoria` text NOT NULL,
  `funcion` text NOT NULL DEFAULT '',
  `tecnico` int(11) DEFAULT NULL,
  `resuelto` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_AVI_Avisos`
--

INSERT INTO `UCM_AW_CAU_AVI_Avisos` (`id`, `creador`, `fecha`, `texto`, `comentario`, `tipo`, `categoria`, `funcion`, `tecnico`, `resuelto`) VALUES
(1, 1, '2022-12-10 17:26:55', 'cgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggaddddddddddddddddddddddddddd', 'cgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggadddddddddddddddddddddddddddcgaeggaddddddddddddddddddddddddddd', 0, '', '', NULL, 0),
(2, 1, '2022-12-11 22:02:40', 'dgsdgdgdgdg', 'f', 1, '', '', 2, 0),
(3, 1, '2022-12-11 22:43:38', 'agagagagagadgadgadgadgadgadgad', '', 2, '', '', 2, 0),
(4, 1, '2022-12-12 16:26:30', 'gaegertththt', '', 2, 'Asesoría Jurídica', '', NULL, 0);

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
  `incidence` text NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp(),
  `activo` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `UCM_AW_CAU_USU_Usuarios`
--

INSERT INTO `UCM_AW_CAU_USU_Usuarios` (`id`, `email`, `password`, `username`, `uniprofile`, `role`, `employeenumber`, `img`, `rep`, `incidence`, `fecha`, `activo`) VALUES
(1, 'inivelas@ucm.es', 'ojete', 'Íñigo', 'Alumno', 0, '', 'aitor.jpg', '', '', '2022-12-11 22:04:37', 1),
(2, 'test@ucm.es', 'ojete', 'Felipe Ferras Gómez', 'PAS', 1, '1234-abc', 'felipe.jpg', '', '', '2022-12-11 22:04:37', 1),
(3, 'test1@ucm.es', 'ojete', 'Felipe Ferras Gómez', 'PAS', 0, '', 'felipe.jpg', '', '', '2022-12-11 22:04:37', 1),
(4, 'ajajaj@ucm.es', 'ojete', 'Oooooo', 'Alumno', 0, '', '', '', '', '2022-12-11 22:04:37', 1),
(5, 'abd@ucm.es', 'ojete', 'Antiguo Alumno 1', 'Antiguo alumno', 0, '', '', '', '', '2022-12-12 12:42:15', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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

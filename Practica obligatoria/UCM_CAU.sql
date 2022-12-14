-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2022 a las 20:29:23
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
('aSrijo1pguj-g_XKjmAKT9qd3mios5Nk', 1671041478, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"userId\":2,\"email\":\"test@ucm.es\",\"role\":1,\"username\":\"Felipe Ferras Gómez\"}');

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
(2, 5, '2022-12-12 17:21:32', 'aAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAVaAuaiujbn<m<mbNMBMBMNBNBNnBmBmvAJkaBVkAVBkmAV', '', 2, 'Servicio de Administración', '', 2, 0),
(4, 1, '2022-12-13 17:02:24', 'fbsasgsrgagrshasgrdasgbabbadsabed', '', 0, 'Conectividad', 'Cortafuegos corporativo', 2, 0),
(5, 1, '2022-12-13 17:05:19', 'jnakglkalsfbkjbsf', '', 2, 'Oficina de Gestión de Infraestructuras y Mantenimiento', '', NULL, 0),
(6, 6, '2022-12-13 17:54:26', 'AJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjniklAJhhjleAJKNIGlkjnikl', '', 1, 'Conectividad', 'Wifi para visitantes (ssid: UCM-Visitantes)', NULL, 0),
(7, 6, '2022-12-13 17:55:24', 'GARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaGARhrraaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '', 2, 'Oficina de Gestión de Infraestructuras y Mantenimiento', '', NULL, 0);

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
(1, 'inivelas@ucm.es', '1234', 'Íñigo', 'Alumno', 0, '', 'aitor.jpg', '', '', '2022-12-11 22:04:37', 1),
(2, 'test@ucm.es', '1234', 'Felipe Ferras Gómez', 'PAS', 1, '1234-abc', 'felipe.jpg', '', '', '2022-12-11 22:04:37', 1),
(4, 'ajajaj@ucm.es', '1234', 'Oooooo', 'Alumno', 0, '', '', '', '', '2022-12-11 22:04:37', 1),
(5, 'antiguo@ucm.es', '1234', 'Antiguo Alumno 1', 'Antiguo alumno', 0, '', '', '', '', '2022-12-12 12:42:15', 1),
(6, 'pdi@ucm.es', '1234', 'P D I', 'PDI', 0, '', 'steve.jpg', '', '', '2022-12-13 17:48:42', 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `UCM_AW_CAU_USU_Usuarios`
--
ALTER TABLE `UCM_AW_CAU_USU_Usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

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

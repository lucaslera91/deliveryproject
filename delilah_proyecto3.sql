-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 01, 2021 at 03:52 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `delilah_proyecto3`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `estado` varchar(15) NOT NULL,
  `hora` datetime NOT NULL DEFAULT current_timestamp(),
  `descripcion` varchar(400) NOT NULL,
  `pago` varchar(10) NOT NULL,
  `monto` int(50) NOT NULL,
  `usuarioID` varchar(50) NOT NULL,
  `direccion` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `estado`, `hora`, `descripcion`, `pago`, `monto`, `usuarioID`, `direccion`) VALUES
(14, 'Entregada', '2021-11-23 22:58:04', 'Pollo al horno,Pancho', 'Efectivo', 850, '51', 'Club de las milanesas'),
(15, 'Entregada', '2021-11-23 23:30:31', 'Pollo al horno,Hamburguesa', 'Efectivo', 1000, '51', 'Club de las milanesas'),
(16, 'Entregada', '2021-11-24 01:55:02', 'Pancho,Ceviche,Pollo al horno', 'Efectivo', 1300, '51', 'Club de las milanesas'),
(17, 'Creado', '2021-11-24 12:51:14', 'Pollo al horno,Hamburguesa', 'Efectivo', 1000, '1', 'la dir 222'),
(18, 'Creado', '2021-11-25 12:29:51', 'Pollo al horno,Pancho,Ceviche', 'Efectivo', 1300, '51', 'Club de las milanesas'),
(19, 'Creado', '2021-11-25 12:31:19', 'Pollo al horno,Hamburguesa', 'Efectivo', 1000, '51', 'Club de las milanesas'),
(20, 'Creado', '2021-11-25 15:52:33', 'Pollo al horno,Pancho', 'Efectivo', 850, '1', 'la dir 222'),
(21, 'Creado', '2021-11-25 15:54:21', 'Pollo al horno,Hamburguesa', 'Efectivo', 1000, '68', 'jose 123'),
(22, 'Creado', '2021-11-25 16:27:26', 'Hamburguesa', 'Efectivo', 300, '1', 'la dir 222'),
(23, 'Creado', '2021-11-29 11:54:06', '', 'Efectivo', 0, '51', 'Club de las milanesas'),
(24, 'Creado', '2021-11-29 12:17:33', 'Pollo al horno,Hamburguesa', 'Efectivo', 1000, '1', 'la dir 222'),
(25, 'Creado', '2021-11-29 12:56:54', 'Pollo al horno', 'Efectivo', 700, '1', 'la dir 222'),
(26, 'Creado', '2021-11-29 18:00:22', 'Pollo al horno,Hamburguesa', 'Efectivo', 1000, '51', 'Club de las milanesas'),
(27, 'Creado', '2021-11-30 16:46:14', '', 'Efectivo', 0, '51', 'Club de las milanesas');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `precio` int(10) NOT NULL,
  `imagen` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `precio`, `imagen`) VALUES
(1, 'Pollo al horno', 'Pollo al horno con papa fritas', 700, 'https://i.ytimg.com/vi/RCO7HjKkU8o/maxresdefault.jpg'),
(2, 'Hamburguesa', 'Hamburguesa cocida con queso lechuga y tomate', 300, 'https://www.hola.com/imagenes/cocina/noticiaslibros/20210528190401/dia-internacional-hamburguesa-recetas-2021/0-957-454/dia-hamburguesa-m.jpg'),
(3, 'Pancho', 'Salchicha y condimentos mas pan', 150, 'https://pbs.twimg.com/media/EXJ96xKU4AAfBhN.jpg'),
(4, 'Ceviche', 'Camote, maíz tierno y unas hojas de lechuga', 450, 'https://t1.rg.ltmcdn.com/es/images/7/4/1/ceviche_peruano_18147_600_square.jpg'),
(5, 'Pizza', 'Dough, tomatoes, olive oil, salt and basil', 300, 'https://t1.rg.ltmcdn.com/es/images/5/2/6/pizza_napolitana_32625_orig.jpg'),
(6, 'Ensalada', 'Ensalada con tomate, cebolla, lechuga pimiento', 200, 'https://www.hola.com/imagenes/cocina/noticiaslibros/20210805194067/ensaladas-con-tres-cuatro-ingredientes/0-981-971/ingredientes-adobe-m.jpg'),
(7, 'Burritos', 'Masa con carne y salsa', 400, 'https://www.hola.com/imagenes/cocina/recetas/20191015151658/burrito-pollo-verduras/0-733-361/burrito-pollo-m.jpg'),
(8, 'Sushi', 'Arroz con pescado fresco', 500, 'https://s1.eestatic.com/2015/05/11/cocinillas/cocinillas_32506750_116175093_1706x960.jpg'),
(9, 'Sopa', 'Sopa con pollo y arroz', 450, 'https://www.inspiredtaste.net/wp-content/uploads/2018/09/Easy-Chicken-Noodle-Soup-Recipe-1200.jpg'),
(18, 'Pollo teriyaki', 'Pollo con salsa teriyaki', 450, 'https://t2.rg.ltmcdn.com/es/images/6/4/5/pollo_teriyaki_con_verduras_57546_orig.jpg'),
(19, 'Wok', 'Pollo con verduras salteadas y arroz', 550, 'https://okdiario.com/img/recetas/2017/10/20/wok-de-pollo.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre_apellido` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `correo` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `direccion` varchar(400) NOT NULL,
  `telefono` varchar(40) NOT NULL,
  `rol` varchar(10) DEFAULT NULL,
  `favoritos` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `carrito` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre_apellido`, `usuario`, `correo`, `contrasena`, `direccion`, `telefono`, `rol`, `favoritos`, `carrito`) VALUES
(1, 'Macri Gato', 'macricat', 'gato@gmail.com', '123456', 'la dir 222', '+54 9 261 874 4236', '', '[{\"nombre\":\"Ensalada\"},{\"nombre\":\"Sushi\"},{\"nombre\":\"Pizza\"},{\"nombre\":\"Pancho\"}]', '[[{\"id\":3,\"nombre\":\"Pancho\",\"descripcion\":\"Salchicha y condimentos mas pan\",\"precio\":150,\"imagen\":\"https://pbs.twimg.com/media/EXJ96xKU4AAfBhN.jpg\"}]]'),
(2, 'juanito', 'acamica55', 'ups@correo.com', 'firstlady', 'dir 3', '+54 9 261 523 5554', '', '[{\"nombre\":\"Sushi\"}]', ''),
(10, 'juan', 'acamica105', 'gono@correo.com', 'firstlady5', 'dir 444', '+54 9 261 543 6666', '', '', ''),
(11, 'seba', 'acamica', 'salir@correo.com', 'firstlady6', 'dir 555', '+54 9 261 543 1234', '', '', ''),
(14, 'jarvis Ironman', 'myamdin', 'javi@correo.com', '12345677', 'avendida siempre viva', '0880 321 5645', '', '', ''),
(15, 'siri apple', 'carerta', 'xanex@gmail.com', '5464654', 'avendida 222', '08800 546 7898', '', '', ''),
(17, 'jarvis Ironman', 'Pikachu', 'javi@correo.com', '123456', 'avendida siempre viva', '0880  Fu', '', '', ''),
(18, 'pokemon 26', 'Nidorinp', 'Nidorino@correo.com', '987654', 'dir 444', '326 3645 654', '', '', ''),
(48, 'Ningun', 'Presidente', 'Dato@correo.com', 'contrasena', 'dir 999', '54 9 544 3775', '', '', ''),
(49, 'Anotonella', 'Anto', 'Amto@correo.com', 'contrasena', 'SANI', '54 9 511 3111', '', '', ''),
(50, 'Jackson V', 'youtuber', 'gatota@correo.com', 'salsa', 'dir dir dir dir dir', '111111111111', '', '', ''),
(51, 'Lucas', 'lucas', 'lucas@correo.com', '123456', 'Club de las milanesas', '08000001111', 'admin', '', ''),
(52, 'gomez', 'facu', 'corefavur@adg.com', '12345', 'calle 124', '2342345', NULL, '', ''),
(53, 'Fer', 'fer', 'fer@gmail.com', '123452345', 'dire fer 4563', '975245761', '', '', ''),
(54, 'Julio Martin', 'julio', 'Julio@martin.com', 'salidas', 'calle martin 432', '14643567', '', '', ''),
(55, 'peter anguila', 'peter', 'anguila@peter.com', '0988', 'alsdjg 4123', '36245', '', '', ''),
(63, 'Sofia del Terror', 'Sofi', 'sofi@terror.com', '123455', 'avenida del terror', '0800 666 9999', '', '', ''),
(64, 'F pub', 'elGranP', 'dfgadg@dfgsdfg.com', '12345', 'zdgfa 123', '25w457e567', '', '', ''),
(65, 'Juan Javier Escudero', 'javier', 'Juan@escudero.com', '12345', 'avenida escudero 123', '3629385740', '', '', ''),
(66, 'ig le', 'ignacio', 'laslkdfj@asdf', '123456', ' aasdf awef', '7623547123', '', '', ''),
(67, 'mama', 'mama', 'mama@mama.com', '123', 'mama st', '12351345', '', '', ''),
(68, 'jose', 'jose', 'jose@jose', '123456', 'jose 123', '3452356345', '', '', ''),
(69, 'Juan Agustin', 'Juan', 'Juan@agustin.com', '123456', 'Juan 123', '34523452345', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

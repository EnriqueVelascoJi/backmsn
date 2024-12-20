create table refaccion (
	idRefaccion serial primary key,
	costo decimal not null,
	fechaCosto DATE not null,
	venta decimal not null,
	fechaVenta DATE not null,
	proveedor varchar(100) not null,
	isDeleted boolean default false
);
create table mecanico (
	idMecanico serial primary key,
	nombre varchar(100) not null,
	fechaIngreso DATE not null,
	isDeleted boolean default false

);
create table incidencia (
	idIncidencia serial primary key,
	nombre varchar(50) not null,
	estatus varchar(50) not null,
	descripcion varchar(250) not null,
	comentario varchar(250) ,
	isCheckWa boolean default false,
	fecha DATE not null,
	isDeleted boolean default false,
	
	idMecanico int,
	CONSTRAINT fk_incidencia_mecanico
		FOREIGN KEY(idMecanico) REFERENCES mecanico(idMecanico)
		ON DELETE SET NULL
);
create table imagen (
	idImagen serial primary key,
	url varchar(250) not null,
	isDeleted boolean default false,
	
	idIncidencia int,
	CONSTRAINT fk_imagen_incidencia
		FOREIGN KEY(idIncidencia) REFERENCES incidencia(idIncidencia)
		ON DELETE SET NULL

);
create table archivo (
	idArchivo serial primary key,
	url varchar(250) not null,
	isDeleted boolean default false,
	
	idIncidencia int,
	CONSTRAINT fk_archivo_incidencia
		FOREIGN KEY(idIncidencia) REFERENCES incidencia(idIncidencia)
		ON DELETE SET NULL

);
create table aeropuerto (
	idAeropuerto serial primary key,
	nombre varchar(100) not null,
	siglas varchar(30) not null,
	isDeleted boolean default false

);
create table cliente (
	idCliente serial primary key,
	nombre varchar(100) not null,
	descripcion varchar(250),
	isDeleted boolean default false

);
create table usuario (
	idUsuario serial primary key,
	nombre varchar(50) not null,
	apellido varchar(50),
	email varchar(50) not null,
	telefono varchar(30) not null,
	contrasenia varchar(20)not null,
	tipoUsuario int not null,
	aprobador boolean default false,
	verificadorWA boolean default false,
	isDeleted boolean default false,
	
	idCliente int,
	CONSTRAINT fk_usuario_cliente
		FOREIGN KEY(idCliente) REFERENCES cliente(idCliente)
		ON DELETE SET NULL
);
create table cliente_aeropuerto (
	idClienteAeropuerto serial primary key,
	isDeleted boolean default false,
	
	idCliente int,
	idAeropuerto int,
	
	CONSTRAINT fk_cliente_aeropuerto
		FOREIGN KEY(idCliente) REFERENCES cliente(idCliente)
		ON DELETE SET NULL,
	CONSTRAINT fk_aeropuerto_cliente
		FOREIGN KEY(idAeropuerto) REFERENCES aeropuerto(idAeropuerto)
		ON DELETE SET NULL
);
create table tipo_equipo (
	
	idTipoEquipo serial primary key,
	nombre varchar(100) not null,
	siglas varchar(100) not null,
	isDeleted boolean default false
);
create table equipo (
	idEquipo serial primary key,
	equipo varchar(100) not null,
	noEconomico varchar(100) not null,
	marca varchar(100) not null,
	modelo varchar(100) not null,
	noSerie varchar(100) not null,
	tipoCombustible varchar(100) not null,
	enUso boolean default false,
	motivo varchar(100) not null,
	isDeleted boolean default false,
	
	
	idClienteAeropuerto int,
	idTipoEquipo int,
	
	CONSTRAINT fk_cliente_aeropuerto
		FOREIGN KEY(idClienteAeropuerto) REFERENCES cliente_aeropuerto(idClienteAeropuerto)
		ON DELETE SET NULL,
	CONSTRAINT fk_equipo_tipoEquipo
		FOREIGN KEY(idTipoEquipo) REFERENCES tipo_equipo(idTipoEquipo)
		ON DELETE SET NULL
);

create table equipo_refacciones(
	idEquipoRefacciones serial primary key,
	isDeleted boolean default false,
	
	idRefaccion int,
	idTipoEquipo int,
	
	CONSTRAINT fk_equipo_refacciones_refaccion
		FOREIGN KEY(idRefaccion) REFERENCES refaccion(idRefaccion)
		ON DELETE SET NULL,
	CONSTRAINT fk_equipo_refacciones_tipo_equipo
		FOREIGN KEY(idTipoEquipo) REFERENCES tipo_equipo(idTipoEquipo)
		ON DELETE SET NULL
);

create table refacciones_incidencia(
	idRefaccionesIncidencia  serial primary key,
	noPiezas int not null,
	costo decimal not null,
	precioVenta decimal not null,
	isDeleted boolean default false,
	
	idRefaccion int,
	idIncidencia int,
	
	CONSTRAINT fk_refacciones_incidencia_refaccion
		FOREIGN KEY(idRefaccion) REFERENCES refaccion(idRefaccion)
		ON DELETE SET NULL,
	CONSTRAINT fk_refacciones_incidencia_incidencia
		FOREIGN KEY(idIncidencia) REFERENCES incidencia(idIncidencia)
		ON DELETE SET NULL
);
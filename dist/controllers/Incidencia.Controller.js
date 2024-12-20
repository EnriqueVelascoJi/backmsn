 const pool = require('../DB/postgres');




//Get all Incidencias
exports.get_all_incidencias = async (req, res) => {
      
    // const query = `
    // SELECT DISTINCT
    //     i.idincidencia,
    //     i.nombre,
    //     i.estatus,
    //     i.descripcion,
    //     i.comentario,
    //     i.ischeckwa,
    //     i.fecha,
    //     c.nombre nombrecliente ,
    //     a.nombre nombreaeropuerto
        
        
    // FROM
    //     incidencia i
    // INNER JOIN refacciones_incidencia ri
    //     ON i.idincidencia = ri.idincidencia
    //     INNER JOIN refaccion r
    //     ON ri.idrefaccion = r.idrefaccion
    //     INNER JOIN equipo_refacciones er
    //     ON r.idrefaccion = er.idrefaccion
    //     INNER JOIN equipo e
    //     ON er.idtipoequipo = e.idtipoequipo
    //     INNER JOIN cliente_aeropuerto ca
    //     ON e.idclienteaeropuerto = ca.idclienteaeropuerto
    //     INNER JOIN aeropuerto a
    //     ON ca.idaeropuerto = a.idaeropuerto
    //     INNER JOIN cliente c
    //     ON ca.idcliente = c.idcliente
        
    
        
    // `;
    //const query = "SELECT * FROM incidencia where isdeleted=FALSE order by idincidencia"
    const query = `select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,
    c.idcliente idcliente, c.nombre clientenombre, a.nombre aeropuertonombre, ri.medida,ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join cliente c on c.idcliente = i.idcliente
    inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
        inner join refaccion r on ri.idrefaccion = r.idrefaccion
        where i.isdeleted=FALSE order by i.idincidencia desc;`
    // Get all
    const response = await pool.query(query);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}

exports.get_incidencia = async (req, res) => {
      
    const id= req.params.id
    const query = `select *,mi.idmecanico, i.nombre nombreincidencia, r.nombre nombrerefaccion, c.nombre nombrecliente, a.nombre nombreaeropuerto, e.equipo nombrequipo, i.descripcion descripcion from incidencia i
	inner join cliente c on c.idcliente = i.idcliente
	inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
    inner join mecanicos_incidencia mi on i.idincidencia = mi.idincidencia
    inner join equipo e on ri.idequipo = e.idequipo
    inner join refaccion r on ri.idrefaccion = r.idrefaccion
    where i.idincidencia=$1`
        var response = await pool.query(query, [ id ]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()

      
}
exports.get_by_equipo = async (req, res) => {
      
    const id= req.params.id
    // const id= 13
        var response = await pool.query(`select r.idrefaccion, r.costo, r.fechacosto, r.venta, r.fechaventa, r.proveedor, r.isdeleted, r.nombre from equipo_refacciones er
        inner join refaccion r on er.idrefaccion = r.idrefaccion where er.idtipoequipo =$1 or idtipoequipo=13 and r.isdeleted=FALSE;`, [ id ]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()

      
}
exports.get_by_date = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin
    } = req.body

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,
    c.nombre clientenombre, a.nombre aeropuertonombre, e.noeconomico, e.equipo,ri.medida, ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join cliente c on c.idcliente = i.idcliente
    inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
    inner join equipo e on ri.idequipo = i.idequipo
        inner join refaccion r on ri.idrefaccion = r.idrefaccion
        where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2 order by i.idincidencia desc;`
        var response = await pool.query(query, [ date1, date2]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()

      
}
exports.ver_imagenes = async (req, res) => {
    const id= req.params.id
        var response = await pool.query(`select i.idincidencia, im.url, im.idimagen
        from incidencia i
        inner join imagen im on i.idincidencia = im.idincidencia
        where i.idincidencia=$1;`, [ id ]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()
}
exports.ver_files = async (req, res) => {
    const id= req.params.id
        var response = await pool.query(`select i.idincidencia, ar.url, ar.idarchivo
        from incidencia i
        inner join archivo ar on i.idincidencia = ar.idincidencia
        where i.idincidencia=$1;`, [ id ]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()
}
// exports.ver_mas = async (req, res) => {
      
//     const id= req.params.id
//         var response = await pool.query(`select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,  m.nombre mecaniconombre,
//         c.nombre clientenombre,a.siglas asiglas ,a.nombre aeropuertonombre, e.noeconomico, e.equipo, r.nombre,ri.medida, ri.nopiezas, ri.costo, ri.precioventa, r.nombre refaccionnombre, te.siglas tsiglas, i.tiposervicio, r.proveedor
//         from incidencia i
//         inner join cliente c on c.idcliente = i.idcliente
//         inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
//         inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
//         inner join refaccion r on ri.idrefaccion = r.idrefaccion
//         inner join equipo e on ri.idequipo = e.idequipo
// 	inner join tipo_equipo te on e.idtipoequipo = te.idtipoequipo
//         inner join mecanicos_incidencia mi on i.idincidencia = mi.idincidencia
// 	inner join mecanico m on mi.idmecanico = m.idmecanico

//         where i.idincidencia=$1;`, [ id ]);
      
//         if(response.rows.length == 0){
//             console.log('error')
//         }
      
//         res.status(201)
//             .json({
//                   status: "success",
//                   msg: "Incidencia",
//                   data: response.rows
//                 })
//                 .end()

      
// }
exports.ver_mas = async (req, res) => {
      
    const id= req.params.id
        var response = await pool.query(`select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,
        c.nombre clientenombre,a.siglas asiglas ,a.nombre aeropuertonombre, e.noeconomico, e.equipo, r.nombre,ri.medida, ri.nopiezas, ri.costo, ri.precioventa, r.nombre refaccionnombre, te.siglas tsiglas, i.tiposervicio, r.proveedor
        from incidencia i
        inner join cliente c on c.idcliente = i.idcliente
        inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
        inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
        inner join refaccion r on ri.idrefaccion = r.idrefaccion
        inner join equipo e on ri.idequipo = e.idequipo
	inner join tipo_equipo te on e.idtipoequipo = te.idtipoequipo

        where i.idincidencia=$1;`, [ id ]);
      
        if(response.rows.length == 0){
            console.log('error')
        }
      
        res.status(201)
            .json({
                  status: "success",
                  msg: "Incidencia",
                  data: response.rows
                })
                .end()

      
}

exports.create_incidencia = async (req, res) => {

    let {
         mecanicospost,
        nombre,
        estatus,
        descripcion,
        comentario,
        fecha,
        //refacciones,
        tipoServicio,
        cliente,
        aeropuerto,
        //equipo,
        finalEquipos
    } = req.body 


      

    // Resgistrar incidencia    
    var response = await pool.query(
        'INSERT INTO incidencia(nombre,estatus,descripcion,comentario,fecha,tiposervicio,idcliente,idaeropuerto) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING idincidencia;',
        [nombre, estatus, descripcion, comentario, fecha, tipoServicio,cliente,aeropuerto]
    )
    const idIncidenciaNew = response.rows[0].idincidencia;

    console.log('waUsers', waUsers);
    
    // if(idIncidenciaNew) {
    //     const waUsers = await findWAUsers();
    //      console.log('waUsers', waUsers);
    //   if (waUsers && waUsers.length) {
    //     await Promise.all(
    //       waUsers.map(async (user) =>
    //         sendWANotification(
    //           `521${user.telefono}@c.us`,
    //           response.rows[0],
    //         ),
    //       ),
    //     );
    //   }
    // }

    let data = ''
    for(let i = 0; i < finalEquipos.length; i++) {
        const refacciones = finalEquipos[i].refaccionesIncidencias
        const idEquipo = finalEquipos[i].idReal
        for(let j = 0; j < refacciones.length; j++) {
            data += `(${refacciones[j].noPiezas},'${refacciones[j].medida}',${refacciones[j].costo},${refacciones[j].precioVenta},false,${refacciones[j].refaccion},${idEquipo},${idIncidenciaNew}),`
        }
    }
	
	console.log(data)
    const queryRefacciones = `INSERT INTO refacciones_incidencia(nopiezas,medida,costo,precioventa,isdeleted,idrefaccion,idequipo,idincidencia) values${data}`;
    const parseQueryRefacciones = queryRefacciones.substring(0, queryRefacciones.length - 1);
	console.log(parseQueryRefacciones)
    var response2 = await pool.query(parseQueryRefacciones);

    let dataToUpdtae = []
    for(let i = 0; i < finalEquipos.length; i++) {
        const refacciones = finalEquipos[i].refaccionesIncidencias
        for(let j = 0; j < refacciones.length; j++) {
            const query= `UPDATE refaccion set costo=${refacciones[j].costo}, fechacosto='${refacciones[j].fechaCosto}', fechaventa='${refacciones[j].fechaVenta}', proveedor='${refacciones[j].proveedor}', venta=${refacciones[j].precioVenta} WHERE idrefaccion=${refacciones[j].refaccion};`
            console.log(query)
            dataToUpdtae.push(pool.query(query))       
        }
    }



        
    
    

    await Promise.all(dataToUpdtae);


	data = ''
    for(let i = 0; i <  mecanicospost.length; i++) {
        const idMecanico =  mecanicospost[i].idmecanico
        	
	data += `(${idMecanico},${idIncidenciaNew}),`
        
    }

    const queryRefacciones1 = `INSERT INTO mecanicos_incidencia(idmecanico,idincidencia) values${data}`;
    const parseQueryRefacciones1 = queryRefacciones1.substring(0, queryRefacciones1.length - 1);
    var response3 = await pool.query(parseQueryRefacciones1);

	

    
    res
    .status(201)
    .json({
        status: "success", 
        msg: "Resgitro de usuario exitoso.",
        data: {...req.body, id: idIncidenciaNew}
    })
    .end()

   

}
exports.update_incidencia = async(req, res) => {
   
    
    let {
        mecanicospost,
        nombre,
        estatus,
        descripcion,
        comentario,
        fecha,
        //refacciones,
        tipoServicio,
        cliente,
        aeropuerto,
        //equipo,
        finalEquipos
    } = req.body 
    const id = req.params.id;

	console.log('-----edit------', finalEquipos)


    try{
        const query = 'UPDATE incidencia SET nombre=$1, estatus=$2, descripcion=$3, comentario=$4, fecha=$5, tiposervicio=$6 WHERE idincidencia=$7;';

        // Create
        const response = await pool.query(query, [
            nombre,
            estatus,
            descripcion,
            comentario,
            fecha,
            tipoServicio,
            id
        ]);
        
        const queryDelete = 'DELETE FROM refacciones_incidencia where idincidencia=$1'
        // Create
        const responseDelete = await pool.query(queryDelete, [
            id
        ]);
    const idIncidencia = id;

    let data = ''
    for(let i = 0; i < finalEquipos.length; i++) {
        const refacciones = finalEquipos[i].refaccionesIncidencias
        const idEquipo = finalEquipos[i].idReal
        for(let j = 0; j < refacciones.length; j++) {
            data += `(${refacciones[j].noPiezas},'${refacciones[j].medida}',${refacciones[j].costo},${refacciones[j].precioVenta},false,${refacciones[j].refaccion},${idEquipo},${idIncidencia}),`
        }
    }

    const queryRefacciones = `INSERT INTO refacciones_incidencia(nopiezas,medida,costo,precioventa,isdeleted,idrefaccion,idequipo,idincidencia) values${data}`;
    const parseQueryRefacciones = queryRefacciones.substring(0, queryRefacciones.length - 1);
    var response2 = await pool.query(parseQueryRefacciones);

    let dataToUpdtae = []
    for(let i = 0; i < finalEquipos.length; i++) {
        const refacciones = finalEquipos[i].refaccionesIncidencias
        for(let j = 0; j < refacciones.length; j++) {
            const query= `UPDATE refaccion set costo=${refacciones[j].costo}, fechacosto='${refacciones[j].fechaCosto}', fechaventa='${refacciones[j].fechaVenta}', proveedor='${refacciones[j].proveedor}', venta=${refacciones[j].precioVenta} WHERE idrefaccion=${refacciones[j].refaccion};`
            console.log(query)
            dataToUpdtae.push(pool.query(query))       
        }
    }

    

    await Promise.all(dataToUpdtae);

	    const queryDelete1 = 'DELETE FROM mecanicos_incidencia where idincidencia=$1'
        // Create
        const responseDelete1 = await pool.query(queryDelete1, [
            idIncidencia
        ]);

	    data = ''
    for(let i = 0; i <  mecanicospost.length; i++) {
        const idMecanico =  mecanicospost[i].idmecanico
        	
	data += `(${idMecanico},${idIncidencia}),`
        
    }

    const queryRefacciones1 = `INSERT INTO mecanicos_incidencia(idmecanico,idincidencia) values${data}`;
    const parseQueryRefacciones1 = queryRefacciones1.substring(0, queryRefacciones1.length - 1);
    var response3 = await pool.query(parseQueryRefacciones1);
            
        res
        .status(201)
        .json({
        status: "success",
        msg: "Recording sucessfully",
        data: req.body
        })
        .end()
    
    }catch(err){
        console.log(err)
    }
        
    
}
exports.delete_incidencia = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE incidencia SET isdeleted=TRUE WHERE idincidencia=$1;';

    // Create
    const response = await pool.query(query, [
        id
    ]);
        
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: req.body
    })

}
exports.get_resumen1 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia, ri.medida, ri.nopiezas, ri.costo, ri.precioventa from incidencia i 
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2`
    console.log(date1)
   

    // Get all
    const response = await pool.query(query, [date1, date2]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}

exports.get_resumen2 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin,
        equipo,
        aeropuerto,
        cliente
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia, ri.medida, ri.nopiezas, ri.costo, ri.precioventa from incidencia i 
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2 AND ri.idequipo=$3 AND i.idcliente=$4 AND i.idaeropuerto=$5`
    

    // Get all
    const response = await pool.query(query, [date1, date2, equipo, cliente, aeropuerto]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}
exports.get_resumen3 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin,
        aeropuerto,
        cliente
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia,ri.medida, ri.nopiezas, ri.costo, ri.precioventa from incidencia i 
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2 AND i.idaeropuerto=$3 AND i.idcliente=$4`
    

    // Get all
    const response = await pool.query(query, [date1, date2, aeropuerto, cliente]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}
exports.get_resumen4 = async (req, res) => {
      
    let {
        fechaInicio,
        fechaFin,
        cliente
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select ri.idrefaccionesincidencia,ri.medida, ri.nopiezas, ri.costo, ri.precioventa from incidencia i 
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2 AND i.idcliente=$3`
    

    // Get all
    const response = await pool.query(query, [date1, date2, cliente]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}
exports.get_by_equipos = async (req, res) => {
      
    
    let {
        fechaInicio,
        fechaFin,
        equipo,
        aeropuerto,
        cliente
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,
    c.idcliente idcliente, c.nombre clientenombre, a.nombre aeropuertonombre,ri.medida, ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join cliente c on c.idcliente = i.idcliente
    inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
        inner join refaccion r on ri.idrefaccion = r.idrefaccion
        where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2 AND ri.idequipo=$3 AND i.idcliente=$4 AND i.idaeropuerto=$5 order by i.idincidencia desc;`
   

    // Get all
    const response = await pool.query(query, [date1, date2, equipo, cliente, aeropuerto]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}
exports.get_by_aeropuertos = async (req, res) => {
      
    
    let {
        fechaInicio,
        fechaFin,
        aeropuerto,
        cliente
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,
    c.idcliente idcliente, c.nombre clientenombre, a.nombre aeropuertonombre, e.noeconomico, e.equipo, ri,medida,ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join cliente c on c.idcliente = i.idcliente
    inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
    inner join equipo e on ri.idequipo = e.idequipo

        inner join refaccion r on ri.idrefaccion = r.idrefaccion
        where i.isdeleted=FALSE AND i.fecha >= $1 AND i.fecha <= $2 AND i.idaeropuerto=$3 AND i.idcliente=$4 order by i.idincidencia desc;`
   

    // Get all
    const response = await pool.query(query, [date1, date2, aeropuerto, cliente]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}
exports.get_by_clientes = async (req, res) => {
      
    
    let {
        fechaInicio,
        fechaFin,
        cliente
    } = req.body 

    const date1 = new Date(fechaInicio).toISOString().slice(0, 10)
    const date2 = new Date(fechaFin).toISOString().slice(0, 10)
    const query = `select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,
    c.idcliente idcliente, c.nombre clientenombre, a.nombre aeropuertonombre, e.noeconomico, e.equipo, ri.medida,ri.nopiezas, ri.costo, ri.precioventa
    from incidencia i
    inner join cliente c on c.idcliente = i.idcliente
    inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
    inner join equipo e on ri.idequipo = e.idequipo
        inner join refaccion r on ri.idrefaccion = r.idrefaccion
        where i.isdeleted=FALSE AND fecha >= $1 AND fecha <= $2 AND i.idcliente=$3 order by i.idincidencia desc;`
   

    // Get all
    const response = await pool.query(query, [date1, date2, cliente]);

    console.log(response);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()

      
}
exports.uploadImages = async(req, res) => {

    let {
        id,
        images,
	    cliente
    } = req.body 


    let data1 = ''
    if(images.length > 0) {
        for(let i = 0; i < images.length; i++) {
            data1 += `('${images[i]}',false,${id}),`
        }
        const queryImages = `INSERT INTO imagen(url,isdeleted,idincidencia) values${data1}`;
        const parseQueryImages = queryImages.substring(0, queryImages.length - 1);
        var response3 = await pool.query(parseQueryImages);
        
        
        

    }

    
    res
    .status(201)
    .json({
        status: "success", 
        msg: "Resgitro de usuario exitoso.",
        data: req.body 
    })
    .end()
}
exports.uploadFiles = async(req, res) => {
    let {
        id,
        files,
    } = req.body 


    let data2 = ''
    if(files.length > 0) {
        for(let i = 0; i < files.length; i++) {
            data2 += `('${files[i]}',false,${id}),`
        }
        const queryFiles = `INSERT INTO archivo(url,isdeleted,idincidencia) values${data2}`;
        const parseQueryFiles = queryFiles.substring(0, queryFiles.length - 1);
        var response4 = await pool.query(parseQueryFiles);
    }

    res
    .status(201)
    .json({
        status: "success", 
        msg: "Resgitro de usuario exitoso.",
        data: req.body 
    })
    .end()
}
exports.borrarImages = async(req, res) => {

    let {
        id,
        ids,
    } = req.body 


    let data1 = '('
    if(ids.length > 0) {
        for(let i = 0; i < ids.length; i++) {
            data1 += `${ids[i]},`
        }
        const queryImages = `DELETE FROM imagen WHERE idimagen in ${data1}`;
        let parseQueryImages = queryImages.substring(0, queryImages.length - 1);
        parseQueryImages += ');'
        var response3 = await pool.query(parseQueryImages);
    }
    res
    .status(201)
    .json({
        status: "success", 
        msg: "Resgitro de usuario exitoso.",
        data: req.body 
    })
    .end()
}
exports.borrarFiles = async(req, res) => {
    
    let {
        id,
        ids,
    } = req.body 


    let data1 = '('
    if(ids.length > 0) {
        for(let i = 0; i < ids.length; i++) {
            data1 += `${ids[i]},`
        }
        const queryImages = `DELETE FROM archivo WHERE idarchivo in ${data1}`;
        let parseQueryImages = queryImages.substring(0, queryImages.length - 1);
        parseQueryImages += ');'
        var response3 = await pool.query(parseQueryImages);
    }
    res
    .status(201)
    .json({
        status: "success", 
        msg: "Resgitro de usuario exitoso.",
        data: req.body 
    })
    .end()
}

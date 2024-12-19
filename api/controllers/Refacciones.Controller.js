const pool = require('../DB/postgres');   


//Get all Incidencias
exports.get_all_refacciones = async (req, res) => {

    const query = 'SELECT * FROM refaccion where isdeleted=FALSE order by idrefaccion';
    
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
exports.get_refaccion = async (req, res) => {

    const id = req.params.id;
    const query = ' select r.idrefaccion, r.proveedor, r.nombre, r.costo, r.venta, r.fechaventa, r.fechacosto, er.idtipoequipo from refaccion r inner join equipo_refacciones er on r.idrefaccion = er.idrefaccion WHERE r.idrefaccion=$1'

    // Get all aeropuertos
    const response = await pool.query(query, [id]);

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
exports.create_refaccion = async (req, res) => {

    let {
        nombre,
        costo,
        fechaCosto,
        venta,
        fechaVenta,
        proveedor,
        equipos,

    } = req.body 

    try{
        const query = 'INSERT INTO refaccion(nombre, costo, fechacosto, venta, fechaventa, proveedor) values($1,$2,$3,$4,$5,$6) RETURNING idrefaccion;';

        // Create
        const response = await pool.query(query, [
            nombre,
            costo,
            fechaCosto,
            venta,
            fechaVenta,
            proveedor
        ]);

        const idRefaccion = response.rows[0].idrefaccion;

        let data = ''
        for(let i = 0; i < equipos.length; i++) {
            data += `(false,${idRefaccion},${equipos[i].idtipoequipo}),`
        }
        console.log(data)
        const queryCA = `INSERT INTO equipo_refacciones(isdeleted,idrefaccion,idtipoequipo) values${data}`;
        const parseQueryCA = queryCA.substring(0, queryCA.length - 1); 
        var response2 = await pool.query(parseQueryCA);
            
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
exports.update_refaccion = async(req, res) => {

    let {
        nombre,
        costo,
        fechaCosto,
        venta,
        fechaVenta,
        proveedor,
        equipos,

    } = req.body 
    const id = req.params.id;


    try{
        const query = 'UPDATE refaccion SET nombre=$1, costo=$2, fechacosto=$3, venta=$4, fechaventa=$5, proveedor=$6 WHERE idrefaccion=$7;';

        // Create
        const response = await pool.query(query, [
            nombre,
            costo,
            fechaCosto,
            venta,
            fechaVenta,
            proveedor,
            id
        ]);
        const queryDelete = 'DELETE FROM equipo_refacciones where idrefaccion=$1'
        // Create
        const responseDelete = await pool.query(queryDelete, [
            id
        ]);

        const idRefaccion = id;

        let data = ''
        for(let i = 0; i < equipos.length; i++) {
            data += `(false,${idRefaccion},${equipos[i].idtipoequipo}),`
        }
        console.log(data)
        const queryCA = `INSERT INTO equipo_refacciones(isdeleted,idrefaccion,idtipoequipo) values${data}`;
        const parseQueryCA = queryCA.substring(0, queryCA.length - 1); 
        var response2 = await pool.query(parseQueryCA);
            
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
exports.delete_refaccion = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE refaccion SET isdeleted=TRUE WHERE idrefaccion=$1;';

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

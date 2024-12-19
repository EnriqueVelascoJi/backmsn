const pool = require('../DB/postgres');   


//Get all users
exports.get_all_clientes = async (req, res) => {

    const query = 'SELECT * FROM cliente where isdeleted=FALSE order by idcliente';
    
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
exports.get_cliente = async (req, res) => {

    const id = req.params.id;
    const query = 'select c.idcliente, c.nombre, c.descripcion, c.isdeleted, ce.idaeropuerto from cliente c inner join cliente_aeropuerto ce on c.idcliente = ce.idcliente WHERE c.idcliente=$1 AND ce.isdeletd=FALSE'

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
exports.update_cliente= async (req, res) => {

    let {
        nombre,
        descripcion,
        aeropuertos
    } = req.body
    const id = req.params.id;


    try{
        const query = 'UPDATE cliente SET nombre=$1, descripcion=$2 WHERE idcliente=$3;';

        // Create
        const response = await pool.query(query, [
            nombre,
            descripcion,
            id
        ]);
        
        const queryDelete = 'UPDATE cliente_aeropuerto SET isdeleted=true where idcliente=$1'
        // Create
        const responseDelete = await pool.query(queryDelete, [
            id
        ]);
    const idCliente = id;

    let data = ''
    for(let i = 0; i < aeropuertos.length; i++) {
        data += `(false,${idCliente},${aeropuertos[i].idaeropuerto}),`
    }
    console.log(data)
    const queryCA = `INSERT INTO cliente_aeropuerto(isdeleted,idcliente,idaeropuerto) values${data}`;
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
exports.create_cliente = async(req, res) => {

        
    let {
        nombre,
        descripcion,
        aeropuertos
    } = req.body 

    try{
        const query = 'INSERT INTO cliente(nombre, descripcion) values($1,$2) RETURNING idcliente;';

        // Create
        const response = await pool.query(query, [
            nombre,
            descripcion
        ]);
        
    const idCliente = response.rows[0].idcliente;

    let data = ''
    for(let i = 0; i < aeropuertos.length; i++) {
        data += `(false,${idCliente},${aeropuertos[i].idaeropuerto}),`
    }
    console.log(data)
    const queryCA = `INSERT INTO cliente_aeropuerto(isdeleted,idcliente,idaeropuerto) values${data}`;
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
exports.delete_cliente = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE cliente SET isdeleted=TRUE WHERE idcliente=$1;';

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

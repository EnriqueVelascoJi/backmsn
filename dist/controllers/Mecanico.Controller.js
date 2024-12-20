const pool = require('../DB/postgres');   


//Get all users
exports.get_mecanico = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM mecanico WHERE idmecanico=$1';
    
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
exports.get_all_mecanicos = async (req, res) => {

    const query = 'SELECT * FROM mecanico where isdeleted=FALSE order by idmecanico';
    
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
exports.update_mecanico = async(req, res) => {
    const data = req.body;
    const id = req.params.id;
    const query = 'UPDATE mecanico SET nombre=$1, fechaingreso=$2 WHERE idmecanico=$3;';

    // Create
    const response = await pool.query(query, [
        data.nombre,
        data.fechaIngreso,
        id
    ]);
        
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: req.body
    })
    .end()}
exports.create_mecanico= async (req, res) => {

    let {
        nombre,
        fechaIngreso
    } = req.body 

    try{
        const query = 'INSERT INTO mecanico(nombre, fechaingreso) values($1,$2);';

        // Create
        const response = await pool.query(query, [
            nombre,
            fechaIngreso
        ]);
            
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

exports.delete_mecanico = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE mecanico SET isdeleted=TRUE WHERE idmecanico=$1;';

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

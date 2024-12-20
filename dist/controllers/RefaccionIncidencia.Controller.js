const pool = require('../DB/postgres');   


//Get all users
exports.get_all_refacciones_incidencias = async (req, res) => {

    const query = 'SELECT * FROM refacciones_incidencia';
    
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
exports.create_refacciones_incidencias = async (req, res) => {

    let {
        
        idRefaccion,
        idIncidencia,
        noPiezas,
        costo,
        precioVenta,
        
    } = req.body 

    try{
        const query = 'INSERT INTO refacciones_incidencia(idrefaccion, idincidencia, nopiezas, costo, precioventa) values($1,$2,$3,$4,$5);';

        // Create
        const response = await pool.query(query, [
            idRefaccion,
            idIncidencia,
            noPiezas,
            costo,
            precioVenta
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
exports.update_refacciones_incidencias = async(req, res) => {

        
    try{
        const updatedRefaccionesIncidencias = await RefaccionesIncidencias.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
                updatedRefaccionesIncidencias
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_refacciones_incidencias = async(req, res) => {

    try{
        const refaccionesIncidencias = await RefaccionesIncidencias.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              refaccionesIncidencias
            }
        })
    }catch(err){
        console.log(err)
    }

}

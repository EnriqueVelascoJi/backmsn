const pool = require('../DB/postgres');   

//Get all users
exports.get_all_archivos = async (req, res) => {

    const query = 'SELECT * FROM archivo';
    
    // Get all
    const response = await pool.query(query);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()
}
exports.create_archivo= async (req, res) => {

    let {
        idIncidencia,
        url
    } = req.body 

    try{
        const query = 'INSERT INTO archivo(idincidencia, url) values($1,$2);';

        // Create
        const response = await pool.query(query, [
            idIncidencia,
            url
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
exports.update_archivo = async(req, res) => {

        
    try{
        const updatedArchivo = await Archivo.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedArchivo
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_archivo = async(req, res) => {

    try{
        const updatedArchivo = await Archivo.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedArchivo
            }
        })
    }catch(err){
        console.log(err)
    }
    
}

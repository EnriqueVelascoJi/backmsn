const pool = require('../DB/postgres');   


//Get all users
exports.get_all_imagenes = async (req, res) => {

    const query = 'SELECT * FROM imagen';
    
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
exports.create_imagen= async (req, res) => {

    let {
        idImagen,
        idIncidencia,
        url
    } = req.body 

    try{
        const query = 'INSERT INTO imagen(idincidencia, url) values($1,$2);';

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
exports.update_imagen = async(req, res) => {

        
    try{
        const updatedImagen = await Imagen.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedImagen
            }
        })
    }catch(err){
        console.log(err)
    }
}
exports.delete_imagen = async(req, res) => {

    try{
        const updatedImagen = await Imagen.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators : true
        })
        
        res.status(200).json({
            status : 'Success',
            data : {
              updatedImagen
            }
        })
    }catch(err){
        console.log(err)
    }
    
}

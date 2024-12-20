const pool = require('../DB/postgres');   



//Get all users
exports.get_all_equipos = async (req, res) => {

    const query = `select e.idequipo, e.idtipoequipo, e.equipo, e.noeconomico, e.marca, e.modelo, e.noserie, e.tipocombustible, e.enuso, e.motivo, e.isdeleted,
    a.nombre nombreaeropuerto, c.nombre nombrecliente 
    from equipo e 
    inner join cliente_aeropuerto ce 
    on e.idclienteaeropuerto = ce.idclienteaeropuerto
    inner join cliente c
    on c.idcliente = ce.idcliente
    inner join aeropuerto a
    on a.idaeropuerto = ce.idaeropuerto
    where e.isdeleted=FALSE
    order by e.idequipo
    `;
    
    // Get all equipos
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
exports.get_all_tipos_equipos = async (req, res) => {

    const query = `select * from tipo_equipo`;
    
    // Get all equipos
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
exports.get_equipo = async (req, res) => {

    const id = req.params.id;

    const query = `select e.idequipo, e.idtipoequipo, e.equipo, e.noeconomico, e.marca, e.modelo, e.noserie, e.tipocombustible, e.enuso, e.motivo, e.isdeleted,
    a.nombre nombreaeropuerto, c.nombre nombrecliente, ce.idcliente, ce.idaeropuerto, ce.idclienteaeropuerto
    from equipo e 
    inner join cliente_aeropuerto ce 
    on e.idclienteaeropuerto = ce.idclienteaeropuerto
    inner join cliente c
    on c.idcliente = ce.idcliente
    inner join aeropuerto a
    on a.idaeropuerto = ce.idaeropuerto
    where e.idequipo=$1
    `;
    
    // Get all equipos
    const response = await pool.query(query,[id]);

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
exports.get_equipo_by_clienteaeropuerto = async (req, res) => {

    const id = req.params.id;

    const query = `select * from equipo where idclienteaeropuerto=$1 order by equipo`;
    
    // Get all equipos
    const response = await pool.query(query,[id]);

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
exports.get_equipo_by_idtipoequipo = async (req, res) => {

    const id = req.params.id;

    const query = `select * from equipo where idtipoequipo=$1`;
    
    // Get all equipos
    const response = await pool.query(query,[id]);

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
exports.create_equipo= async (req, res) => {

    let {
        nombre,
          marca,
          modelo,
          noSerie,
          noEconomico,
          tipoCombustible,
          aeropuerto,
          motivo,
          enUso,
          idTipoEquipo
    } = req.body
    const query = 'INSERT INTO equipo(equipo,noeconomico,marca,modelo,noserie,tipocombustible,enuso,motivo,idclienteaeropuerto,idtipoequipo) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);'

    // Create
    const response = await pool.query(query, [
        nombre,
        noEconomico,
        marca,
        modelo,
        noSerie,
        tipoCombustible,
        enUso,
        motivo,
        aeropuerto,
        idTipoEquipo

    ]);
        
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: req.body
    })
    .end()
}
exports.update_equipo = async(req, res) => {

        
    let {
        nombre,
          marca,
          modelo,
          noSerie,
          noEconomico,
          tipoCombustible,
          aeropuerto,
          motivo,
          enUso,
          idTipoEquipo
    } = req.body
    const id = req.params.id;

    const query = 'UPDATE equipo SET equipo=$1,noeconomico=$2,marca=$3,modelo=$4,noserie=$5,tipocombustible=$6,enuso=$7,motivo=$8,idclienteaeropuerto=$9, idtipoequipo=$10 WHERE idequipo=$11;'

    // Create
    const response = await pool.query(query, [
        nombre,
        noEconomico,
        marca,
        modelo,
        noSerie,
        tipoCombustible,
        enUso,
        motivo,
        aeropuerto,
        idTipoEquipo,
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
exports.delete_equipo = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE equipo SET isdeleted=TRUE WHERE idequipo=$1;';

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

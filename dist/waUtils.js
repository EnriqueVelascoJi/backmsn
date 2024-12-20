const pool = require('./DB/postgres');
const { Client } = require('whatsapp-web.js');

const client = new Client()

const NUEVA_INCIDENCIA = `
*No.* {name}
*Región:* {region}
*Equipo*: {equipo}
*Tipo de incidencia*: {type}
*Fecha*: {date}
*Descripción*: {description}
{repairs}
{total}
`;

// const setIncidenciaMessage = (incidencia) => {
//     let message = NUEVA_INCIDENCIA;
//     message = message.replace('{name}', incidencia.incidenciaID);
//     message = message.replace(
//       '{region}',
//       (incidencia.regionId as IRegiones).name,
//     );
//     message = message.replace(
//       '{equipo}',
//       `${(incidencia.equipoId as IEquipos).name}`,
//     );
//     message = message.replace(
//       '{type}',
//       `${
//         (incidencia.incidenciaTypesIds as IIncidenciaCatalogoInterface[])
//           .map(
//             ({ verificationPoint, type, name }) =>
//               `${verificationPoint} - ${type} - ${name}`,
//           )
//           .join(',') || 'N/A'
//       }`,
//     );
//     message = message.replace(
//       '{date}',
//       `${format(new Date(incidencia.createdAt || ''), 'dd/MM/yyy - HH:mm')}`,
//     );
//     message = message.replace('{description}', incidencia.description);
//     message = message.replace(
//       '{repairs}',
//       incidencia.refacciones?.length
//         ? `*Refacciones*: ${incidencia.refacciones
//             .map(({ name, price }) => `${name} - x${price}`)
//             .join(', ')}`
//         : '',
//     );
//     message = message.replace(
//       '{total}',
//       incidencia.refacciones?.length
//         ? `*Total*: $${incidencia.refacciones
//             .map(({ price, quantity }) => price * quantity)
//             .reduce((a, b) => a + b)}`
//         : '',
//     );
//     return message;
//   };

  
const findWAUsers = async (cliente) => {
    const query = `SELECT * FROM usuario where (idcliente=2 or idcliente=${cliente}) and isdeleted=FALSE and aprobador=TRUE and verificadorwa=TRUE`;
    
    // Get all
    const response = await pool.query(query);

    const users = response.rows

    return users
    
    
};
const findIncidenciaData = async (id) => {

    console.log({id})

    var response = await pool.query(`select i.idincidencia, i.nombre incidencianombre, i.descripcion, i.estatus, i.comentario, i.fecha,  m.nombre mecaniconombre,
    c.nombre clientenombre, a.nombre aeropuertonombre, e.noeconomico, e.equipo, r.nombre, ri.nopiezas, ri.costo, ri.precioventa, r.nombre refaccionnombre, i.tiposervicio, r.proveedor
    from incidencia i
    inner join cliente c on c.idcliente = i.idcliente
    inner join aeropuerto a on a.idaeropuerto = i.idaeropuerto
    inner join refacciones_incidencia ri on i.idincidencia = ri.idincidencia
        inner join equipo e on ri.idequipo =e.idequipo
    inner join refaccion r on ri.idrefaccion = r.idrefaccion
    inner join mecanico m on i.idmecanico = m.idmecanico
    where i.idincidencia=${id};`);

    console.log({response})
  
    if(response.rows.length == 0){
        console.log('error')
    }
  
    return response.rows
           
}

const aprovarInciencia = async (id) => {

    var response = await pool.query(`UPDATE incidencia SET estatus='Aprobada' where idincidencia=${id};`);


}

const rechazarIncidencia = async (id) => {

    var response = await pool.query(`UPDATE incidencia SET estatus='Rechazada' where idincidencia=${id};`);

}

const comprobarIncidencia = async (id) =>  {

      var response = await pool.query(`SELECT * FROM incidencia where idincidencia=${id} and (estatus='Rechazada' or estatus='Aprobada');`);
   if(response.rows.length == 0){
        return true
    }
  return false

}
module.exports = {
    findWAUsers,
    findIncidenciaData,
    aprovarInciencia,
    rechazarIncidencia,comprobarIncidencia
  
}

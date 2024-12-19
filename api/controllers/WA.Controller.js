const qrcode = require('qrcode-terminal');
const pool = require('../DB/postgres');  
const { aprovarInciencia, rechazarIncidencia, comprobarIncidencia } = require('../waUtils')


//Import DB Connection
//require('./DB')

//Init server

const { Client, MessageMedia } = require('whatsapp-web.js'); 

const client = new Client()

//Running server




const login = async (from, bodyMessage) => {
    const credentials = bodyMessage.split(' ');
    if (credentials && credentials.length === 2) {
      const username = credentials[0];
      const password = credentials[1];


      const userf = await pool.query('SELECT * FROM usuario WHERE email=$1 AND contrasenia=$2',[username, password])
      if(userf.rows.length == 1) {
        const userf1 = await pool.query('UPDATE usuario SET verificadorwa=$1, aprobador=$2 where email=$3 AND contrasenia=$4',[true, true, username, password])
        return true
      } else {
        return false
      }


    }

}

const findUserByWAId = async (number) => {

    if(number) {
        const realNumber = number.substring(3, 13)
        console.log(realNumber)
        const userf = await pool.query('SELECT * FROM usuario WHERE telefono=$1 and verificadorwa=$2 and aprobador=$3 and isdeleted=$4',[realNumber,true,true,false])
        if(userf.rows.length == 1) {
          return true
        } else {
          return false
        }
    } 
    return false
    
   
}


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize()


client.on('message',async (message) => {

    const { type, selectedButtonId, hasQuotedMsg, from, selectedRowId, body } = message;
    console.log({ type, hasQuotedMsg, from, message, type, selectedButtonId, selectedRowId, body });
    const user = await findUserByWAId(from);
    console.log(user)

    const newMGS = `Tu usuario no está autorizado para recibir notificaciones. Solicita a un admin hacerlo.`;
    

    //const msgLogin = `Responde a este mensaje escribiendo tu correo seguido de tu contraseña.\nEjemplo: hola@mail.com msnPassword`

   /* if(message.body === 'Login' || message.body === 'login') {
		return message.reply(msgLogin);
	}
 */

    if (hasQuotedMsg) {

      const typeMessage = message.body

	    const q = await message.getQuotedMessage()

	console.log({q})
	    
      /*if(typeMessage.includes('@')){

        const isLoggedIn = await login(message.from, typeMessage);
        if (isLoggedIn) {
            return client.sendMessage(
              message.from,
              'Se ha iniciado sesión correctamente. Tu usuario esta listo para recibir notificaciones.',
            );
          }
          return client.sendMessage(
            message.from,
            'Ocurrió un error al intentar autenticar tu usuario. Responde a este mensaje escribiendo tu correo seguido de tu contraseña. Ejemplo: hola@mail.com msnPassword',
          );
      }*/
     // else {

        //const messIncidencia = typeMessage.trim().split('-');
        //const action = messIncidencia[0]
        //const id = messIncidencia[1]
        if( typeMessage == '1') {

		const id = q.body.split('*Nombre*')[0].split('*ID*:')[1].split('\n')[0]
		const isPossible = await comprobarIncidencia(id)
        	if(isPossible) {
			const response =  await aprovarInciencia(id)
		        return client.sendMessage(
		          message.from,
		          'Se ha aprobado correctamente la incidencia.'
		        );
		} else {
			return client.sendMessage(
		          message.from,
		          'La incidencia fue cerrada anteriormente. No es posible aprobarla'
		        );
		}
        }
        if(typeMessage == '2') {
	const id = q.body.split('*Nombre*')[0].split('*ID*:')[1].split('\n')[0]
		const isPossible = await comprobarIncidencia(id)
        	if(isPossible) {
			const response = await rechazarIncidencia(id)
          return client.sendMessage(
            message.from,
            'Se ha rechazado correctamente la incidencia.'
            );
		} else {
			return client.sendMessage(
		          message.from,
		          'La incidencia fue cerrada anteriormente. No es posible rechazarla'
		        );
		}
          
        }
	     
         return client.sendMessage(
          message.from,
          'No existe respuesta para este comando.\nIntente nuevamente'
        );

    }

    if (user) {
        return message.reply(
          `Tu usuario está listo para recibir notificaciones, no es necesario ejecutar ninguna acción`.trim(),
        );
      } else {
	return message.reply(newMGS);
      }

    
    // const { type, selectedButtonId, hasQuotedMsg, from, selectedRowId, body } = message;
    // console.log({ type, hasQuotedMsg, from, message, type, selectedButtonId, selectedRowId, body });
});



exports.sendWANotification = async (users, incidencia) => {


  let chats = []
  const contacts = await client.getContacts()

    
  
  const d = new Date(incidencia[0].fecha);
  let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  let month = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
  let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  const fecha = `${day} ${month} ${year}`;

  const normalData = incidencia
  let costo = 0
  let venta = 0
	let reafEqui = '';
    for(let i = 0; i < normalData.length; i++) {
      costo += normalData[i].nopiezas * normalData[i].costo
      venta += normalData[i].nopiezas * normalData[i].precioventa
    }
	for(let i = 0; i < normalData.length; i++) {
     reafEqui += `${normalData[i].noeconomico} - ${normalData[i].equipo}: ${normalData[i].refaccionnombre}\n`
    }

  try {
    
    const newMSG = `
  Nueva incidencia generada\n*ID*: ${incidencia[0].idincidencia}\n*Nombre*: ${incidencia[0].incidencianombre}\n*Aeropuerto*: ${incidencia[0].aeropuertonombre}\n*Equipos - Refacciones*:\n${reafEqui}*Tipo de incidencia*: ${incidencia[0].tiposervicio}\n*Fecha*: ${fecha}\n*Descripción*: ${incidencia[0].descripcion}\n*Total venta*: $${venta}\n\n
    Responde a este mensaje colocando un número válido\n*Ejemplo*: \n 
       1 (Aprobar)
       2 (Rechazar)
       `;


  // const rrrr =  await client.sendMessage(`521${users[0].telefono}@c.us`, newMSG)
  // console.log({rrrr})

	  console.log({contacts, users})
	  console.log('######',contacts[0].id)

  for(let i = 0; i < users.length; i++) {
    const contact = contacts.find( contact => contact.number == `521${users[i].telefono}`)
	  if(contact) {
		  const { id: { _serialized: chatId } } = contact
    chats.push(chatId)

	  }
      
  }

  

  await Promise.all(chats.map(async (chat) => {await client.sendMessage(chat, newMSG)})
  );


  //  await Promise.all(users.map(user => client.sendMessage(`521${user.telefono}@c.us`, newMSG)))

  } catch (error) {
    console.log({error})
  }
    
  

};

exports.sendImages = async (users, id) => {
  
  

  try {
    
    let chats = []
    const contacts = await client.getContacts()

    for(let i = 0; i < users.length; i++) {
      const contact = contacts.find(({ number }) => number === `521${users[i].telefono}`)
      if(contact) {
		  const { id: { _serialized: chatId } } = contact
    chats.push(chatId)

	  }

    }
    

  const responseIm = await pool.query(`select i.idincidencia, im.url, im.idimagen
  from incidencia i
  inner join imagen im on i.idincidencia = im.idincidencia
  where i.idincidencia=${id};`);

  console.log({responseIm: responseIm.rows})

  if (responseIm.rows.length) {
    await Promise.all(
      responseIm.rows.map(async (image) => {
        const messageMedia = await MessageMedia.fromUrl(image.url);
        await Promise.all(
          chats.map(async (chat) => {
            await client.sendMessage(chat,messageMedia);
          })
        )
      })
    );
  }

 
  //  await Promise.all(users.map(user => client.sendMessage(`521${user.telefono}@c.us`, newMSG)))

  } catch (error) {
    console.log({error})
  }
    
  

};


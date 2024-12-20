const pool = require('../DB/postgres');   


//Get all users
exports.get_all_usuarios = async (req, res) => {

    const query = 'SELECT * FROM usuario where isdeleted=FALSE order by idusuario';
    
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
exports.get_usuario = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM usuario WHERE idusuario=$1';
    
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
exports.create_usuario = async (req, res) => {

    let {
        nombre,
        apellido,
        email,
        telefono,
        password,
        tipoUsuario,
        aprobador,
        verificadorWA,
        cliente
    } = req.body 

    try{
        const query = 'INSERT INTO usuario(idcliente, nombre, apellido, email, telefono, contrasenia, tipousuario, aprobador, verificadorwa) values($1,$2,$3,$4,$5,$6,$7,$8,$9);';

        // Create
        const response = await pool.query(query, [
            cliente,
            nombre,
            apellido,
            email,
            telefono,
            password,
            tipoUsuario,
            aprobador,
            verificadorWA
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
exports.update_usuario = async(req, res) => {

        
    const data = req.body;
    const id = req.params.id;
    const query = 'UPDATE usuario SET nombre=$1, apellido=$2, email=$3, telefono=$4, contrasenia=$5, idcliente=$6, aprobador=$7, verificadorwa=$8 WHERE idusuario=$9;';

    // Create
    const response = await pool.query(query, [
        data.nombre,
        data.apellido,
        data.email,
        data.telefono,
        data.password,
        data.cliente,
        data.aprobador,
        data.verificadorWA,
        id
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
exports.delete_usuario = async(req, res) => {

    const id = req.params.id;
    const query = 'UPDATE usuario SET isdeleted=TRUE WHERE idusuario=$1;';

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
exports.login = async(req, res) => {
        const userData = req.body
    
        
        //validar usuario
        if(userData.email && userData.contrasenia){
            const userf = await pool.query('SELECT * FROM usuario WHERE email=$1 AND contrasenia=$2',[userData.email,userData.contrasenia])
            if(userf.rows.length == 1) {
      
    
              //Log in usuario
              res.json({
                status: "success",
                msg: "Login exitoso.",
                data: userf.rows[0]
              }).end()
      
            } else {
                res.json({
                    status: "error",
                    msg: "Credenciales invalidas.",
                    data: {}
                  }).end()
            }

      
        }else{
            res.json({
                status: "error",
                msg: "Credenciales invalidas.",
                data: {}
              }).end()        }
      

      
}




//Borrar despues
function newPassword () {
    
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 8;
    let password = "";

    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
       return password
    }
    
exports.create_usuario_gd = async (req, res) => {

    let {
        name,
      firstSurname,
      secondSurname,
      email,
      domain,
      subdomain,
      area,
      profile,
      isActive
    } = req.body 

    try{
        const query = 'INSERT INTO usuariogd(name,password,firstsurname,secondsurname,email,domain,subdomain,area,profile,isactive) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);';
        const password = newPassword()
        // Create
        const response = await pool.query(query, [
            name,
            password, 
            firstSurname,
            secondSurname,
            email,
            domain,
            subdomain,
            area,
            profile,
            isActive
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
exports.update_usuario_gd = async(req, res) => {

        
    const data = req.body;
    const id = req.params.id;

    const query = 'UPDATE usuario SET name=$1, firstsurname=$2, secondsurname=$3, email=$4, domain=$5, subdomain=$6, area=$7, profile=$8, isactive=$9 WHERE id=$10;';

    // Create
    const response = await pool.query(query, [
        data.name,
        data.firstSurname,
        data.secondSurname,
        data.email,
        data.domain,
        data.subdomain,
        data.area,
        data.profile,
        data.isActive,
        id
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
exports.get_all_usuarios_gd = async (req, res) => {

    const query = 'SELECT * FROM usuariogd order by id';
    
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
exports.get_usuario_gd = async (req, res) => {

    const id = req.params.id;
    const query = 'SELECT * FROM usuariogd WHERE id=$1';
    
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
exports.login_gd = async(req, res) => {
    const userData = req.body

    
    //validar usuario
    if(userData.email && userData.password){
        const userf = await pool.query('SELECT * FROM usuariogd WHERE email=$1 AND password=$2',[userData.email,userData.password])
        if(userf.rows.length == 1) {
  

          //Log in usuario
          res.json({
            status: "success",
            msg: "Login exitoso.",
            data: userf.rows[0]
          }).end()
  
        } else {
            res.json({
                status: "error",
                msg: "Credenciales invalidas.",
                data: {}
              }).end()
        }

  
    }else{
        res.json({
            status: "error",
            msg: "Credenciales invalidas.",
            data: {}
          }).end()        }
  

  
}
exports.create_project_gd = async(req, res) => {

    let {
        projectName,
        projectType,
        projectDescription ,
        projectScopeDescription,
        projectObjective,
        region,
        startDate,
        finalDate,
        userId 
    } = req.body 

    try{
        const query = 'INSERT INTO projectgd(projectName,projecttype,projectdescription,projectscopedescription,projectobjective,region,startdate,finaldate) values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id;';

        // Create
        const response = await pool.query(query, [
            projectName,
            projectType,
            projectDescription ,
            projectScopeDescription,
            projectObjective,
            region,
            startDate,
            finalDate   
        ]);

        const idProject = response.rows[0].id;
        const queryProcess = 'INSERT INTO processgd(name,idproject,idrequirement,idstatus,idusuario) values($1,$2,$3,$4,$5);';

        // Create
        const responseProcess = await pool.query(queryProcess, [
            'Gestión de proyecto | iniciaiva',
            idProject,
            null,
            2,
            userId


        ]);
        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

        // Create
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idProject,
            'project'


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
exports.create_requirement_gd = async(req, res) => {

    let {
        informationUse,
        deliverables,
        issues,
        techResources,
        otherResources,
        aditionalInformation,
        processId,
        userId 
    } = req.body 

    try{
        const query = 'INSERT INTO requirementgd(informationuse,deliverables,issues,techresources,otherresources,aditionalinformation) values($1,$2,$3,$4,$5,$6) RETURNING id;';

        // Create
        const response = await pool.query(query, [
            informationUse,
            deliverables,
            issues,
            techResources,
            otherResources,
            aditionalInformation
        ]);

        const idRequirement = response.rows[0].id;
        const queryProcess = 'UPDATE processgd set idrequirement=$1 where id=$2';

        // Create
        const responseProcess = await pool.query(queryProcess, [
            idRequirement,
            processId
        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

        // Create
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idRequirement,
            'requirement'


        ]);

        const queryProcedureDict = 'INSERT INTO process_procedure_gd(idprocess,idprocedure) values($1,$2);'
        const responseProcedureDict = await pool.query(queryProcedureDict, [
            processId,
            1
        ]);
        const queryProcedureGlosary = 'INSERT INTO process_procedure_gd(idprocess,idprocedure) values($1,$2);'
        const responseProcedureGlosary = await pool.query(queryProcedureGlosary, [
            processId,
            2
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
exports.get_process_gd = async(req, res) => {

    const id = req.params.id;
    const query = 'SELECT idrequirement FROM processgd WHERE idusuario=$1';
    
    // Get all aeropuertos
    const response = await pool.query(query, [id]);
    const idRequirement = response.rows[0].idrequirement;

    let queryProject = ''

 if(idRequirement) {
        queryProject = 'SELECT *,pgd.id processid FROM processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join requirementgd rgd on pgd.idrequirement = rgd.id inner join usuariogd ugd  on pgd.idusuario = ugd.id inner join statusgd sgd on pgd.idstatus = sgd.id WHERE idusuario=$1 order by pgd.id';

    } else  {
        queryProject = 'select *,pgd.id processid from processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join usuariogd ugd  on pgd.idusuario = ugd.id inner join statusgd sgd on pgd.idstatus = sgd.id WHERE idusuario=$1 order by pgd.id'
    }
    

    
    
    // Get all
    const finalResponse = await pool.query(queryProject, [id]);

    console.log(finalResponse);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: finalResponse.rows
    })
    .end()
}
exports.get_projects_gd = async (req, res) => {

    const query = 'select * from processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join requirementgd rgd on pgd.idrequirement = rgd.idinner join usuariogd ugd  on pgd.idusuario = ugd.idorder by pgd.id';
    
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
exports.get_projects_gd = async (req, res) => {

    const query = 'select * from processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join requirementgd rgd on pgd.idrequirement = rgd.idinner join usuariogd ugd  on pgd.idusuario = ugd.idorder by pgd.id';
    
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
exports.get_partial_projects_gd = async (req, res) => {

    const query = 'select * from processgd pgd inner join projectgd prgd on pgd.idproject = prgd.id inner join usuariogd ugd  on pgd.idusuario = ugd.id order by pgd.id';
    
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
exports.notificate = async(req, res) => {

    let {
        iddUserSend,
        idUserReceiver
    } = req.body 

    try{
        const query = 'INSERT INTO notificationgd(idUserSend,idUserReceiver) values($1,$2) RETURNING id;';

        // Create
        const response = await pool.query(query, [
            iddUserSend,
            idUserReceiver 
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
exports.get_all_notifications_gd = async (req, res) => {

    const query = 'SELECT * FROM notificationgd order by id';
    
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
exports.get_notifications_by_user_gd = async (req, res) => {

    const id = req.params.id;
    const query = `SELECT usgd.id iduser, ngd.id idnotification,* FROM  notificationgd ngd
inner join usuariogd usgd on ngd.idusersend = usgd.id
WHERE ngd.iduserreceiver=$1 AND ngd.isactive=TRUE `;
    
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
exports.update_project_gd = async(req, res) => {

    
    let {
        idNotification,
        idProject,
        idUserSend,
        idUserReceiver
    } = req.body

    try{
        const query = 'UPDATE projectgd SET isprojectaccepted=$1 WHERE id=$2;';

        // Create
        const response = await pool.query(query, [
            true,
            idProject
        ]);

        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

        // Create
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            false,
            idNotification,



        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

        // Create
        const responseNotification = await pool.query(queryNotification, [
            idUserSend,
            idUserReceiver,
            idProject,
            'projectResponse'


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
exports.update_requirement_gd = async(req, res) => {

    
    let {
        idNotification,
        idRequirement,
        idUserSend,
        idUserReceiver
    } = req.body

    try{
        const query = 'UPDATE requirementgd SET isprojectaccepted=$1 WHERE id=$2;';

        // Create
        const response = await pool.query(query, [
            true,
            idRequirement
        ]);

        const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

        // Create
        const responseUpdateNotification = await pool.query(queryUpdateNotification, [
            false,
            false,
            idNotification



        ]);

        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

        // Create
        const responseNotification = await pool.query(queryNotification, [
            idUserSend,
            idUserReceiver,
            idRequirement,
            'requirementResponse'


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
exports.create_dict_procedure = async(req, res) => {
    let {
        justification,
        idProcessProcedure
    } = req.body 

    try{
        const query = 'INSERT INTO dict_procedure_gd(justification) values($1) RETURNING id;';

        // Create
        const response = await pool.query(query, [
            justification
        ]);

        const idDictProcedure = response.rows[0].id;
        const queryDict = 'UPDATE process_procedure_gd set idassociate=$1 where id=$2';

        // Create
        const responseProcess = await pool.query(queryDict, [
            idDictProcedure,
            idProcessProcedure
        ]);
    }catch(err){
        console.log(err)
    }

}
exports.update_dict_procedure = async(req, res) => {
    let {
        documenRef,
        idDictProcedure
    } = req.body 

    try{
    
        const queryDict = 'UPDATE dict_procedure_gd set documentRef=$1 where id=$2';

        // Create
        const responseProcess = await pool.query(queryDict, [
            documenRef,
            idDictProcedure
        ]);
    }catch(err){
        console.log(err)
    }

}
exports.create_project = async(req, res) => {

    const projectInformation = req.body
    const {personalInformation, context, participants} = projectInformation
    const {
        projectName,
        projectDescription ,
        projectScopeDescription,
        projectObjective,
        region,
        startDate,
        finalDate,
        informationUse,
        deliverables,
        aditionalInformation,
        userId 
    } = context 

    try{
        const queryProject = 'INSERT INTO project(projectname,projectdescription,projectscopedescription,projectobjective,region,startdate,finaldate,informationuse,deliverables,aditionalinformation,idusuario,idstatus) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id;';

        // Create
        const responseProject = await pool.query(queryProject, [
            projectName,
            projectDescription ,
            projectScopeDescription,
            projectObjective,
            region,
            startDate,
            finalDate,
            informationUse,
            deliverables,
            aditionalInformation,
            userId,
            2
        ]);


        //Notificaction
        const idProject = responseProject.rows[0].id;
        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idProject,
            'project'


        ]);
            
        //Participants
        let data = ''
        for(let i = 0; i < participants.length; i++) {
            const participant = participants[i]
            data += `('${participant.name}','${participant.surname}','${participant.email}','${participant.position}','${participant.area}',${participant.rol},${idProject}),`
        }
        
        const queryParticipant = `INSERT INTO participant(name,surname,email,position,area,rol,idproject) values${data}`;
        const parseQueryParticipant = queryParticipant.substring(0, queryParticipant.length - 1);
        const responseParticipant = await pool.query(parseQueryParticipant);

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
exports.get_projects = async(req, res) => {

    const id = req.params.id;

    const query = 'select *,p.id idproject from project p  inner join usuariogd u  on p.idusuario = u.id WHERE p.idusuario=$1 order by p.id';
    const response = await pool.query(query, [id]);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()
}

exports.get_project = async(req, res) => {

    const id = req.params.id;


    const queryProject = `select *,p.id idproject from project p  
                            inner join usuariogd u on p.idusuario = u.id 
                            WHERE p.id=$1 order by p.id`
    const responseProject = await pool.query(queryProject, [id]);
    const queryParticipants = `select * from project p
                                inner join participant pa on p.id = pa.idproject
                                WHERE p.id=$1 order by p.id`
    const responseParticipants = await pool.query(queryParticipants, [id]);
    
    const response = {
        projectInformation: responseProject.rows,
        participants: responseParticipants.rows
    }
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response
    })
    .end()
}
exports.update_status_project = async(req, res) => {

    
    let {
        idNotification,
        idProject,
        idUserSend,
        idUserReceiver,
        flag,
        rejected
    } = req.body

    try{
        if(flag === 'accepted') {
            const queryProject = 'UPDATE project SET isprojectaccepted=$1, idstatus=$2 WHERE id=$3;';
            const response = await pool.query(queryProject, [
                true,
                4,
                idProject
            ]);

            const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

            // Create
            const responseUpdateNotification = await pool.query(queryUpdateNotification, [
                false,
                true,
                idNotification,



            ]);

            const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

            // Create
            const responseNotification = await pool.query(queryNotification, [
                idUserSend,
                idUserReceiver,
                idProject,
                'projectAccepted'


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
        if(flag === 'rejected') {
            const queryProject = 'UPDATE project SET isprojectaccepted=$1, idstatus=$2, rejected=$3 WHERE id=$4;';
            const response = await pool.query(queryProject, [
                false,
                5,
                rejected,
                idProject
            ]);

            const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';
            const responseUpdateNotification = await pool.query(queryUpdateNotification, [
                false,
                true,
                idNotification
            ]);

            const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
            const responseNotification = await pool.query(queryNotification, [
                idUserSend,
                idUserReceiver,
                idProject,
                'projectRejected'
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

        if(flag === 'view') {
           
            const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

            // Create
            const responseUpdateNotification = await pool.query(queryUpdateNotification, [
                false,
                true,
                idNotification,
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
        if(flag === 'glosaryAccepted') {
            const queryProject = 'UPDATE glosary SET isaccepted=$1, idstatus=$2 WHERE idproject=$3;';
            const response = await pool.query(queryProject, [
                true,
                4,
                idProject
            ]);

            const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';

            // Create
            const responseUpdateNotification = await pool.query(queryUpdateNotification, [
                false,
                true,
                idNotification,



            ]);

            const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';

            // Create
            const responseNotification = await pool.query(queryNotification, [
                idUserSend,
                idUserReceiver,
                idProject,
                'glosaryAccepted'


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
        if(flag === 'glosaryRejected') {
            const queryProject = 'UPDATE glosary SET isaccepted=$1, idstatus=$2, rejected=$3 WHERE idproject=$4;';
            const response = await pool.query(queryProject, [
                false,
                5,
                rejected,
                idProject
            ]);

            const queryUpdateNotification = 'UPDATE notificationgd SET isactive=$1, isanswered=$2 WHERE id=$3 ';
            const responseUpdateNotification = await pool.query(queryUpdateNotification, [
                false,
                true,
                idNotification
            ]);

            const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
            const responseNotification = await pool.query(queryNotification, [
                idUserSend,
                idUserReceiver,
                idProject,
                'glosaryRejected'
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
    }catch(err){
        console.log(err)
    }
}
exports.update_project = async(req, res) => {

    const projectInformation = req.body
    const idProject = req.params.id;
    const {personalInformation, context, participants} = projectInformation
    const {
        projectName,
        projectDescription ,
        projectScopeDescription,
        projectObjective,
        region,
        startDate,
        finalDate,
        informationUse,
        deliverables,
        aditionalInformation,
        userId 
    } = context 

    try{
        const queryProject = 'UPDATE project SET projectname=$1,projectdescription=$2,projectscopedescription=$3,projectobjective=$4,region=$5,startdate=$6,finaldate=$7,informationuse=$8,deliverables=$9,aditionalinformation=$10,idusuario=$11,idstatus=$12 WHERE id=$13;';

        // Create
        const responseProject = await pool.query(queryProject, [
            projectName,
            projectDescription ,
            projectScopeDescription,
            projectObjective,
            region,
            startDate,
            finalDate,
            informationUse,
            deliverables,
            aditionalInformation,
            userId,
            2,
            idProject
        ]);


        //Notificaction
        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idProject,
            'projectUpdated'


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

exports.create_glosary = async(req, res) => {

    const {glosary, userId, idProject} = req.body
    

    try{

        let data = ''
        const status = 3
        for(let i = 0; i < glosary.length; i++) {
            const term = glosary[i]
            data += `('${term.term}','${term.definition}','${term.abbreviattions}','${term.synonym}','${term.example}','${term.region}','${term.area}','${term.domain}','${term.subdomain}','${term.owner}','${term.status}','${term.creationDate}','${term.updateDate}','${term.documentationResponsible}','${term.updateResponsible}','${term.comment}',${idProject},'${status}'),`
        }
        
        const queryGlosary = `INSERT INTO glosary(term,definition,abbreviattions,synonym,example,region,area,domain,subdomain,owner,status,creationdate,updatedate,documentationresponsible,updateresponsible,comment,idproject,idstatus) values${data}`;
        const parseQueryGlosary = queryGlosary.substring(0, queryGlosary.length - 1);
        const responseGlosary = await pool.query(parseQueryGlosary);


        //Notificaction
        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idProject,
            'glosary'


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

     //Participants
    

     res
     .status(201)
     .json({
     status: "success",
     msg: "Recording sucessfully",
     data: req.body
     })
     .end()
   
    
}
exports.get_glosary_terms = async(req, res) => {

    const id = req.params.id;

    const query = 'SELECT * FROM glosary where idproject=$1 order by id';
    const response = await pool.query(query, [id]);
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: response.rows
    })
    .end()
}
exports.get_complete = async(req, res) => {

    const id = req.params.id;
    const complete = {
        glosary: false
    }

    const query = 'select isaccepted from glosary where idproject=$1';
    const response = await pool.query(query, [id]);
    const glosary = response.rows[0].isaccepted
    if(glosary) complete['glosary'] = true
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: complete
    })
    .end()
}
    exports.get_glosary = async(req, res) => {

    const query = 'SELECT * FROM glosary order by id';
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
exports.update_glosary= async(req, res) => {

    const idProject = req.params.id;
    const {glosary, userId} = req.body
    
    try{

        //Delete
        const queryDelete = 'DELETE FROM glosary where idproject=$1'
        // Create
        const responseDelete = await pool.query(queryDelete, [
            idProject
        ]);
        //Update
        const status = 3
        let data = ''
        for(let i = 0; i < glosary.length; i++) {
            const term = glosary[i]
            data += `('${term.term}','${term.definition}','${term.abbreviattions}','${term.synonym}','${term.example}','${term.region}','${term.area}','${term.domain}','${term.subdomain}','${term.owner}','${term.status}','${term.creationDate}','${term.updateDate}','${term.documentationResponsible}','${term.updateResponsible}','${term.comment}',${idProject},${status}),`
        }
        
        const queryGlosary = `INSERT INTO glosary(term,definition,abbreviattions,synonym,example,region,area,domain,subdomain,owner,status,creationdate,updatedate,documentationresponsible,updateresponsible,comment,idproject,idstatus) values${data}`;
        const parseQueryGlosary = queryGlosary.substring(0, queryGlosary.length - 1);
        const responseGlosary = await pool.query(parseQueryGlosary);

        //Notificaction
        const queryNotification = 'INSERT INTO notificationgd(idusersend,iduserreceiver,idassociate,nameassociate) values($1,$2,$3,$4);';
        const responseNotification = await pool.query(queryNotification, [
            userId,
            17,
            idProject,
            'glosaryUpdated'


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
exports.get_status = async(req, res) => {

    const id = req.params.id;
    const complete = {
        glosary: {}
    }

    const query = 'select idstatus, statusname from glosary gl inner join statusgd st on gl.idstatus = st.id where gl.idproject=$1';
    const response = await pool.query(query, [id]);
    const glosary = response.rows[0]
    complete['glosary'] = glosary
    
    res
    .status(201)
    .json({
      status: "success",
      msg: "Recording sucessfully",
      data: complete
    })
    .end()
}

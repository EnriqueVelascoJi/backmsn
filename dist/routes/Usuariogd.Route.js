
const { Router } = require('express');

const { get_all_usuarios_gd, create_usuario_gd, update_usuario_gd, login_gd, get_usuario_gd, create_project_gd, get_projects_gd, get_partial_projects_gd, get_all_notifications_gd, get_notifications_by_user_gd, get_process_gd, create_requirement_gd, update_project_gd, create_dict_procedure, update_dict_procedure, create_project,get_projects, get_project, update_status_project,update_project, create_glosary, get_glosary_terms, get_complete, get_glosary,update_glosary, get_status } = require('../controllers/Usuario.Controller');
const router = Router();


router.route('/').get(get_all_usuarios_gd);
router.route('/usuariogd/:id').get(get_usuario_gd);
router.route('/').post(create_usuario_gd);
router.route('/login').post(login_gd);
//router.route('/:id').patch(update_usuario_gd);
router.route('/project').post(create_project);
router.route('/project/:id').get(get_project);
router.route('/project/:id').patch(update_project);
router.route('/requirement').post(create_requirement_gd);
router.route('/projects').get(get_projects_gd);
router.route('/projects').patch(update_project_gd);
router.route('/project_status').patch(update_status_project)
router.route('/partialprojects').get(get_partial_projects_gd);
router.route('/notifications').get(get_all_notifications_gd);
router.route('/notifications/:id').get(get_notifications_by_user_gd);
router.route('/process/:id').get(get_projects);
router.route('/dict').post(create_dict_procedure);
router.route('/dict').patch(update_dict_procedure);
router.route('/glosary').post(create_glosary);
router.route('/glosary').get(get_glosary);
router.route('/glosary/:id').get(get_glosary_terms);
router.route('/complete/:id').get(get_complete);
router.route('/status/:id').get(get_status);
router.route('/glosary/:id').patch(update_glosary);









module.exports = router;

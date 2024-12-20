const { Router } = require('express');

const { get_all_usuarios, create_usuario, update_usuario, delete_usuario, login, get_usuario, get_all_usuarios_gd, create_usuario_gd, update_usuario_gd, login_gd, get_usuario_gd} = require('../controllers/Usuario.Controller');
const router = Router();


router.route('/').get(get_all_usuarios);
router.route('/:id').get(get_usuario) ;
router.route('/').post(create_usuario);
router.route('/login').post(login);
router.route('/:id').patch(update_usuario);
router.route('/:id').delete(delete_usuario);


module.exports = router;

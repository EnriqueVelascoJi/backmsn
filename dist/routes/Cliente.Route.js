const { Router } = require('express');

const { get_all_clientes, create_cliente, update_cliente, delete_cliente, get_cliente} = require('../controllers/Cliente.Controller');
const router = Router();


router.route('/').get(get_all_clientes) ;
router.route('/:id').get(get_cliente) ;
router.route('/').post(create_cliente);
router.route('/:id').patch(update_cliente);
router.route('/:id').delete(delete_cliente);

module.exports = router;

const { Router } = require('express');

const { get_all_refacciones, create_refaccion, update_refaccion, delete_refaccion, get_refaccion} = require('../controllers/Refacciones.Controller');
const router = Router();


router.route('/').get(get_all_refacciones) ;
router.route('/:id').get(get_refaccion) ;
router.route('/').post(create_refaccion);
router.route('/:id').patch(update_refaccion);
router.route('/:id').delete(delete_refaccion);

module.exports = router;

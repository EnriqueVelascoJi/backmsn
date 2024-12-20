const { Router } = require('express');

const { get_all_mecanicos, create_mecanico, delete_mecanico, get_mecanico, update_mecanico} = require('../controllers/Mecanico.Controller');
const router = Router();


router.route('/').get(get_all_mecanicos);
router.route('/').post(create_mecanico);
router.route('/:id').put(update_mecanico);
router.route('/:id').delete(delete_mecanico);
router.route('/:id').get(get_mecanico) ;
router.route('/:id').patch(update_mecanico);


module.exports = router;

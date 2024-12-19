const { Router } = require('express');

const { get_all_refacciones_incidencias, create_refacciones_incidencias, update_refacciones_incidencias, delete_refacciones_incidencias} = require('../controllers/RefaccionIncidencia.Controller');
const router = Router();


router.route('/').get(get_all_refacciones_incidencias) ;
router.route('/').post(create_refacciones_incidencias);
router.route('/:id').patch(update_refacciones_incidencias);
router.route('/:id').delete(delete_refacciones_incidencias);

module.exports = router;
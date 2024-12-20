const { Router } = require('express');

const { get_all_archivos, create_archivo, update_archivo, delete_archivo} = require('../controllers/Archivo.Controller');
const router = Router();


router.route('/').get(get_all_archivos);
router.route('/').post(create_archivo);
router.route('/:id').put(update_archivo);
router.route('/:id').patch(delete_archivo);

module.exports = router;
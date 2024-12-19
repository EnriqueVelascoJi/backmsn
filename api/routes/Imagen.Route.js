const { Router } = require('express');

const { get_all_imagenes, create_imagen, update_imagen, delete_imagen} = require('../controllers/Imagen.Controller');
const router = Router();


router.route('/').get(get_all_imagenes);
router.route('/').post(create_imagen);
router.route('/:id').put(update_imagen);
router.route('/:id').patch(delete_imagen);

module.exports = router;
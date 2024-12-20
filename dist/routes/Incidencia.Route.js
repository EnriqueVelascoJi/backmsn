const { Router } = require('express');

const { get_all_incidencias, get_incidencia,create_incidencia, update_incidencia, delete_incidencia, get_resumen1, get_resumen2, get_resumen3, ver_mas, get_by_equipo, get_by_equipos, get_by_aeropuertos, get_by_date, get_by_clientes, get_resumen4, uploadImages, uploadFiles, ver_files, ver_imagenes, borrarImages, borrarFiles} = require('../controllers/Incidencia.Controller');
const router = Router();


router.route('/').get(get_all_incidencias);
router.route('/:id').get(get_incidencia);
router.route('/getbyequipo/:id').get(get_by_equipo);
router.route('/getbydate').post(get_by_date);
router.route('/vermas/:id').get(ver_mas);
router.route('/vermasfiles/:id').get(ver_files);
router.route('/vermasimages/:id').get(ver_imagenes);
router.route('/').post(create_incidencia);
router.route('/:id').patch(update_incidencia);
router.route('/:id').delete(delete_incidencia);
router.route('/costos1').post(get_resumen1);
router.route('/costos2').post(get_resumen2);
router.route('/costos3').post(get_resumen3);
router.route('/costos4').post(get_resumen4);
router.route('/equipos').post(get_by_equipos);
router.route('/aeropuertos').post(get_by_aeropuertos);
router.route('/clientes').post(get_by_clientes);
router.route('/uploadimages').post(uploadImages);
router.route('/uploadfiles').post(uploadFiles);
router.route('/borrarimages').post(borrarImages);
router.route('/borrarfiles').post(borrarFiles);


module.exports = router;

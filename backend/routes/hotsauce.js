const express = require('express');
const router = express.Router();

const hotSauceCtrl = require('../controllers/hotsauce');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, hotSauceCtrl.createHotSauce);
router.put('/:id', auth, multer, hotSauceCtrl.modifyHotSauce);
router.delete('/:id', auth, hotSauceCtrl.deleteHotSauce);
router.get('/:id', hotSauceCtrl.getOneHotSauce);
router.use('/', hotSauceCtrl.getAllHotSauces);

module.exports = router;
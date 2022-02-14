const express = require('express');
const router = express.Router();
const backgroundController = require('../../app/controllers/background/BackgroundController');

router.post('/', backgroundController.createBackground);
router.get('/', backgroundController.showBackground);
router.put('/:idProject/:idBg', backgroundController.setBackground);



module.exports = router;

const { Router } = require('express');
const router = Router();

const indexController = require('../controller/indexController')

router.get('/', indexController.getAllGames)

module.exports = router;
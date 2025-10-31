const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render("newGame")
})

router.post('/', (req, res) => {
    
})

module.exports = router;
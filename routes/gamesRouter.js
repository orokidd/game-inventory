const { Router } = require('express');
const router = Router();

// Simple placeholder route - expand as needed
router.get('/', (req, res) => {
	res.send('Games index');
});

module.exports = router;

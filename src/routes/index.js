const express = require('express');
const gameController = require('../controllers/gameController');
const router = express.Router();

router.post('/initialize-game', gameController.initializeGame);
router.get('/numbers', gameController.getNumbers);
router.post('/call-number', gameController.callNumber);
router.get('/called-numbers', gameController.getCalledNumbers);
router.post('/reset-game', gameController.resetGame);

module.exports = router;

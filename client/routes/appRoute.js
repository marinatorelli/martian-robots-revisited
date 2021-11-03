const express = require('express');
router = express.Router();
appController = require('../controllers/appController');

router.get('/', appController.getHomepage);
router.get('/expeditions', appController.getExpeditions);
router.get('/insights', appController.getInsights);


module.exports = router;
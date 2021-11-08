const express = require('express');
router = express.Router();
appController = require('../controllers/appController');

// GET homepage and render it
router.get('/', appController.getHomepage);

// GET the expeditions data to the client
router.get('/expeditions', appController.getExpeditions);

// GET the expeditions data to the client
router.get('/insights', appController.getInsights);


module.exports = router;
const express = require('express');
const router = express.Router();
const EpisodeController = require('../controllers/episode.controllers');

router.get('/', EpisodeController.getEpisodes);
router.get('/:id', EpisodeController.getEpisodesById);
router.post('/', EpisodeController.createEpisode);
router.put('/:id', EpisodeController.updateEpisode);
router.delete('/:id', EpisodeController.deleteEpisode);

module.exports = router;

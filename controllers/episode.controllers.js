const Episode = require('../models/episode.models');
const EpisodeService = require ('../services/episodes.services')

exports.getEpisodes = async (req, res) => {
    try {
        const episodes = await Episode.find().populate('course_id');
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getEpisodesById = async (req, res) => {
    const episodesId = req.params.id;
    try {
        const episodes = await Episode.findById(episodesId);
        if (!episodes) {
            return res.status(404).json({ message: 'Episode not found' });
        }
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createEpisode = async (req, res) => {
    try {
        await EpisodeService.validateEpisode(req.body.course_id);

        const episode = new Episode(req.body);
        const newEpisode = await episode.save();
        res.status(201).json(newEpisode);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateEpisode = async (req, res) => {
    const episodeId = req.params.id;
    try {
        await EpisodeService.validateEpisode(req.body.course_id);

        const updatedEpisode = await Episode.findByIdAndUpdate(episodeId, req.body, { new: true });
        if (!updatedEpisode) {
            return res.status(404).json({ message: 'Episode not found' });
        }
        res.json(updatedEpisode);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteEpisode = async (req, res) => {
    const episodeId = req.params.id;
    try {
        const deletedEpisode = await Episode.findByIdAndDelete(episodeId);
        if (!deletedEpisode) {
            return res.status(404).json({ message: 'Episode not found' });
        }
        res.json({ message: 'Episode deleted' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
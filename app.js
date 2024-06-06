const express = require('express');
const body_parser = require('body-parser');
const userRoutes = require('./routers/user.routers');
const courseRoutes = require('./routers/courses.routers');
const courseCateRoutes = require('./routers/coursesCategory.routers');
const EpisodesRoutes = require('./routers/episode.routers');
const app = express();

app.use(body_parser.json());
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/coursesCategory', courseCateRoutes);
app.use('/episodes', EpisodesRoutes);
module.exports = app;

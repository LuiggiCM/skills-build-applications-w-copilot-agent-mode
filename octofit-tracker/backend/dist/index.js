import express from 'express';
import './config/database';
import { API_BASE_URL, API_PORT } from './config/api';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
const app = express();
app.use(express.json());
// Health check endpoint
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'OctoFit Tracker backend' });
});
// API configuration endpoint - useful for frontend to know the API URL
app.get('/api-config', (_req, res) => {
    res.json({ baseUrl: API_BASE_URL });
});
// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
app.listen(API_PORT, () => {
    console.log(`OctoFit Tracker backend listening on ${API_BASE_URL}`);
});

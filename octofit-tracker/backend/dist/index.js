import express from 'express';
import './config/database';
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
// API routes
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
// Codespaces-aware API URL
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.preview.app.github.dev`;
    }
    return `http://localhost:8000`;
};
const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
    const apiUrl = getApiUrl();
    console.log(`OctoFit Tracker backend listening on ${apiUrl}`);
});

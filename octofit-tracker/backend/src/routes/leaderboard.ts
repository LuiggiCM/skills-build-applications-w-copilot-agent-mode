import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const router = Router();

// GET /api/leaderboard/
router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId', 'name email')
      .populate('teamId', 'name description');
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/teams
router.get('/teams', async (_req, res) => {
  try {
    const teamLeaderboard = await Leaderboard.find({ teamId: { $exists: true, $ne: null } })
      .sort({ rank: 1 })
      .populate('teamId', 'name description');
    res.json(teamLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' });
  }
});

// GET /api/leaderboard/users
router.get('/users', async (_req, res) => {
  try {
    const userLeaderboard = await Leaderboard.find({ userId: { $exists: true, $ne: null } })
      .sort({ rank: 1 })
      .populate('userId', 'name email');
    res.json(userLeaderboard);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user leaderboard' });
  }
});

export default router;

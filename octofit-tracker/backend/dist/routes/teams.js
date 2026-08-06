import { Router } from 'express';
import { Team } from '../models/team';
const router = Router();
// GET /api/teams/
router.get('/', async (_req, res) => {
    try {
        const teams = await Team.find().populate('members');
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});
// POST /api/teams/
router.post('/', async (req, res) => {
    try {
        const newTeam = new Team(req.body);
        const savedTeam = await newTeam.save();
        res.status(201).json(savedTeam);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create team' });
    }
});
// GET /api/teams/:id
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(team);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team' });
    }
});
// PUT /api/teams/:id
router.put('/:id', async (req, res) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json(updatedTeam);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update team' });
    }
});
// DELETE /api/teams/:id
router.delete('/:id', async (req, res) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.json({ message: 'Team deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete team' });
    }
});
export default router;

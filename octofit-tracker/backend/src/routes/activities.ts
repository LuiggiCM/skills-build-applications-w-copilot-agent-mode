import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

// GET /api/activities/
router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('userId', 'name email');
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// POST /api/activities/
router.post('/', async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create activity' });
  }
});

// GET /api/activities/:id
router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', 'name email');
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity' });
  }
});

// PUT /api/activities/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update activity' });
  }
});

// DELETE /api/activities/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;

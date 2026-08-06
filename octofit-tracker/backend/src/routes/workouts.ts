import { Router } from 'express';
import { Workout } from '../models/workout';

const router = Router();

// GET /api/workouts/
router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find().populate('userId', 'name email');
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

// POST /api/workouts/
router.post('/', async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create workout' });
  }
});

// GET /api/workouts/:id
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('userId', 'name email');
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout' });
  }
});

// PUT /api/workouts/:id
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json(updatedWorkout);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update workout' });
  }
});

// DELETE /api/workouts/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }
    res.json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

export default router;

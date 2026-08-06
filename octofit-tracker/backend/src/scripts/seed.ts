import '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';
import mongoose from 'mongoose';

/**
 * Seed the octofit_db database with test data
 * This script populates the database with realistic sample data for testing and development
 */

async function seedDatabase() {
  try {
    console.log('🌱 Starting seed script...');
    console.log('📝 Seed the octofit_db database with test data');

    // Clear existing data
    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await Leaderboard.deleteMany({});
    await Workout.deleteMany({});
    console.log('🗑️  Cleared existing collections');

    // Create users
    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Carol Davis', email: 'carol@example.com' },
      { name: 'David Wilson', email: 'david@example.com' },
      { name: 'Emma Brown', email: 'emma@example.com' },
    ]);
    console.log(`👥 Created ${users.length} users`);

    // Create teams
    const teams = await Team.insertMany([
      {
        name: 'Fitness Warriors',
        description: 'A team of dedicated fitness enthusiasts',
        members: [users[0]._id, users[1]._id, users[2]._id],
      },
      {
        name: 'Morning Runners',
        description: 'Early birds who love running',
        members: [users[3]._id, users[4]._id],
      },
      {
        name: 'Gym Buddies',
        description: 'Strength training focused team',
        members: [users[0]._id, users[3]._id],
      },
    ]);
    console.log(`👫 Created ${teams.length} teams`);

    // Create activities
    const activities = await Activity.insertMany([
      { userId: users[0]._id, type: 'Running', duration: 45, distance: 8.5, calories: 650, date: new Date() },
      { userId: users[0]._id, type: 'Cycling', duration: 60, distance: 25, calories: 750, date: new Date(Date.now() - 86400000) },
      { userId: users[1]._id, type: 'Swimming', duration: 30, distance: 1.5, calories: 400, date: new Date() },
      { userId: users[1]._id, type: 'Gym', duration: 90, calories: 800, date: new Date(Date.now() - 86400000) },
      { userId: users[2]._id, type: 'Yoga', duration: 60, calories: 300, date: new Date() },
      { userId: users[3]._id, type: 'Running', duration: 30, distance: 5, calories: 450, date: new Date() },
      { userId: users[4]._id, type: 'Pilates', duration: 45, calories: 350, date: new Date() },
    ]);
    console.log(`🏃 Created ${activities.length} activities`);

    // Create leaderboard entries
    const leaderboardEntries = await Leaderboard.insertMany([
      { userId: users[0]._id, points: 1500, rank: 1 },
      { userId: users[1]._id, points: 1200, rank: 2 },
      { userId: users[3]._id, points: 1000, rank: 3 },
      { userId: users[2]._id, points: 900, rank: 4 },
      { userId: users[4]._id, points: 800, rank: 5 },
      { teamId: teams[0]._id, points: 3600, rank: 1 },
      { teamId: teams[1]._id, points: 1800, rank: 2 },
      { teamId: teams[2]._id, points: 2500, rank: 3 },
    ]);
    console.log(`🏆 Created ${leaderboardEntries.length} leaderboard entries`);

    // Create workouts
    const workouts = await Workout.insertMany([
      {
        userId: users[0]._id,
        name: 'Full Body Workout',
        description: 'Complete full body strength training routine',
        exercises: [
          { name: 'Squats', sets: 4, reps: 8 },
          { name: 'Bench Press', sets: 4, reps: 8 },
          { name: 'Deadlifts', sets: 3, reps: 5 },
        ],
        difficulty: 'intermediate',
      },
      {
        userId: users[0]._id,
        name: 'HIIT Cardio',
        description: 'High intensity interval training for cardio',
        exercises: [
          { name: 'Burpees', sets: 3, reps: 15 },
          { name: 'Mountain Climbers', sets: 3, reps: 20 },
          { name: 'Jump Squats', sets: 3, reps: 15 },
        ],
        difficulty: 'advanced',
      },
      {
        userId: users[2]._id,
        name: 'Beginner Yoga',
        description: 'Gentle yoga for beginners',
        exercises: [
          { name: 'Child Pose', sets: 1, reps: 5 },
          { name: 'Downward Dog', sets: 1, reps: 5 },
          { name: 'Cat Cow Stretch', sets: 1, reps: 10 },
        ],
        difficulty: 'beginner',
      },
    ]);
    console.log(`🏋️  Created ${workouts.length} workouts`);

    console.log('✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

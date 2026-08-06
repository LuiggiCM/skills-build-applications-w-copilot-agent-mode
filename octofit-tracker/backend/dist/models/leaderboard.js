import mongoose, { Schema } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
    rank: { type: Number },
}, { timestamps: true });
export const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboard extends Document {
  userId?: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
    rank: { type: Number },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboard>('Leaderboard', leaderboardSchema);

// server/src/models/Folder.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFolder>('Folder', FolderSchema);
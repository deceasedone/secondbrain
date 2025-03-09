// server/src/models/Content.ts
import mongoose, { Schema, Document } from 'mongoose';

export enum ContentType {
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  IMAGE = 'image',
  LINK = 'link',
  TEXT = 'text',
  GENERIC = 'generic'
}

export interface IContent extends Document {
  title: string;
  content: string;
  contentType: ContentType;
  url?: string;
  folderId?: mongoose.Types.ObjectId | null;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ContentSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentType: { 
    type: String, 
    enum: Object.values(ContentType), 
    required: true 
  },
  url: { type: String },
  folderId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Folder', 
    default: null 
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Add validation for YouTube and Twitter links
ContentSchema.pre('save', function(next) {
  if (this.contentType === ContentType.YOUTUBE && this.url) {
    // Simple validation for YouTube URL format
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    if (!youtubeRegex.test(this.url as string)) {
      return next(new Error('Invalid YouTube URL'));
    }
  } else if (this.contentType === ContentType.TWITTER && this.url) {
    // Simple validation for Twitter URL format
    const twitterRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/;
    if (!twitterRegex.test(this.url as string)) {
      return next(new Error('Invalid Twitter URL'));
    }
  }
  next();
});

// Make sure the model is only created once
const Content = mongoose.models.Content || mongoose.model<IContent>('Content', ContentSchema);
export default Content;
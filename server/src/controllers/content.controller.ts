// server/src/controllers/content.controller.ts
import { Request, Response } from 'express';
import Content, { ContentType } from '../models/Content';
import mongoose from 'mongoose';

export const getAllContent = async (req: Request, res: Response) => {
  try {
    const { contentType, folderId } = req.query;
    
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    let query: any = { userId };
    
    if (contentType) {
      query.contentType = contentType;
    }
    
    if (folderId) {
      query.folderId = folderId === 'null' ? null : folderId;
    }
    
    const content = await Content.find(query).sort({ createdAt: -1 });
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error });
  }
};

export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, content, contentType, url, folderId } = req.body;
    
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    // Validate required fields
    if (!title || !content || !contentType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Create new content
    const newContent = new Content({
      title,
      content,
      contentType,
      url,
      folderId: folderId === 'null' ? null : folderId,
      userId
    });
    
    const savedContent = await newContent.save();
    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ message: 'Error creating content', error });
  }
};

export const getContentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    
    const content = await Content.findOne({ _id: id, userId });
    
    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching content', error });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content, contentType, url, folderId } = req.body;
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    
    const updatedContent = await Content.findOneAndUpdate(
      { _id: id, userId },
      { 
        title, 
        content, 
        contentType, 
        url, 
        folderId: folderId === 'null' ? null : folderId,
        updatedAt: Date.now() 
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating content', error });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid content ID' });
    }
    
    const deletedContent = await Content.findOneAndDelete({ _id: id, userId });
    
    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }
    
    res.status(200).json({ message: 'Content deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting content', error });
  }
};
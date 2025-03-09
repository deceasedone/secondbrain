// server/src/controllers/folder.controller.ts
import { Request, Response } from 'express';
import Folder from '../models/Folder';
import Content from '../models/Content';
import mongoose from 'mongoose';

export const getAllFolders = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    const folders = await Folder.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(folders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching folders', error });
  }
};

export const createFolder = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
    
    const newFolder = new Folder({ name, userId });
    const savedFolder = await newFolder.save();
    
    res.status(201).json(savedFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error creating folder', error });
  }
};

export const updateFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid folder ID' });
    }
    
    if (!name) {
      return res.status(400).json({ message: 'Folder name is required' });
    }
    
    const updatedFolder = await Folder.findOneAndUpdate(
      { _id: id, userId },
      { name, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedFolder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    res.status(200).json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: 'Error updating folder', error });
  }
};

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore - we'll add the user property in the auth middleware
    const userId = req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid folder ID' });
    }
    
    // First delete the folder
    const deletedFolder = await Folder.findOneAndDelete({ _id: id, userId });
    
    if (!deletedFolder) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    // Update content to remove folder association
    await Content.updateMany(
      { folderId: id, userId },
      { $set: { folderId: null } }
    );
    
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error deleting folder:', error);
    // Send more detailed error information
    res.status(500).json({ 
      message: 'Error deleting folder', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
};
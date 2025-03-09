import { Request, Response } from 'express';
import Folder from '../models/Folder';
import mongoose from 'mongoose';

export const deleteFolderHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid folder ID' });
    }
    
    const result = await Folder.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ message: 'Folder not found' });
    }
    
    res.status(200).json({ message: 'Folder deleted successfully' });
  } catch (error) {
    console.error('Error in delete folder handler:', error);
    res.status(500).json({ 
      message: 'Error deleting folder',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

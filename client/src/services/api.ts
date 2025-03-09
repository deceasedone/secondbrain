// client/src/services/api.ts
import axios from 'axios';
import { Content, Folder, ContentType, User } from '../types';

// Use environment variable with fallback to localhost for development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth') 
      ? JSON.parse(localStorage.getItem('auth')!).token 
      : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Added token to request:', config.url);
    } else {
      console.log('No token available for request:', config.url);
    }
    
    // Add debugging
    console.log(`Making request to: ${config.url} with method: ${config.method}`);
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}: Status ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`Error response from ${error.config?.url}:`, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Authentication API calls
export const register = async (username: string, email: string, password: string): Promise<{ message: string; user: User }> => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password
  });
  return response.data;
};

export const login = async (email: string, password: string): Promise<{ message: string; user: User; token: string }> => {
  const response = await api.post('/auth/login', {
    email,
    password
  });
  return response.data;
};

export const getProfile = async (): Promise<User> => {
  const response = await api.get('/auth/profile');
  return response.data;
};

// Content API calls
export const getContent = async (contentType?: ContentType, folderId?: string | null) => {
  try {
    let url = `/content`;
    const params: Record<string, string> = {};
    
    if (contentType) {
      params.contentType = contentType;
    }
    
    if (folderId) {
      params.folderId = folderId;
    }
    
    // Add params to URL if any exist
    if (Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      url = `${url}?${queryString}`;
    }
    const response = await api.get(url);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching content:", error);
    throw error;
  }
};

export const getContentById = async (id: string): Promise<Content> => {
  const response = await api.get(`/content/${id}`);
  return response.data;
};

export const createContent = async (contentData: Partial<Content>): Promise<Content> => {
  const response = await api.post('/content', contentData);
  return response.data;
};

export const updateContent = async (id: string, contentData: Partial<Content>): Promise<Content> => {
  const response = await api.put(`/content/${id}`, contentData);
  return response.data;
};

export const deleteContent = async (id: string) => {
  try {
    const response = await api.delete(`/content/${id}`);
    return response.data;
  } catch (error) {
    // If we get a 404, it means the content was already deleted
    // This is not actually an error in our case, so we'll handle it gracefully
    if ((error as any).response?.status === 404) {
      console.log("Content already deleted or not found");
      return { message: "Content already deleted" };
    }
    console.error("Error in deleteContent:", error);
    throw error;
  }
};

// Folder API calls
export const getFolders = async (): Promise<Folder[]> => {
  const response = await api.get('/folders');
  return response.data;
};

export const createFolder = async (name: string): Promise<Folder> => {
  const response = await api.post('/folders', { name });
  return response.data;
};

export const updateFolder = async (id: string, name: string): Promise<Folder> => {
  const response = await api.put(`/folders/${id}`, { name });
  return response.data;
};

export const deleteFolder = async (id: string): Promise<void> => {
  await api.delete(`/folders/${id}`);
};
export enum ContentType {
    YOUTUBE = 'youtube',
    TWITTER = 'twitter',
    IMAGE = 'image',
    LINK = 'link',
    TEXT = 'text',
    GENERIC = 'generic'
  }
  
  export interface Content {
    _id: string;
    title: string;
    content: string;
    contentType: ContentType;
    url?: string;
    folderId?: string | null;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Folder {
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface User {
    id: string;
    username: string;
    email: string;
  }

  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
  }

  // Add this to your global declarations
  declare global {
    interface Window {
      twttr: {
        widgets: {
          load: (element?: HTMLElement | null) => void;
        };
      };
    }
  }
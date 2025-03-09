"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { type Content, ContentType } from "../types"
import { deleteContent } from "../services/api"

interface ContentCardProps {
  content: Content
  onDelete: (id: string) => void
  onEdit: (content: Content) => void
  onView: (content: Content) => void
}

const ContentCard: React.FC<ContentCardProps> = ({ content, onDelete, onEdit, onView }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const twitterRef = useRef<HTMLDivElement>(null)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card click

    if (window.confirm("Are you sure you want to delete this content?")) {
      try {
        setIsDeleting(true)
        await deleteContent(content._id)
        onDelete(content._id)
      } catch (error) {
        console.error("Error deleting content:", error)
        alert("Failed to delete content")
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the card click
    onEdit(content)
  }

  const renderContentTypeIcon = () => {
    switch (content.contentType) {
      case ContentType.TEXT:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        )
      case ContentType.IMAGE:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        )
      case ContentType.YOUTUBE:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
          </svg>
        )
      case ContentType.TWITTER:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
          </svg>
        )
      case ContentType.LINK:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        )
    }
  }

  const renderContentPreview = () => {
    switch (content.contentType) {
      case ContentType.YOUTUBE:
        if (content.url) {
          // Extract video ID from YouTube URL
          const videoId = content.url.includes('youtube.com') 
            ? content.url.split('v=')[1]?.split('&')[0] 
            : content.url.includes('youtu.be') 
              ? content.url.split('youtu.be/')[1]?.split('?')[0] 
              : null;
          
          return videoId ? (
            <div className="content-preview-youtube">
              <iframe
                className="w-full aspect-video rounded-md"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="content-preview-text">
              <span className="text-muted dark:text-dark-muted">Invalid YouTube URL</span>
            </div>
          );
        }
        return <div className="content-preview-text">{content.content}</div>;
        
      case ContentType.TWITTER:
        if (content.url) {
          // Simple approach - just use blockquote with the URL
          return (
            <div className="content-preview-twitter" ref={twitterRef}>
              <blockquote className="twitter-tweet">
                <a href={content.url.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          );
        }
        return <div className="content-preview-text">{content.content}</div>;
        
      case ContentType.IMAGE:
        return content.url ? (
          <div className="content-preview-image">
            <img
              src={content.url || "/placeholder.svg"}
              alt={content.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/300?text=Image+Error"
              }}
            />
          </div>
        ) : (
          <div className="content-preview-text">
            <span className="text-muted dark:text-dark-muted">No image URL</span>
          </div>
        )

      case ContentType.LINK:
        return (
          <div className="content-preview-link flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-primary mb-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            <p className="text-primary-600 hover:underline text-sm text-center truncate max-w-[90%]">{content.url}</p>
          </div>
        )

      case ContentType.TEXT:
        return (
          <div className="content-preview-text">
            <p className="text-gray-700 dark:text-gray-300 line-clamp-6">{content.content}</p>
          </div>
        )

      default:
        return (
          <div className="content-preview-text">
            <p className="text-gray-700 dark:text-gray-300 line-clamp-6">{content.content}</p>
          </div>
        )
    }
  }

  // Load Twitter widget script and process tweets
  useEffect(() => {
    if (content.contentType === ContentType.TWITTER && content.url) {
      // Function to load Twitter widgets
      const loadTwitterWidgets = () => {
        if (window.twttr && window.twttr.widgets) {
          window.twttr.widgets.load(twitterRef.current);
        }
      };

      // Check if script already exists
      if (!document.getElementById('twitter-widget-script')) {
        const script = document.createElement('script');
        script.id = 'twitter-widget-script';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        script.onload = loadTwitterWidgets;
        document.body.appendChild(script);
      } else {
        // If script already exists, process the tweet
        loadTwitterWidgets();
      }
    }
  }, [content]);

  return (
    <div
      className="content-card"
      onClick={() => onView(content)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="card-content">
        <div className="content-card-header">
          <h3 className="content-card-title">{content.title}</h3>

          <div className={`content-card-actions ${isHovered ? "opacity-100" : "opacity-0 sm:opacity-100"}`}>
            <button
              className="p-1 text-primary-600 hover:text-primary-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-all"
              onClick={(_e) => onView(content)}
              aria-label="View"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              className="p-1 text-yellow-600 hover:text-yellow-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-all"
              onClick={handleEdit}
              aria-label="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>

            <button
              className="p-1 text-red-600 hover:text-red-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full transition-all"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="content-card-meta">
          <span className="badge badge-secondary flex items-center">
            {renderContentTypeIcon()}
            <span className="ml-1">{content.contentType}</span>
          </span>
          <span className="text-gray-400">•</span>
          <span>{new Date(content.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="content-card-preview">{renderContentPreview()}</div>
      </div>
    </div>
  )
}

export default ContentCard


"use client"

import type React from "react"
import { useEffect } from "react"
import { type Content, ContentType } from "../types"

interface ContentViewerProps {
  content: Content | null
  onClose: () => void
  isOpen: boolean
}

const ContentViewer: React.FC<ContentViewerProps> = ({ content, onClose, isOpen }) => {
  // Add keyboard handling for ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen, onClose])

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen || !content) return null

  const renderContent = () => {
    switch (content.contentType) {
      case ContentType.YOUTUBE:
        if (content.url) {
          // Extract video ID from YouTube URL
          const videoId = content.url.includes("youtu.be")
            ? content.url.split("/").pop()
            : new URLSearchParams(new URL(content.url).search).get("v")

          return videoId ? (
            <div className="aspect-video w-full">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
            </div>
          ) : (
            <div className="content-preview-text p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300">Invalid YouTube URL</p>
            </div>
          )
        }
        break

      case ContentType.TWITTER:
        return (
          <div className="content-preview-link">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#1DA1F2] mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline break-words font-medium"
              >
                View on Twitter
              </a>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="mt-2 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content.content}</p>
            </div>
          </div>
        )

      case ContentType.IMAGE:
        return content.url ? (
          <div className="flex justify-center my-4">
            <img
              src={content.url || "/placeholder.svg"}
              alt={content.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Image+Error"
              }}
            />
          </div>
        ) : (
          <div className="content-preview-text p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300">No image URL</p>
          </div>
        )

      case ContentType.LINK:
        return (
          <div className="content-preview-link">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary-600 mr-2"
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
              <a
                href={content.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline break-words font-medium"
              >
                {content.url}
              </a>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content.content}</p>
            </div>
          </div>
        )

      case ContentType.TEXT:
      default:
        return (
          <div className="content-preview-text p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{content.content}</p>
          </div>
        )
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{content.title}</h2>
          <button onClick={onClose} className="modal-close">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="content-card-meta">
          <span className="badge badge-secondary flex items-center">
            {(() => {
              switch (content.contentType) {
                case ContentType.TEXT:
                  return (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
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
                      className="h-4 w-4 mr-1"
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
                      className="h-4 w-4 mr-1"
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
                      className="h-4 w-4 mr-1"
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
                      className="h-4 w-4 mr-1"
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
                  return null
              }
            })()}
            {content.contentType}
          </span>
          <span className="text-gray-400">•</span>
          <span>{new Date(content.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="my-6">{renderContent()}</div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn btn-outline">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContentViewer


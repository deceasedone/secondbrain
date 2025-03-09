"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { toast } from "react-hot-toast"
import type { Content, ContentType, Folder } from "../types"
import * as api from "../services/api"
import Sidebar from "./Sidebar"
import ContentCard from "./ContentCard"
import ContentViewer from "./ContentViewer"
import AddContentModal from "./AddContentModal"
import FolderModal from "./FolderModal"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

import "../custom-theme.css"

const AppContent: React.FC = () => {
  const { auth } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [content, setContent] = useState<Content[]>([])
  const [folders, setFolders] = useState<Folder[]>([])
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(null)
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    fetchData()

    // Handle sidebar toggle on window resize
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Auto-open sidebar on larger screens
        setIsSidebarOpen(true)
      } else {
        // Close sidebar on smaller screens
        setIsSidebarOpen(false)
      }
    }

    // Set initial state based on screen size
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [contentData, foldersData] = await Promise.all([
        api.getContent(selectedContentType || undefined, selectedFolder),
        api.getFolders(),
      ])
      setContent(contentData)
      setFolders(foldersData)
    } catch (err) {
      console.error("Error fetching data:", err)
      toast.error("Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [selectedContentType, selectedFolder])

  const handleFilterChange = (contentType: ContentType | null) => {
    setSelectedContentType(contentType)
    setSelectedFolder(null)

    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false)
    }
  }

  const handleFolderSelect = (folderId: string) => {
    // If folderId is null, we're selecting "All"
    setSelectedFolder(folderId === "all" ? null : folderId);
    // Don't reset content type when changing folders
  }

  const handleContentSubmit = async (contentData: Partial<Content>) => {
    try {
      if (selectedContent) {
        await api.updateContent(selectedContent._id, contentData)
        toast.success("Content updated successfully")
      } else {
        await api.createContent(contentData)
        toast.success("Content created successfully")
      }
      setIsContentModalOpen(false)
      setSelectedContent(null)
      fetchData()
    } catch (err) {
      console.error("Error submitting content:", err)
      toast.error("Failed to save content")
    }
  }

  const handleContentEdit = (content: Content) => {
    setSelectedContent(content)
    setIsContentModalOpen(true)
  }

  const handleContentView = (content: Content) => {
    setSelectedContent(content)
    setIsViewerOpen(true)
  }

  const handleContentDelete = async (id: string) => {
    try {
      // Make the API call first
      await api.deleteContent(id);
      
      // Then update the UI
      setContent((prevContents) => prevContents.filter((content) => content._id !== id));
      
      // Show success message
      toast.success("Content deleted successfully");
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content");
    }
  }

  const handleFolderSubmit = async (name: string) => {
    try {
      if (selectedFolder) {
        await api.updateFolder(selectedFolder, name)
        toast.success("Folder updated successfully")
        setSelectedFolder(null)
      } else {
        await api.createFolder(name)
        toast.success("Folder created successfully")
      }
      setIsModalOpen(false)
      fetchData()
    } catch (err) {
      console.error("Error submitting folder:", err)
      toast.error("Failed to save folder")
    }
  }

  const handleFolderEdit = (folderId: string) => {
    setSelectedFolder(folderId)
    setIsModalOpen(true)
  }

  const handleFolderDelete = async (id: string) => {
    try {
      await api.deleteFolder(id)
      toast.success("Folder deleted successfully")
      if (selectedFolder === id) {
        setSelectedFolder(null)
      }
      fetchData()
    } catch (err) {
      console.error("Error deleting folder:", err)
      toast.error("Failed to delete folder")
    }
  }

  const filteredContents = useMemo(() => {
    let filtered = content;
    
    // First filter by content type if selected
    if (selectedContentType) {
      filtered = filtered.filter(item => item.contentType === selectedContentType);
    }
    
    // Then filter by folder if a specific folder is selected
    if (selectedFolder) {
      filtered = filtered.filter(item => item.folderId === selectedFolder);
    }
    
    return filtered;
  }, [content, selectedContentType, selectedFolder]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onFilterChange={handleFilterChange}
        selectedContentType={selectedContentType}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isSidebarOpen ? "md:ml-[280px]" : ""}`}
      >
        {/* Header */}
        <header className="main-header">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 focus:outline-none"
                  aria-label="Toggle sidebar"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="ml-4">
                  <h1 className="text-xl font-bold text-gradient">{auth.user?.username}'s Knowledge Space</h1>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleTheme}
                  className="btn btn-ghost btn-icon rounded-full"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
                <button onClick={() => setIsContentModalOpen(true)} className="btn btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Content
                </button>
                <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                    <line x1="12" y1="11" x2="12" y2="17"></line>
                    <line x1="9" y1="14" x2="15" y2="14"></line>
                  </svg>
                  Add Folder
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Folder List */}
        <div className="folder-nav">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="folder-nav-content">
              <button
                className={`folder-item ${!selectedFolder ? "folder-item-active" : "folder-item-inactive"}`}
                onClick={() => setSelectedFolder(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                All
              </button>

              {folders.map((folder) => (
                <div key={folder._id} className="flex items-center group relative">
                  <div className="flex items-center">
                    <div className="flex gap-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent folder selection
                          handleFolderEdit(folder._id);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                        aria-label="Edit folder"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent folder selection
                          handleFolderDelete(folder._id);
                        }}
                        className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white"
                        aria-label="Delete folder"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                    
                    <button
                      className={`folder-item ${selectedFolder === folder._id ? "folder-item-active" : "folder-item-inactive"}`}
                      onClick={() => handleFolderSelect(folder._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {folder.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <main className="main-content">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>
            ) : filteredContents.length === 0 ? (
              <div className="empty-state">
                <h3 className="empty-state-title">No content found</h3>
                <p className="empty-state-description">Get started by adding some content.</p>
                <div className="empty-state-action">
                  <button onClick={() => setIsContentModalOpen(true)} className="btn btn-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add Content
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredContents.map((item) => (
                  <ContentCard
                    key={item._id}
                    content={item}
                    onDelete={handleContentDelete}
                    onEdit={handleContentEdit}
                    onView={handleContentView}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Folder Modal */}
      {isModalOpen && (
        <FolderModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedFolder(null)
          }}
          onSubmit={handleFolderSubmit}
          initialFolder={selectedFolder ? folders.find((f) => f._id === selectedFolder) : undefined}
        />
      )}

      {/* Add Content Modal */}
      {isContentModalOpen && (
        <AddContentModal
          isOpen={isContentModalOpen}
          onClose={() => {
            setIsContentModalOpen(false)
            setSelectedContent(null)
          }}
          onSubmit={handleContentSubmit}
          initialContent={selectedContent || undefined}
          folders={folders}
        />
      )}

      {/* ContentViewer Modal */}
      <ContentViewer
        content={selectedContent}
        onClose={() => {
          setIsViewerOpen(false)
          setSelectedContent(null)
        }}
        isOpen={isViewerOpen}
      />
    </div>
  )
}

export default AppContent


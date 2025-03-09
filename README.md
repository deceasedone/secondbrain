# Second Brain - Knowledge Management Tool

A modern knowledge management tool to store, organize, and share your digital content.

## Features

- Store various types of content (YouTube videos, Twitter posts, images, links, text)
- Organize content into folders
- Filter content by type
- Dark/light theme toggle
- Share your knowledge space with others
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: MongoDB

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote)

## Installation

### Clone the repository

```bash
git clone <repository-url>
cd second-brain
```

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory with the following content:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/second-brain
```

4. Start the development server:

```bash
npm run dev
```

The server will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The client will run on http://localhost:5173.

## Usage

1. Open your browser and navigate to http://localhost:5173
2. Use the sidebar to filter content by type
3. Create folders to organize your content
4. Add new content using the "+" button in the header
5. Edit or delete content as needed
6. Share your knowledge space using the share button

## Building for Production

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd client
npm run build
```

The built files will be in the `dist` directory, which can be served by any static file server.

## License

MIT 
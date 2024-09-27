
# Real-time News Aggregator with Google News

This project is a full-stack web application that fetches, stores, and displays real-time news from Google News. The backend, built with Node.js and Express.js, periodically retrieves news articles from the Google News RSS feed, stores them in a database, and notifies the frontend via WebSockets when new articles are available. The frontend is built using React, with real-time updates, article filtering, notifications, and dark mode support.

## Features

### Backend (Node.js + Express)
1. **Fetch Google News**: Periodically retrieve news articles from the Google News RSS feed.
2. **Parse XML to JSON**: Convert the RSS feed from XML to JSON format.
3. **Store Articles**: Save the parsed articles in a database (MongoDB or PostgreSQL).
4. **REST API**:
   - Retrieve a list of articles.
   - Mark an article as read.
   - Filter articles by keyword.
5. **Real-time Notifications**: Use Socket.io to notify the frontend of new articles in real-time.

### Frontend (React)
1. **Responsive UI**: Display a list of articles fetched from the backend.
2. **Real-time Updates**: Receive real-time notifications of new articles.
3. **Article Searching**:  Search articles by keyword.
5. **Dark Mode**: Toggle dark mode for the user interface.

### Bonus Features
1. **User Authentication**: User registration and login using JWT for authenticated access.

## Installation and Setup

### Prerequisites
- Node.js (v14 or above)
- MongoDB or PostgreSQL
- NPM or Yarn
- Git

### Backend Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/news-aggregator.git
    cd news-aggregator
    ```

2. Install the dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create an `.env` file in the `backend` directory with the following environment variables:
    ```
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/mongo-test
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Installation
1. Navigate to the `frontend` directory:
    ```bash
    cd ../frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm run dev
    ```

The application will now be available on `http://localhost:5000`.

## Technical Choices

- **Node.js with Express.js**: Chosen for its simplicity and efficiency in building REST APIs and handling WebSockets.
- **MongoDB**: A flexible and scalable database to store the articles with options to filter and query efficiently.
- **Socket.io**: Enables real-time communication between the backend and frontend for live updates.
- **React**: Provides a responsive, modern frontend with excellent support for real-time updates and state management.
- **JWT (Bonus)**: Ensures secure user authentication for access to personalized features such as marking articles as read or saving to favorites.

## Challenges Faced

1. **RSS Parsing**: Parsing XML from the RSS feed and converting it into JSON was challenging. We used `xml2js` to handle the conversion effectively.
2. **Real-time Updates**: Handling real-time notifications in a way that doesn’t overload the client with too many updates required careful consideration. Socket.io helped in this regard.
3. **Database Selection**: Deciding between MongoDB required evaluating their performance for handling semi-structured data like news articles.
4. **Frontend Filtering**: Implementing an efficient client-side filtering system for articles required optimizing state updates in React.

## Potential Improvements

1. **Pagination**: Implement backend pagination and infinite scroll on the frontend to handle large datasets.
2. **Push Notifications**: Add browser push notifications for users who want updates without needing the website open.


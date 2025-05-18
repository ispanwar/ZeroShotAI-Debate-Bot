import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Assuming App.jsx is the main app component
import './index.css'; // Import global styles, including Tailwind CSS directives

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a React root and render the App component
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode> {/* Enables additional checks and warnings for development */}
    <App />
  </React.StrictMode>
);
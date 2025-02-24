import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { StatusContextProvider } from './context/StatContext';
import { EventProvider  } from './context/EventContext';
import { ProfileProvider } from './context/ProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <StatusContextProvider>
        <EventProvider>
        <ProfileProvider>
        <App />
        </ProfileProvider>
        </EventProvider>
      </StatusContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/pages/home/HomePage';
import LeadersPage from './components/pages/leaders/LeadersPage';
import ProfilePage from './components/pages/profile/ProfilePage';
import LoginPage from './components/pages/login/LoginPage';
import ErrorPage from './components/pages/ErrorPage';

import { fetchUsers } from './functions/loaders/fetchUsers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/leaders',
        element: <LeadersPage />,
        loader: fetchUsers,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

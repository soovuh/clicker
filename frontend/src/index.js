import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './components/pages/home/HomePage';
import LeadersPage from './components/pages/leaders/LeadersPage';
import ProfilePage from './components/pages/profile/ProfilePage';
import LoginPage from './components/pages/auth/LoginPage';
import ErrorPage from './components/pages/ErrorPage';

import SignupPage from './components/pages/auth/SignupPage';
import WithAuth from './components/hocs/WithAuth';
import GoogleAuth from './components/pages/auth/google/GoogleAuth';
import GitHubAuth from './components/pages/auth/github/GitHubAuth';
import ActivationPage from './components/pages/auth/ActivationPage';
import ResetPasswordPage from './components/pages/auth/ResetPasswordPage';
import ConfirmPasswordPage from './components/pages/auth/ConfirmPasswordPage';

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
      },
      {
        path: '/profile',
        element: (
          <WithAuth>
            <ProfilePage />
          </WithAuth>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/auth/google',
        element: <GoogleAuth />,
      },
      {
        path: '/auth/github',
        element: <GitHubAuth />,
      },
      {
        path: '/activate/:uid/:activationToken',
        element: <ActivationPage />,
      },
      {
        path: '/password/reset',
        element: <ResetPasswordPage />,
      },
      {
        path: '/password/reset/confirm/:uid/:resetPasswordToken',
        element: <ConfirmPasswordPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

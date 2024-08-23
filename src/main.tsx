import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/MainPage.tsx';
import Login from './pages/Login.tsx';
import DetailPage from './pages/DetailPage.tsx';
import Purchase from './pages/Purchase.tsx';
import Profile from './pages/Profile.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/anasayfa',
    element: <MainPage />,
  },
  {
    path: '/detailPage/:bookID',
    element: <DetailPage />,
  },
  {
    path: '/purchase',
    element: <Purchase />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

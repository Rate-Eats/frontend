import { lazy } from 'react';

const Restaurant = lazy(() => import('@pages/restaurant/Restaurant.tsx'));
const NotFound = lazy(() => import('@components/states/notFound/NotFound.tsx'));
const Dashboard = lazy(() => import('@pages/dashboard/Dashboard.tsx'));
const Register = lazy(() => import('@pages/register/Register.tsx'));
const Login = lazy(() => import('@pages/login/Login.tsx'));

const PublicRoutes = [
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/restaurant/:id',
    element: <Restaurant />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default PublicRoutes;

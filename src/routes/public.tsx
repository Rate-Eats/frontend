import { lazy } from 'react';

const NotFound = lazy(() => import('@components/notFound/NotFound.tsx'));
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
    path: '*',
    element: <NotFound />,
  },
];

export default PublicRoutes;

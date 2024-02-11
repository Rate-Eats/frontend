import { lazy } from 'react';
import TemplatePage from '@pages/templatePage/templatePage.tsx';

const Login = lazy(() => import('@components/signOn/login/Login'));
const Register = lazy(() => import('@components/signOn/register/Register'));

const PublicRoutes = [
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
    element: <TemplatePage />,
  },
];

export default PublicRoutes;

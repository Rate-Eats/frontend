import { lazy } from 'react';
import TemplatePage from '@pages/templatePage/templatePage.tsx';

const Register = lazy(() => import('@components/signOn/register/Register'));

const PublicRoutes = [
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <TemplatePage />,
  },
  {
    path: '*',
    element: <TemplatePage />,
  },
];

export default PublicRoutes;

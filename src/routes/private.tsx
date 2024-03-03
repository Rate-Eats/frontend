import { lazy } from 'react';

const TemplatePage = lazy(() => import('@pages/templatePage/templatePage.tsx'));
const AddRestaurant = lazy(() => import('@pages/addRestaurant/AddRestaurant.tsx'));

const PrivateRoutes = [
  {
    path: '/addrestaurant',
    element: <AddRestaurant />,
  },
  {
    path: '/profile',
    element: <TemplatePage />,
  },
];

export default PrivateRoutes;

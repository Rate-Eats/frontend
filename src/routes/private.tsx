import TemplatePage from '@pages/templatePage/templatePage.tsx';
import AddRestaurant from '@pages/addRestaurant/AddRestaurant.tsx';

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

import { RestaurantData } from '@pages/restaurant/interfaces/restaurant.ts';

interface RestaurantList {
  data: RestaurantData[];
}
const RestaurantList = ({ data }: RestaurantList) => {
  data.map((item) => console.log(item));
  return <div></div>;
};

export default RestaurantList;

import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const Restaurant = () => {
  const { id } = useParams();

  const getRestaurant = useMutation({
    mutationFn: () => axios.get(`${import.meta.env.VITE_API_URL}/restaurants/${id}?populate=*`,{
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}`,
      },
    }),
    onSuccess: () => console.log('succes'),
    onError: () => console.log('errror'),
  });
  console.log(id);
  return (
    <div className="mx-auto flex max-w-screen-lg justify-center gap-40">
      Restaurant<button onClick={() => getRestaurant.mutate()}>get restaurant</button>
    </div>
  );
};

export default Restaurant;

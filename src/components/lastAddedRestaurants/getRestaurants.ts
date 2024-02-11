import axios from 'axios';


interface ImageData {
  id: number;
  path: string;
  name: string;
  hash: string;
  extension: string;
  main:boolean;
}

interface GalleryItem {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: ImageData[];
  };
}

export const fetchLastAddedRestaurants = async (): Promise<GalleryItem> => {
  const { data } = await axios.get(
    'http://localhost:1337/api/restaurants?populate=*&pagination[page]=1&pagination[pageSize]=1',
    {
      headers: {
        Authorization:
          'Bearer 047d48c6ec7f530dea8f4817a545ad1a5464e3f49ae7f95a78811553f957795fd569873fac234e96210b03b51a7bc78a2e01d50681d6334e23017308708aa55d53470591c94299514ebb34f641910b77bc4c630157906df7636f1a0717fd742123bc7496d26bf0eec0fb60d0002ccda78ad6683184f91f9652fb0aa3b96fd173',
      },
    },
  );
  return data.data[0] || null;
};

import axios from 'axios';

interface ImageData {
  id: number;
  name: string;
  width: number;
  height: number;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  documentId: string;
  publishedAt: string;
}

interface GalleryItem {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  publishedAt: string;
  images: ImageData[];
}

export const fetchLastAddedRestaurants = async (): Promise<GalleryItem> => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/restaurants?populate=images&pagination[page]=1&pagination[pageSize]=2&sort=publishedAt:desc`,
    {
      headers: {
        Authorization: ` 'Bearer ${import.meta.env.VITE_GET_RESTAURANT_TOKEN}'`,
      },
    },
  );
  return data.data[0] || null;
};

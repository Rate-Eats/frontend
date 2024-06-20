import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@shared/utils/getCategories.tsx';

const UseCategories = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    refetchOnWindowFocus: false,
  });

  return {
    categories: data,
    isCategoriesFetching:isFetching,
    categoriesError:error,
  };
};

export default UseCategories;

import { getCategories } from '@shared/utils/getCategories.tsx';
import { useQuery } from '@tanstack/react-query';

const UseCategories = () => {
  const { data, isFetching, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
  });

  return {
    categories: data,
    isCategoriesFetching:isFetching,
    categoriesError:error,
  };
};

export default UseCategories;

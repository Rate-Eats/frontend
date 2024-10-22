import HomepageHeader from '@pages/homepage/components/HomepageHeader.tsx';
import { useQuery } from '@tanstack/react-query';
import { getHomepageData } from '@pages/homepage/utils/getHomepageData.ts';

export const Homepage = () => {
  const { error, data, isFetching } = useQuery({
    queryKey: ['homepageImages'],
    queryFn: () => getHomepageData(),
    refetchOnWindowFocus: false,
  });


  return (
    <div className="flex flex-col items-center">
      <HomepageHeader isFetching={isFetching} data={data} />
    </div>
  );
};
export default Homepage;

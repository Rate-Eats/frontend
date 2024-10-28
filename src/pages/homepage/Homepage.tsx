import LastAddedRestaurants from '@components/lastAddedRestaurants/LastAddedRestaurants.tsx';
import JoinCommunitySection from '@pages/homepage/components/JoinCommunitySection.tsx';
import { getHomepageData } from '@pages/homepage/utils/getHomepageData.ts';
import HomepageHeader from '@pages/homepage/components/HomepageHeader.tsx';
import { useQuery } from '@tanstack/react-query';

export const Homepage = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['homepage'],
    queryFn: () => getHomepageData(),
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col items-center">
      <HomepageHeader isFetching={isFetching} data={data} />
      <LastAddedRestaurants />
      <JoinCommunitySection isFetching={isFetching} data={data} />
    </div>
  );
};
export default Homepage;

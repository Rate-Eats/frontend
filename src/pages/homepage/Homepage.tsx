import JoinCommunitySection from '@pages/homepage/components/JoinCommunitySection.tsx';
import LastAddedRestaurant from '@pages/homepage/components/LastAddedRestaurant.tsx';
import { LastAddedReviews } from '@pages/homepage/components/LastAddedReviews.tsx';
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
      <LastAddedRestaurant />
      <JoinCommunitySection isFetching={isFetching} data={data} />
      <LastAddedReviews />
    </div>
  );
};
export default Homepage;

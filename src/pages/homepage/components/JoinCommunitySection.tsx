import JoinCommunitySectionSkeleton from '@pages/homepage/components/JoinCommunitySectionSkeleton.tsx';
import { HomepageData } from '@pages/homepage/interfaces/homepage.ts';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface JoinCommunitySectionProps {
  isFetching: boolean;
  data?: HomepageData;
}
const JoinCommunitySection = ({ data, isFetching }: JoinCommunitySectionProps) => {
  const navigate = useNavigate();

  if (isFetching) return <JoinCommunitySectionSkeleton />;
  if (!data) return null;

  return (
    <div className="flex w-full justify-center overflow-hidden py-14">
      <div className="mx-8 flex w-full max-w-7xl items-center gap-8">
        <span className="flex-[1.3] text-center text-2xl text-gray-800">{data.homepage_section_2_register_text}</span>
        <div className="flex flex-1 items-center justify-center gap-4">
          <button
            className="h-12 rounded-md bg-blue-500 px-6 py-2 text-white transition hover:bg-blue-600"
            onClick={() => navigate('/register')}
          >
            {data.homepage_section_2_register_join_button}
          </button>
          <button
            className="h-12 rounded-md border border-blue-500 px-6 py-2 text-blue-500 transition hover:bg-blue-500 hover:text-white"
            onClick={() => navigate('/restaurants')}
          >
            {data.homepage_section_2_register_explore_button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCommunitySection;

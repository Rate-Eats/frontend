import { HomepageHeaderSkeleton } from '@pages/homepage/components/HomepageHeaderSkeleton.tsx';
import { HomepageData } from '@pages/homepage/interfaces/homepage.ts';

const baseUploadsUrl = import.meta.env.VITE_BACKEND_URL;

interface HomepageHeaderProps {
  isFetching: boolean;
  data?: HomepageData;
}

export const HomepageHeader = ({ isFetching, data }: HomepageHeaderProps) => {
  if (isFetching) return <HomepageHeaderSkeleton />;
  if (!data) return null;

  return (
    <div className="flex w-full justify-center overflow-hidden bg-white py-20">
      <div className="mx-8 flex w-full max-w-7xl gap-8">
        <div className="flex flex-1 flex-col justify-center">
          <span className="mb-3 text-4xl text-black max-xl:text-2xl">{data.homepage_section_1_header_title}</span>
          <span className="max-xl:text-md text-lg text-gray-600">{data.homepage_section_1_header_subtitle}</span>
        </div>
        <div className="flex flex-[2] gap-8 max-xl:mr-[-100px]">
          <div className="max-h-[440px] min-h-[440px] min-w-[170px] max-w-[170px] overflow-hidden rounded-2xl max-xl:min-w-[150px] max-xl:max-w-[150px]">
            <img
              src={`${baseUploadsUrl}${data.homepage_section_1_left_image.url}`}
              className="h-full w-full object-cover"
              alt={data.homepage_section_1_left_image.name}
            />
          </div>
          <div className="max-h-[440px] min-h-[440px] min-w-[370px] max-w-[370px] overflow-hidden rounded-2xl max-xl:min-w-[350px] max-xl:max-w-[350px]">
            <img
              src={`${baseUploadsUrl}${data.homepage_section_1_middle_image.url}`}
              className="h-full w-full object-cover"
              alt={data.homepage_section_1_middle_image.name}
            />
          </div>
          <div className="max-h-[440px] min-h-[440px] min-w-[220px] max-w-[220px] overflow-hidden rounded-2xl max-xl:min-w-[200px] max-xl:max-w-[200px]">
            <img
              src={`${baseUploadsUrl}${data.homepage_section_1_right_image.url}`}
              className="h-full w-full object-cover"
              alt={data.homepage_section_1_right_image.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomepageHeader;

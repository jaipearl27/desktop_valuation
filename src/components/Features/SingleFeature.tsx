import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;
  return (
    <div className="w-full">
      <div className="wow fadeInUp max-[350px]:text-center" data-wow-delay=".15s">
        <div className="max-[350px]:flex max-[350px]:justify-center max-[350px]:items-center max-[350px]:flex-col">
          <div className="mb-10 flex h-[70px] w-[70px] items-center justify-center rounded-md bg-mainColor bg-opacity-10 text-mainColor">
            {icon}
          </div>
          <h3 className="mb-5 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
            {title}
          </h3>
        </div>
        <p className="pr-[10px] text-base font-medium leading-relaxed text-black">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;

import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <div id="features" className="py-16 md:py-20 lg:py-28 max-[600px]:ml-[22px]">
        <div className="container">
          <SectionTitle
            title="India's most established and extensive repository of real estate data."
            paragraph="Covering Indian cities at four distinct levels and continuously updated and validated over the years."
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuresData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;

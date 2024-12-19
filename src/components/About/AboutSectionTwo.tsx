import Image from "next/image";

const AboutSectionTwo = () => {
  return (
    <div className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <Image
                src="/images/about/about-image-4.jpg"
                alt="about image"
                fill
                className="drop-shadow-three dark:hidden dark:drop-shadow-none"
              />
              <Image
                src="/images/about/about-image-4.jpg"
                alt="about image"
                fill
                className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
              />
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
           <div className="max-[400px]:text-[20px] max-w-[470px] max-[600px]:ml-[20px]">
              <div className="mb-4">
                <h3 className="mb-5 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl max-[400px]:text-[20px]">
                  What is Desktop Valuation?
                </h3>
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Desktop valuation is assessment of property through the machine learning algorithm which is also renowned as an Automated Valuation Model (AVM). 
                </p>
              </div>
              
              <div className="mb-4">
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                 The Valuation is carried out without any physical inspection using the sale comparable of the surrounded property.
                </p>
              </div>
              <div className="mb-4">
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                Based on the input of the information provided by clients, algorithm assesses the property valuation using the primary and secondary data available in the database. 
                </p>
              </div>
              <div id="pricing" className="mb-4">
                <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                 It is set in such a way that it automatically calculates valuation of residential, commercial and industrial property of various categories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSectionTwo;

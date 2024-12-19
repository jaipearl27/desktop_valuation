"use client";
import { useEffect, useMemo, useState } from "react";
import { geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';
import toast from "react-hot-toast";
import MapComponent from "@/components/MapComponent/MapComponent";
import UnitsModal from "@/components/UnitModal";

const PropertyPage = ({ params }) => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [isDraggable, setIsDraggable] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectType, setSelectType] = useState<string | undefined>();

  const handleClose = () => setOpen(false);
  const [fullAddress, setFullAddress] = useState("")

  const questions = useMemo(() => [
    {
      id: 1,
      text: "Is property coordinate correct?",
      choices: [
        {
          value: "Yes, It Is Correct",
          func: () => {
            setSelectType("is_correct")
            setOpen(true);
          },
        },
        {
          value: "Almost Near By",
          func: () => {
            setSelectType("is_nearBy")
            setOpen(true);
          },
        },
        {
          value: "No, It Is Incorrect",
          func: () => {
            setSelectType("is_incorrect")
            toast.error(
              "Kindly place the pointer to the exact property by dragging the pointer.",
            );
            setIsDraggable(true);
          },
        },
      ],
      correctChoice: 0,
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [selectType]);

  const getLatLngFromPlaceId = (placeId: string) => {
    geocodeByPlaceId(placeId)
      .then(results => { 
        setFullAddress(results[0]?.formatted_address)
        return getLatLng(results[0])})
      .then(({ lat, lng }) => {
        if (lat && lng) {
          setLatitude(lat);
          setLongitude(lng);
        }
      })
      .catch((error) => {
        console.error("Error fetching place details:", error);
      });

  };

  useEffect(() => {
    getLatLngFromPlaceId(params.id as string);
  }, [params.id]);



  return (
    <div className="py-16 md:py-20 lg:py-28 mt-[16px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <div
              className="relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
              data-wow-delay=".15s"
            >
              <div className="w-[100%]">
                {latitude && longitude && (
                  <MapComponent
                    initialLatitude={latitude}
                    initialLongitude={longitude}
                    isDraggable={isDraggable}
                    setIsDraggable={setIsDraggable}
                    setOpen={setOpen}
                    mapTypeId=""
                  />
                )}
              </div>
            </div>
          </div>
          <div className="w-full rounded-lg bg-white p-6 px-4 shadow-md lg:w-1/2">
            <div className="m-auto max-w-[470px]">
              <div className="mb-9 rounded-lg ">
                <h3 className="dark:text-white mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl max-[600px]:text-[18px]">
                  PROPERTY ADDRESS AND UNIT DETAIL
                </h3>
                <div className="rounded-lg bg-white p-6 shadow-md">
                  {/* <h6 className="dark:text-white mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                    {city}
                  </h6> */}
                  <p className="text-base leading-relaxed text-gray-600 sm:text-lg sm:leading-relaxed">
                    {fullAddress}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md">
                {questions?.map((question) => (
                  <div key={question.id} className="mb-4">
                    <p className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl">
                      {question.text}
                    </p>
                    <div className="flex flex-col space-y-2">
                      {question.choices.map((choice, index) => (
                        <button
                          key={index}
                          className="rounded-lg bg-gray-200 px-4 py-2 text-base font-medium leading-relaxed text-black transition-colors duration-300 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                          onClick={choice.func}
                        >
                          {choice?.value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {open &&
        <UnitsModal
          open={open}
          handleClose={handleClose}
          latitude={latitude}
          longitude={longitude}
          selectType={selectType}
        />
      }
    </div>
  );
};

export default PropertyPage;

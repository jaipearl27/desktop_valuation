const PricingBox = (props: {
  price: string;
  final_price?: string;
  final_price_with_gst?: number;
  duration: string;
  packageName: string;
  children: React.ReactNode;
  title: string;
  onClick: () => any;
  isActive?: boolean;
}) => {
  const {final_price, final_price_with_gst, price, duration, packageName, children, title, onClick, isActive  } = props;
  const rounded_final_price = final_price ? Math.round(parseFloat(final_price)) : null;
  const rounded_final_price_with_gst = final_price_with_gst ? Math.round(final_price_with_gst) : null;

  return (
    <div className="w-full h-full">
      <div className="relative min-w-[396px] z-10 rounded-sm bg-white px-8 py-10 shadow-xl hover:shadow-2xl h-full mr-[60px] max-[350px]:mr-0 max-[350px]:mb-[20px] max-[550px]:mr-0 max-[550px]:mb-[20px] max-[350px]:mr-0 max-[600px]:mb-[15px] max-[600px]:mr-0">
        <h4 className="flex justify-start mb-2 text-2xl font-bold text-dark capitalize max-[350px]:text-[20px]">
          {packageName}
        </h4>
        <div className="flex flex-col justify-start mt-3 mb-3">
          <h3 className="price mb-2 text-[28px] font-bold text-black max-[350px]:text-[20px]">
            ₹<span className="line-through text-zinc-500">{price}</span>  <span className="amount">{rounded_final_price}</span>
            <span className="time text-sm font-medium text-body-color">
              /{duration}
            </span>
          </h3>
      
          <h6 className="price mb-2 font-bold text-black max-[350px]:text-[20px]" >
            Excluding all taxes
          </h6>

          <h5 className="flex justify-start mb-2 font-bold text-dark capitalize">
            {isActive ? (
              <span className="text-green-500 max-[350px]:text-[20px]">Currently this plan is active</span>
            ) : (
              <>
                {/* Add extra space when the plan is inactive */}
                <div className="h-5"></div>
              </>
            )}
          </h5>
        </div>

        {packageName !== 'Free Plan' && (
          <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 max-[350px]:pb-4">
            <button
              onClick={onClick}
              className="
  `            mt-8 flex w-full items-center justify-center rounded-sm bg-mainColor p-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
              {title}
            </button>
          </div>
        )}
        <div>{children}</div>
        <div className="absolute bottom-0 right-0 z-[-1]">
          <svg
            width="179"
            height="158"
            viewBox="0 0 179 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
              fill="url(#paint0_linear_70:153)"
            />
            <path
              opacity="0.3"
              d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
              fill="url(#paint1_linear_70:153)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_70:153"
                x1="69.6694"
                y1="29.9033"
                x2="196.108"
                y2="83.2919"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#003F32" stopOpacity="0.62" />
                <stop offset="1" stopColor="#003F32" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_70:153"
                x1="165.348"
                y1="-75.4466"
                x2="-3.75136"
                y2="103.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#003F32" stopOpacity="0.62" />
                <stop offset="1" stopColor="#003F32" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PricingBox;

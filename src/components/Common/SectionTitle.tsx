const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph?: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full  mb-[50px] ${center ? "mx-auto text-center" : ""}`}
        style={{ maxWidth: width }}
      >
        <h2 className="text-mainColor mb-[14px] text-3xl font-bold !leading-tight sm:text-4xl  max-[400px]:text-[20px] max-[350px]:mb-[10px]">
          {title}
        </h2>
        <p className="text-base !leading-relaxed text-black md:text-lg max-[350px]:mb-[22px]">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;

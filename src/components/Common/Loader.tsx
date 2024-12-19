import Image from "next/image";

const Loader = () => {
    return (
      <div className="flex items-center justify-center">
        <Image src="/images/loader.gif" height={90} width={90} alt='Loading'/>
      </div>
    );
  };
  
  export default Loader;
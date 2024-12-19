import React from 'react';
import Image from 'next/image';

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Image src="/images/loader.gif" height={90} width={90} alt="Loading" />
    </div>
  );
};

export default FullScreenLoader;

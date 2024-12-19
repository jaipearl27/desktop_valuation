import React from 'react'
import SectionTitle from '../Common/SectionTitle'

const HowItWorks = () => {
  return (
    <div className='py-5'>
      <div className='container'>
        <SectionTitle
          title="How it Works"
          center
          mb="50px"
        />
        <div className="step relative min-h-[1em] text-black">
          <div>
            <div className="circle relative w-[1.5em] h-[1.5em] leading-[1.5em] bg-mainColor text-white text-center rounded-full shadow-[0_0_0_3px_#fff]">1</div>
          </div>
          <div>
            <div className="leading-6 font-bold">Select Location</div>
            <div className="text-sm">Select location of your property by entering society or building name or geo-location or editing the pointer on appropriate location  </div>
          </div>
        </div>
        <div className="step relative min-h-[1em] text-black">
          <div>
            <div className="circle relative w-[1.5em] h-[1.5em] leading-[1.5em] bg-mainColor text-white text-center rounded-full shadow-[0_0_0_3px_#fff]">2</div>
          </div>
          <div>
            <div className="leading-6 font-bold">Fill the property details</div>
            <div className="text-sm">Fill the property details such as land area, unit no. and size and age of the property etc.
            </div>
          </div>
        </div>
        <div className="step relative min-h-[1em] text-black">
          <div>
            <div className="circle relative w-[1.5em] h-[1.5em] leading-[1.5em] bg-mainColor text-white text-center rounded-full shadow-[0_0_0_3px_#fff]">3</div>
          </div>
          <div>
            <div className="leading-6 font-bold">Final Market Value of the Property</div>
            <div className="text-sm">Desktop valuation will be calculated using the sale comparable method by fetching the nearest property value. You can easily generate PDF report. </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default HowItWorks

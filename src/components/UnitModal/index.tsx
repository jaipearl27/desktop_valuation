import { Box, Modal, Radio } from '@mui/material'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const UnitsModal = ({ open, handleClose, longitude, latitude, selectType }) => {
    const router = useRouter()
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    const handleNext = () => {
        if (selectedOption) {
            if (selectedOption === 'apartment') {
                globalThis?.window?.localStorage.setItem("distance", selectType === "is_correct" ? "1000": "1000");
                globalThis?.window?.localStorage.setItem('latitude', latitude)
                globalThis?.window?.localStorage.setItem('longitude', longitude)
                globalThis?.window?.localStorage.setItem("propertyType", "apartment");
                router.push('/apartment');
                } else if (selectedOption === 'villa') {
                globalThis?.window?.localStorage.setItem("distance", selectType === "is_correct" ? "1000": "1000");
                globalThis?.window?.localStorage.setItem('latitude', latitude)
                globalThis?.window?.localStorage.setItem('longitude', longitude)
                globalThis?.window?.localStorage.setItem("propertyType", "villa");
                router.push('/villa');
                } else if (selectedOption === 'land') {
                    globalThis?.window?.localStorage.setItem("distance", selectType === "is_correct" ? "2000": "10000");
                    globalThis?.window?.localStorage.setItem('latitude', latitude)
                globalThis?.window?.localStorage.setItem('longitude', longitude)
                globalThis?.window?.localStorage.setItem("propertyType", "land");
                router.push('/land');
            } else if (selectedOption === 'commercial') {
                globalThis?.window?.localStorage.setItem("distance", selectType === "is_correct" ? "1000": "1000");
                globalThis?.window?.localStorage.setItem('latitude', latitude)
            globalThis?.window?.localStorage.setItem('longitude', longitude)
            globalThis?.window?.localStorage.setItem("propertyType", "commercial");
            router.push('/commercial');
        }
        } else {
            toast.error('Please choose a property type');
        }
    };

    return (
            <Modal
                open={open}
                onClose={handleClose}

            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        // width: '50%',
                        bgcolor: 'background.paper',
                        borderRadius: '6px',
                        boxShadow: 24,
                        p: 6,
                    }}
                    className='max-[600px]:w-80'
                >
                    <p className='text-black mt-3 font-semibold text-2xl font-serif max-[600px]:text-[22px]'>Which One Do You Prefered?</p>
                    <div className='mt-5 mb-5'>
                        <div className='flex w-full' onClick={() => handleOptionChange('apartment')}>
                            <Radio
                                checked={selectedOption === 'apartment'}
                                value="apartment"
                                inputProps={{ 'aria-label': 'Option 1' }}
                            />
                            <label htmlFor="apartment" className='text-black mt-2 font-serif cursor-pointer'>Apartment</label>
                        </div>
                        <div className='flex w-full' onClick={() => handleOptionChange('commercial')}>
                            <Radio
                                checked={selectedOption === 'commercial'}
                                value="commercial"
                                inputProps={{ 'aria-label': 'Option 2' }}
                            />
                            <label htmlFor="commercial" className='text-black mt-2 font-serif cursor-pointer'>Commercial / Office</label>
                        </div>
                        <div className='flex w-full' onClick={() => handleOptionChange('villa')}>
                            <Radio
                                checked={selectedOption === 'villa'}
                                value="villa"
                                inputProps={{ 'aria-label': 'Option 3' }}
                            />
                            <label htmlFor="villa" className='text-black mt-2 font-serif cursor-pointer'>Independent (House / Villa)</label>
                        </div>
                        <div className='flex  w-full' onClick={() => handleOptionChange('land')}>
                            <Radio
                                checked={selectedOption === 'land'}
                                value="land"
                                inputProps={{ 'aria-label': 'Option 4' }}
                            />
                            <label htmlFor="land" className='text-black mt-2 font-serif cursor-pointer'>Land (Agriculture / NA)</label>

                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button onClick={handleNext} className='mt-4 bg-mainColor  rounded-[6px] px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9'>Next</button>
                    </div>
                </Box>
            </Modal>
    )
}

export default UnitsModal

/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function reviewdesign() {
    

    return (
        <>
            <div className='h-full w-full bg-amber-500 min-h-screen'>
                {/* Begin Header Resume */}
                <div className='flex justify-around items-center bg-amber-100 h-80'>
                    
                    <div className='space-y-6'>
                        <p className='font-spartan font-bold text-6xl text-amber-500'>Joana Alfia</p>
                        <p className='font-spartan font-thin text-2xl text-amber-500'>E-Commerce Specialist</p>
                    </div>
                    <div className=''>
                    <img className='w-52 mb-5' src='https://res.cloudinary.com/roket-digital/image/upload/v1655876958/Joana-cover-photo_zb2xd9.png' alt=''/>
                    </div>
                </div>
                {/* End Header Resume */}

                
                <div className='grid md:grid-cols-4 justify-between my-14 space-y-3 mx-5 md:mx-32 h-full space-x-3'>
                    <div className=''>
                <div className='  ' >
                    <div>
                    <p className='bg-amber-50 font-spartan font-bold text-3xl text-amber-500 z-50 relative px-4 rounded-sm'>Personal Info</p>
                    </div>
                    <div>
                    <p className=' text-white font-spartan'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid culpa neque ratione, modi animi voluptate sapiente aspernatur, dignissimos delectus voluptates quibusdam ipsa possimus! Saepe officiis atque dolorem aspernatur ea nemo.</p>
                    </div>
                   
                </div>
              


                    </div>
                    <div className='col-span-3'>
                    <div className='' >
                        <div className='before:bg-amber-50 before:content-["hellow"] before:absolute before:h-10 before:text-transparent before:w-48'>
                        <p className=' font-spartan font-bold text-3xl text-amber-500 z-50 relative px-4 rounded-sm'>Experience</p>
                        </div>
                   
                    <div>
                    <p className='w-[45%] text-white font-spartan'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa, dicta. Quaerat odit, sed reiciendis dolorum adipisci repudiandae ipsam molestias recusandae quam enim sit voluptates nostrum eveniet commodi, ea a animi!</p>
                    </div>
                    
                </div>
                    </div>
                </div>


            </div>
        </>
    )
}

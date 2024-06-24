import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
    return (

        <div className='flex flex-col sm:flex-row gap-2 p-3 border border-green-400 
            justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
            <div className='flex-1 justify-center items-center flex flex-col'>
                <h2 className='text-2xl'>
                    Learn java programming ?
                </h2>
                <p className='text-gray-500 my-2'>
                    Checkout this resources
                </p>
                <Button className='bg-teal-300 text-black w-40 rounded-tl-xl rounded-bl-none'>
                    <a href='https://youtu.be/A74TOX803D0?si=g76NLHfPBflID9cv' target='_blank' rel='noopener noreferrer'>
                        Learn more
                    </a>
                </Button>
            </div>
            <div className='p-7 flex-1'>
                <img
                    src='https://miro.medium.com/v2/resize:fit:1390/0*AAIRzp3_Nc-q0myi.png'
                />
            </div>
        </div>
    )
}

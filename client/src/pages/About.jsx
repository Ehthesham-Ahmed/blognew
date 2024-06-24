import React from 'react'

export default function About() {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <div className='max-w-2xl mx-auto p-3 text-center'>
                <div className=''>
                    <h1 className='text- 3xl font font-semibold'> About SEA's Blog </h1>
                    <div className='text-md text-gray-500 flex flex-col gap-6'>

                        <p>
                            It is my first major project. I used MERN(MongoDB, Express, React, Node.js)
                            to build this project.
                        </p>
                        <p>
                            As a computer science undergraduate student with a deep passion for programming,
                            I find joy in solving complex problems and creating innovative solutions.
                            The thrill of writing code and seeing it come to life drives me to constantly learn and explore new technologies.
                            Whether it's developing software, building applications, or diving into algorithms, programming challenges me and fuels my curiosity.
                            I am excited about the endless possibilities in the tech world and eager to contribute to its advancement.
                        </p>
                        <p> Enjoy blogging </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
    return (
        <Footer container className='border border-t-8 border-teal-500 dark:bg-[rgb(16,23,42)]'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
                    <div className='mt-5'>
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'>
                            {/* <p>
                                .
                            </p> */}
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                                SEA's
                            </span>
                            Blog
                        </Link>
                    </div>
                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                        <div>
                            <Footer.Title title='About' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://www.youtube.com/playlist?list=PL9gnSGHSqcnr_DxHsP7AW9ftq0AtAyYqJ'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    DSA Playlist
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.youtube.com/playlist?list=PLgUwDviBIf0qUlt5H_kiKYaNSqJ81PMMY'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    DP series
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Follow me' />
                            <Footer.LinkGroup col>
                                <Footer.Link
                                    href='https://github.com/Ehthesham-Ahmed'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    Github
                                </Footer.Link>
                                <Footer.Link
                                    href='https://leetcode.com/u/syedehtheshamahmed/'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    LeetCode
                                </Footer.Link>
                                <Footer.Link
                                    href='https://www.linkedin.com/in/syed-ehthesham-ahmed-984160256'
                                    target='_blank'
                                    rel='noopener noreferrer'>
                                    LinkedIn
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                        <div>
                            <Footer.Title title='Legal' />
                            <Footer.LinkGroup col>
                                <Footer.Link href='#'>
                                    Privacy policy
                                </Footer.Link>
                                <Footer.Link href='#'>
                                    Terms & conditions
                                </Footer.Link>
                            </Footer.LinkGroup>
                        </div>
                    </div>
                </div>
                <p>
                    .
                </p>
                <Footer.Divider />
                <div className='w-full sm:flex sm:items-center sm:justify-between'>

                    <Footer.Copyright
                        href='#'
                        by=" SEA's Blog"
                        year={new Date().getFullYear()}
                    />
                    <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                        <Footer.Icon href='#' icon={BsFacebook} />
                        <Footer.Icon href='#' icon={BsInstagram} />
                        <Footer.Icon href='#' icon={BsTwitter} />
                        <Footer.Icon href='#' icon={BsGithub} />
                        <Footer.Icon href='#' icon={BsDribbble} />
                    </div>
                </div>
            </div>
        </Footer>
    );
}

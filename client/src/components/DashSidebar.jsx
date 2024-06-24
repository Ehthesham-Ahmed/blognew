import React from 'react'
import { Sidebar } from "flowbite-react";
import {
    HiAnnotation,
    HiArrowSmRight,
    HiChartPie,
    HiDocumentText,
    HiOutlineUserGroup,
    HiUser
} from "react-icons/hi";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function DashSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup
                    className='flex flex-col gap-1'>
                    {
                        currentUser && currentUser.isAdmin && (
                            <Link to='/dashboard?tab=dash'>
                                <Sidebar.Item
                                    active={tab === 'dash' || !tab}
                                    //icon={HiChartPie}
                                    icon={() => <HiChartPie className="w-6 h-6 dark:text-white" />}
                                    as='div'>

                                    Dashboard
                                </Sidebar.Item>
                            </Link>
                        )
                    }
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={() => <HiUser className="w-6 h-6 dark:text-white" />}
                            label={currentUser.isAdmin ? '[Admin]' : '[User]'}
                            labelColor='dark'
                            as='div'
                            className='my-4'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    {currentUser.isAdmin && (
                        <Link to='/dashboard?tab=posts'>
                            <Sidebar.Item
                                active={tab === 'posts'}
                                icon={() => <HiDocumentText className="w-6 h-6 dark:text-white" />}
                                as='div'
                                className='my-4'
                            >
                                Posts
                            </Sidebar.Item>
                        </Link>
                    )}
                    {currentUser.isAdmin && (
                        <>
                            <Link to='/dashboard?tab=users'>
                                <Sidebar.Item
                                    active={tab === 'users'}
                                    icon={() => <HiOutlineUserGroup className="w-6 h-6 dark:text-white" />}
                                    as='div'
                                    className='my-4'
                                >
                                    Users
                                </Sidebar.Item>
                            </Link>

                            <Link to='/dashboard?tab=comments'>
                                <Sidebar.Item
                                    active={tab === 'comments'}
                                    icon={() => <HiAnnotation className="w-6 h-6 dark:text-white" />}
                                    as='div'
                                    className='my-4'
                                >
                                    Comments
                                </Sidebar.Item>
                            </Link>
                        </>
                    )}
                    <Sidebar.Item
                        icon={() => <HiArrowSmRight className="w-6 h-6 dark:text-white" />}
                        className='cursor-pointer my-4'
                        onClick={handleSignout}
                    //className='my-4'
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

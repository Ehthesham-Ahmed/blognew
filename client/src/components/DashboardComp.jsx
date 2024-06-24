import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
    const [users, setUsers] = useState([]);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0);
    const [lastMonthPosts, setLastMonthPosts] = useState(0);
    const [lastMonthComments, setLastMonthComments] = useState(0);
    const { currentUser } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/user/getusers?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setTotalUsers(data.totalUsers);
                    setLastMonthUsers(data.lastMonthUsers);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/post/getposts?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setPosts(data.posts);
                    setTotalPosts(data.totalPosts);
                    setLastMonthPosts(data.lastMonthPosts);
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        const fetchComments = async () => {
            try {
                const res = await fetch('/api/comment/getcomments?limit=5');
                const data = await res.json();
                if (res.ok) {
                    setComments(data.comments);
                    setTotalComments(data.totalComments);
                    setLastMonthComments(data.lastMonthComments);
                }
            } catch (error) {
                console.log(error.message);
            }

        }
        if (currentUser.isAdmin) {
            fetchUsers();
            fetchPosts();
            fetchComments();
        }
    }, [currentUser])

    return (
        <div className='p-3 md:mx-auto'>
            <div className='flex flex-wrap gap-4 justify-center'>
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                            <p className='text-2xl'> {totalUsers} </p>
                        </div>
                        <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>

                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthUsers}
                        </span>
                        <div className='text-gray-500'>Last Month</div>
                    </div>
                </div>


                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
                            <p className='text-2xl'> {totalComments} </p>
                        </div>
                        <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>

                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthComments}
                        </span>
                        <div className='text-gray-500'>Last Month</div>
                    </div>
                </div>


                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                    <div className='flex justify-between'>
                        <div className=''>
                            <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
                            <p className='text-2xl'> {totalPosts} </p>
                        </div>
                        <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                    </div>

                    <div className='flex gap-2 text-sm'>
                        <span className='text-green-500 flex items-center'>
                            <HiArrowNarrowUp />
                            {lastMonthPosts}
                        </span>
                        <div className='text-gray-500'>Last Month</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Users</h1>
                        {/* <Button>
                            <Link to={'/dashboard?tab=users'}>
                                See all
                            </Link>
                        </Button> */}
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl 
                                        focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 
                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <Link to={'/dashboard?tab=users'}>
                                See all
                            </Link>
                        </button>
                    </div>

                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    User Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                            </tr>
                        </thead>
                        {users && users.map((user) => (
                            <tbody key={user._id} className='divide-y'>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 divide-y">
                                    <td className="px-6 py-4">

                                        <img
                                            src={user.profilePicture}
                                            alt='user'
                                            className='w-10 h-10 object-cover bg-gray-500 mt-2 my-4 rounded-full'
                                        />

                                    </td>
                                    <td className='truncate'>
                                        {user.username}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Comments</h1>
                        {/* <Button>
                            <Link to={'/dashboard?tab=users'}>
                                See all
                            </Link>
                        </Button> */}
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl 
                                        focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 
                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <Link to={'/dashboard?tab=comments'}>
                                See all
                            </Link>
                        </button>
                    </div>

                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Comment
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Likes
                                </th>
                            </tr>
                        </thead>
                        {comments && comments.map((comment) => (
                            <tbody key={comment._id} className='divide-y'>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 divide-y">
                                    <td className="px-6 py-4">
                                        <p className='line-clamp-2'>
                                            {comment.content}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {comment.numberOfLikes}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                <div className='flex flex-col w-full md:w-auto shadow-md p-2'>
                    <div className='flex justify-between p-3 text-sm font-semibold'>
                        <h1 className='text-center p-2'>Recent Posts</h1>

                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl 
                                        focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 
                                        font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            <Link to={'/dashboard?tab=posts'}>
                                See all
                            </Link>
                        </button>
                    </div>

                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Post Image
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Post Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Post Category
                                </th>
                            </tr>
                        </thead>
                        {posts && posts.map((post) => (
                            <tbody key={post._id} className='divide-y'>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 divide-y">
                                    <td className="px-6 py-4">

                                        <img
                                            src={post.image}
                                            alt='user'
                                            className='w-14 h-10 object-cover bg-gray-500 mt-2 my-4 rounded-md'
                                        />

                                    </td>
                                    <td className="px-6 py-4">
                                        {post.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.category}
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

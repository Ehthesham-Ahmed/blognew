import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';



export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState('');

    //console.log(userPosts);
    //console.log(posts.slug);
    //const dateUpdated = userPosts.map((post) => { new Date(post.updatedAt).toLocaleString() })
    //console.log(userPosts.map((post) => (new Date(post.updatedAt).toLocaleDateString())))
    //const dateUpdated = userPosts.map((post) => (new Date(post.updatedAt).toLocaleDateString()));
    // console.log(dateUpdated);
    //<script>
    // window.onload = function() {
    //     const date = userPosts.map((post) => { new Date(post.updatedAt).toLocaleString();
    // }}
    //</script>

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
                const data = await res.json()
                if (res.ok) {
                    setUserPosts(data.posts);
                    if (data.posts.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = userPosts.length;
        try {
            const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUserPosts((prev) => [...prev, ...data.posts]);
                if (data.posts.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeletePost = async () => {

        setShowModal(false);
        try {
            const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
                {
                    method: 'DELETE',
                });

            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdToDelete)
                
                );
}
        } catch (error) {
    console.log(error);
}
    };

return (
    <div className='relative table-auto mx-auto md:mx-auto my-6 overflow-x-auto overflow-y-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && userPosts.length > 0 ? (
            <>
                {/* <Table hoverable className='shadow-md' >
                        <Table.Head>

                            <Table.HeadCell><p className='text-black'>Date Updated</p></Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                    </Table> */}


                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    DATE UPDATED
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    POST IMAGE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    POST TITLE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    CATEGORY
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DELETE
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    EDIT
                                </th>
                                {/* <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th> */}
                            </tr>
                        </thead>
                        {userPosts.map((post) => (
                            <tbody key={post._id}>

                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 divide-y">

                                    {/* <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">


                                        {/* <span>

                                            {userPosts.map((post) => {
                                                { new Date(post.updatedAt).toLocaleString() }
                                            })}
                                        </span> */}
                                    {/* {userPosts.map((post) => (
                                            <Table.Body className='divide-y'>
                                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                                    <Table.Cell>
                                                        {new Date(post.updatedAt).toLocaleDateString()}
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Body>} */}

                                    {/* DATE UPDATED */}
                                    {/* {dateUpdated[1]} */}


                                    {/* {dateUpdated} */}

                                    {/* </th>  */}
                                    <td className="px-6 py-4" >
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                        {/* <Link to={`/post/${post.slug}`}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className='w-20 h-10 object-cover bg-gray-500 mt-2 my-4'
                                                />
                                            </Link> */}

                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/post/${post.slug}`}>
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className='w-20 h-10 object-cover bg-gray-500 mt-2 my-4'
                                            />
                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/post/${post.slug}`} className='font-medium'>
                                            {post.title}

                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/post/${post.slug}`} className='font-medium'>
                                            {post.category}

                                        </Link>
                                    </td>

                                    <td className="px-6 py-4">
                                        <span onClick={() => {
                                            setShowModal(true);
                                            setPostIdToDelete(post._id);
                                        }} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                                            Delete
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <Link to={`/update-post/${post._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <span>
                                                Edit
                                            </span>

                                        </Link>
                                    </td>
                                </tr>

                                {/* {userPosts.map((post) => (
                                    <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        {/* <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            POST IMAGE
                                        </th> */}


                                {/* <td td className="px-6 py-4" >
                                            {/* {new Date(post.updatedAt).toLocaleDateString()} */}
                                {/* <Link to={`/post/${post.slug}`}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className='w-20 h-10 object-cover bg-gray-500 mt-2 my-4'
                                                />
                                            </Link> */}
                                {/* </td>

                                    </tr>
                                ))} */}


                                {/* <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        POST TITLE
                                    </th>

                                    {userPosts.map((post) => (
                                        <td td className="px-6 py-4" >
                                            <Link to={`/post/${post.slug}`} className='font-medium'>
                                                {post.title}

                                            </Link>
                                        </td>
                                    ))}
                                </tr> */}

                                {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        CATEGORY
                                    </th>

                                    {userPosts.map((post) => (
                                        <td class="px-6 py-4">
                                            <Link to={`/post/${post.slug}`} className='font-medium'>
                                                {post.category}

                                            </Link>
                                        </td>
                                    ))}
                                </tr> */}

                                {/* <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        DELETE
                                    </th>

                                    {userPosts.map((post) => (
                                        <td class="px-6 py-4">
                                            <span class="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">Delete</span>
                                        </td>
                                    ))}
                                </tr> */}

                                {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        EDIT
                                    </th>

                                    {userPosts.map((post) => (
                                        <td class="px-6 py-4">
                                            <Link to={`/update-post/${post._id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <span>
                                                    Edit
                                                </span>

                                            </Link>
                                        </td>
                                    ))} */}
                                {/* </tr> */}

                            </tbody>
                        ))}
                    </table>
                </div>
                {
                    showMore && (
                        <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                            Show more
                        </button>
                    )
                }

            </>
        ) : (
            <p>No posts!</p>
        )}
        <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size='md'
        //className='w-50'
        >
            <ModalHeader />
            <ModalBody className=''>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                        Are you sure?
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <Button className='bg-red-700 text-white w-10' color='failure' onClick={handleDeletePost}>
                            Yes
                        </Button>
                        <Button className='w-20' color='gray' onClick={() => setShowModal(false)}>
                            No, cancel
                        </Button>
                    </div>
                    <h1>.</h1>
                </div>
            </ModalBody>
        </Modal>
    </div >
);
}

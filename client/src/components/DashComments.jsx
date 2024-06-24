import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-react';
//import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa'


export default function DashComments() {
    const { currentUser } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [commentIdToDelete, setCommentIdToDelete] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/comment/getcomments`);
                const data = await res.json()
                if (res.ok) {
                    setComments(data.comments);
                    if (data.comments.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error.message)
            }
        };
        if (currentUser.isAdmin) {
            fetchComments();
        }
    }, [currentUser._id])

    const handleShowMore = async () => {
        const startIndex = comments.length;
        try {
            const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setComments((prev) => [...prev, ...data.comments]);
                if (data.comments.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    // const handleDeleteUser = async () => {
    //     setShowModal(false);
    //     try {
    //         const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`,
    //             {
    //                 method: 'DELETE',
    //             });

    //         const data = await res.json();
    //         if (!res.ok) {
    //             console.log(data.message);
    //         } else {
    //             setUserPosts((prev) =>
    //                 prev.filter((post) => post._id !== postIdToDelete)
    //             );
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleDeleteComment = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (res.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='relative table-auto mx-auto md:mx-auto my-6 overflow-x-auto overflow-y-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {currentUser.isAdmin && comments.length > 0 ? (
                <>


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 divide-y">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        DATE
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        COMMENT
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        LIKES
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        POST ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        USER ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        DELETE
                                    </th>

                                    {/* <th scope="col" class="px-6 py-3">
                                        <span class="sr-only">Edit</span>
                                    </th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {comments.map((comment) => (
                                    <tr
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 divide-y"
                                        key={comment._id}>


                                        <td className="px-6 py-4" >
                                            {new Date(comment.updatedAt).toLocaleDateString()}
                                            {/* <Link to={`/post/${post.slug}`}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className='w-20 h-10 object-cover bg-gray-500 mt-2 my-4'
                                                />
                                            </Link> */}

                                        </td>

                                        <td className="px-6 py-4">
                                            {/* <Link to={`/post/${post.slug}`}> */}

                                            {/* </Link> */}
                                            {comment.content}
                                        </td>

                                        <td className="px-6 py-4">
                                            {comment.numberOfLikes}

                                        </td>


                                        <td className="px-6 py-4">
                                            {/* <Link to={`/post/${post.slug}`} className='font-medium'> */}
                                            {comment.postId}

                                            {/* </Link> */}
                                        </td>

                                        <td className="px-6 py-4">
                                            {comment.userId}

                                        </td>


                                        <td className="px-6 py-4">
                                            <span onClick={() => {
                                                setShowModal(true);
                                                setCommentIdToDelete(comment._id);
                                            }} className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer">
                                                Delete
                                            </span>
                                        </td>

                                        {/* <td className="px-6 py-4">
                                            <Link to={`/update-post/${post._id}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                <span>
                                                    Edit
                                                </span>

                                            </Link>
                                        </td> */}
                                    </tr>
                                ))}
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




                            </tbody>
                        </table>
                    </div>
                    {
                        showMore && (
                            <button
                                onClick={handleShowMore}
                                className='w-full text-teal-500 self-center text-sm py-7'>
                                Show more
                            </button>
                        )
                    }

                </>
            ) : (
                <p>No comments!</p>
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
                            Are you sure, delete this comment?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button
                                className='bg-red-700 text-white w-10'
                                color='failure'
                                onClick={handleDeleteComment}>
                                Yes
                            </Button>
                            <Button
                                className='w-20'
                                color='gray'
                                onClick={() => setShowModal(false)}>
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

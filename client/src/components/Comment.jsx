import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { FaCheck, FaThumbsUp, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react';

export default function Comment({ comment, onLike, onEdit, onDelete }) {
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const { currentUser } = useSelector((state) => state.user);
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser();
    }, [comment])

    const handleEdit = () => {
        setIsEditing(true);
        setEditedContent(comment.content)
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/comment/editComment/${comment._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: editedContent
                })
            });
            if (res.ok) {
                setIsEditing(false);
                onEdit(comment, editedContent);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex p-4 border-b dark:border-gray-600 text-sm'>
            <div className='flex-shrink-0 mr-3'>
                <img
                    className='w-10 h-10 rounded-full bg-gray-200 border border-black'
                    src={user.profilePicture}
                    alt={user.username} />
            </div>
            <div className='flex-1'>
                <div className='flex items-center mb-1'>
                    <span className='font-bold mr-1 text-xs truncate'> {user ? `@${user.username}` : 'anonymus user'} </span>

                    <span className='text-gray-500 text-sm'> {moment(comment.createdAt).fromNow()} </span>
                </div>
                {isEditing ? (
                    <>
                        <Textarea
                            className='mb-2'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                            <Button
                                type='button'
                                size='sm'
                                className='text-green-500 '
                                onClick={handleSave}
                            >
                                <FaCheck />
                            </Button>
                            <Button
                                type='button'
                                size='sm'
                                className='text-red-500'
                                onClick={() => setIsEditing(false)}
                            >
                                <FaTimes />
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-500 pb-2'> {comment.content} </p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2'>
                            <button
                                onClick={() => onLike(comment._id)}
                                type='button'
                                className={`text-gray-400 hover:text-indigo-400 
                        ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-600'}`}>
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400'>
                                {
                                    comment.numberOfLikes > 0 && "likes: " + comment.numberOfLikes
                                }
                            </p>
                            {
                                currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                    <>
                                        <button
                                            onClick={handleEdit}
                                            type='button'
                                            className='text-gray-400 hover:text-blue-400'>
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(comment._id)}
                                            type='button'
                                            className='text-gray-400 hover:text-blue-400'>
                                            Delete
                                        </button>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

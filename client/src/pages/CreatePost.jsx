import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
//import 'react-circular-progressbar/dist/style.css';

export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Img upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Img upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/post/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message)
                return;
            }
            // if (data.message === false) {
            //     setPublishError(data.message);
            //     return;
            // }
            if (res.ok) {
                setPublishError(null);
                navigate(`/post/${data.slug}`);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };


    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>
                Create a post
            </h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row justify-between gap-3'>
                    <TextInput
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        style={{ backgroundColor: 'black', color: 'white' }}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }

                    />
                    <Select
                        onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                        }
                    >
                        <option value="uncategorized">
                            Select a category
                        </option>
                        <option value="general">General</option>
                        <option value="science">Science</option>
                        <option value="finance">Finance</option>
                        <option value="tech">Tech</option>
                        <option value="other">Other</option>
                        {/* <option value="javascript">JS</option>
                        <option value="reactjs">:)</option>
                        <option value="nextjs">hiii</option> */}
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 
                border-teal-500 border-dotted p-3'>
                    <FileInput
                        type='file'
                        accept='image/*'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type='button'
                        className='bg-teal-500 w-40 h-10 px-2 py-2'
                        size='sm'
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <div className='w-16 h-16'>
                                <CircularProgressbar
                                    value={imageUploadProgress}
                                    text={`${imageUploadProgress || 0}%`}
                                />
                            </div>
                        ) : (
                            'Upload Image'
                        )}
                    </Button>
                </div>
                {
                    imageUploadError && <Alert className='text-red-500'>
                        {imageUploadError}
                    </Alert>
                }

                {
                    formData.image && (
                        <img
                            src={formData.image}
                            alt='upload'
                            className='w-full h-72 object-cover'
                        />
                    )
                }

                <ReactQuill
                    theme='snow'
                    placeholder='Write...'
                    className='h-72 mb-14'
                    required
                    onChange={(value) => {
                        setFormData({ ...formData, content: value });
                    }}
                />

                <Button
                    type='submit'
                    className='bg-green-700'>
                    Publish
                </Button>

                {
                    publishError && <Alert className='text-red-500 mt-5' color='failure'> {publishError} </Alert>
                }
            </form>
        </div>
    )
}

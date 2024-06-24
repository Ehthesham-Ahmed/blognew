import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle, AiFillGooglePlusCircle, AiFillGoogleSquare } from 'react-icons/ai'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
            })
            const data = await res.json()
            // console.log(data);
            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/')
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button className='w-25 h-10 bg-green-500 rounded-lg mt-2 items-center justify-center'
            type='button' onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2 mt-2' />
            <h4 className='mt-2'>Continue with Google</h4>
        </Button>
    )
}

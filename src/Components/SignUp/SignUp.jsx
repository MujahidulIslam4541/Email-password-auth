import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import auth from '../FIrebase/Firebase';

export default function SignUp() {

    const [errorMessage, setErrorMessage] = useState('')


    const handleSignUp = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        console.log(email, password)

        // reseat error message
        setErrorMessage('')

        // create a email password authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.log('ERROR', error)
                setErrorMessage(error.message)
            })
    }


    return (

        <div>
            <h2 className="text-2xl text-center font-bold text-white mt-8">Sign Up Now!</h2>
            <div className='flex justify-center '>

                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        {

                            errorMessage && <p className='text-red-500'>{errorMessage}</p>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

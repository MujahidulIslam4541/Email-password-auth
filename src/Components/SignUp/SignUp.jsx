import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import React, { useState } from 'react'
import auth from '../FIrebase/Firebase';
import { FaEye } from "react-icons/fa";
import { BsEyeSlash } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function SignUp() {

    const [errorMessage, setErrorMessage] = useState('')

    const [success, setSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSignUp = (event) => {
        event.preventDefault()
        const email = event.target.email.value;
        const password = event.target.password.value;
        const terms=event.target.terms.checked;
        console.log(email, password,terms)

        // reseat error message
        setErrorMessage('')
        setSuccess(false);

        //checked our terms and condition
        if(!terms){
            setErrorMessage('Please Accept Our Terms And Condition');
            return;
        } 


        // password should be 6 character
        if (password.length < 6) {
            setErrorMessage('Password Should be at last 6 Character or larger');
            return;
        }

        // check password Validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setErrorMessage('At List one Uppercase,one LowerCase,one Number and one Spacial character');
            return;
        }

        // create a email password authentication
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess(true)

                // email Verification sent
                sendEmailVerification(auth.currentUser)
                .then(()=>{
                    console.log('email verification success')
                })
            })


            .catch(error => {
                console.log('ERROR', error)
                setErrorMessage(error.message)
                setSuccess(false)
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
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>

                            <input type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder="password" className="input input-bordered" required />

                            <button
                                onClick={() => setShowPassword(!showPassword)}
                                className='btn btn-xs absolute right-2 top-12'>
                                {showPassword ? <BsEyeSlash></BsEyeSlash> : <FaEye></FaEye>}
                            </button>

                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>

                            <div className="form-control">
                                <label className="label cursor-pointer justify-start gap-2">
                                    <input type="checkbox" name='terms' className="checkbox" />
                                    <span className="label-text">Accept Out Trumps And Condition</span>

                                </label>
                            </div>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                        {

                            errorMessage && <p className='text-red-500'>{errorMessage}</p>
                        }

                        {
                            success && <p className='text-green-400'>Sign Up successful</p>
                        }

                        <p>Already have an Account? PLease <Link className='text-blue-500' to='/login'>Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

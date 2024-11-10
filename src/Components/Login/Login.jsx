import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react'
import auth from '../FIrebase/Firebase';
import { Link } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef()

  const [success, setSuccess] = useState(false)
  const [loginError, setLoginError] = useState('')

  const handleLogin = e => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password)

    // default value
    setSuccess(false)
    setLoginError('')

    // create a signIn method
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user)

        if (!result.user.emailVerified) {
          setLoginError('Please Verified your email');
        }
        else {
          setSuccess(true)
        }

      })
      .catch(error => {
        console.log('ERROR', error)
        setLoginError(error.message)
      })
  }

  // forget password manage
  const handleForgetPassword = () => {
    console.log('get me your email address', emailRef.current.value);
    const email = emailRef.current.value;
    if (!email) {
      console.log('Please Provide your email Address')
    }
    else {
      sendPasswordResetEmail(auth, email)
      .then(()=>{
        alert('Password resat email please check your email')
      })
    
    }
  }
  return (
    <div>
      <h2 className='text-2xl'>Login</h2>
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleLogin} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' ref={emailRef} placeholder="email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
            <label onClick={handleForgetPassword} className="label">
              <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Login</button>
          </div>
          {
            success && <p className='text-green-500'>Login successful</p>
          }
          {
            loginError && <p className='text-red-500'>{loginError}</p>
          }

          <p>New This Website Please <Link to='/signUp' className='text-blue-500'>Sign Up</Link></p>
        </form>
      </div>

    </div >
  )
}

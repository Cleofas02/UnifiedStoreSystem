import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/config'
import { Link } from 'react-router-dom'
import Logo from "../image/school.png"

export const Singup = (props) => {

    // defining state
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    // signup
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('SignedUpUsersData').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            }).then(() => {
                setName('');
                setEmail('');
                setPassword('');
                setError('');
                window.alert("An account has been created! Please continue to log in.")
                navigate('/login')
            }).catch(err => setError(err.message));
        }).catch(err => setError(err.message));

    }


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 m-auto" >
            <div className='mt-22'>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto " src={Logo} width={110} height={110} alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create Your Account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" autoComplete='off' onSubmit={signup} >
                        <div>
                            <label htmlFor="Name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
                            <div className="mt-2">
                                <input id="text" name="text" type="text" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setName(e.target.value)} value={name} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setEmail(e.target.value)} value={email} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            </div>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                        </div>
                        <div >
                            <button type="submit" className=" mb-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">SUBMIT</button>
                        </div>
                    </form>
                    {error && <span className=' text-rose-500' >{error}</span>}
                    <br />
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Login Here</Link>
                    </p>
                </div>


            </div>
        </div>
    )
}

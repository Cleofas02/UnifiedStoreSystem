import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import Logo from '../image/school.png'
import { auth } from '../config/config'
import { CartContext } from '../global/CartContext'


export const Navbar = ({ user }) => {

    const { totalQty } = useContext(CartContext);
    const navigate = useNavigate();
    const logout = () => {
        auth.signOut().then(() => {
            navigate('/login')
        })
    }

    return (
        <div className='flex justify-between items-center p-2  font-Pop '>
            <div className='flex items-center ml-4 '>
                <Link to="/">
                    <img src={Logo} height={100} width={100} alt='school-logo' className='mr-1' />
                </Link>
                <Link to='/'>
                    <p className='font-bold tracking-wider text-3xl sm:block hidden ml-2'>San Mateo Senior High School<br></br><p className='font-bold tracking-wider text-xl sm:block hidden ml-3'>-Canteen Unfied Store System</p> </p>
                </Link>
            </div>
            {!user && <div className='mr-5 lg:mr-4: xl:text-mr-3:  sm:m:  '>
                <Link to='signup' ><button className=" text-white bg-blue-700 hover:bg-blue-800  font-bold rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600  focus:outline-none    tracking-wide sm:mr-3   ">Sign Up</button></Link>
                <Link to='login'  ><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  tracking-wide ">Log in</button></Link>
            </div>}
            {user && <div className='flex justify-center items-center '>
                <Link to='/' className=' text-2xl font-bold tracking-wider mr-6 ' >{user}</Link>
                <Link to='/cartproducts' ><FontAwesomeIcon icon={faCartShopping} className='text-2xl  ' /></Link>
                <span className='mr-6 mb-12 rounded-full bg-red-700 text-slate-50 font-Pop w-6 text-center'>{totalQty}</span>
                <button className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  tracking-wide " onClick={logout}>Log Out</button>
            </div>}
        </div>
    )
}

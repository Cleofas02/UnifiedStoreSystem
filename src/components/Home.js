import React, { useEffect } from 'react'
import { Navbar } from './Navbar'
import { Products } from './Products'
import { auth } from '../config/config'
import { useNavigate } from 'react-router-dom'




export const Home = ({ user }) => {

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login')
            }
        })

    })

    return (
        <div className='wrapper bg-slate-150 '>
            <Navbar user={user} />
            <Products />
        </div>
    )
}

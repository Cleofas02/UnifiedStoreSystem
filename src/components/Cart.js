import React, { useContext, useEffect } from 'react'
import { CartContext } from '../global/CartContext'
import { Navbar } from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth } from '../config/config'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export const Cart = ({ user }) => {
    const { shoppingCart, dispatch, totalPrice, totalQty } = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                navigate('/login')
            }
        })

    })
    return (
        <>
            <Navbar user={user} />
            <>
                {shoppingCart.length !== 0 && <h1 className='text-center p-3  font-Pop font-bold tracking-wider text-3xl  '>Cart</h1>}
                <div className='cart-container'>
                    {
                        shoppingCart.length === 0 && <>
                            <div>no items in your cart or slow internet causing trouble (Refresh the page) or you are not logged in</div>
                            <div><Link to="/" className='text-blue-600'>Return to Home page</Link></div>
                        </>
                    }
                    {shoppingCart && shoppingCart.map(cart => (
                        <div className='cart-card' key={cart.ProductID}>

                            <div className='cart-img'>
                                <img src={cart.ProductImg} alt="not found" />
                            </div>

                            <div className='cart-name'>{cart.ProductName}</div>

                            <div className='cart-price-orignal'>₱ {cart.ProductPrice}.00</div>

                            <div className='inc' onClick={() => dispatch({ type: 'INC', id: cart.ProductID, cart })}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>

                            <div className='quantity'>{cart.qty}</div>

                            <div className='dec' onClick={() => dispatch({ type: 'DEC', id: cart.ProductID, cart })}>
                                <FontAwesomeIcon icon={faMinus} />
                            </div>

                            <div className='cart-price'>
                                ₱ {cart.TotalProductPrice}.00
                            </div>

                            <button className='delete-btn' onClick={() => dispatch({ type: 'DELETE', id: cart.ProductID, cart })}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))
                    }
                    {shoppingCart.length > 0 && <div className='cart-summary'>
                        <div className='cart-summary-heading'>
                            Cart-Summary
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Price : </span>
                            <span>₱ {totalPrice}.00</span>
                        </div>
                        <div className='cart-summary-price'>
                            <span>Total Qty :</span>
                            <span>{totalQty}</span>
                        </div>
                        <Link to='/cashout' className='cashout-link'>
                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 " style={{ marginTop: 5 + 'px' }}>
                                Check Out
                            </button>
                        </Link>
                    </div>}
                </div>
            </>
        </>
    )
}

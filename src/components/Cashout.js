import React, { useState, useEffect, useContext } from 'react'
import { auth, db } from '../config/config'
import { CartContext } from '../global/CartContext'
import { Navbar } from './Navbar'
import { useNavigate } from 'react-router-dom'

export const Cashout = (props) => {

    const navigate = useNavigate();

    const { shoppingCart, totalPrice, totalQty, dispatch } = useContext(CartContext);

    // defining state
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [section, setSection] = useState('');
    const [item, setItem] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);


    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('SignedUpUsersData').doc(user.uid).onSnapshot(snapshot => {
                    setName(snapshot.data().Name);
                    setEmail(snapshot.data().Email);
                })
            }
            else {
                navigate('/login')
            }
        })
    })


    const cashoutSubmit = (e) => {
        e.preventDefault();
        if (!termsAgreed) {
            setError('You must agree to the terms and policy to submit the form.');
            return;
        }

        auth.onAuthStateChanged(user => {
            if (user) {
                const date = new Date();
                const time = date.getTime();
                db.collection('Buyer-info ' + user.uid).doc('_' + time).set({
                    BuyerName: name,
                    BuyerEmail: email,
                    BuyerCell: cell,
                    BuyerSection: section,
                    BuyerItem: item,
                    BuyerPayment: totalPrice,
                    BuyerQuantity: totalQty,
                    BuyerBuyDate: date,
                    BuyerOrderConfirmation: confirm
                }).then(() => {
                    setCell('');
                    setConfirm('');
                    setSection('');
                    setItem('');
                    dispatch({ type: 'EMPTY' })
                    setSuccessMsg('Your order has been successfully placed. You can now proceed to the canteen and wait for your name or email to be called. After ten seconds, you will be redirected to the home page.');
                    setTimeout(() => {
                        navigate('/')
                    }, 10000)
                }).catch(err => setError(err.message))
            }
        })
    }



    return (
        <>
            <Navbar user={props.user} />
            <div>
                <br />
                <h2 className='text-center p-3  font-Pop font-bold tracking-wider text-3xl  '>Checkout Details</h2>
                <br />
                {successMsg && <div className='text-green-600 text-center p-3  font-Pop font-bold tracking-wider text-lg  '>{successMsg}</div>}
                <form className="max-w-md mx-auto" autoComplete='off' onSubmit={cashoutSubmit}>

                    <div>
                        <label htmlFor="name" className=" mt-16 block mb-2 text-sm font-medium text-gray-900 ">Name :</label>
                        <input type="text" required className="mb-4 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={name} disabled />
                    </div>
                    <div>
                        <label htmlFor="emailt" className="block mb-2 text-sm font-medium text-gray-900 ">Email :</label>
                        <input type="email" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={email} disabled />
                    </div>
                    <div>
                        <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 ">Date Today :</label>
                        <input type="date" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={date} onChange={(e) => setDate(e.target.value)} disabled />
                    </div>
                    <div>
                        <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 ">Grade & Section :</label>
                        <input type="text" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setSection(e.target.value)} value={section} placeholder='12-COMPROG' />
                    </div>
                    <div>
                        <label htmlFor="section" className="block mb-2 text-sm font-medium text-gray-900 ">Order Confirmation :</label>
                        <input type="text" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setConfirm(e.target.value)} value={confirm} placeholder='1 - Water 2 - Brownies ' />
                    </div>

                    <div>
                        <label htmlFor="Price to Pay" className="block mb-2 text-sm font-medium text-gray-900 ">Price to Pay :</label>
                        <input type="number" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={totalPrice} disabled />
                    </div>
                    <div>
                        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 ">Total No of Products</label>
                        <input type="number" required className="block w-full mb-4 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={totalQty} disabled />
                    </div>
                    <br />
                    <div>
                        <label htmlFor="termsAgreement" className="block mb-2 text-sm font-medium text-gray-900">Screen shot the Form:</label>
                        <div className="flex items-center">
                            <input type="radio" id="termsAgreementYes" name="termsAgreement" value="yes" required
                                checked={termsAgreed} onChange={() => setTermsAgreed(true)}
                                className="mr-2" />
                            <label htmlFor="termsAgreementYes" className="text-sm text-gray-700">I agree to take a screenshot of the form as my receipt.</label>
                        </div>
                    </div>

                    <br />


                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">SUBMIT</button>

                </form>

                {error && <div>{error}</div>}

            </div>
        </>
    )
}
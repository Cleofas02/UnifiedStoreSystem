import React, { useContext } from 'react'
import { ProductsContext } from '../global/ProductsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../global/CartContext';
import { Link } from 'react-router-dom';


export const Products = () => {

    const { products } = useContext(ProductsContext);
    //console.log(products)

    //const data = useContext(CartContext);
    //console.log(data);

    const { dispatch } = useContext(CartContext);






    return (
        <>
            {products.length !== 0 && <h1 className='text-center p-3  font-Pop font-bold tracking-wider text-3xl  '>Products</h1>}
            <div className='flex justify-center items-center p- flex-wrap w-auto'>
                {products.length === 0 && <div>slow internet...no products to display</div>}
                {products.map(product => (
                    <div className='w-80 h-auto	 m-5 flex flex-col justify-start items-start text-sm text-center font-Pop font-bold relative    shadow-lg shadow-slate-600/50 rounded-b-lg  ' key={product.ProductID}>


                        <div className="h-80 w-full ">
                            <img src={product.ProductImg} alt="not found" className='w-full h-80' />
                        </div>
                        <div className='block w-full mt-1 text-sky-600 font-Pop text-lg font-bolder tracking-wide'>
                            {product.ProductName}
                        </div>
                        <div className='w-full mt-1 mb-1 text-base  tracking-wide'>
                            ₱ {product.ProductPrice}.00
                        </div>
                        <button className=" w-full p-3 mt-1  text-white bg-blue-700 hover:bg-blue-800   font-semibold	 rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none  " onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}><FontAwesomeIcon icon={faCartShopping} className='text-sm text-center  mr-2  ' />ADD TO CART</button>
                    </div>
                ))}
            </div >
        </>
    )
}

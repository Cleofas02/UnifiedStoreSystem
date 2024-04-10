import React, { useState } from 'react'
import { storage, db } from '../config/config';

export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState('');

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }


    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection("Products").add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductImg: url
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
    }



    return (
        <div className='h-screen bg-slate-900 flex flex-col justify-center items-center' >
            <h1 className='text-slate-50 font-Pop text-xl'>ADD PRODUCTS</h1>
            <br />
            <form autoComplete='off' className=' flex flex-col justify-center ' onSubmit={addProduct}>
                <label htmlFor="product-name" className="text-slate-50 font-Pop ">Product Name</label>

                <input type='text' required className=' p-1  mb-2'
                    onChange={(e) => setProductName(e.target.value)} value={productName} />

                <label htmlFor="product-name" className='text-slate-50 font-Pop '>Product Price</label>

                <input type='number' required className='p-1 mt-1'
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />

                <input type='file' required className='text-slate-50 mt-4' onChange={productImgHandler} id='file' />
                <br />
                <button className=" border w-20 h-9 mt-2 text-slate-50 font-Pop m-auto">ADD</button>
            </form>
            {error && <span className='text-slate-50 font-Pop mt-5'>{error}</span>}

        </div>
    )
}

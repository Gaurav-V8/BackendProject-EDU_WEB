import React, { useContext, useState } from 'react'
import { CartContext } from './CartContext';
import HeaderTwo from '../Common/HeaderTwo';
import { useEffect } from 'react';
import axios from 'axios';

export default function Cart() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const [promoCode, setPromoCode] = useState('');
    const [total, setTotal] = useState(0);
    const [discount, setDiscount] = useState(0);


    useEffect(() => {
        let tot = 0
        for (let items of cartItems) {
            tot += (items.price * items.quantity);
            setTotal(tot);
        }

    }, [cartItems]);
    const handleApplyPromo = () => {
        if (promoCode === 'Suresh') {
            setDiscount(total * 0.2); // 20% discount
        } else {
            setDiscount(0);
        }
    };
    const handleRemoveItem = (itemIndex) => {
        const newCartItems = cartItems.filter((item, index) => index !== itemIndex);
        setCartItems(newCartItems);
        alert('Course remome from Cart');
    };
    const handleQuantityChange = (itemIndex, quantityChange) => {
        const newCartItems = cartItems.map((item, index) => {
            if (index === itemIndex) {
                const newQuantity = item.quantity + quantityChange;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        });
        setCartItems(newCartItems);
    };
    const handlwBuyCourse = async(e)=>{
        const courseDetails = cartItems.filter((item) => item._id === e.target.value);
        try {
              const response = await axios.post('http://localhost:5200/payment/req-payment', {
                data: {
                  items: JSON.stringify(courseDetails)
                },
                headers: {}
              });
              console.log(response);
            } catch (error) {
              console.log(error)
        
            }
    }

    return (
        <>
            <HeaderTwo />
            <div className="bg-gray-100">
                <div class="container mx-auto mt-10">
                    <div class="flex shadow-md my-10">
                        <div class="w-3/4 bg-white px-10 py-10">
                            <div class="flex justify-between border-b pb-8">
                                <h1 class="font-semibold text-2xl">Shopping Cart</h1>
                                <h2 class="font-semibold text-2xl">Total Items: {cartItems.reduce((acc, item) => acc + item.quantity, 0)}</h2>
                            </div>
                            <div class="flex mt-10 mb-5">
                                <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Quantity</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">Price</h3>
                                <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
                            </div>
                            {
                                cartItems.map((item, index) => {
                                    return (
                                        <CartRow item={item} index={index} handleRemoveItem={handleRemoveItem} handleQuantityChange={handleQuantityChange} />
                                    )
                                })
                            }

                            <a href="/courses" class="flex font-semibold text-indigo-600 text-sm mt-10">
                                <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                                Buy More Course
                            </a>
                        </div>

                        <div id="summary" class="w-1/4 px-8 py-10">
                            <h1 class="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                            <div class="flex justify-between mt-10 mb-5">
                                <span class="font-semibold text-sm">Total Amount = Rs {total} /-</span>
                            </div>
                            <div>
                                <label class="font-medium inline-block mb-3 text-sm uppercase">GST</label>
                                <select class="block p-2 text-gray-600 w-full text-sm">
                                    <option>Standard Tax - Rs {total * 10 / 100} /-</option>
                                </select>
                            </div>
                            <div class="py-10">
                                <label for="promo" class="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
                                <input type="text" id="promo" value={promoCode} placeholder="Enter your code = Suresh" class="p-2 text-sm w-full" onChange={(e) => setPromoCode(e.target.value)} />
                                <button class="bg-red-500 hover:bg-red-600 px-5 py-3 m-1 rounded-sm text-sm text-white uppercase" onClick={handleApplyPromo}>Apply</button>
                            </div>
                            <div class="border-t mt-8">
                                <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                                    <span>Total cost</span>
                                    <span>Rs {(total - discount) + (total * 10 / 100)} /-</span>
                                </div>
                                <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full" onClick={handlwBuyCourse}>Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};

function CartRow({ item, index, handleRemoveItem, handleQuantityChange }) {
    return (
        <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
            <div class="flex w-2/5">
                <div class="w-20">
                    <img class="h-24" src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z" alt="" />
                </div>
                <div class="flex flex-col justify-between ml-4 flex-grow">
                    <span class="font-bold text-sm">Course</span>
                    <span class="text-red-500 text-xs">{item.name}</span>
                    <a href="#" class="font-semibold hover:text-red-500 text-gray-500 text-xs" onClick={() => handleRemoveItem(index)}>Remove</a>
                </div>
            </div>
            <div class="flex justify-center w-1/5">
                <button class="bg-gray-300 hover:bg-gray-400 text-gray-600 py-2 px-4 rounded-l" onClick={() => handleQuantityChange(index, -1)}>-</button>
                <input type="number" value={item.quantity} class="w-8 text-center" />
                <button class="bg-gray-300 hover:bg-gray-400 text-gray-600 py-2 px-4 rounded-r" onClick={() => handleQuantityChange(index, 1)}>+</button>
            </div>
            <span class="text-center w-1/5 font-semibold text-sm">{item.price
            }</span>
            <span class="text-center w-1/5 font-semibold text-sm">{(item.price) * (item.quantity)
            }</span>
        </div>
    )
};

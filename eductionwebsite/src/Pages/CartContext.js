import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = (itemId) => {
        setCartItems(cartItems.filter((item) => item._id !== itemId));
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addItemToCart, removeItemFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, CartContext };
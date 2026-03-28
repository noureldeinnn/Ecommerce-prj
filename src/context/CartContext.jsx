import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/products";
const CartContext = createContext(null);

export default function CartProvider({ children }) {
    const [cart, setCart] = useState([]);//list of product ids and quantity.

    const addToCart = (productId) => {
        const existing = cart.find((item) => item.id === productId);
        if (existing) {
            const cartQuantity = existing.quantity;
            const updatedCartItem = cart.map((item) => item.id === productId ? { id: productId, quantity: item.quantity + 1 } : item)
            setCart(updatedCartItem);
        } else {
            setCart([...cart, { id: productId, quantity: 1 }]);
        }
    };
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };
    const clearCart = () => {
        setCart([]);
    };

    function getCartItems() {
        return cart.map((item) => ({
            ...item,
            product: getProductById(item.id)

        }));
    }
    const getQuantity = (productId) => {
        const item = cart.find((i) => i.id === productId);
        return item ? item.quantity : 0;
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            setCart((prevCart) => prevCart.map((item) => item.id === productId ? { id: productId, quantity } : item));
        }
    };
    function getCartTotal() {
        return cart.reduce((total, item) => {
            const product = getProductById(item.id);
            return total + (product ? product.price * item.quantity : 0);
        }, 0);
    }
    return <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartItems, getQuantity, updateQuantity, getCartTotal }}>
        {children}
    </CartContext.Provider>
}

export function useCart() {
    return useContext(CartContext);
}


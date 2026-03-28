import { useCart } from "../context/CartContext";

export default function Checkout() {
    const { getCartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const cartItems = getCartItems();
    return <div>
        <div className="page">
            <div className="container">
                <h1 className="page-title">Checkout</h1>
                <div className="checkout-container">
                    <div className="checkout-items">
                        <h2 className="checkout-items-title">Order Summary</h2>
                        {cartItems.map((item) => (
                            item.product && (
                                <div key={item.id} className="checkout-item">
                                    <img src={item.product.image} alt={item.product.name} className="checkout-item-image" />
                                    <div className="checkout-item-info">
                                        <h3 className="checkout-item-name">{item.product.name}</h3>
                                        <p className="checkout-item-price">${item.product.price}</p>

                                    </div>
                                    <p className="checkout-item-total">Total: ${(item.product.price * item.quantity).toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <p className="checkout-item-quantity">{item.quantity}</p>
                                        <button className="quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>

                                    </div>
                                    <button className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>Remove</button>
                                </div>

                            )
                        ))}
                    </div>

                    <div className="checkout-summary">
                        <p className="checkout-total">Total: ${getCartTotal().toFixed(2)}</p>
                        <div className="checkout-actions">
                            <button className="btn btn-primary">Checkout</button>
                            <button className="btn btn-secondary" onClick={clearCart}>Clear Cart</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
}
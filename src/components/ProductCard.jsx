import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";


export default function ProductCard({ products }) {
    const { addToCart, getQuantity } = useCart();
    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-card-content">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-price">${product.price}</p>
                        <div className="product-card-actions">
                            <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
                                Add to Cart {getQuantity(product.id) > 0 && `(${getQuantity(product.id)})`}
                            </button>
                            <Link to={`/products/${product.id}`} className="btn btn-secondary">View Product</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

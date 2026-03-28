import { Link } from "react-router-dom";

export default function ProductCard({ products }) {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-card-content">
                        <h3 className="product-card-name">{product.name}</h3>
                        <p className="product-card-price">${product.price}</p>
                        <div className="product-card-actions">
                            <button className="btn btn-primary">Add to Cart</button>
                            <Link to={`/product/${product.id}`} className="btn btn-secondary">View Product</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

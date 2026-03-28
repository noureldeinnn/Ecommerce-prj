import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getProductById } from "../data/products"
import { useCart } from "../context/CartContext"


export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, getQuantity } = useCart();
    const [product, setProduct] = useState(null);

    useEffect(() => {

        const foundProduct = getProductById(id);
        if (!foundProduct) {
            navigate("/");
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setProduct(foundProduct);
    }, [id, navigate])
    if (!product) return null; // Or return a loading spinner <div>Loading...</div>
    return <div>
        <div className="page">
            <div className="container">
                <div className="product-detail">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-info">
                        <h1 className="product-detail-title">{product.name}</h1>
                        <p className="product-detail-price">${product.price}</p>
                        <p className="product-detail-description">{product.description}</p>
                        <button className="btn btn-primary" onClick={() => addToCart(product.id)}>
                            Add to Cart {getQuantity(product.id) > 0 && `(${getQuantity(product.id)})`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
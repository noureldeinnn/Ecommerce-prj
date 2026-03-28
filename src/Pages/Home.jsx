import { getProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
export default function Home() {
    const products = getProducts();
    return <div className="page">
        <div className="home-hero">
            <h1 className="home-title">Welcome to the Marketplace</h1>
            <p className="home-subtitle">Find the best products for your needs</p>
        </div>
        <div className="container">
            <h2 className="page-title">Featured Products</h2>
            <ProductCard products={products} />

        </div>

    </div>
}
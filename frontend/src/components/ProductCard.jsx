import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({ image, name, price, id }) => {
    const [size, setSize] = useState('');
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={name}/>
            </div>
            <div className="product-content">
                <p>{name}</p>
                <div className="product-price">
                    <p>{price}€</p>
                    <Link to={`/product/${id}`} className="btn btn-primary">Voir le produit</Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
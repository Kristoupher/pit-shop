const ProductCard = ({ image, name, price, id }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt={name}/>
            </div>
            <div className="product-content">
                <p>{name}</p>
                <div className="product-price">
                    <p>{price}€</p>
                    <button className="btn btn-primary">Voir le produit</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
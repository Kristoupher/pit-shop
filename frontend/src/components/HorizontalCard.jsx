import {Link} from "react-router-dom";

const HorizontalCard = ({ id, name, image, price }) => {
    return (
        <div className="card-hz">
            <div className="img">
                <img src={image} alt={name} />
            </div>
            <div>
                <p>{name}</p>
                <p className="price">{price}€</p>
                <div className='btn-container'>
                    <Link to={`/product/${id}`} className="btn btn-primary">Voir le produit</Link>
                </div>
            </div>
        </div>
    );
};

export default HorizontalCard;
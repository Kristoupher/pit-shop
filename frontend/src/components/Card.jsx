import { Link } from 'react-router-dom';

// Carte de présentation pour un produit
const Card = ({ name, image, category }) => {
    return (
        <div className="card">
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <p>{name}</p>
                <div className='btn-container'>
                    <Link title="Voir le produit" to={`/products/category/${category}`} className="btn btn-primary">Voir le produit</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
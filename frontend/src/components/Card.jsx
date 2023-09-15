import { Link } from 'react-router-dom';

const Card = ({ name, image, id }) => {
    return (
        <div className="card">
            <div>
                <img src={image} alt={name} />
            </div>
            <div>
                <p>{name}</p>
                <div className='btn-container'>
                    <Link to={`/product/${id}`} className="btn btn-primary">Voir le produit</Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
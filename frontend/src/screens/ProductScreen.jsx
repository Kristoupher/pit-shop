import { useNavigate, useParams} from "react-router-dom";
import { useState } from "react";
import { ChevronLeftCircle} from "lucide-react";
import { useGetProductDetailsQuery} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { addToCart} from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import {formatPrice, formatString} from "../utils/utils";

//Page de détail d'un produit
const ProductScreen = () => {
    //States
    const [qtyStock, setQtyStock] = useState(0);
    const [size, setSize] = useState('');
    const [qty, setQty] = useState(1);
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Fonction pour revenir à la page précédente
    const goBack = () => {
        navigate(-1);
    }

    //Récupération des données du produit
    const { data: product, isLoading, error } = useGetProductDetailsQuery(id);

    //Fonction pour récupérer la taille et la quantité du produit
    const handleInput = (e) => {
        setQtyStock(parseInt(e.target.value.split('-')[1]));
        setSize(e.target.value.split('-')[0]);
    }

    //Fonction pour ajouter le produit au panier
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty, size, qtyStock }));
        navigate('/cart');
    };

    return (
        <div className="product-single">
            <button title="Retour" onClick={goBack} className="btn btn-primary flex flex-center"><ChevronLeftCircle size={30} color="#fff" /> Retour</button>
            {
                isLoading ? <Loader /> : error ? <h2>{error}</h2> : (
                    <div className="product-single-content section">
                        <div className="image">
                            <img src={product.image} alt="nom du produit"/>
                        </div>
                        <div className="content">
                            <h1>{product.name}</h1>
                            <strong className="m-0">{formatPrice(product.price)}</strong>
                            <p className="description">{product.description}</p>
                            {
                                product.team && <p><strong className="m-0">Équipe :</strong> {formatString(product.team)}</p>
                            }
                            {
                                product.driver && <p><strong className="m-0">Pilote :</strong> {formatString(product.driver)}</p>
                            }
                            <strong>Choisir une taille :</strong>
                            <div className="sizes">
                                {
                                    product.sizes.map(size => (
                                        <div key={size.name}>
                                            <input value={`${size.name}-${size.quantityInStock}`} type="radio" name="size" id={size.name} onClick={handleInput} />
                                            <label htmlFor={size.name}>{size.name.toUpperCase()}</label>
                                        </div>
                                    ))
                                }
                            </div>
                            <strong>Quantité :</strong>
                            {
                                qtyStock > 0 ? (
                                    <form>
                                        <select name="qty" id="qty" onChange={(e) => setQty(parseInt(e.target.value))}>
                                            {
                                                [...Array(qtyStock).keys()].map((x) => (
                                                    <option key={x + 1} defaultValue={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <button title="Ajouter au panier" onClick={addToCartHandler} className="btn btn-primary">Ajouter au panier</button>
                                    </form>
                                ) : (
                                    <p>Vous devez sélectionner une taille</p>
                                )
                            }

                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductScreen;
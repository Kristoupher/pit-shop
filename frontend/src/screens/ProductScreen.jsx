import { useNavigate} from "react-router-dom";
import { ChevronLeftCircle} from "lucide-react";
import Mercedes from '../assets/images/mercedes.svg';

const ProductScreen = () => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }
    return (
        <div className="product-single">
            <button onClick={goBack} className="btn btn-primary flex flex-center"><ChevronLeftCircle size={30} color="#fff" /> Retour</button>
            <div className="product-single-content section">
                <div className="image">
                    <img src={Mercedes} alt="nom du produit"/>
                </div>
                <div className="content">
                    <h1>Polo Mercedes F1 Team</h1>
                    <p className="description">Le polo Mercedes incarne l'élégance intemporelle et le raffinement d'une marque de renommée mondiale. Confectionné avec des matériaux de
                        qualité supérieure, ce vêtement allie style et confort. Arborant le logo emblématique de Mercedes, il reflète la sophistication et le prestige
                        de la marque automobile. Que ce soit pour une sortie décontractée ou une occasion spéciale, ce polo incarne le luxe discret et l'exclusivité, faisant
                        de chaque instant une expérience Mercedes inoubliable.
                    </p>
                    <strong>Choisir une taille :</strong>
                    <div className="sizes">
                        <div>
                            <input type="radio" name="size" id="xs" />
                            <label htmlFor="xs">XS</label>
                        </div>
                        <div>
                            <input type="radio" name="size" id="s" />
                            <label htmlFor="s">S</label>
                        </div>
                        <div>
                            <input type="radio" name="size" id="m" />
                            <label htmlFor="m">M</label>
                        </div>
                        <div>
                            <input type="radio" name="size" id="l" />
                            <label htmlFor="l">L</label>
                        </div>
                        <div>
                            <input type="radio" name="size" id="xl" />
                            <label htmlFor="xl">XL</label>
                        </div>
                    </div>
                    <strong>Quantité :</strong>
                    <form>
                        <select name="qty" id="qty">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <button className="btn btn-primary">Ajouter au panier</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
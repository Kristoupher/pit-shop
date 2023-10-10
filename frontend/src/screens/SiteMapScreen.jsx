import {Link} from "react-router-dom";
import { useGetCategoriesQuery} from "../slices/categoriesApiSlice";
import {formatString} from "../utils/utils";

//Page plan du site
const SiteMapScreen = () => {
    //Récupération des catégories
    const { data } = useGetCategoriesQuery(1);
    return (
        <div className="sitemap section">
            <h1>Plan du site</h1>
            <div className="sitemap-container section">
                <div className="sitemap-list">
                    <ul>
                        <li>
                            <Link title="Accueil" to="/">Accueil</Link>
                        </li>
                        {
                            data && data.categories.map(category => (
                                <li key={category.id}>
                                    <Link title={formatString(category.name)} to={`/products/category/${category._id}`}>{formatString(category.name)}</Link>
                                </li>
                            ))
                        }
                        <li>
                            <Link title="Panier" to="/cart">Panier</Link>
                        </li>
                        <li>
                            <Link title="Contact" to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link title="Connexion" to="/login">Connexion</Link>
                        </li>
                        <li>
                            <Link title="Inscription" to="/signup">Inscription</Link>
                        </li>
                        <li>
                            <Link title="Mon compte" to="/account">Mon compte</Link>
                        </li>
                        <li>
                            <Link title="Plan du site" to="/sitemap">Plan du site</Link>
                        </li>
                        <li>
                            <Link title="Mentions légales" to="/legal">Mentions légales</Link>
                        </li>
                        <li>
                            <Link title="C.G.V." to="/cgv">CGV</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SiteMapScreen;
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
                            <Link to="/">Accueil</Link>
                        </li>
                        {
                            data && data.categories.map(category => (
                                <li key={category.id}>
                                    <Link to={`/products/category/${category._id}`}>{formatString(category.name)}</Link>
                                </li>
                            ))
                        }
                        <li>
                            <Link to="/cart">Panier</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                        <li>
                            <Link to="/signup">Inscription</Link>
                        </li>
                        <li>
                            <Link to="/account">Mon compte</Link>
                        </li>
                        <li>
                            <Link to="/sitemap">Plan du site</Link>
                        </li>
                        <li>
                            <Link to="/legal">Mentions légales</Link>
                        </li>
                        <li>
                            <Link to="/cgv">CGV</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SiteMapScreen;
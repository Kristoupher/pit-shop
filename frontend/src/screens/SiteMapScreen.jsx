import {Link} from "react-router-dom";
import { useGetCategoriesQuery} from "../slices/categoriesApiSlice";
import {formatString} from "../utils/utils";
import Meta from "../components/Meta";

//Page plan du site
const SiteMapScreen = () => {
    //Récupération des catégories
    const { data } = useGetCategoriesQuery(1);
    return (
        <div className="sitemap section">
            <Meta title="Plan du site | Le Pit Shop"
                  description="Explorez le plan du site de Le Pit Shop pour trouver rapidement ce que vous cherchez. Découvrez la structure de notre
                  boutique en ligne, explorez nos catégories de produits et trouvez des liens directs vers toutes nos pages. Simplifiez votre navigation
                  et profitez d'une expérience de shopping F1 fluide et efficace en explorant notre plan du site détaillé."
                  keywords="Plan du site, Structure du site, Navigation simplifiée, Catégories de produits, Liens directs, Boutique en ligne de F1,
                  Produits de Formule 1, Fans de course automobile, Expérience de shopping F1, Le Pit Shop, Recherche rapide, Navigation efficace,
                  Découverte de produits."
            />
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
import {Link} from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import { useGetCategoriesQuery} from "../slices/categoriesApiSlice";
import {formatString} from "../utils/utils";

const Footer = () => {
    const year = new Date().getFullYear();
    const { data: categories } = useGetCategoriesQuery();
    return (
        <footer className="footer">
            <div className="top">
                <div className="container">
                    <div>
                        <Link to={"/"} className="logo">
                            <img src={Logo} alt="logo du pit shop"/>
                        </Link>
                    </div>
                    <div className="navs-container">
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Accueil</Link>
                                </li>
                                {
                                    categories && categories.map((category) => (
                                        <li key={category._id}>
                                            <Link to={`/products/category/${category._id}`}>{formatString(category.name)}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                                <li>
                                    <Link to="/sitemap">Plan du site</Link>
                                </li>
                                <li>
                                    <Link to="/legal">Mentions légales</Link>
                                </li>
                                <li>
                                    <Link to="/privacy">C.G.V</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="container">
                    <p>© {year} - Création et développement : <Link to="http://kristopher-arregui.fr" rel="noreferrer noopener" target="_blank">Kristopher Arregui</Link></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
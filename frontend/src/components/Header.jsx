import { useState } from "react";
import {Link} from "react-router-dom";
import { Search, ShoppingCart, Mail, User2 } from "lucide-react";
import Logo from "../assets/images/logo.svg";

const Header = () => {
    const [toggle, setToggle] = useState(false);
    const body = document.querySelector('body');
    // Applique un overflow hidden quand le menu mobile est ouvert pour éviter le scroll
    toggle ? body.style.overflow = 'hidden' : body.style.overflow = 'auto';

    return (
        <header className="container header-nav">
            <div className="navbar">
                <Link to="/">
                    <img src={Logo} alt="Logo du pit shop" />
                </Link>
                {/*Menu pour la version mobile*/}
                <div>
                    <div id="nav-toggle" className={`${toggle ? 'active' : ''}`} onClick={() => setToggle(!toggle)}></div>
                </div>
                <form>
                    <input type="text" placeholder="Rechercher un produit..." />
                    <button> <Search color="#fff" size={25} strokeWidth={3} /> </button>
                </form>
                <div className="navbar-btns-desktop">
                    <Link to="/cart"><ShoppingCart color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                    <Link to="/contact"><Mail color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                    <Link to="/account"><User2 color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                    <Link to="/login" className="btn btn-primary">Connexion</Link>
                </div>
            </div>
            <nav className={`nav-mobile ${toggle ? 'active' : ''}`}>
                <ul>
                    <li>
                        <Link to="products/category/homme">Homme</Link>
                    </li>
                    <li>
                        <Link to="products/category/femme">Femme</Link>
                    </li>
                    <li>
                        <Link to="products/category/enfant">Enfant</Link>
                    </li>
                    <li>
                        <Link to="products/category/casquettes-et-chapeaux">Casquettes et chapeaux</Link>
                    </li>
                    <li>
                        <Link to="products/category/accessoires">Accessoires</Link>
                    </li>
                    <li>
                        <Link to="products/category/objets-de-collection">Objets de collection</Link>
                    </li>
                </ul>
                <div className="nav-btns">
                    <Link to="/contact" className="btn btn-secondary">Contact</Link>
                    <Link to="/cart" className="btn btn-tertiary">Panier</Link>
                    <Link to="/login" className="btn btn-primary">Connexion</Link>'
                </div>
            {/*    Fin du menu pour la version mobile*/}
            </nav>
            <nav className="nav-desktop">
                <ul>
                    <li>
                        <Link to='products/category/homme'>Homme</Link>
                    </li>
                    <li>
                        <Link to='products/category/femme'>Femme</Link>
                    </li>
                    <li>
                        <Link to='products/category/enfant'>Enfant</Link>
                    </li>
                    <li>
                        <Link to='products/category/casquettes-et-chapeaux'>Casquettes et chapeaux</Link>
                    </li>
                    <li>
                        <Link to='products/category/accessoires'>Accessoires</Link>
                    </li>
                    <li>
                        <Link to='products/category/objets-de-collection'>Objets de collection</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
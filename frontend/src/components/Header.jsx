import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useParams} from "react-router-dom";
import { Search, ShoppingCart, Mail, User2, Settings } from "lucide-react";
import { useGetCategoriesQuery} from "../slices/categoriesApiSlice";
import Logo from "../assets/images/logo.svg";
import {formatString} from "../utils/utils";
import { useLogoutMutation} from "../slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

const Header = () => {
    // States
    const [toggle, setToggle] = useState(false);
    const [search, setSearch] = useState('');
    // Récupération du numéro de page et de la catégorie dans l'url
    const { pageNumber } = useParams() || 1;
    const { category: categoryId } = useParams();

    const body = document.querySelector('body');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Appel de la fonction logout
    const [logoutApiCall] = useLogoutMutation();

    // Récupération du panier et de l'utilisateur
    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.auth);

    // Fonction de déconnexion
    const logoutHandler = async () => {
        setToggle(false);
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    // Applique un overflow hidden quand le menu mobile est ouvert pour éviter le scroll
    toggle ? body.style.overflow = 'hidden' : body.style.overflow = 'auto';

    //Récupération des catégories
    const { data } = useGetCategoriesQuery(pageNumber);

    // Fonction de recherche
    const handleSearch = (e) => {
        e.preventDefault();
        if(search !== '') {
            setSearch(search.toLowerCase());
            navigate(`/products/search/${search}`);
            setSearch('');
        }
    }


    return (
        <header className="container header-nav">
            <div className="navbar">
                <Link title="Accueil" to="/">
                    <img src={Logo} alt="Logo du pit shop" />
                </Link>
                {/*Menu pour la version mobile*/}
                <div>
                    <div id="nav-toggle" className={`${toggle ? 'active' : ''}`} onClick={() => setToggle(!toggle)}></div>
                </div>
                <form>
                    <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder="Rechercher un produit..." />
                    <button title="Rechercher" onClick={handleSearch}> <Search color="#fff" size={25} strokeWidth={3} /> </button>
                </form>
                <div className="navbar-btns-desktop">
                    <Link title="Panier" className={`header-cart ${cartItems.length > 0 ? 'active' : ''}`} to="/cart"><ShoppingCart color="#2E2E2E" size={30} strokeWidth={3}/><span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span></Link>
                    <Link title="Contact" to="/contact"><Mail color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                    {
                        userInfo ? (
                            <>
                                <Link title="Mon compte" to="/account"><User2 color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                                {
                                    userInfo.isAdmin && (
                                        <Link title="Panneau d'administration" to='/admin' ><Settings color="#2E2E2E" size={30} strokeWidth={3} /></Link>
                                    )
                                }
                                <button title="Déconnexion" onClick={logoutHandler} className="btn btn-primary">Déconnexion</button>
                            </>
                        ) : (
                            <Link title="Connexion" to="/login" className="btn btn-primary">Connexion</Link>
                            )
                    }

                </div>
            </div>
            <nav className={`nav-mobile ${toggle ? 'active' : ''}`}>
                <ul>
                    {
                        data && data.categories.map((category) => (
                            <li key={category._id}>
                                <Link title={formatString(category.name)} className={`${category._id === categoryId ? 'active' : '' }`} to={`/products/category/${category._id}`} onClick={() => setToggle(false)}>{formatString(category.name)}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="nav-btns">
                    <form>
                        <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Rechercher un produit..." />
                        <button title="Rechercher" onClick={handleSearch}> <Search color="#fff" size={25} strokeWidth={3} /> </button>
                    </form>
                    <Link title="Contact" to="/contact" className="btn btn-secondary" onClick={() => setToggle(false)}>Contact</Link>
                    <Link title="Panier" to="/cart" className="btn btn-tertiary" onClick={() => setToggle(false)}>Panier</Link>
                    {
                        userInfo ? (
                            <>
                                <Link title="Mon compte" to="/account" className="btn btn-primary" onClick={() => setToggle(false)}>Mon compte</Link>
                                <button title="Déconnexion" className="btn btn-primary w-100" onClick={logoutHandler}>Déconnexion</button>
                            </>)
                            : (
                                <Link title="Connexion" to="/login" className="btn btn-primary" onClick={() => setToggle(false)}>Connexion</Link>
                        )
                    }
                </div>
            {/*    Fin du menu pour la version mobile*/}
            </nav>
            <nav className="nav-desktop">
                <ul>
                    {
                        data && data.categories.map((category) => (
                            <li key={category._id}>
                                <Link title={formatString(category.name)} className={`${category._id === categoryId ? 'active' : '' }`} to={`/products/category/${category._id}`}>{formatString(category.name)}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
import { useState } from "react";
import {Link} from "react-router-dom";
import { useParams} from "react-router-dom";
import { Search, ShoppingCart, Mail, User2, Settings } from "lucide-react";
import { useGetCategoriesQuery} from "../slices/categoriesApiSlice";
import Logo from "../assets/images/logo.svg";
import {formatString} from "../utils/utils";
import { useLogoutMutation} from "../slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";

const Header = () => {
    const { category: categoryId } = useParams();
    const [toggle, setToggle] = useState(false);
    const body = document.querySelector('body');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const { cartItems } = useSelector(state => state.cart);
    const { userInfo } = useSelector(state => state.auth);

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
    const { data: categories } = useGetCategoriesQuery();


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
                    <Link className={`header-cart ${cartItems.length > 0 ? 'active' : ''}`} to="/cart"><ShoppingCart color="#2E2E2E" size={30} strokeWidth={3}/><span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span></Link>
                    <Link to="/contact"><Mail color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                    {
                        userInfo ? (
                            <>
                                <Link to="/account"><User2 color="#2E2E2E" size={30} strokeWidth={3}/></Link>
                                {
                                    userInfo.isAdmin && (
                                        <Link to='/admin' ><Settings color="#2E2E2E" size={30} strokeWidth={3} /></Link>
                                    )
                                }
                                <button onClick={logoutHandler} className="btn btn-primary">Déconnexion</button>
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-primary">Connexion</Link>
                            )
                    }

                </div>
            </div>
            <nav className={`nav-mobile ${toggle ? 'active' : ''}`}>
                <ul>
                    {
                        categories && categories.map((category) => (
                            <li key={category._id}>
                                <Link className={`${category._id === categoryId ? 'active' : '' }`} to={`/products/category/${category._id}`} onClick={() => setToggle(false)}>{formatString(category.name)}</Link>
                            </li>
                        ))
                    }
                </ul>
                <div className="nav-btns">
                    <Link to="/contact" className="btn btn-secondary" onClick={() => setToggle(false)}>Contact</Link>
                    <Link to="/cart" className="btn btn-tertiary" onClick={() => setToggle(false)}>Panier</Link>
                    {
                        userInfo ? (
                            <>
                                <Link to="/account" className="btn btn-primary" onClick={() => setToggle(false)}>Mon compte</Link>
                                <button className="btn btn-primary w-100" onClick={logoutHandler}>Déconnexion</button>
                            </>)
                            : (
                                <Link to="/login" className="btn btn-primary" onClick={() => setToggle(false)}>Connexion</Link>
                        )
                    }
                </div>
            {/*    Fin du menu pour la version mobile*/}
            </nav>
            <nav className="nav-desktop">
                <ul>
                    {
                        categories && categories.map((category) => (
                            <li key={category._id}>
                                <Link className={`${category._id === categoryId ? 'active' : '' }`} to={`/products/category/${category._id}`}>{formatString(category.name)}</Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    );
};

export default Header;
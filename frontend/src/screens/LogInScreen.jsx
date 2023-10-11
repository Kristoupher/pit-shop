import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation} from "../slices/usersApiSlice";
import { setCredentials} from "../slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import Meta from "../components/Meta";

//Page de connexion
const LogInScreen = () => {
    //States
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Fonction de login
    const [login, { isLoading }] = useLoginMutation();

    //Récupération des informations de l'utilisateur dans le state
    const { userInfo } = useSelector(state => state.auth);


    //Récupération de l'URL de redirection
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    //Si l'utilisateur est connecté, redirection vers la page d'accueil
    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    //Fonction de soumission du formulaire
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if(!mail || !password) return toast.error('Veuillez remplir tous les champs');
            const res = await login({ mail, password }).unwrap();
            dispatch(setCredentials({ ...res, }));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="login section">
            <Meta title="Connexion | Le Pit Shop"
                  description="Connectez-vous à votre compte Le Pit Shop pour accéder à des offres exclusives, suivre vos commandes et personnaliser
                  votre expérience de shopping F1. Saisissez vos identifiants pour accéder à un monde de produits de Formule 1 de qualité supérieure.
                  Connectez-vous et plongez dans l'univers palpitant de la F1 dès maintenant."
                  keywords="Connexion, Se connecter, Accès au compte, Authentification utilisateur, Espace client, Identifiants de connexion, Compte
                  utilisateur, Expérience personnalisée, Boutique en ligne de F1, Produits de Formule 1, Fans de course automobile, Espace membre,
                  Accès réservé, Le Pit Shop."
            />
            <h1>Connexion</h1>
            <form className="form section" onSubmit={submitHandler}>
                <p>Pas encore de compte ? Venez vous <Link to="/signup">inscrire</Link> !</p>
                <div className="form-group">
                    <label htmlFor="mail">Adresse e-mail</label>
                    <input type="email" name="mail" id="mail" required={true} placeholder="Adresse e-mail" onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" required={true} id="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="btn-container">
                    <button title="Connexion" className="btn btn-primary">Connexion</button>
                </div>
            </form>
        </div>
    );
};

export default LogInScreen;
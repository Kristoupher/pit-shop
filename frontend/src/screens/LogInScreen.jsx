import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation} from "../slices/usersApiSlice";
import { setCredentials} from "../slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";

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
                    <button className="btn btn-primary">Connexion</button>
                </div>
            </form>
        </div>
    );
};

export default LogInScreen;
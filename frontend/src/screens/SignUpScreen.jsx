import {Link, useNavigate, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation} from "../slices/usersApiSlice";
import { setCredentials} from "../slices/authSlice";

//Page d'inscription
const SignUpScreen = () => {
    //States
    const [gender, setGender] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [cgv, setCgv] = useState(false);
    const address = { street, city, postalCode };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //Fonction d'inscription
    const [register, { isLoading }] = useRegisterMutation();
    //Récupération des informations de l'utilisateur dans le state
    const { userInfo } = useSelector(state => state.auth);

    //Récupération de l'url de redirection
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(gender === "" || lastname === "" || firstname === "" || mail === "" || phone === "" || street === "" || city === "" || postalCode === "" || password === "" || passwordConfirm === "") {
            toast.error('Veuillez remplir tous les champs');
            return;
        }
        if(gender === "" && lastname === "" && firstname === "" && mail === "" && phone === "" && street === "" && city === "" && postalCode === "" && password === "" && passwordConfirm === "") {
            toast.error('Veuillez remplir tous les champs');
            return;
        }
        if (password !== passwordConfirm) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        } else {
            try {
                if(!cgv) {
                    toast.error('Veuillez accepter les conditions générales de vente');
                    return;
                }
                //Appel de la fonction d'inscription
                const res = await register({ gender, lastname, firstname, mail, phone, address, password }).unwrap();
                dispatch(setCredentials({ ...res, }));
                toast.success('Votre compte a bien été créé');
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    }

    return (
        <div className="signup section">
            <h1>Inscription</h1>
            <form className="form section">
                <p>Vous avez déjà un compte, <Link to="/login">se connecter</Link> !</p>
                <div className="form-duo">
                    <div className="gender">
                        <p>Genre :</p>
                        <div className="radio-group">
                            <input required={true} type="radio" name="gender" id="gender" value="mr" onChange={(e) => setGender(e.target.value)}/>
                            <label htmlFor="mr">Mr</label>
                        </div>
                        <div className="radio-group">
                            <input required={true} type="radio" name="gender" id="gender" value="mme" onChange={(e) => setGender(e.target.value)}/>
                            <label htmlFor="mme">Mme</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input required={true} type="text" name="lastname" id="lastname" placeholder="Nom*" onChange={(e) => setLastname(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input required={true} type="text" name="firstname" id="firstname" placeholder="Prénom*" onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Adresse e-mail</label>
                        <input required={true} type="email" name="mail" id="mail" placeholder="Adresse e-mail*" onChange={(e) => setMail(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input required={true} type="tel" name="phone" id="phone" placeholder="Téléphone*" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input required={true} type="text" name="address" id="address" placeholder="Adresse*" onChange={(e) => setStreet(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="postal">Code postal</label>
                        <input required={true} type="text" name="postal" id="postal" placeholder="Code postal*" onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ville</label>
                        <input required={true} type="text" name="city" id="city" placeholder="Ville*" onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input required={true} type="password" name="password" id="password" placeholder="Mot de passe*" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
                        <input required={true} type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe*" onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                </div>
                <div className="radio-group">
                    <input type="checkbox" name="cgu" id="cgu" required={true} onChange={(e) => setCgv(true)} />
                    <label htmlFor="cgu">
                        En cochant cette case, je confirme que j'ai lu, compris et accepté les conditions générales d'utilisation du Pit Shop. Je consens à fournir les informations requises pour m'inscrire sur ce site
                        et à ce que mes données personnelles soient traitées conformément à la politique de confidentialité du Pit Shop.
                    </label>
                </div>
                <div className="btn-container">
                    <button title="Inscription" onClick={handleSubmit} className="btn btn-primary">Inscription</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpScreen;
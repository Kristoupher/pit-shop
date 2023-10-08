import {Link, useNavigate, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation} from "../slices/usersApiSlice";
import { setCredentials} from "../slices/authSlice";

const SignUpScreen = () => {
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
    const address = { street, city, postalCode };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            toast.error('Les mots de passe ne correspondent pas');
            return;
        } else {
            try {
                const res = await register({ gender, lastname, firstname, mail, phone, address, password }).unwrap();
                dispatch(setCredentials({ ...res, }));
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
                            <input type="radio" name="gender" id="gender" value="mr" onChange={(e) => setGender(e.target.value)}/>
                            <label htmlFor="mr">Mr</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="gender" id="gender" value="mme" onChange={(e) => setGender(e.target.value)}/>
                            <label htmlFor="mme">Mme</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" name="lastname" id="lastname" placeholder="Nom" onChange={(e) => setLastname(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" id="firstname" placeholder="Prénom" onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Adresse e-mail</label>
                        <input type="email" name="mail" id="mail" placeholder="Adresse e-mail" onChange={(e) => setMail(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="tel" name="phone" id="phone" placeholder="Téléphone" onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" name="address" id="address" placeholder="Adresse" onChange={(e) => setStreet(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="postal">Code postal</label>
                        <input type="text" name="postal" id="postal" placeholder="Code postal" onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ville</label>
                        <input type="text" name="city" id="city" placeholder="Ville" onChange={(e) => setCity(e.target.value)} />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" onChange={(e) => setPasswordConfirm(e.target.value)} />
                    </div>
                </div>
                <div className="btn-container">
                    <button onClick={handleSubmit} className="btn btn-primary">Inscription</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpScreen;
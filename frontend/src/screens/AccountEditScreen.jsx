import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useState} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { useProfileMutation } from "../slices/usersApiSlice";
import { updateCredentials } from "../slices/authSlice";
import Meta from "../components/Meta";


//Modifier le profil de l'utilisateur
const AccountEditScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //Récupération des informations de l'utilisateur
    const { userInfo } = useSelector(state => state.auth);
    //States
    const [gender,setGender] = useState(userInfo.gender || '');
    const [lastname, setLastname] = useState(userInfo.lastname || '');
    const [firstname, setFirstname] = useState(userInfo.firstname || '');
    const [street, setStreet] = useState(userInfo.address.street || '');
    const [postalCode, setPostalCode] = useState(userInfo.address.postalCode || '');
    const [city, setCity] = useState(userInfo.address.city || '');
    const [mail, setMail] = useState(userInfo.mail || '');
    const [phone, setPhone] = useState(userInfo.phone || '');
    //Mise à jour du profil
    const [updateUser, { isLoading: isUpdating }] = useProfileMutation();


    //Soumission du formulaire
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if(gender !== "" && lastname !== "" && firstname !== "" && street !== "" && postalCode !== "" && city !== "" && mail !== "" && phone !== "") {
                if(gender !== userInfo.gender || lastname !== userInfo.lastname || firstname !== userInfo.firstname || street !== userInfo.address.street || postalCode !== userInfo.address.postalCode || city !== userInfo.address.city || mail !== userInfo.mail || phone !== userInfo.phone) {
                    //Mise à jour du profil
                    await updateUser({
                        id: userInfo._id,
                        gender,
                        lastname,
                        firstname,
                        address: {street, postalCode, city},
                        mail,
                        phone
                    });
                    //Mise à jour du state
                    dispatch(updateCredentials({
                        _id: userInfo._id,
                        gender,
                        lastname,
                        firstname,
                        address: {street, postalCode, city},
                        mail,
                        phone,
                        isAdmin: userInfo.isAdmin,
                    }));
                    toast.success('Profil modifié avec succès');
                    navigate('/account');
                } else {
                    toast.error('Aucune modification n\'a été apportée');
                }
            } else {
                toast.error('Veuillez remplir tous les champs');
            }
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }

    return (
        <div className="edit section shipping">
            <Meta title="Modifier mon profil | Le Pit Shop"
                  description="Optimisez votre expérience de shopping sur Le Pit Shop en mettant à jour votre compte utilisateur. Modifiez vos informations
                  personnelles, gérez vos préférences et restez à jour avec les dernières nouveautés et offres exclusives sur les produits de Formule 1.
                  Personnalisez votre expérience de passionné de F1 dès maintenant !"
                  keywords="Formule 1, F1, Course automobile, Équipement F1, Accessoires de pilote, Merchandising F1, Vêtements de course, Casques de pilote,
                  Pièces de voiture de F1, Fans de Formule 1, Boutique de F1 en ligne, Produits dérivés de F1, Grand Prix, Voitures de course"
            />
            <Link title="Retour" className="btn btn-primary mb-5" to="/account">Retour</Link>
            <h1>Modifier mon profil</h1>
            <div className="section">
                <form className="form section">
                    <div className="gender">
                        <p><strong>Genre :</strong></p>
                        <div className="radio-group">
                            <input checked={gender === "mr"} type="radio" name="gender" id="mrRadio" value="mr" onChange={(e) => setGender(e.target.value)}/>
                            <label htmlFor="mrRadio">Mr</label>
                        </div>
                        <div className="radio-group">
                            <input checked={gender === "mme"} type="radio" name="gender" id="mmeRadio" value="mme" onChange={(e) => setGender(e.target.value)}/>
                            <label htmlFor="mmeRadio">Mme</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" id="firstname" defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" id="lastname" defaultValue={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" id="address" defaultValue={street} onChange={(e) => setStreet(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Code postal</label>
                        <input type="text" id="postalCode" defaultValue={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ville</label>
                        <input type="text" id="city" defaultValue={city} onChange={(e) => setCity(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" defaultValue={mail} onChange={(e) => setMail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="text" id="phone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className="btn-container">
                        <button title="Valider les modifications" onClick={submitHandler} className="btn btn-primary">Valider les modifications</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountEditScreen;
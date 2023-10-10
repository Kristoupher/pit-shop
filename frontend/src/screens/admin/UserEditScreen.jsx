import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery} from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";

//Modification d'un utilisateur
const UserEditScreen = () => {
    const navigate = useNavigate();
    //Récupération de l'id de l'utilisateur
    const { id } = useParams();

    //Récupération des données de l'utilisateur
    const { data: user, refetch, isLoading, error } = useGetUserByIdQuery(id);

    //States
    const [gender, setGender] = useState(user && user.gender || '');
    const [lastname, setLastname] = useState(user && user.lastname || '');
    const [firstname, setFirstname] = useState(user && user.firstname || '');
    const [mail, setMail] = useState(user && user.mail || '');
    const [phone, setPhone] = useState(user && user.phone || '');
    const [street, setStreet] = useState(user && user.street || '');
    const [city, setCity] = useState(user && user.city || '');
    const [postalCode, setPostalCode] = useState(user && user.postalCode || '');
    const [isAdmin, setIsAdmin] = useState(user && user.gender || false);
    const address = { street, city, postalCode };
    //Modification de l'utilisateur
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    //On récupère les données de l'utilisateur
    useEffect(() => {
        if(user) {
            setGender(user.gender);
            setLastname(user.lastname);
            setFirstname(user.firstname);
            setMail(user.mail);
            setPhone(user.phone);
            setStreet(user.address.street);
            setCity(user.address.city);
            setPostalCode(user.address.postalCode);
            setIsAdmin(user.isAdmin);
        }
    }, [user]);


    //On soumet le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(gender !== "" && lastname !== "" && firstname !== "" && mail !== "" && phone !== "" && street !== "" && city !== "" && postalCode !== "") {
            if(gender !== user.gender || lastname !== user.lastname || firstname !== user.firstname || mail !== user.mail || phone !== user.phone || street !== user.address.street || city !== user.address.city || postalCode !== user.address.postalCode || isAdmin !== user.isAdmin) {
                try {
                    //On met à jour l'utilisateur
                    await updateUser({
                        id: user._id,
                        gender,
                        firstname,
                        lastname,
                        mail,
                        phone,
                        address,
                        isAdmin
                    });
                    toast.success('Utilisateur modifié avec succès');
                    refetch();
                    navigate('/admin/users');
                } catch (err) {
                    toast.error(err?.data?.message || err.error);
                }
            } else {
                toast.error('Aucune modification n\'a été effectuée');
            }
        } else {
            toast.error('Veuillez remplir tous les champs');
        }

    }
    return (
        <>
            <section>
                <Link to="/admin/users" className="btn btn-primary mb-5">Retour</Link>
                <h1>Modification d'un utilisateur</h1>
            </section>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="section signup edit-form">
                        <form className="form section">
                            <div className="form-duo">
                                <div className="gender">
                                    <p>Genre :</p>
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
                                    <label htmlFor="lastname">Nom</label>
                                    <input type="text" name="lastname" id="lastname" placeholder="Nom" defaultValue={lastname} onChange={(e) => setLastname(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-duo">
                                <div className="form-group">
                                    <label htmlFor="firstname">Prénom</label>
                                    <input type="text" name="firstname" id="firstname" placeholder="Prénom" defaultValue={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mail">Adresse e-mail</label>
                                    <input type="email" name="mail" id="mail" placeholder="Adresse e-mail" defaultValue={mail} onChange={(e) => setMail(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-duo">
                                <div className="form-group">
                                    <label htmlFor="phone">Téléphone</label>
                                    <input type="tel" name="phone" id="phone" placeholder="Téléphone" defaultValue={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Adresse</label>
                                    <input type="text" name="address" id="address" placeholder="Adresse" defaultValue={street} onChange={(e) => setStreet(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-duo">
                                <div className="form-group">
                                    <label htmlFor="postal">Code postal</label>
                                    <input type="text" name="postal" id="postal" placeholder="Code postal" defaultValue={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="city">Ville</label>
                                    <input type="text" name="city" id="city" placeholder="Ville" defaultValue={city} onChange={(e) => setCity(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group edit-select">
                                <label htmlFor="isAdmin">Rôle</label>
                                <select name="isAdmin" id="isAdmin" onChange={(e) => setIsAdmin(e.target.value)}>
                                    <option selected={isAdmin === false} value={false}>Utilisateur</option>
                                    <option selected={isAdmin === true} value={true}>Administrateur</option>
                                </select>
                            </div>
                            <div className="btn-container">
                                <button onClick={handleSubmit} className="btn btn-primary">Modifier</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
};

export default UserEditScreen;
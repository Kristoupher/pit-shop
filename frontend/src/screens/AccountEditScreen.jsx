import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

const AccountEditScreen = () => {
    const { userInfo } = useSelector(state => state.auth);
    return (
        <div className="edit section shipping">
            <h1>Modifier mon profil</h1>
            <div className="section">
                <form className="form section">
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" id="firstname" defaultValue={userInfo.firstname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" id="lastname" defaultValue={userInfo.lastname} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" id="address" defaultValue={userInfo.address.street} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postalCode">Code postal</label>
                        <input type="text" id="postalCode" defaultValue={userInfo.address.postalCode} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ville</label>
                        <input type="text" id="city" defaultValue={userInfo.address.city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" defaultValue={userInfo.mail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="text" id="phone" defaultValue={userInfo.phone} />
                    </div>
                    <div className="btn-container">
                        <Link to="/account" className="btn btn-primary">Valider les modifications</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AccountEditScreen;
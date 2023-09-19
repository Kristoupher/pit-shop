import {Link} from "react-router-dom";

const SignUpScreen = () => {
    return (
        <div className="signup section">
            <h1>Inscription</h1>
            <form className="form section">
                <p>Vous avez déjà un compte, <Link to="/signup">se connecter</Link> !</p>
                <div className="form-duo">
                    <div className="gender">
                        <p>Genre :</p>
                        <div className="radio-group">
                            <input type="radio" name="gender" id="gender" value="mr"/>
                            <label htmlFor="mr">Mr</label>
                        </div>
                        <div className="radio-group">
                            <input type="radio" name="gender" id="gender" value="mme"/>
                            <label htmlFor="mme">Mme</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label>
                        <input type="text" name="lastname" id="lastname" placeholder="Nom" />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label>
                        <input type="text" name="firstname" id="firstname" placeholder="Prénom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Adresse e-mail</label>
                        <input type="email" name="mail" id="mail" placeholder="Adresse e-mail" />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="phone">Téléphone</label>
                        <input type="tel" name="phone" id="phone" placeholder="Téléphone" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Adresse</label>
                        <input type="text" name="address" id="address" placeholder="Adresse" />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="postal">Code postal</label>
                        <input type="text" name="postal" id="postal" placeholder="Code postal" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">Ville</label>
                        <input type="text" name="city" id="city" placeholder="Ville" />
                    </div>
                </div>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" id="password" placeholder="Mot de passe" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
                        <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Confirmer le mot de passe" />
                    </div>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary">Inscription</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpScreen;
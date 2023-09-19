import {Link} from "react-router-dom";

const LogInScreen = () => {
    return (
        <div className="login section">
            <h1>Connexion</h1>
            <form className="form section">
                <p>Pas encore de compte ? Venez vous <Link to="/signup">inscrire</Link> !</p>
                <div className="form-group">
                    <label htmlFor="mail">Adresse e-mail</label>
                    <input type="email" name="mail" id="mail" placeholder="Adresse e-mail" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" name="password" id="password" placeholder="Mot de passe" />
                </div>
                <div className="link">
                    <Link to="/forgotpassword">Mot de passe oublié ?</Link>
                </div>
                <div className="btn-container">
                    <button className="btn btn-primary">Connexion</button>
                </div>
            </form>
        </div>
    );
};

export default LogInScreen;
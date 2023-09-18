const ContactScreen = () => {
    return (
        <div className="contact section">
            <h1>Contact</h1>
            <form className="form section">
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="fullname">Nom Prénom</label>
                        <input type="text" name="fullname" id="fullname" placeholder="Votre nom et prénom" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Adresse e-mail</label>
                        <input type="email" name="mail" id="mail" placeholder="Votre adresse e-mail" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input type="text" name="subject" id="subject" placeholder="Sujet" />
                </div>
                <textarea name="message" id="message" rows="8" placeholder="Votre message"></textarea>
                <div className="btn-container">
                    <button className="btn btn-primary">Envoyer votre message</button>
                </div>
            </form>
        </div>
    );
};

export default ContactScreen;
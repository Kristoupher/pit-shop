import { useState } from "react";
import {toast} from "react-toastify";
import { useSendEmailMutation } from "../slices/contactApiSlice";

//Page de contact
const ContactScreen = () => {
    //States
    const [fullname, setFullname] = useState("");
    const [mail, setMail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [cgv, setCgv] = useState(false);

    //Envoyer un email
    const [sendEmail] = useSendEmailMutation();

    //Soumettre le formulaire
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            if(fullname !== "" && mail !== "" && subject !== "" && message !== ""){
                if(!cgv) {
                    toast.error("Veuillez accepter les conditions générales de vente");
                } else {
                    //Données à envoyer
                    const data = {
                        fullname,
                        mail,
                        subject,
                        message
                    };
                    //Envoi de l'email
                    await sendEmail(data).unwrap();
                    toast.success("Votre message a bien été envoyé");
                    setFullname("");
                    setMail("");
                    setSubject("");
                    setMessage("");
                    setCgv(false);
                }
            } else {
                toast.error("Veuillez remplir tous les champs");
            }

        } catch (error) {

        }

    }
    return (
        <div className="contact section">
            <h1>Contact</h1>
            <form className="form section" onSubmit={submitHandler}>
                <div className="form-duo">
                    <div className="form-group">
                        <label htmlFor="fullname">Nom Prénom</label>
                        <input type="text" required={true} name="fullname" id="fullname" placeholder="Votre nom et prénom*" value={fullname} onChange={(e) => setFullname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mail">Adresse e-mail</label>
                        <input type="email" required={true} name="mail" id="mail" placeholder="Votre adresse e-mail*" value={mail} onChange={(e) => setMail(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Sujet</label>
                    <input type="text" required={true} name="subject" id="subject" placeholder="Sujet*" value={subject} onChange={(e) => setSubject(e.target.value)} />
                </div>
                <textarea required={true} name="message" id="message" rows="8" placeholder="Votre message*" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                <div className="radio-group">
                    <input type="checkbox" name="cgu" id="cgu" required={true}  onChange={(e) => setCgv(true)} />
                    <label htmlFor="cgu">En cochant cette case, j'accepte que Le Pit Shop collecte et utilise les informations que j'ai fournies dans ce formulaire dans le but de traiter ma demande.</label>
                </div>
                <div className="btn-container">
                    <button title="Envoyer votre message" className="btn btn-primary">Envoyer votre message</button>
                </div>
            </form>
        </div>
    );
};

export default ContactScreen;
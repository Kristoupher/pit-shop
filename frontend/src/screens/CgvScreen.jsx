import {Link} from "react-router-dom";
import Meta from "../components/Meta";

//PAge des Conditions Générales de Vente
const CgvScreen = () => {
    return (
        <div className="cgv section">
            <Meta title="Conditions Générales de Vente | Le Pit Shop"
                  description="Consultez nos Conditions Générales de Vente (CGV) sur Le Pit Shop. Découvrez nos politiques de paiement, de livraison, de
                  retour et bien plus encore. Familiarisez-vous avec nos engagements envers nos clients et assurez-vous de comprendre les termes et
                  conditions de vos achats. Profitez d'une expérience de shopping F1 transparente et sécurisée en lisant nos CGV détaillées."
                  keywords="Conditions Générales de Vente, CGV, Politique de paiement, Politique de livraison, Politique de retour, Termes et conditions,
                  Boutique en ligne de F1, Produits de Formule 1, Fans de course automobile, Expérience de shopping F1, Le Pit Shop, Transparence des
                  achats, Politique d'achat, Législation des achats."
            />
            <h1>Conditions générales de vente</h1>
            <section>
                <h2>1. Informations Légales</h2>
                <p>Le Pit Shop</p>
                <p><strong>Adresse : </strong> 12 rue de la paix, 33000 Bordeaux</p>
                <p><strong>Email : </strong> <Link title="pitshop@webmaster.fr" to="mailto:pitshop@webmaster.fr">pitshop@webmaster.fr</Link></p>
                <p><strong>Téléphone : </strong> 07 07 07 07 07</p>
                <p><strong>Numéro d'enregistrement : </strong> 12345</p>
            </section>
            <section>
                <h2>2. Commandes</h2>
                <article>
                    <h3>2.1 Passer une commande</h3>
                    <p>
                        Pour passer une commande sur Le Pit Shop, vous devez avoir l'âge légal et être en mesure de conclure
                        des contrats légaux. En passant une commande, vous confirmez être majeur et avoir la capacité juridique de le faire.
                    </p>
                </article>
                <article>
                    <h3>2.2 Confirmation de commande</h3>
                    <p>
                        Après avoir passé votre commande, vous pourrez consulter les détails de votre commande sur votre espace dans la rubrique compte et ainsi
                        suivre l'état de votre commande.
                    </p>
                </article>
                <article>
                    <h3>2.3 Acceptation de la commande</h3>
                    <p>
                        Votre commande ne sera acceptée et le contrat entre vous et Le Pit Shop ne sera conclu qu'au moment de l'expédition des produits
                        que vous avez commandés. Nous nous réservons le droit de refuser toute commande sans indication de motif.
                    </p>
                </article>
            </section>
            <section>
                <h2>3. Prix et Paiement</h2>
                <article>
                    <h3>3.1 Prix</h3>
                    <p>
                        Les prix des produits sur Le Pit Shop sont indiqués en euros (€) et n'incluent pas la TVA applicable. Les frais de livraison ne sont pas inclus
                        dans le prix des produits et seront ajoutés au montant total lors du processus de commande, de même pour la TVA.
                    </p>
                </article>
                <article>
                    <h3>3.2 Paiement</h3>
                    <p>
                        Le paiement peut être effectué par carte de crédit, ou tout autre moyen de paiement autorisé sur notre site. Les paiements sont sécurisés et traités conformément aux normes de sécurité en vigueur.
                    </p>
                </article>
            </section>
            <section>
                <h2>4. Livraison</h2>
                <article>
                    <h3>4.1 Frais de Livraison</h3>
                    <p>
                        Les frais de livraison sont de fixes pour toutes les commandes, cependant ils sont offerts pour toute commande dépassant le montant de 100€. Les frais de livraison seront indiqués lors du processus de commande.
                    </p>
                </article>
                <article>
                    <h3>4.2 Délai de Livraison</h3>
                    <p>
                        Le délai de livraison dépend de la destination de votre commande. Nous nous efforçons de livrer les produits dans les meilleurs délais, mais des retards peuvent survenir en raison de circonstances imprévues.
                    </p>
                </article>
            </section>
            <section>
                <h2>5. Droit de Rétractation</h2>
                <p>
                    Conformément aux lois en vigueur, vous avez le droit de vous rétracter de votre commande dans un délai de 14 jours à compter de la réception des produits, sans avoir à donner de motif. Pour exercer votre droit de rétractation,
                    veuillez nous contacter par e-mail à <Link title="contact@pitshop.fr" to="mailto:contact@pitshop.fr">contact@pitshop.fr</Link> pour obtenir les instructions de retour. Les produits doivent être retournés dans leur état d'origine et dans leur emballage d'origine.
                </p>
            </section>
            <section>
                <h2>6. Protection des Données et RGPD</h2>
                <p>
                    Le Pit Shop est conforme au Règlement Général sur la Protection des Données (RGPD). Nous collectons et traitons vos données personnelles uniquement dans le but de traiter vos commandes et de vous fournir un service client efficace.
                    Pour plus d'informations, veuillez consulter nos <Link title="Mentions légales" to="/legal">Mentions Légales</Link>.
                </p>
            </section>
            <section>
                <h2>7. Droit Applicable et Litiges</h2>
                <p>
                    Les présentes CGV sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
                <p>
                    En passant commande sur Le Pit Shop, vous acceptez pleinement et sans réserve les présentes CGV.
                </p>
                <p>
                    Fait à Bordeaux, le 23/09/2023
                </p>
            </section>
            <div className="section">
                <p>Le Pit Shop</p>
                <p>12 rue de la paix, 33000 Bordeaux</p>
                <p><Link title='contact@pitshop.fr' to="mailto:contact@pitshop.fr">contact@pitshop.fr</Link></p>
                <p><Link title="07 07 07 07 07" to="tel:+33707070707">07 07 07 07 07</Link></p>
            </div>
        </div>
    );
};

export default CgvScreen;
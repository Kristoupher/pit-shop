import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Banner from "../assets/images/home-banner.jpg";
import HorizontalCard from "../components/HorizontalCard";
import Mercedes from "../assets/images/mercedes.svg";
import Card from "../components/Card";

const HomeScreen = () => {
    return (
        <div className="home">
            <div className="banner-card">
                <div>
                    <h1>Bienvenue sur le Pit Shop !</h1>
                    <p>Bienvenue sur notre boutique en ligne dédiée aux passionnés de Formule 1.
                        Découvrez une sélection exceptionnelle de vêtements inspirés de l'univers de la
                        course automobile, conçus pour allier style et passion.
                    </p>
                    <div>
                        <Link className="btn btn-primary" to="/products/category/men">Découvrir</Link>
                    </div>
                </div>
                <div className="banner-home">
                    <img src={Banner} alt="Une formule 1 Ferrari"/>
                </div>
            </div>
            <section>
                <h2>Les derniers produits</h2>
                <div className="cols-2">
                    <HorizontalCard image={Mercedes} name="Sweet à capuche Mercedes" price="75,00" id="1fez4fze" />
                    <HorizontalCard image={Mercedes} name="Sweet à capuche Mercedes" price="75,00" id="1fez4fze" />
                    <HorizontalCard image={Mercedes} name="Sweet à capuche Mercedes" price="75,00" id="1fez4fze" />
                    <HorizontalCard image={Mercedes} name="Sweet à capuche Mercedes" price="75,00" id="1fez4fze" />
                </div>
            </section>
            <section id="categories">
                <h2>Catégories</h2>
                <div className="cols-3">
                    <Card image={Mercedes} name="Sweet à capuche Mercedes" category="homme" />
                    <Card image={Mercedes} name="Sweet à capuche Mercedes" category="femme" />
                    <Card image={Mercedes} name="Sweet à capuche Mercedes" category="enfant" />
                    <Card image={Mercedes} name="Sweet à capuche Mercedes" category="casquettes-et-chapeaux" />
                    <Card image={Mercedes} name="Sweet à capuche Mercedes" category="accessoires" />
                    <Card image={Mercedes} name="Sweet à capuche Mercedes" category="objets de collection" />
                </div>
            </section>
            <section>
                <div className="banner-contact">
                    <div className="overlay"></div>
                    <div className='content'>
                        <p>Une question , un renseignement ?</p>
                        <div className="btn-container">
                            <Link className="btn btn-primary flex flex-center" to="/contact">Contactez-nous <Mail size={30} color="#fff" /></Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomeScreen;
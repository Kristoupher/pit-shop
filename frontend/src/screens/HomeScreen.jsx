import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import Loader from "../components/Loader";
import { useGetLastProductsQuery} from "../slices/productsApiSlice";
import { useGetCategoriesQuery} from "../slices/categoriesApiSlice";
import formatString from "../utils/utils";
import Banner from "../assets/images/home-banner.jpg";
import HorizontalCard from "../components/HorizontalCard";
import Card from "../components/Card";

const HomeScreen = () => {
    //Au clic sur catégories dans la bannière on scroll vers la section catégories
    const categoriesSection = document.getElementById('categories');

    const goToCategories = () => {
        categoriesSection.scrollIntoView({behavior: 'smooth'});
    }

    //Récupération des derniers produits
    const { data, isLoading, error } = useGetLastProductsQuery();

    //Récupération des catégories
    const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useGetCategoriesQuery();

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
                        <button className="btn btn-primary" onClick={goToCategories}>Découvrir</button>
                    </div>
                </div>
                <div className="banner-home">
                    <img src={Banner} alt="Une formule 1 Ferrari"/>
                </div>
            </div>
            <section>
                <h2>Les derniers produits</h2>
                {
                    isLoading ? <Loader /> : error ? <p>{error}</p> : (
                        <div className="cols-2">
                            {
                                data.map((product) => (
                                    <HorizontalCard key={product._id} image={product.image} name={product.name} price={product.price} id={product._id} />
                                ))
                            }
                        </div>
                    )
                }
            </section>
            <section id="categories">
                <h2>Catégories</h2>
                {
                    isLoadingCategories ? <Loader /> : errorCategories ? <p>{errorCategories}</p> : (
                        <div className="cols-3">
                            {
                                categories.map((category) => (
                                    <Card key={category._id} image={category.image} name={formatString(category.name)} category={category._id}  />
                                ))
                            }
                        </div>
                    )
                }
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
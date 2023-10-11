import { useParams } from "react-router-dom";
import { useGetProductsSearchQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import Meta from "../components/Meta";

//Page de recherche
const SearchResults = () => {
    //Récupération du mot clé de recherche
    const { keyword } = useParams();
    //Récupération des produits correspondant au mot clé
    const { data: products, isLoading, error } = useGetProductsSearchQuery(keyword);


    return (
        <div className="products-list">
            <Meta title="Résultats de votre recherche | Le Pit Shop"
                  description="Explorez les résultats de recherche sur Le Pit Shop pour trouver exactement ce que vous cherchez. Découvrez notre
                  sélection de produits de Formule 1, des accessoires de pilote aux vêtements de course, adaptés à chaque passionné de F1. Trouvez les
                  articles parfaits qui reflètent votre amour pour la course automobile. Parcourez nos résultats de recherche et plongez dans
                  l'excitation de l'univers de la Formule 1."
                  keywords="Résultats de recherche, Produits de Formule 1, Boutique en ligne de F1, Accessoires de pilote, Merchandising F1, Vêtements
                  de course, Casques de pilote, Articles de course, Produits dérivés de F1, Fans de course automobile, Boutique de souvenirs de F1,
                  Passionnés de F1, Le Pit Shop, Recherche de produits F1, Équipement de pilote, Boutique de collection F1."
            />
            <h1>Résultats de la recherche pour : <span className="light">{keyword}</span></h1>
            <div className="products-container">
                {
                    isLoading ? <Loader /> :
                        error ? <p>{error.message}</p> :
                        products && products.length === 0 ? (
                        <div className="alert section">
                            <p>Aucun produit ne correspond à votre recherche ...</p>
                        </div>
                    ) : (
                        <>
                            <div className="section products products-search-list">
                                {
                                    products && products.map((product) => (
                                        <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default SearchResults;
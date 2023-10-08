import { useParams } from "react-router-dom";
import { useGetProductsSearchQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

const SearchResults = () => {
    const { keyword } = useParams();

    const { data: products, isLoading, error } = useGetProductsSearchQuery(keyword);


    return (
        <div className="products-list">
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
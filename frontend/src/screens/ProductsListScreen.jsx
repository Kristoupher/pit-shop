import {Link, useParams} from "react-router-dom";
import { useState } from "react";
import BannerCategory from "../components/BannerCategory";
import {SlidersHorizontal} from 'lucide-react';
import { useGetCategoryByIdQuery} from "../slices/categoriesApiSlice";
import { useGetProductsByCategoryQuery,
        useGetProductsByCategoryPriceAscQuery,
        useGetProductsByCategoryPriceDescQuery
        } from "../slices/productsApiSlice";
import formatString from "../utils/utils";
import Loader from "../components/Loader";
import FiltersModal from "../components/FiltersModal";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";

const ProductsListScreen = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    const [priceAsc, setPriceAsc] = useState(false);
    const [priceDesc, setPriceDesc] = useState(false);

    const { category: id } = useParams();

    const { data: category } = useGetCategoryByIdQuery(id);

    const handlePriceAsc = (e) => {
        let value = e.target.value;
        if(value === "asc"){
            setPriceAsc(true);
            setPriceDesc(false);
        } else {
            setPriceAsc(false);
            setPriceDesc(true);
        }
    }

    const { data: products, isLoading: loadingProducts } = useGetProductsByCategoryQuery(id);

    //Trier les produits par prix croissant ou décroissant
    const { data: productsAsc } = useGetProductsByCategoryPriceAscQuery(id);

    const { data: productsDesc } = useGetProductsByCategoryPriceDescQuery(id);




    return (
        <div className="products-list">
            {
                category && <BannerCategory category={formatString(category.name)} image={category.banner}/>
            }
            {
                loadingProducts ? <Loader /> : products.products.length === 0 ? (
                    <div className="alert section">
                        <p>Il n'y a pas de produits dans cette catégorie</p>
                        <div className="center">
                            <Link to="/" className="btn btn-primary section">Retour à l'accueil</Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="filters-container">
                            <div className="cols-2-80 section filters">
                                <div></div>
                                <div>
                                    <select name="filter" id="" onChange={handlePriceAsc}>
                                        <option value="">Trier par</option>
                                        <option value="asc">Prix croissant</option>
                                        <option value="desc">Prix décroissant</option>
                                    </select>
                                    <button onClick={() => setFilterOpen(!filterOpen)}>Filtrer <SlidersHorizontal size={25} color="#2E2E2E"/></button>
                                </div>
                            </div>
                            <FiltersModal filterOpen={filterOpen} setFilterOpen={setFilterOpen}/>
                        </div>
                        <div className="products-container">
                            <div className="section products">
                                <div>
                                    <Filters button={true} />
                                </div>
                                <div>
                                    {
                                        priceAsc ? productsAsc.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                        : priceDesc ? productsDesc.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                        : products.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </div>
    );
};

export default ProductsListScreen;
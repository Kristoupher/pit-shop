import {Link, useParams} from "react-router-dom";
import { useState } from "react";
import BannerCategory from "../components/BannerCategory";
import {SlidersHorizontal} from 'lucide-react';
import { useGetCategoryByIdQuery} from "../slices/categoriesApiSlice";
import { useGetProductsByCategoryQuery,
        useGetProductsByCategoryPriceAscQuery,
        useGetProductsByCategoryPriceDescQuery
        } from "../slices/productsApiSlice";
import {formatString} from "../utils/utils";
import Loader from "../components/Loader";
import FiltersModal from "../components/FiltersModal";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

const ProductsListScreen = () => {
    const { pageNumber } = useParams() || 1;

    const currentPage = pageNumber ? pageNumber : 1;

    const [filterOpen, setFilterOpen] = useState(false);
    const [priceAsc, setPriceAsc] = useState(false);
    const [priceDesc, setPriceDesc] = useState(false);

    const { category: id } = useParams();

    const { data: category } = useGetCategoryByIdQuery(id);

    const urlData = {
        id: id,
        pageNumber: pageNumber
    }

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

    const { data, isLoading: loadingProducts } = useGetProductsByCategoryQuery(urlData);


    //Trier les produits par prix croissant ou décroissant
    const { data: productsAsc } = useGetProductsByCategoryPriceAscQuery(urlData);

    const { data: productsDesc } = useGetProductsByCategoryPriceDescQuery(urlData);




    return (
        <div className="products-list">
            {
                category && <BannerCategory category={formatString(category.name)} image={category.banner}/>
            }
            {
                loadingProducts ? <Loader /> : data && data.products.length === 0 ? (
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
                                        : data && data.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <Pagination currentPage={currentPage} totalPages={data && data.pages} url={`/products/category/${id}/page/`} />

        </div>
    );
};

export default ProductsListScreen;
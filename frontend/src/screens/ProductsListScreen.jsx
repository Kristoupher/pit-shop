import {Link, useParams} from "react-router-dom";
import { useState } from "react";
import BannerCategory from "../components/BannerCategory";
import {SlidersHorizontal} from 'lucide-react';
import { useGetCategoryByIdQuery} from "../slices/categoriesApiSlice";
import { useGetProductsByCategoryQuery,
        useGetProductsByCategoryPriceAscQuery,
        useGetProductsByCategoryPriceDescQuery,
        } from "../slices/productsApiSlice";
import {formatString} from "../utils/utils";
import Loader from "../components/Loader";
import FiltersModal from "../components/FiltersModal";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";

//Page de la liste des produits d'une catégorie
const ProductsListScreen = () => {
    //Récupérer le numéro de la page dans l'URL
    const { pageNumber } = useParams() || 1;
    const currentPage = pageNumber ? pageNumber : 1;

    //Filtres
    const [filterOpen, setFilterOpen] = useState(false);
    const [priceAsc, setPriceAsc] = useState(false);
    const [priceDesc, setPriceDesc] = useState(false);
    const [filters, setFilters] = useState([{teams: [], drivers: [], types: [], sizes: []}]);
    const [filterApplied, setFilterApplied] = useState(false);

    //Récupérer l'id de la catégorie dans l'URL
    const { category: id } = useParams();
    const { data: category } = useGetCategoryByIdQuery(id);

    //Données à envoyer à l'API
    const urlData = {
        id: id,
        pageNumber: pageNumber
    }

    //Trier les produits par prix croissant ou décroissant
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

    //Filtrer les produits
    const handleFilterChange = (values) => {
        setFilters(values);
        setFilterApplied(true);
    }

    //Récupérer les produits de la catégorie
    const { data: products, isLoading: loadingProducts } = useGetProductsByCategoryQuery(urlData);

    //Trier les produits par prix croissant
    const { data: productsAsc } = useGetProductsByCategoryPriceAscQuery(urlData);
    //Trier les produits par prix décroissant
    const { data: productsDesc } = useGetProductsByCategoryPriceDescQuery(urlData);

    // Filter les products en fonction de filtres appliqués (teams, drivers, types, sizes)
    const filterProducts = (products) => {
        let filteredProducts = products;
        if(filters.teams.length > 0){
            filteredProducts = filteredProducts.filter(product => filters.teams.includes(product.team));
        }
        if(filters.drivers.length > 0){
            filteredProducts = filteredProducts.filter(product => filters.drivers.includes(product.driver));
        }
        if(filters.types.length > 0){
            filteredProducts = filteredProducts.filter(product => filters.types.includes(product.type));
        }
        if(filters.sizes.length > 0){
            filteredProducts = filteredProducts.filter(product => {
                let sizes = product.sizes.map(size => size.name);
                return filters.sizes.some(size => sizes.includes(size));
            });
        }
        return filteredProducts;
    }

    return (
        <div className="products-list">
            {
                category && <BannerCategory category={formatString(category.name)} image={category.banner}/>
            }
            {
                loadingProducts ? <Loader /> : products && products.products.length === 0 ? (
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
                            <FiltersModal filterOpen={filterOpen} setFilterOpen={setFilterOpen} setFilters={handleFilterChange} filters={filters}/>
                        </div>
                        <div className="products-container">
                            <div className="section products">
                                <div>
                                    <Filters button={true} setFilters={handleFilterChange} filters={filters} />
                                </div>
                                <div>
                                    {
                                        priceAsc ? productsAsc.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                        : priceDesc ? productsDesc.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                        : filterApplied ? filterProducts(products.products).map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                        : products && products.products.map(product => (
                                            <ProductCard key={product._id} image={product.image} name={product.name} id={product._id} price={product.price} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
            <Pagination currentPage={currentPage} totalPages={products && products.pages} url={`/products/category/${id}/page/`} />

        </div>
    );
};

export default ProductsListScreen;
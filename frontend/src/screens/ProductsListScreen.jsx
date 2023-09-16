import { useParams} from "react-router-dom";
import { useState } from "react";
import formatString from "../utils/utils.js";
import BannerCategory from "../components/BannerCategory";
import Image from '../assets/images/banner-contact.jpg';
import { SlidersHorizontal, XCircle,  } from 'lucide-react';
import FiltersModal from "../components/FiltersModal";
import ProductCard from "../components/ProductCard";
import Mercedes from '../assets/images/mercedes.svg';

const ProductsListScreen = () => {
    const [filterOpen, setFilterOpen] = useState(false);
    let {category} = useParams();
    category = formatString(category);


    return (
        <div className="products-list">
            <BannerCategory category={category} image={Image}/>
            <div className="filters-container">
                <div className="cols-2-80 section filters">
                    <div></div>
                    <div>
                        <select name="filter" id="">
                            <option value="">Trier par</option>
                            <option value="1">Prix croissant</option>
                            <option value="1">Prix décroissant</option>
                        </select>
                        <button onClick={() => setFilterOpen(!filterOpen)}>Filtrer <SlidersHorizontal size={25} color="#2E2E2E"/></button>
                    </div>
                </div>
                <FiltersModal filterOpen={filterOpen} setFilterOpen={setFilterOpen}/>
            </div>
            <div className="products-container">
                <div className="section products">
                    <div></div>
                    <div>
                        <ProductCard image={Mercedes} name='Polo Mercedes F1 Team' id="23fe45fef4" price='45,00' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsListScreen;
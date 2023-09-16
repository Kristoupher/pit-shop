import { useParams} from "react-router-dom";
import formatString from "../utils/utils.js";

const ProductsListScreen = () => {
    let {category} = useParams();
    category = formatString(category);


    return (
        <div className="products-list">
            <h1>{category}</h1>
        </div>
    );
};

export default ProductsListScreen;
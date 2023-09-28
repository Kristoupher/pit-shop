import {Eye, Pencil, Shirt, Trash2} from 'lucide-react';
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {formatPrice, formatString, formatDate } from "../../utils/utils";
import { useGetProductsQuery } from "../../slices/productsApiSlice";

const ProductsPanel = () => {
    const { pageNumber, keyword  } = useParams();
    const { data: products, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

    const deleteHandler = (id) => {
    }
    return (
                <section className="account">
                    <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
                    <h1 className="flex flex-align-center"><Shirt size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des Produits</h1>
                    {
                        isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                            <div className="table-responsive section">
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Prix</th>
                                        <th>Date de création</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        products && products.products.map(product => (
                                            <tr>
                                                <td>{formatString(product.name)}</td>
                                                <td>{formatPrice(product.price)}</td>
                                                <td>{formatDate(product.createdAt)}</td>
                                                <td className="flex flex-center">
                                                    <Link className="circle-btn circle-btn-primary" to={`/admin/product/${product._id}`}><Eye size={30} color="#2E2E2E" /></Link>
                                                    <Link className="circle-btn circle-btn-secondary" to={`/admin/product/edit/${product._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                                    <button className="circle-btn circle-btn-danger" onClick={() => deleteHandler(product._id)}><Trash2 size={30} color="#2E2E2E" /></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </section>
    );
};

export default ProductsPanel;
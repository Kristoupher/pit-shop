import {Bookmark, Eye, Pencil, Trash2} from "lucide-react";
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";
import {formatDate, formatString} from "../../utils/utils";
import { useGetCategoriesQuery} from "../../slices/categoriesApiSlice";

const CategoriesPanelScreen = () => {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    const deleteHandler = (id) => {

    }

    return (
        <section className="account">
            <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
            <h1 className="flex flex-align-center"><Bookmark size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des catégories</h1>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="table-responsive section">
                        <table>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Date de création</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                categories && categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{formatString(category.name)}</td>
                                        <td>{formatDate(category.createdAt)}</td>
                                        <td className="flex flex-center">
                                            <Link className="circle-btn circle-btn-primary" to={`/admin/category/${category._id}`}><Eye size={30} color="#2E2E2E" /></Link>
                                            <Link className="circle-btn circle-btn-secondary" to={`/admin/category/edit/${category._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                            <button className="circle-btn circle-btn-danger" onClick={() => deleteHandler(category._id)}><Trash2 size={30} color="#2E2E2E" /></button>
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

export default CategoriesPanelScreen;
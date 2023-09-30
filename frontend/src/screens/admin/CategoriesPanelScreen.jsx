import {Bookmark, Eye, Pencil, Trash2, XCircle} from "lucide-react";
import Loader from "../../components/Loader";
import {Link} from "react-router-dom";
import {formatDate, formatPrice, formatString} from "../../utils/utils";
import { useGetCategoriesQuery, useDeleteCategoryMutation} from "../../slices/categoriesApiSlice";
import {useState} from "react";
import {toast} from "react-toastify";

const CategoriesPanelScreen = () => {
    const { data: categories, refetch, isLoading, error } = useGetCategoriesQuery();

    const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

    const [catModals, setCatModals] = useState({});
    const [deleteModal, setDeleteModal] = useState({});

    const openModal = (productId) => {
        setCatModals((prevCatModals) => ({
            ...prevCatModals,
            [productId]: true,
        }));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const openDeleteModal = (productId) => {
        setDeleteModal((prevDeleteModal) => ({
            ...prevDeleteModal,
            [productId]: true,
        }));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const closeModal = (userId) => {
        setCatModals((prevCatModals) => ({
            ...prevCatModals,
            [userId]: false,
        }));
    };

    const closeDeleteModal = (userId) => {
        setDeleteModal((prevDeleteModal) => ({
            ...prevDeleteModal,
            [userId]: false,
        }));
    }

    const deleteHandler = async (id) => {
        try {
            await deleteCategory(id);
            closeDeleteModal(id);
            toast.success("Catégorie supprimée avec succès");
            refetch();
        } catch (err) {
            toast(err?.data?.message || err.error);
        }
    }

    return (
        <section className="account">
            <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
            <div className="flex-between-desktop">
                <h1 className="flex flex-align-center"><Bookmark size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des catégories</h1>
                <Link className="btn btn-primary" to="/admin/category/create">Ajouter une catégorie</Link>
            </div>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="table-responsive section">
                        <table>
                            <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Date de création</th>
                                <th></th>
                                <th></th>
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
                                            <button className="circle-btn circle-btn-primary" onClick={() => openModal(category._id)}><Eye size={30} color="#2E2E2E" /></button>
                                            <Link className="circle-btn circle-btn-secondary" to={`/admin/category/edit/${category._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                            <button className="circle-btn circle-btn-danger" onClick={() => openDeleteModal(category._id)}><Trash2 size={30} color="#2E2E2E" /></button>
                                        </td><td>
                                        <div className={`modal ${catModals[category._id] ? 'active' : ''}`}>
                                            <div className="modal-content">
                                                <span onClick={() => closeModal(category._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                <p className="title">{formatString(category.name)}</p>
                                                <div className="banner">
                                                    <img src={category.banner} alt={category.name}/>
                                                </div>
                                                <div className="flex flex-align-center">
                                                    <div className="img">
                                                        <img src={category.image} alt={category.name}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                        <td>
                                            <div className={`modal ${deleteModal[category._id] ? 'active' : ''}`}>
                                                <div className="modal-content">
                                                    <span onClick={() => closeDeleteModal(category._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                    <p className='mb-5 mt-6'><strong>Êtes-vous sûr de vouloir supprimer la catégorie suivante ?</strong></p>
                                                    <p>{formatString(category.name)}</p>
                                                    <div className="flex flex-center mt-6">
                                                        <button className="btn btn-primary mr-5" onClick={() => deleteHandler(category._id)}>Supprimer</button>
                                                        <button className="btn btn-danger" onClick={() => closeDeleteModal(category._id)}>Annuler</button>
                                                    </div>
                                                </div>
                                            </div>
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
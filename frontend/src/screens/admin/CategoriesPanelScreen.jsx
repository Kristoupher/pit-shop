import {Bookmark, Eye, Pencil, Trash2, XCircle} from "lucide-react";
import Loader from "../../components/Loader";
import {Link, useParams} from "react-router-dom";
import {formatDate, formatPrice, formatString} from "../../utils/utils";
import { useGetCategoriesQuery, useDeleteCategoryMutation} from "../../slices/categoriesApiSlice";
import {useState} from "react";
import {toast} from "react-toastify";
import Pagination from "../../components/Pagination";
import Meta from "../../components/Meta";

//Panneau de gestion des catégories
const CategoriesPanelScreen = () => {
    //Récupération du numéro de page dans l'URL
    const { pageNumber } = useParams() || 1;
    const currentPage = pageNumber ? pageNumber : 1;

    // Récupération des catégories
    const { data, refetch, isLoading, error } = useGetCategoriesQuery(pageNumber);

    // Suppression d'une catégorie
    const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

    //States pour la modal de visualisation d'une catégorie et la modal de suppression d'une catégorie
    const [catModals, setCatModals] = useState({});
    const [deleteModal, setDeleteModal] = useState({});

    //Ouverture des modales de visualisation
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

    //Ouverture des modales de suppression
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

    //Fermeture des modales de visualisation
    const closeModal = (userId) => {
        setCatModals((prevCatModals) => ({
            ...prevCatModals,
            [userId]: false,
        }));
    };

    //Fermeture des modales de suppression
    const closeDeleteModal = (userId) => {
        setDeleteModal((prevDeleteModal) => ({
            ...prevDeleteModal,
            [userId]: false,
        }));
    }

    //Suppression d'une catégorie
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
            <Meta title="Gestion des catégories | Le Pit Shop"
                  description="Gérez efficacement les catégories de produits sur Le Pit Shop avec notre interface d'administration conviviale.
                  Organisez vos produits de Formule 1 en différentes catégories pour une navigation fluide des clients. Ajoutez, modifiez ou
                  supprimez des catégories en quelques clics. Optimisez la structure de votre boutique F1 et offrez à vos clients une expérience de
                  shopping F1 simplifiée."
                  keywords="Panneau d'administration des catégories, Gestion des catégories, Organisation des produits, Catégories de Formule 1,
                  Boutique en ligne de F1, Produits de Formule 1, Fans de course automobile, Navigation simplifiée, Gestion des produits, Le Pit Shop,
                  Structure de la boutique, Expérience de shopping F1, Interface conviviale."
            />
            <Link title="Retour" className="btn btn-primary mb-5" to="/admin">Retour</Link>
            <div className="flex-between-desktop">
                <h1 className="flex flex-align-center"><Bookmark size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des catégories</h1>
                <Link title="Ajouter une catégorie" className="btn btn-primary" to="/admin/category/create">Ajouter une catégorie</Link>
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
                                data && data.categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{formatString(category.name)}</td>
                                        <td>{formatDate(category.createdAt)}</td>
                                        <td className="flex flex-center">
                                            <button title="Visualiser" className="circle-btn circle-btn-primary" onClick={() => openModal(category._id)}><Eye size={30} color="#2E2E2E" /></button>
                                            <Link title="Modifier" className="circle-btn circle-btn-secondary" to={`/admin/category/edit/${category._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                            <button title="Supprimer" className="circle-btn circle-btn-danger" onClick={() => openDeleteModal(category._id)}><Trash2 size={30} color="#2E2E2E" /></button>
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
                                                    <span title="Fermer" onClick={() => closeDeleteModal(category._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                    <p className='mb-5 mt-6'><strong>Êtes-vous sûr de vouloir supprimer la catégorie suivante ?</strong></p>
                                                    <p>{formatString(category.name)}</p>
                                                    <div className="flex flex-center mt-6">
                                                        <button title="Supprimer" className="btn btn-primary mr-5" onClick={() => deleteHandler(category._id)}>Supprimer</button>
                                                        <button title="Annuler" className="btn btn-danger" onClick={() => closeDeleteModal(category._id)}>Annuler</button>
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
            <Pagination currentPage={currentPage} totalPages={data?.totalPages} url="/admin/categories/" />
        </section>
    );
};

export default CategoriesPanelScreen;
import {Eye, Pencil, Shirt, Trash2, XCircle} from 'lucide-react';
import {Link} from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {formatPrice, formatString, formatDate} from "../../utils/utils";
import { useGetProductsQuery, useDeleteProductMutation } from "../../slices/productsApiSlice";
import {toast} from "react-toastify";
import Pagination from "../../components/Pagination";
import Meta from "../../components/Meta";


//Gestion des produits
const ProductsPanelScreen = () => {
    //Récupération du numéro de page
    const { pageNumber } = useParams() || 1;
    const currentPage = pageNumber ? pageNumber : 1;
    //Récupération des produits
    const { data, refetch, isLoading, error } = useGetProductsQuery(pageNumber);
    //Suppression d'un produit
    const [ deleteProduct, { isLoading: loadingDelete } ] = useDeleteProductMutation();
    //States pour les modals
    const [userModals, setUserModals] = useState({});
    const [deleteModal, setDeleteModal] = useState({});

    //Ouverture des modals de visualisation
    const openModal = (productId) => {
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
            [productId]: true,
        }));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    //Ouverture des modals de suppression
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

    //Fermeture des modals de visualisation
    const closeModal = (userId) => {
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
            [userId]: false,
        }));
    };

    //Fermeture des modals de suppression
    const closeDeleteModal = (userId) => {
        setDeleteModal((prevDeleteModal) => ({
            ...prevDeleteModal,
            [userId]: false,
        }));
    }

    //Suppression d'un produit
    const deleteHandler  = async (id) => {
        try {
            await deleteProduct(id);
            closeDeleteModal(id);
            toast.success("Produit supprimé avec succès");
            refetch();
        } catch (err) {
            toast(err?.data?.message || err.error);
        }
    };

    return (
                <section className="account">
                    <Meta title="Gestion des produits | Le Pit Shop"
                          description="Gérez efficacement votre inventaire de produits de Formule 1 sur Le Pit Shop avec notre interface
                          d'administration conviviale. Ajoutez, modifiez ou supprimez des produits en un instant. Suivez les stocks, mettez à jour les
                          détails et optimisez votre catalogue pour offrir une expérience de shopping F1 exceptionnelle. Simplifiez votre gestion
                          des produits et proposez les meilleures sélections à vos clients."
                          keywords="Gestion des produits, Inventaire de produits, Ajout de produits, Modification de produits, Suppression de
                          produits, Produits de Formule 1, Interface d'administration, Boutique en ligne de F1, Fans de course automobile, Expérience
                          de gestion des produits, Le Pit Shop, Optimisation du catalogue, Interface conviviale, Suivi des stocks."
                    />
                    <Link title="Retour" className="btn btn-primary mb-5" to="/admin">Retour</Link>
                    <div className="flex-between-desktop">
                        <h1 className="flex flex-align-center"><Shirt size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des Produits</h1>
                        <Link title="Ajouter un produit" to="/admin/product/create" className="btn btn-primary">Ajouter un produit</Link>
                    </div>
                    {
                        isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                            <div className="table-responsive section">
                                <table>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nom</th>
                                        <th>Prix</th>
                                        <th>Date de création</th>
                                        <th>Actions</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        data && data.products.map(product => (
                                            <tr>
                                                <td><img src={product.image} alt={product.name}/></td>
                                                <td>{formatString(product.name)}</td>
                                                <td>{formatPrice(product.price)}</td>
                                                <td>{formatDate(product.createdAt)}</td>
                                                <td className="flex flex-center btns">
                                                    <button title="Visualiser" className="circle-btn circle-btn-primary" onClick={() => openModal(product._id)}><Eye size={30} color="#2E2E2E" /></button>
                                                    <Link title="Modifier" className="circle-btn circle-btn-secondary" to={`/admin/product/edit/${product._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                                    <button title="Supprimer" className="circle-btn circle-btn-danger" onClick={() => openDeleteModal(product._id)}><Trash2 size={30} color="#2E2E2E" /></button>
                                                </td>
                                                <td>
                                                    <div className={`modal ${userModals[product._id] ? 'active' : ''}`}>
                                                        <div className="modal-content">
                                                            <span onClick={() => closeModal(product._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                            <p className="title">{product.name}</p>
                                                            <div className="flex flex-align-center">
                                                                <div className="img">
                                                                    <img src={product.image} alt={product.name}/>
                                                                </div>
                                                                    <span className="price-title">{formatPrice(product.price)}</span>
                                                            </div>
                                                            <p>{product.description}</p>
                                                            {
                                                                product.team && (
                                                                    <p className="mt-6"><strong>Équipe :</strong> {formatString(product.team)}</p>
                                                                )
                                                            }
                                                            {
                                                                product.driver && (
                                                                    <p><strong>Pilote :</strong> {formatString(product.driver)}</p>
                                                                )
                                                            }
                                                            {
                                                                product.type && (
                                                                    <p><strong>Type :</strong> {formatString(product.type)}</p>
                                                                )
                                                            }
                                                            <p className="mt-6"><strong>Tailles :</strong></p>
                                                            <ul className="sizes-container">
                                                                {
                                                                    product.sizes.map(size => (
                                                                        <li className="size">{size.name}</li>
                                                                    ))
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className={`modal ${deleteModal[product._id] ? 'active' : ''}`}>
                                                        <div className="modal-content">
                                                            <span onClick={() => closeDeleteModal(product._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                            <p className='mb-5 mt-6'><strong>Êtes-vous sûr de vouloir supprimer le produit suivant ?</strong></p>
                                                            <p>{formatString(product.name)}</p>
                                                            <div className="flex flex-center mt-6">
                                                                <button title="Supprimer" className="btn btn-primary mr-5" onClick={() => deleteHandler(product._id)}>Supprimer</button>
                                                                <button title="Annuler" className="btn btn-danger" onClick={() => closeDeleteModal(product._id)}>Annuler</button>
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
                    <Pagination currentPage={currentPage} totalPages={data && data.pages} url="/admin/products/page/" />
                </section>
    );
};

export default ProductsPanelScreen;
import {Eye, Pencil, Shirt, Trash2, XCircle} from 'lucide-react';
import {Link} from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import {formatPrice, formatString, formatDate} from "../../utils/utils";
import { useGetProductsQuery, useDeleteProductMutation } from "../../slices/productsApiSlice";
import {toast} from "react-toastify";
import Pagination from "../../components/Pagination";

const ProductsPanelScreen = () => {
    const { pageNumber } = useParams() || 1;

    const currentPage = pageNumber ? pageNumber : 1;

    const { data, refetch, isLoading, error } = useGetProductsQuery(pageNumber);

    const [ deleteProduct, { isLoading: loadingDelete } ] = useDeleteProductMutation();

    const [userModals, setUserModals] = useState({});
    const [deleteModal, setDeleteModal] = useState({});


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
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
            [userId]: false,
        }));
    };

    const closeDeleteModal = (userId) => {
        setDeleteModal((prevDeleteModal) => ({
            ...prevDeleteModal,
            [userId]: false,
        }));
    }

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
                    <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
                    <div className="flex-between-desktop">
                        <h1 className="flex flex-align-center"><Shirt size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des Produits</h1>
                        <Link to="/admin/product/create" className="btn btn-primary">Ajouter un produit</Link>
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
                                                    <button className="circle-btn circle-btn-primary" onClick={() => openModal(product._id)}><Eye size={30} color="#2E2E2E" /></button>
                                                    <Link className="circle-btn circle-btn-secondary" to={`/admin/product/edit/${product._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                                    <button className="circle-btn circle-btn-danger" onClick={() => openDeleteModal(product._id)}><Trash2 size={30} color="#2E2E2E" /></button>
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
                                                                <button className="btn btn-primary mr-5" onClick={() => deleteHandler(product._id)}>Supprimer</button>
                                                                <button className="btn btn-danger" onClick={() => closeDeleteModal(product._id)}>Annuler</button>
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
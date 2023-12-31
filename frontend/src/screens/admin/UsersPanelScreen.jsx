import { Eye, Pencil, Trash2, User2, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import { formatString, removeFirstChar } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useState } from "react";
import {toast} from "react-toastify";
import Pagination from "../../components/Pagination";
import Meta from "../../components/Meta";


//Gestion des utilisateurs
const UsersPanelScreen = () => {
    //Récupération du numéro de page
    const { pageNumber } = useParams() || 1;
    const currentPage = pageNumber ? pageNumber : 1;

    //Récupération des utilisateurs
    const { data, refetch, isLoading, error } = useGetUsersQuery(pageNumber);
    //Récupération des informations de l'utilisateur connecté
    const { userInfo } = useSelector((state) => state.auth);
    //Suppression d'un utilisateur
    const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
    //Gestion des modales
    const [userModals, setUserModals] = useState({});
    const [deleteModal, setDeleteModal] = useState({});

    //Ouverture des modales de visualisation
    const openModal = (userId) => {
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
            [userId]: true,
        }));
    };

    //Ouverture des modales de suppression
    const openDeleteModal = (userId) => {
        setDeleteModal((prevDeleteModal) => ({
            ...prevDeleteModal,
            [userId]: true,
        }));
    }

    //Fermeture des modales de visualisation
    const closeModal = (userId) => {
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
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

    //Suppression d'un utilisateur
    const deleteHandler  = async (id) => {
        try {
            await deleteUser(id);
            closeDeleteModal(id);
            toast.success('Utilisateur supprimé avec succès');
            refetch();
        } catch (err) {
            toast(err?.data?.message || err.error);
        }
    };


    return (
        <section className="account">
            <Meta title="Gestion des Utilisateurs | Le Pit Shop"
                  description="Explorez la liste complète des utilisateurs sur Le Pit Shop avec notre interface d'administration conviviale. Consultez
                  les détails des comptes, gérez les autorisations et suivez l'activité des utilisateurs en temps réel. Optimisez votre gestion des
                  comptes utilisateurs et assurez une expérience client exceptionnelle sur notre boutique F1 en ligne."
                  keywords="Liste des utilisateurs, Gestion des comptes, Détails des comptes, Autorisations utilisateur, Boutique en ligne de F1,
                  Fans de course automobile, Expérience de gestion des utilisateurs, Le Pit Shop, Interface conviviale, Suivi de l'activité utilisateur,
                  Administration de comptes, Outils de gestion d'utilisateur."
            />
            <Link title="Retour" className="btn btn-primary mb-5" to="/admin">Retour</Link>
            <h1 className="flex flex-align-center"><User2 size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des Utilisateurs</h1>
            {isLoading ? (<Loader />) : error ? (<p>{error.message}</p>) : (
                <div className="table-responsive section">
                    <table>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data &&
                            data.users.map((user) => (
                                userInfo._id !== user._id &&
                                <tr key={user._id}>
                                    <td>{formatString(user.lastname)}</td>
                                    <td>{formatString(user.firstname)}</td>
                                    <td>{user.isAdmin ? "Administrateur" : "Utilisateur"}</td>
                                    <td className="flex flex-center">
                                        <button title="Visualiser" onClick={() => openModal(user._id)} className="circle-btn circle-btn-primary"><Eye size={30} color="#2E2E2E" /></button>
                                        <Link title="Modifier" className="circle-btn circle-btn-secondary" to={`/admin/user/edit/${user._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                        <button title="Supprimer" className="circle-btn circle-btn-danger" onClick={() => openDeleteModal(user._id)}><Trash2 size={30} color="#2E2E2E" /></button>
                                    </td>
                                    <td>
                                        <div className={`modal ${userModals[user._id] ? 'active' : ''}`}>
                                            <div className="modal-content">
                                                <span onClick={() => closeModal(user._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                <p className="title"><strong>{formatString(user.gender)}</strong>{" "}{formatString(user.firstname)}{" "}{formatString(user.lastname)}</p>
                                                <p className="badge">{user.isAdmin ? "Administrateur" : "Utilisateur"}</p>
                                                <p>{formatString(user.address.street)}</p>
                                                <p>{user.address.postalCode}{" "}{formatString(user.address.city)}</p>
                                                <Link title={`Contacter ${user.mail}`} className="mail" to={`mailto:${user.mail}`}>{user.mail}</Link>
                                                <Link title={`Appeler ${user.phone}`} to={`tel:+33${removeFirstChar(user.phone)}`}>{user.phone}</Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`modal ${deleteModal[user._id] ? 'active' : ''}`}>
                                            <div className="modal-content">
                                                <span onClick={() => closeDeleteModal(user._id)}><XCircle size={35} color="#2E2E2E" /></span>
                                                <p className='mb-5 mt-6'><strong>Êtes-vous sûr de vouloir supprimer l'utilisateur suivant ?</strong></p>
                                                <p>{formatString(user.firstname)} {formatString(user.lastname)}</p>
                                                <div className="flex flex-center mt-6">
                                                    <button title="Supprimer" className="btn btn-primary mr-5" onClick={() => deleteHandler(user._id)}>Supprimer</button>
                                                    <button title="Annuler" className="btn btn-danger" onClick={() => closeDeleteModal(user._id)}>Annuler</button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <Pagination currentPage={currentPage} totalPages={data && data.pages} url="/admin/users/page/" />
        </section>
    );
};

export default UsersPanelScreen;

import { Eye, Pencil, Trash2, User2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import { formatString, removeFirstChar } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useState } from "react";

const UsersPanel = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();
    const { userInfo } = useSelector((state) => state.auth);

    const deleteHandler = (id) => {};

    const [userModals, setUserModals] = useState({});

    const openModal = (userId) => {
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
            [userId]: true,
        }));
    };

    const closeModal = (userId) => {
        setUserModals((prevUserModals) => ({
            ...prevUserModals,
            [userId]: false,
        }));
    };

    return (
        <section className="account">
            <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
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
                        </tr>
                        </thead>
                        <tbody>
                        {users &&
                            users.map((user) => (
                                userInfo._id !== user._id &&
                                <tr key={user._id}>
                                    <td>{formatString(user.lastname)}</td>
                                    <td>{formatString(user.firstname)}</td>
                                    <td>{user.isAdmin ? "Administrateur" : "Utilisateur"}</td>
                                    <td className="flex flex-center">
                                        <button onClick={() => openModal(user._id)} className="circle-btn circle-btn-primary"><Eye size={30} color="#2E2E2E" /></button>
                                        <Link className="circle-btn circle-btn-secondary" to={`/admin/user/edit/${user._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                        <button className="circle-btn circle-btn-danger" onClick={() => deleteHandler(user._id)}><Trash2 size={30} color="#2E2E2E" /></button>
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
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default UsersPanel;

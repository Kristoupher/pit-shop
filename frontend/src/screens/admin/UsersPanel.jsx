import {Eye, Pencil, Trash2, User2} from "lucide-react";
import {Link} from "react-router-dom";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import Loader from "../../components/Loader";
import { formatString } from "../../utils/utils";
import { useSelector } from "react-redux";

const UsersPanel = () => {
    const { data: users, isLoading, error } = useGetUsersQuery();

    const { userInfo } = useSelector(state => state.auth);

    const deleteHandler = (id) => {
    }

    return (
            <section className="account">
                <Link className="btn btn-primary mb-5" to="/admin">Retour</Link>
                <h1 className="flex flex-align-center"><User2 size={30} color="#2E2E2E" strokeWidth={3} /> Gestion des Utilisateurs</h1>
                {
                    isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                        <div className="table-responsive section">
                            <table>
                                <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Rôle</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    users && users.map(user => (
                                            user._id === userInfo._id ? null :
                                        <tr>
                                            <td>{formatString(user.lastname)}</td>
                                            <td>{formatString(user.firstname)}</td>
                                            <td>{user.isAdmin ? "Administrateur" : "Utilisateur"}</td>
                                            <td className="flex flex-center">
                                                <Link className="circle-btn circle-btn-primary" to={`/admin/user/${user._id}`}><Eye size={30} color="#2E2E2E" /></Link>
                                                <Link className="circle-btn circle-btn-secondary" to={`/admin/user/edit/${user._id}`}><Pencil size={30} color="#2E2E2E" /></Link>
                                                <button className="circle-btn circle-btn-danger" onClick={() => deleteHandler(user._id)}><Trash2 size={30} color="#2E2E2E" /></button>
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

export default UsersPanel;
import { useState } from "react";
import {Link} from "react-router-dom";

const ProductCreateScreen = () => {
    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[description, setDescription] = useState('');
    const[team, setTeam] = useState('');
    const[driver, setDriver] = useState('');
    const[image, setImage] = useState('');


    const handleSubmit = async (e) => {

    }

    return (
        <section>
            <Link to="/admin/products" className="btn btn-primary mb-5">Retour</Link>
            <h1>Ajouter un produit</h1>
            <div className="account section">
                <form className="form section">
                    <div className="form-group center">
                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" id="image" />
                    </div>
                    <div className="form-duo">
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input type="text" name="name" id="name" placeholder="Nom du produit" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Prix</label>
                            <input type="number" name="price" id="price" placeholder="Prix du produit" onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-duo">
                        <div className="form-group">
                            <label htmlFor="team">Équipe</label>
                            <input type="text" name="team" id="team" placeholder="Équipe" onChange={(e) => setTeam(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driver">Pilote</label>
                            <input type="text" name="driver" id="driver" placeholder="Pilote" onChange={(e) => setDriver(e.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea rows={8} name="description" id="description" placeholder="Description du produit" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="btn-container">
                        <button onClick={handleSubmit} className="btn btn-primary">Ajouter</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ProductCreateScreen;
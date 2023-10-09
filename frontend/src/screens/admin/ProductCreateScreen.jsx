import { useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import { useCreateProductMutation, useUploadProductImageMutation } from "../../slices/productsApiSlice";
import {formatString} from "../../utils/utils";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";

const ProductCreateScreen = () => {
    const { pageNumber } = useParams() || 1;
    const { category: categoryId } = useParams();
    const navigate = useNavigate();

    const[name, setName] = useState('');
    const[price, setPrice] = useState('');
    const[description, setDescription] = useState('');
    const[team, setTeam] = useState('');
    const[driver, setDriver] = useState('');
    const[image, setImage] = useState(null);
    const[sizes, setSizes] = useState([]);
    const[category, setCategory] = useState('');
    const [sizeName, setSizeName] = useState('');
    const [sizeQuantity, setSizeQuantity] = useState(0);
    const [type, setType] = useState('');

    const { data } = useGetCategoriesQuery(pageNumber);

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

    const addSizeHandler = (e) => {
        e.preventDefault();
        if(sizeName !== '' && sizeQuantity !== 0 && sizeQuantity > 0 && !sizes.find(size => size.name === sizeName)) {
            setSizes([...sizes, { name: sizeName, quantityInStock: sizeQuantity }]);
            setSizeName('');
            setSizeQuantity(0);
        }
    }

    const handleDeleteSize = (name) => (e) => {
        e.preventDefault();
        setSizes(sizes.filter(size => size.name !== name));
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (image !== null && name !== '' && description !== '' && price !== '' && category !== '' && sizes.length > 0) {
                const formData = new FormData();
                formData.append('image', image);
                const res = await uploadProductImage(formData).unwrap();
                const data = {
                    name,
                    price,
                    description,
                    team: team.toLowerCase(),
                    driver: driver.toLowerCase(),
                    image: res.image,
                    category,
                    sizes,
                    type: type.toLowerCase()
                }
                await createProduct(data).unwrap();
                toast.success("Produit ajouté avec succès");
                navigate('/admin/products');
            } else {
                toast.error("Vous devez remplir tous les champs");
            }
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    }

    return (
        <section>
            <Link to="/admin/products" className="btn btn-primary mb-5">Retour</Link>
            <h1>Ajouter un produit</h1>
            <div className="account section">
                <form className="form section">
                    <div className="form-group center">
                        <label htmlFor="image">Image</label>
                        <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
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
                    <p><strong>Catégorie</strong></p>
                    <div className="form-duo">
                        <div className="form-group flex flex-center">
                            <label htmlFor="type">Type</label>
                            <input type="text" name="type" id="type" placeholder="Type" onChange={(e) => setType(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Catégorie</label>
                            {
                                <select className="w-100" name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choisir une catégorie</option>
                                    {
                                        data.categories?.map((category) => (
                                                <option key={category._id} value={category._id}>{formatString(category.name)}</option>
                                        ))
                                    }
                                </select>
                            }
                        </div>
                    </div>
                    <p><strong>Tailles</strong>(Si pas de taille, merci de saisir taille unique)</p>
                    <div className="form-duo flex flex-align-center flex-center mb-5">
                        <div className="form-group m-0">
                            <label htmlFor="size">Taille</label>
                            <input type="text" name="size" id="size" value={sizeName} placeholder="Taille" onChange={(e) => setSizeName(e.target.value)} />
                        </div>
                        <div className="form-group m-0">
                            <label htmlFor="quantity">Quantité</label>
                            <input type="number" name="quantity" id="quantity" value={sizeQuantity} placeholder="Quantité" onChange={(e) => setSizeQuantity(e.target.value)} />
                        </div>
                        <button className="btn btn-success" onClick={addSizeHandler}>Ajouter</button>
                    </div>
                    <div className="form-group flex flex-center">
                        <ul className="sizes-container">
                            {
                                sizes.map((size) => (
                                    <li key={size.name}>
                                        <span className="size flex flex-center">{size.name}({size.quantityInStock}) <XCircle className="pointer" size={20} color="#2E2E2E" onClick={handleDeleteSize(size.name)} /></span>
                                    </li>
                                ))
                            }
                        </ul>
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
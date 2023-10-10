import { useState, useEffect } from 'react';
import { useGetProductDetailsQuery,
            useUpdateProductMutation,
            useUploadProductImageMutation,
            useDeleteProductImageMutation,
        } from "../../slices/productsApiSlice";
import { useGetCategoriesQuery } from "../../slices/categoriesApiSlice";
import {Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import {formatString, formatInsertion, getFileName} from "../../utils/utils";

//Edition d'un produit
const ProductEditScreen = () => {
    //Récupération des paramètres de l'URL
    const { pageNumber } = useParams() || 1;
    const { category: categoryId } = useParams();

    const navigate = useNavigate();

    const { id: productId } = useParams();

    //Récupération des catégories
    const { data } = useGetCategoriesQuery(pageNumber);
    //Récupération des détails du produit
    const { data: product, refetch, isLoading, error } = useGetProductDetailsQuery(productId);
    //Mise à jour du produit
    const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
    //Upload de l'image du produit
    const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
    //Suppression de l'image du produit
    const [deleteProductImage, { isLoading: loadingDelete }] = useDeleteProductImageMutation();

    // States
    const [image, setImage] = useState(product && product.image);
    const [uploading, setUploading] = useState(null);
    const [name, setName] = useState(product && product.name);
    const [price, setPrice] = useState(product && product.price);
    const [description, setDescription] = useState(product && product.description);
    const [sizes, setSizes] = useState(product && product.sizes);
    const [category, setCategory] = useState(product && product.category);
    const [team, setTeam] = useState(product && product.team);
    const [driver, setDriver] = useState(product && product.driver);
    const [type, setType] = useState(product && product.type);

    //Mise à jour des states
    useEffect(() => {
        if(product) {
            setImage(product.image);
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setSizes(product.sizes);
            setCategory(product.category);
            setTeam(product.team);
            setDriver(product.driver);
            setType(product.type);
        }
    }, [product]);

    //Mise à jour de l'image
    const handleUpload = async (e) => {
        setUploading(e.target.files[0]);
    }

    //Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let img;
            if(uploading !== null) {
                if(image !== null && name !== '' && description !== '' && price !== '' && category !== '' && sizes.length > 0) {
                    //Suppression de l'ancienne image et upload de la nouvelle
                    const fileName = getFileName(image);
                    const formData = new FormData();
                    formData.append('image', uploading);
                    await deleteProductImage(fileName).unwrap();
                    const res = await uploadProductImage(formData).unwrap();
                    img = res.image;
                }
            } else {
                img = product.image;
            }
            //Mise à jour du produit
            await updateProduct({ productId, name, price, description, sizes, category, type: type.toLowerCase(), image: img, team: formatInsertion(team), driver: formatInsertion(driver)  });
            toast.success('Le produit a été modifié avec succès');
            refetch();
            navigate('/admin/products');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }

    }



    return (
        <section>
            <Link to="/admin/products" className="btn btn-primary mb-5">Retour</Link>
            <h1>Modification d'un produit</h1>
            {
                isLoading ? <Loader /> : error ? <p>{error.message}</p> : (
                    <div className="section signup edit-form">
                        <form className="form section">
                            <div className="form-duo flex flex-align-center">
                                <div className="form-group img-container">
                                    <div className="img">
                                        <img src={image} alt={name} />
                                    </div>
                                </div>
                                <div className="form-group center">
                                    <label htmlFor="image">Image</label>
                                    <input type="file" name="image" id="image" onChange={handleUpload} />
                                </div>
                            </div>
                            <div className="form-duo">
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input type="text" name="name" id="name" placeholder="Nom du produit" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price">Prix</label>
                                    <input type="number" name="price" id="price" placeholder="Prix du produit" defaultValue={price} onChange={(e) => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-duo">
                                <div className="form-group">
                                    <label htmlFor="team">Équipe</label>
                                    <input type="text" name="team" id="team" placeholder="Équipe" defaultValue={team} onChange={(e) => setTeam(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="driver">Pilote</label>
                                    <input type="text" name="driver" id="driver" placeholder="Pilote" defaultValue={driver} onChange={(e) => setDriver(e.target.value)} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea rows={8} name="description" id="description" placeholder="Description du produit" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <p><strong>Catégorie</strong></p>
                            <div className="form-duo">
                                <div className="form-group flex flex-center">
                                    <label htmlFor="type">Type</label>
                                    <input type="text" name="type" id="type" defaultValue={product.type} placeholder="Type" onChange={(e) => setType(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Catégorie</label>
                                    {
                                        <select className="w-100" name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                                            <option value="">Choisir une catégorie</option>
                                            {
                                                data && data.categories?.map((category) => (
                                                    <option selected={category._id === product.category} key={category._id} value={category._id}>{formatString(category.name)}</option>
                                                ))
                                            }
                                        </select>
                                    }
                                </div>
                            </div>
                            <p><strong>Tailles</strong></p>
                            <ul className="sizes-edit">
                                {
                                    product.sizes.map((size) => (
                                        <li key={size.name}>
                                            <div className="flex flex-align-center">
                                                <span className="size">{size.name}</span>
                                                <div className="form-group">
                                                    <label htmlFor="quantity">Quantité</label>
                                                    <input type="number" name="quantity" id="quantity" placeholder="Quantité" defaultValue={size.quantityInStock} onChange={(e) => setSizes(sizes.map((s) => s.name === size.name ? { ...s, quantityInStock: e.target.value } : s))} />
                                                </div>

                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="btn-container">
                                <button title="Modifier" onClick={handleSubmit} className="btn btn-primary">Modifier</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </section>
    );
};

export default ProductEditScreen;
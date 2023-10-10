import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from "react-toastify";
import { useUploadCategoryImageMutation, useUploadCategoryBannerMutation, useCreateCategoryMutation } from "../../slices/categoriesApiSlice";
import { checkImageType } from "../../utils/utils";

//Création d'une catégorie
const CategoryCreateScreen = () => {
    const navigate = useNavigate();
    //States
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [banner, setBanner] = useState(null);
    const [uploadCategoryImage, { isLoading: isUploading }] = useUploadCategoryImageMutation();
    const [uploadCategoryBanner, { isLoading: isUploadingBanner }] = useUploadCategoryBannerMutation();
    const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();

    //Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name !== "" && image !== null && banner !== null) {
            if(!checkImageType(image.type) || !checkImageType(banner.type)){
                toast.error("Veuillez choisir des images aux formats jpeg, png, svg, webp");
                return;
            }
            try {
                //Upload des images
                const formDataImg = new FormData();
                const formDataBanner = new FormData();
                formDataImg.append('image', image);
                formDataBanner.append('image', banner);
                const resImg = await uploadCategoryImage(formDataImg).unwrap();
                const resBanner = await uploadCategoryBanner(formDataBanner).unwrap();
                //Création de la catégorie
                const data = {
                    name: name.toLowerCase(),
                    image: resImg.image,
                    banner: resBanner.image
                };
                await createCategory(data).unwrap();
                navigate("/admin/categories");
                toast.success("Catégorie ajoutée avec succès");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        } else {
            toast.error("Veuillez remplir tous les champs");
        }
    }

    return (
        <>
            <section>
                <Link title="Retour" to="/admin/categories" className="btn btn-primary mb-3">Retour</Link>
                <h1>Ajouter une catégorie</h1>
            </section>
            <div className="section">
                <form className="form category">
                    <div className="form-group">
                        <label htmlFor="name">Nom de la catégorie</label>
                        <input type="text" name="name" id="name" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
                        <p className="fileType">Formats acceptés : jpeg, png, svg, webp.</p>
                    </div>
                    <div className="inputs-container">
                        <div className="form-group">
                            <label htmlFor="image">Image de la catégorie</label>
                            <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.files[0])} />
                            <p className="fileType">Formats acceptés : jpeg, png, svg, webp.</p>
                        </div>
                        <div className="form-group">
                            <label htmlFor="banner">Bannière de la catégorie</label>
                            <input type="file" name="banner" id="banner" onChange={(e) => setBanner(e.target.files[0])} />
                        </div>
                    </div>
                    <div className="btn-container">
                        <button title="Ajouter" type="submit" className="btn btn-primary" onClick={handleSubmit}>Ajouter</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CategoryCreateScreen;
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetCategoryByIdQuery,
        useUploadCategoryImageMutation,
        useUploadCategoryBannerMutation ,
        useDeleteCategoryImageMutation,
        useDeleteCategoryBannerMutation,
        useUpdateCategoryMutation
        } from "../../slices/categoriesApiSlice";
import { useParams } from "react-router-dom";
import {formatString, getFileName} from "../../utils/utils";
import {toast} from "react-toastify";
import  {checkImageType} from "../../utils/utils";
import Meta from "../../components/Meta";

//Edition d'une catégorie
const CategoryEditScreen = () => {
    const navigate = useNavigate();
    //Récupération de l'id de la catégorie et de la catégorie
    const { id: categoryId } = useParams();
    const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId);
    //States
    const [uploadCategoryImage, { isLoading: isUploading }] = useUploadCategoryImageMutation();
    const [uploadCategoryBanner, { isLoading: isUploadingBanner }] = useUploadCategoryBannerMutation();
    const [deleteCategoryImage, { isLoading: isDeleting }] = useDeleteCategoryImageMutation();
    const [deleteCategoryBanner, { isLoading: isDeletingBanner }] = useDeleteCategoryBannerMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const [name, setName] = useState(category ? category.name : "");
    const [image, setImage] = useState(null);
    const [banner, setBanner] = useState(null);
    //Récupération du nom de l'image et de la bannière
    const imgFileName = category ? category.image.split("/")[category.image.split("/").length - 1] : "";
    const bannerFileName = category ? category.banner.split("/")[category.banner.split("/").length - 1] : "";

    //Si la catégorie est en cours de chargement
    useEffect(() => {
        if(category){
            setName(category.name);
        }
    }, [category]);

    //Fonction de soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name !== "") {
            if(image !== null && !checkImageType(image.type)){
                toast.error("Veuillez choisir une image aux formats jpeg, png, svg, webp");
                return;
            }
            if(banner !== null && !checkImageType(banner.type)){
                toast.error("Veuillez choisir une image aux formats jpeg, png, svg, webp");
                return;
            }
            try {
                let img = null;
                let bannerImg = null;
                if(image){
                    //Suppression de l'ancienne image et ajout de la nouvelle
                    await deleteCategoryImage(getFileName(imgFileName)).unwrap();
                    const formDataImg = new FormData();
                    formDataImg.append('image', image);
                    const resImg = await uploadCategoryImage(formDataImg).unwrap();
                    img = resImg.image;
                }
                if(banner){
                    //Suppression de l'ancienne bannière et ajout de la nouvelle
                    await deleteCategoryBanner(getFileName(bannerFileName)).unwrap();
                    const formDataBanner = new FormData();
                    formDataBanner.append('image', banner);
                    const resBanner = await uploadCategoryBanner(formDataBanner).unwrap();
                    bannerImg = resBanner.image;
                }
                //Mise à jour de la catégorie
                const data = {
                    id: category._id,
                    name: name.toLowerCase(),
                    image: img || category.image,
                    banner: bannerImg || category.banner
                };
                await updateCategory(data).unwrap();
                toast.success("Catégorie modifiée avec succès");
                navigate("/admin/categories");
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }

    }
    return (
        <>
            <section>
                <Meta title="Modifier une catégorie | Le Pit Shop"
                      description="Modifiez les catégories de produits sur Le Pit Shop sans tracas. Utilisez notre interface conviviale de modification
                      de catégories pour ajuster les détails, mettre à jour les descriptions et optimiser la navigation. Personnalisez votre boutique
                      de Formule 1 selon vos besoins. Offrez à vos clients une expérience de shopping F1 encore meilleure en organisant votre boutique
                      de manière précise."
                      keywords="Modification de catégorie, Catégories de produits, Personnalisation des catégories, Organisation des produits, Boutique
                       en ligne de F1, Produits de Formule 1, Fans de course automobile, Expérience de shopping F1, Gestion des catégories,
                       Le Pit Shop, Structure de la boutique, Interface conviviale, Mise à jour de catégorie."
                />
                    <Link title="Retour" to="/admin/categories" className="btn btn-primary mb-5">Retour</Link>
                    <h1>Modification d'une catégorie</h1>
            </section>
            {
                category &&(
                    <div className="section">
                        <form className="form category">
                            <div className="form-group">
                                <label htmlFor="name">Nom de la catégorie</label>
                                <input type="text" name="name" id="name" placeholder="Nom" defaultValue={formatString(category.name)} onChange={(e) => setName(e.target.value)} />
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
                                    <p className="fileType">Formats acceptés : jpeg, png, svg, webp.</p>
                                </div>
                            </div>
                            <div className="btn-container">
                                <button title="Ajouter" type="submit" className="btn btn-primary" onClick={handleSubmit}>Ajouter</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
};

export default CategoryEditScreen;
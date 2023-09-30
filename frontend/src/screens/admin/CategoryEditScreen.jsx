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

const CategoryEditScreen = () => {
    const navigate = useNavigate();
    const { id: categoryId } = useParams();
    const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId);
    const [uploadCategoryImage, { isLoading: isUploading }] = useUploadCategoryImageMutation();
    const [uploadCategoryBanner, { isLoading: isUploadingBanner }] = useUploadCategoryBannerMutation();
    const [deleteCategoryImage, { isLoading: isDeleting }] = useDeleteCategoryImageMutation();
    const [deleteCategoryBanner, { isLoading: isDeletingBanner }] = useDeleteCategoryBannerMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    const [name, setName] = useState(category ? category.name : "");
    const [image, setImage] = useState(null);
    const [banner, setBanner] = useState(null);
    const imgFileName = category ? category.image.split("/")[category.image.split("/").length - 1] : "";
    const bannerFileName = category ? category.banner.split("/")[category.banner.split("/").length - 1] : "";

    useEffect(() => {
        if(category){
            setName(category.name);
        }
    }, [category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name !== "") {
            try {
                let img;
                let banner;
                if(image){
                    await deleteCategoryImage(getFileName(imgFileName)).unwrap();
                    const formDataImg = new FormData();
                    formDataImg.append('image', image);
                    const resImg = await uploadCategoryImage(formDataImg).unwrap();
                    img = resImg.image;
                }
                if(banner){
                    await deleteCategoryBanner(getFileName(imgFileName)).unwrap();
                    const formDataBanner = new FormData();
                    formDataBanner.append('image', banner);
                    const resBanner = await uploadCategoryBanner(formDataBanner).unwrap();
                    banner = resBanner.image;
                }
                const data = {
                    id: category._id,
                    name,
                    image: img || category.image,
                    banner: banner || category.banner
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
                    <Link to="/admin/categories" className="btn btn-primary mb-5">Retour</Link>
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
                                </div>
                                <div className="form-group">
                                    <label htmlFor="banner">Bannière de la catégorie</label>
                                    <input type="file" name="banner" id="banner" onChange={(e) => setBanner(e.target.files[0])} />
                                </div>
                            </div>
                            <div className="btn-container">
                                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Ajouter</button>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
};

export default CategoryEditScreen;
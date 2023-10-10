// Bannière de catégorie
const BannerCategory = ({ category, image }) => {
    return (
        <div className="banner-category">
            <img src={image} alt={category}/>
            <div className="overlay"></div>
            <div className="content">
                <h1>{category}</h1>
            </div>
        </div>
    );
};

export default BannerCategory;
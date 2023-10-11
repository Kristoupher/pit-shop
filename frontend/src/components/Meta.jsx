import { Helmet } from 'react-helmet-async';

const Meta = ({title, description, keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    );
};

Meta.defaultProps = {
    title: 'Bienvenue sur le Pit Shop',
    description: 'Découvrez le monde passionnant de la Formule 1 sur Le Pit Shop. Explorez notre vaste sélection de produits de haute qualité, des casques aux vêtements de course, en passant par les accessoires de pilote. Plongez dans l\'univers de la F1 avec des articles authentiques et des souvenirs uniques. Vivez votre passion pour la course automobile avec notre boutique en ligne dédiée aux fans de Formule 1.',
    keywords: 'Formule 1, F1, Boutique en ligne de F1, Casques de pilote, Vêtements de course, Accessoires de pilote, Produits de Formule 1, Merchandising F1, Articles de course, Équipement de pilote, Boutique de passionnés de F1, Grand Prix, Fans de course automobile, Boutique de souvenirs de F1, Produits dérivés de F1, Le Pit Shop.'
}
export default Meta;
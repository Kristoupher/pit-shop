import React from 'react';
import PanelCard from "../../components/PanelCard";
import { User2, BadgeEuro, Shirt, Bookmark } from "lucide-react";
import Meta from "../../components/Meta";


// Page d'accueil du panneau d'administration
const AdminScreen = () => {
    return (
        <section className="admin">
            <Meta title="Panneau d'administration | Le Pit Shop"
                  description="Gérez votre boutique en toute simplicité avec notre panneau d'administration Le Pit Shop. Accédez à des outils puissants
                  pour gérer les produits, suivre les ventes, gérer les commandes et interagir avec les clients. Optimisez l'expérience d'achat de vos
                  clients et développez votre boutique F1 en utilisant notre interface conviviale et intuitive."
                  keywords="Panneau d'administration, Gestion de boutique, Outils de gestion, Suivi des ventes, Gestion des produits, Gestion des
                  commandes, Interaction client, Expérience d'achat, Boutique en ligne de F1, Produits de Formule 1, Fans de course automobile,
                  Gestion d'entreprise, Le Pit Shop, Optimisation des ventes, Interface intuitive."
            />
            <h1>Panneau d'administration</h1>
            <div className="panel-cards-container section">
                <PanelCard link="/admin/users" name="Utilisateurs" logo={<User2 color="#2E2E2E" size={50} strokeWidth={2} />} />
                <PanelCard link="/admin/orders" name="Commandes" logo={<BadgeEuro color="#2E2E2E" size={50} strokeWidth={2} />} />
                <PanelCard link="/admin/products" name="Produits" logo={<Shirt color="#2E2E2E" size={50} strokeWidth={2} />} />
                <PanelCard link="/admin/categories" name="Catégories" logo={<Bookmark color="#2E2E2E" size={50} strokeWidth={2} />} />
            </div>
        </section>
    );
};

export default AdminScreen;
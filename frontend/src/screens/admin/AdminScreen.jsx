import React from 'react';
import PanelCard from "../../components/PanelCard";
import { User2, BadgeEuro, Shirt, Bookmark } from "lucide-react";

const AdminScreen = () => {
    return (
        <section className="admin">
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
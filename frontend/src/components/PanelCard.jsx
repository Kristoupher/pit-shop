import {Link} from "react-router-dom";
import { ArrowRightCircle } from "lucide-react";

//Composant pour les cartes du tableau de bord admin
const PanelCard = ({ link, name, logo }) => {
    return (
            <Link title={name} to={link} className="card-panel">
                <span>{logo}</span>
                <p className="flex flex-align-center">{name} <span className="flex flex-align-center"><ArrowRightCircle size={30} /></span></p>
            </Link>
    );
};

export default PanelCard;
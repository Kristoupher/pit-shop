import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Fonction qui permet a chaque changement de page de remonter en haut de la page
function ScrollToTop({ children }) {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
}

export default ScrollToTop;
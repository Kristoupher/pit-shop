import {XCircle, ChevronRight} from "lucide-react";
import { useState } from "react";
import Filters from "./Filters";
const FiltersModal = ({filterOpen, setFilterOpen}) => {
    return (
        <div className={`mobile-filters ${filterOpen ? 'active' : ''}`}>
            <span onClick={() => setFilterOpen(false)}><XCircle size={30} color="#2E2E2E" /></span>
            <p>Filtrer</p>
            <Filters button={true} />
        </div>
    );
};

export default FiltersModal;
import {XCircle, ChevronRight} from "lucide-react";
import { useState } from "react";
import Filters from "./Filters";
import {useParams} from "react-router-dom";
import {useGetDriversQuery, useGetSizesQuery, useGetTeamsQuery, useGetTypesQuery} from "../slices/productsApiSlice";
const FiltersModal = ({filterOpen, setFilterOpen, setFilters, filters}) => {

    const { category: id } = useParams();

    const { data: teams } = useGetTeamsQuery(id);

    const { data: drivers } = useGetDriversQuery(id);

    const { data: types } = useGetTypesQuery(id);

    const { data: sizes } = useGetSizesQuery(id);


    const handleSubmit = (e) => {
        e.preventDefault();
        let teams = [];
        let drivers = [];
        let types = [];
        let sizes = [];
        let inputs = e.target.querySelectorAll('input');

        inputs.forEach(input => {
            if(input.checked){
                if(input.name === "team"){
                    teams.push(input.value);
                } else if(input.name === "driver"){
                    drivers.push(input.value);
                } else if(input.name === "type"){
                    types.push(input.value);
                } else if(input.name === "size"){
                    sizes.push(input.value);
                }
            }
        });

        const newFilters = {
            teams: teams,
            drivers: drivers,
            types: types,
            sizes: sizes
        };

        setFilters(newFilters);
        setFilterOpen(false);
    }

    return (
        <div className={`mobile-filters ${filterOpen ? 'active' : ''}`}>
            <span onClick={() => setFilterOpen(false)}><XCircle size={30} color="#2E2E2E" /></span>
            <p>Filtrer</p>
            <Filters button={true} setFilters={setFilters} filters={filters} handleSubmit={handleSubmit} teams={teams} drivers={drivers} types={types} sizes={sizes} />
        </div>
    );
};

export default FiltersModal;
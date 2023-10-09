import {ChevronRight} from "lucide-react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import { useGetTeamsQuery,
            useGetDriversQuery,
            useGetTypesQuery,
            useGetSizesQuery
        } from "../slices/productsApiSlice";
import Loader from "./Loader";
import { formatString } from "../utils/utils";

const Filters = ({ button, filters, setFilters }) => {
    const [accordionTeamsOpen, setAccordionTeamsOpen] = useState(false);
    const [accordionDriversOpen, setAccordionDriversOpen] = useState(false);
    const [accordionTypesOpen, setAccordionTypesOpen] = useState(false);
    const [accordionSizesOpen, setAccordionSizesOpen] = useState(false);

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


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="accordion">
                    <p className={`${accordionTeamsOpen ? 'active' : ''}`} onClick={() => setAccordionTeamsOpen(!accordionTeamsOpen)}>Équipes <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionTeamsOpen ? 'active' : ''}`}>
                        {
                            teams && teams.length > 0 ? teams.map((team) => (
                                <div className="input-group" key={team}>
                                    <input type="checkbox" name="team" id={team} value={team}/>
                                    <label htmlFor={team}>{formatString(team)}</label>
                                </div>
                            )) : (
                                <div className="input-group">
                                    <p>Aucune équipe.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="accordion">
                    <p className={`${accordionDriversOpen ? 'active' : ''}`} onClick={() => setAccordionDriversOpen(!accordionDriversOpen)}>Pilotes <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionDriversOpen ? 'active' : ''}`}>
                        {
                            drivers && drivers.length > 0 ? drivers.map((driver) => (
                                <div className="input-group" key={driver}>
                                    <input type="checkbox" name="driver" id={driver} value={driver}/>
                                    <label htmlFor={driver}>{formatString(driver)}</label>
                                </div>
                            )) : (
                                <div className="input-group">
                                    <p>Aucun pilote.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="accordion">
                    <p className={`${accordionTypesOpen ? 'active' : ''}`} onClick={() => setAccordionTypesOpen(!accordionTypesOpen)}>Type <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionTypesOpen ? 'active' : ''}`}>
                        {
                            types && types.length > 0 ? types.map((type) => (
                                <div className="input-group" key={type}>
                                    <input type="checkbox" name="type" id={type} value={type}/>
                                    <label htmlFor={type}>{formatString(type)}</label>
                                </div>
                            )) : (
                                <div className="input-group">
                                    <p>Aucun type.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="accordion">
                    <p className={`${accordionSizesOpen ? 'active' : ''}`} onClick={() => setAccordionSizesOpen(!accordionSizesOpen)}>Taille <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionSizesOpen ? 'active' : ''}`}>
                        {
                            sizes && sizes.length > 0 ? sizes.map((size) => (
                                <div className="input-group" key={size}>
                                    <input type="checkbox" name="size" id={size} value={size}/>
                                    <label htmlFor={size}>{formatString(size)}</label>
                                </div>
                            )) : (
                                <div className="input-group">
                                    <p>Aucune taille.</p>
                                </div>
                            )
                        }
                    </div>
                    { button && (
                    <div className="btn-container">
                        <button className="btn btn-success" >Appliquer</button>
                    </div>)
                    }
                </div>
            </form>
        </>
    );
};

export default Filters;
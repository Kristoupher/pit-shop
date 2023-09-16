import {XCircle, ChevronRight} from "lucide-react";
import { useState } from "react";
const FiltersModal = ({filterOpen, setFilterOpen}) => {
    const [accordionTeamsOpen, setAccordionTeamsOpen] = useState(false);
    const [accordionDriversOpen, setAccordionDriversOpen] = useState(false);
    const [accordionTypesOpen, setAccordionTypesOpen] = useState(false);
    const [accordionSizesOpen, setAccordionSizesOpen] = useState(false);
    return (
        <div className={`mobile-filters ${filterOpen ? 'active' : ''}`}>
            <span onClick={() => setFilterOpen(false)}><XCircle size={30} color="#2E2E2E" /></span>
            <p>Filtrer</p>
            <form>
                <div className="accordion">
                    <p className={`${accordionTeamsOpen ? 'active' : ''}`} onClick={() => setAccordionTeamsOpen(!accordionTeamsOpen)}>Équipes <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionTeamsOpen ? 'active' : ''}`}>
                        <div className="input-group">
                            <input type="checkbox" name="team" id="alfaromeo" value="1"/>
                            <label htmlFor="alfaromeo">Alfa Romeo</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="team" id="alphatauri" value="1"/>
                            <label htmlFor="alphatauri">Alphatauri</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="team" id="alpine" value="1"/>
                            <label htmlFor="alpine">Alpine</label>
                        </div>
                    </div>
                </div>
                <div className="accordion">
                    <p className={`${accordionDriversOpen ? 'active' : ''}`} onClick={() => setAccordionDriversOpen(!accordionDriversOpen)}>Pilotes <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionDriversOpen ? 'active' : ''}`}>
                        <div className="input-group">
                            <input type="checkbox" name="driver" id="albon" value="1"/>
                            <label htmlFor="albon">A.Albon</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="driver" id="alonso" value="1"/>
                            <label htmlFor="alonso">F.Alonso</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="driver" id="bottas" value="1"/>
                            <label htmlFor="bottas">V.Bottas</label>
                        </div>
                    </div>
                </div>
                <div className="accordion">
                    <p className={`${accordionTypesOpen ? 'active' : ''}`} onClick={() => setAccordionTypesOpen(!accordionTypesOpen)}>Type <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionTypesOpen ? 'active' : ''}`}>
                        <div className="input-group">
                            <input type="checkbox" name="type" id="t-shirt" value="1"/>
                            <label htmlFor="t-shirt">T-shirt</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="type" id="sweat" value="1"/>
                            <label htmlFor="sweat">Sweat</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="type" id="polo" value="1"/>
                            <label htmlFor="polo">Polo</label>
                        </div>
                    </div>
                </div>
                <div className="accordion">
                    <p className={`${accordionSizesOpen ? 'active' : ''}`} onClick={() => setAccordionSizesOpen(!accordionSizesOpen)}>Type <ChevronRight size={20} color="#2E2E2E" strokeWidth={3}/></p>
                    <div className={`accordion-content ${accordionSizesOpen ? 'active' : ''}`}>
                        <div className="input-group">
                            <input type="checkbox" name="size" id="xs" value="1"/>
                            <label htmlFor="xs">XS</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="size" id="s" value="1"/>
                            <label htmlFor="s">S</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="size" id="m" value="1"/>
                            <label htmlFor="m">M</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="size" id="l" value="1"/>
                            <label htmlFor="l">L</label>
                        </div>
                        <div className="input-group">
                            <input type="checkbox" name="size" id="xl" value="1"/>
                            <label htmlFor="xl">XL</label>
                        </div>
                    </div>
                    <div className="btn-container">
                        <button className="btn btn-success" >Appliquer</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FiltersModal;
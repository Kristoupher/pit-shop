const TotalPrice = ({totalHt, tva, shipping, totalTtc, count}) => {
    return (
        <div className="total-price">
            <p className="total">Total de {count} article{count > 1 ? 's' : ''}</p>
            <div className="prices-container">
                <p>Total HT : <span>{totalHt}€</span></p>
                <p>TVA : <span>{tva}€</span></p>
                <p>Frais de port : <span>{shipping}€</span></p>
                <p>Total TTC : <span>{totalTtc}€</span></p>
            </div>
            <div className="btn-container">
                <button className="btn btn-primary">Valider le panier</button>
            </div>
        </div>
    );
};

export default TotalPrice;
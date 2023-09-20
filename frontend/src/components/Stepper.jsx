const Stepper = ({step}) => {
    return (
        <div className="stepper">
            <div className={`first ${step === 2 ? 'active' : step === 3 ? 'active' : ''}`}>
                <span className="active">1</span>
                <p className="active">Livraison</p>
            </div>
            <div className={`second ${step === 2 ? 'active' : step === 3 ? 'active' : ''}`}>
                <span className={`${step === 2 ? 'active' : step === 3 ? 'active' : ''}`}>2</span>
                <p className={`${step === 2 ? 'active' : step === 3 ? 'active' : ''}`}>Paiement</p>
            </div>
            <div className={`third ${step === 3 ? 'active' : ''}`}>
                <span className={`${step === 3 ? 'active' : ''}`}>3</span>
                <p className={`${step === 3 ? 'active' : ''}`}>Confirmation</p>
            </div>
        </div>
    );
};

export default Stepper;
const sortSizes = (sizes) => {
    //Trier par ordre suivant : XS, S, M, L, XL, XXL
    sizes.sort((a, b) => {
        if(a === 'xs') {
            return -1;
        } else if(a === 's') {
            if(b === 'xs') {
                return 1;
            } else {
                return -1;
            }
        } else if(a === 'm') {
            if(b === 'xs' || b === 's') {
                return 1;
            } else {
                return -1;
            }
        } else if(a === 'l') {
            if(b === 'xs' || b === 's' || b === 'm') {
                return 1;
            } else {
                return -1;
            }
        } else if(a === 'xl') {
            if(b === 'xs' || b === 's' || b === 'm' || b === 'l') {
                return 1;
            } else {
                return -1;
            }
        } else if(a === 'xxl') {
            if(b === 'xs' || b === 's' || b === 'm' || b === 'l' || b === 'xl') {
                return 1;
            } else {
                return -1;
            }
        }
    });
    return sizes;
}

export default sortSizes;
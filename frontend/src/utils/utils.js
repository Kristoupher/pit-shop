// Mettre en majualscule la première lettre et remplacer les - par des espaces
export const formatString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
}

export const formatPrice = (price) => {
    // Renvoyer le prix sous forme 0,00 €
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

}

export const formatDate = (date) => {
    // Renvoyer la date sous forme jj/mm/aaaa
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Ajoute un zéro devant le mois si nécessaire
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
}

//Enlever le premier caractère d'une chaîne de caractères
export const removeFirstChar = (string) => {
    return string.slice(1);
}

export const formatInsertion = (string) => {
//     renvoyer le string avec que des minusucules et des tirets a la place des espaces
    return string.toLowerCase().replace(/ /g, '-');
}

// prendre ce qu'il y a après le dernier \
export const getFileName = (string) => {
return string.split('\\').pop();
}
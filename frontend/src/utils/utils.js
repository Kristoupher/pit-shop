// Mettre en majualscule la première lettre et remplacer les - par des espaces
const formatString = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).replace(/-/g, ' ');
}


export default formatString;
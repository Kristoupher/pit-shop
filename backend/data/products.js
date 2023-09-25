const products = [
    {
        name: 'Polo Mercedes F1 Team',
        description: 'Le polo Mercedes incarne l\'élégance intemporelle et le raffinement d\'une marque de renommée mondiale. Confectionné avec des matériaux de qualité supérieure, ce vêtement allie style et confort. Arborant le logo emblématique de Mercedes, il reflète la sophistication et le prestige de la marque automobile. Que ce soit pour une sortie décontractée ou une occasion spéciale, ce polo incarne le luxe discret et l\'exclusivité, faisant de chaque instant une expérience Mercedes inoubliable.',
        price: 45.00,
        image: '/products/mercedes.png',
        sizes: [
            {
                name: 'S',
                quantityInStock: 10,
            },
            {
                name: 'M',
                quantityInStock: 10,
            },
            {
                name: 'L',
                quantityInStock: 10,
            },
            {
                name: 'XL',
                quantityInStock: 10,
            }
            ],
        team: 'Mercedes',
        type: 'Polo',
        category: 'homme',
    }
];

export default products;

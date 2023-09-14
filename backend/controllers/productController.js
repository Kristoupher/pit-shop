import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        return res.json(product);
    } else {
        res.status(404);
        throw new Error('Ressource non trouvée');
    }
});

// @desc    Fetch products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = asyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        description: 'Sample description',
        price: 0,
        image: '/images/sample.jpg',
        sizes: [
            {
                name: 'Sample size',
                quantityInStock: 0,
            }
        ],
        team: 'Sample team',
        driver: 'Sample driver',
        type: 'Sample type',
        category: 'Sample category',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, image, sizes, team, driver, type, category } = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.image = image;
        product.sizes = sizes;
        product.team = team;
        product.driver = driver;
        product.type = type;
        product.category = category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Ressource non trouvée');
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product) {
        await Product.deleteOne({ _id: product._id });
        res.status(200).json({ message: 'Produit supprimé' });
    } else {
        res.status(404);
        throw new Error('Ressource non trouvée');
    }
});

export { getProducts,
    getProductById, createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};

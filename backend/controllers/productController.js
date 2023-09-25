import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

    const count = await Product.countDocuments({...keyword});

    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch last 4 products
// @route   GET /api/products/last
// @access  Public

const getLastProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ _id: -1 }).limit(4);
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
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({ category: req.params.category });

    const products = await Product.find({ category: req.params.category }).limit(pageSize).skip(pageSize * (page - 1));

    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch products by category and sort by price asc
// @route   GET /api/products/category/:category/price/asc
// @access  Public
const getProductsByCategoryAndSortByPriceAsc = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({ category: req.params.category });

    const products = await Product.find({ category: req.params.category }).limit(pageSize).skip(pageSize * (page - 1)).sort({ price: 1 });

    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch products by category and sort by price desc
// @route   GET /api/products/category/:category/price/desc
// @access  Public
const getProductsByCategoryAndSortByPriceDesc = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({ category: req.params.category });

    const products = await Product.find({ category: req.params.category }).limit(pageSize).skip(pageSize * (page - 1)).sort({ price: -1 });

    res.json({products, page, pages: Math.ceil(count / pageSize)});
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
    getLastProducts,
    getProductById,
    getProductsByCategoryAndSortByPriceAsc,
    getProductsByCategoryAndSortByPriceDesc,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};

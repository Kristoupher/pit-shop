import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
import sortSizes from "../utils/sortSizes.js";

    // @desc    Fetch all products
    // @route   GET /api/products
    // @access  Public
    const getProducts = asyncHandler(async (req, res) => {
        const pageSize = process.env.PAGINATION_LIMIT;
        const page = Number(req.query.pageNumber) || 1;

        const count = await Product.countDocuments({});

        const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));
        res.json({products, page, pages: Math.ceil(count / pageSize)});
    });

// @desc    Fetch all products from search
// @route   GET /api/products/:keyword
// @access  Public

const getProductsSearch = asyncHandler(async (req, res) => {
    const keyword = req.params.keyword;
    const products = await Product.find({ name: { $regex: keyword, $options: 'i' } });
    res.json(products);
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
    const id = req.params.category;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;


    const count = await Product.countDocuments({ category: id });

    const products = await Product.find({ category: id }).limit(pageSize).skip(pageSize * (page - 1));


    res.json({products, page, pages: Math.ceil(count / pageSize)});
});


// @desc    Fetch products by category and sort by price asc
// @route   GET /api/products/category/:category/price/asc
// @access  Public
const getProductsByCategoryAndSortByPriceAsc = asyncHandler(async (req, res) => {
    const id = req.params.category;
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
    const id = req.params.category;
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Product.countDocuments({ category: req.params.category });

    const products = await Product.find({ category: req.params.category }).limit(pageSize).skip(pageSize * (page - 1)).sort({ price: -1 });

    res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch all teams from products
// @route   GET /api/products/teams
// @access  Public
const getTeams = asyncHandler(async (req, res) => {
    const teams = await Product.distinct('team', { category: req.params.id }).collation({ locale: "fr" }).sort();
    res.json(teams);
});

// @desc    Fetch all drivers from products
// @route   GET /api/products/drivers
// @access  Public
const getDrivers = asyncHandler(async (req, res) => {
    const drivers = await Product.distinct('driver', { category: req.params.id }).collation({ locale: "fr" }).sort();
    res.json(drivers);
});

// @desc    Fetch all types from products
// @route   GET /api/products/types
// @access  Public
const getTypes = asyncHandler(async (req, res) => {
    const types = await Product.distinct('type', { category: req.params.id }).collation({ locale: "fr" }).sort();
    res.json(types);
});

// @desc    Fetch all sizes from products
// @route   GET /api/products/sizes
// @access  Public
const getSizes = asyncHandler(async (req, res) => {
    const sizes = await Product.distinct('sizes.name', { category: req.params.id }).collation({ locale: "fr" }).sort();
    const sortedSizes = sortSizes(sizes);
    res.json(sortedSizes);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, image, sizes, team, driver, type, category } = req.body;

    const product = new Product({
        name,
        description,
        price,
        image,
        sizes,
        team,
        driver,
        type,
        category
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
    getProductsSearch,
    getLastProducts,
    getProductById,
    getProductsByCategoryAndSortByPriceAsc,
    getProductsByCategoryAndSortByPriceDesc,
    getTeams,
    getDrivers,
    getTypes,
    getSizes,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
};

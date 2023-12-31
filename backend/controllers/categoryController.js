import asyncHandler from "../middleware/asyncHandler.js";
import Category from "../models/categoryModel.js";

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await Category.countDocuments({});

    const categories = await Category.find({}).sort({ createdAt: 1 }).limit(pageSize).skip(pageSize * (page - 1));
    res.json({categories, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch a category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(category) {
        return res.json(category);
    } else {
        res.status(404);
        throw new Error('Ressource non trouvée');
    }
});

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name, image, banner } = req.body;

    if(name === "" && image === "" && banner === "") {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs');
    }

    const category = new Category({
        name,
        image,
        banner
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const { name, banner, image } = req.body;

    const category = await Category.findById(req.params.id);

    if(category) {
        category.name = name;
        category.banner = banner;
        category.image = image;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});


// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(category) {
        await category.deleteOne({ _id: category._id });
        res.json({ message: 'Category removed' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

export {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
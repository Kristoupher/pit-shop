import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import Product from "../models/productModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { mail, password } = req.body;

    if(!mail || !password) {
        res.status(400);
        throw new Error('Veuillez saisir une adresse mail et un mot de passe');
    }

    const user = await User.findOne({ mail });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            gender: user.gender,
            mail: user.mail,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Adresse mail ou mot de passe invalide');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { gender, lastname, firstname, mail, phone, address, password } = req.body;

    if(gender === '' || lastname === '' || firstname === '' || mail === '' || phone === '' || address === '' || password === '') {
        res.status(400);
        throw new Error('Veuillez remplir tous les champs');
    }

    const userExists = await User.findOne({ mail });

    if (userExists) {
        res.status(400);
        throw new Error('Adresse mail déjà utilisée');
    }

    const user = await User.create({
        lastname,
        firstname,
        gender,
        mail,
        phone,
        address,
        password,
    });

    if(user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            gender: user.gender,
            mail: user.mail,
            phone: user.phone,
            address: user.address,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Données utilisateur invalides');
    }
});

// @desc    Logout user & clear cookie
// @route   GET /api/users/logout
// @access  public
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ success: "Déconnexion réussie" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
   const user = await User.findById(req.user._id);

   if(user) {
         res.json({
              _id: user._id,
              lastname: user.lastname,
              firstname: user.firstname,
              mail: user.mail,
              isAdmin: user.isAdmin,
         });
   } else {
       res.status(404);
       throw new Error('Utilisateur non trouvé');
   }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const { id, gender, lastname, firstname, mail, phone, address } = req.body;
    const user = await User.findById(id);

    if(user) {
        user.gender = gender || user.gender
        user.lastname = lastname || user.lastname;
        user.firstname = firstname || user.firstname;
        user.mail = mail || user.mail;
        user.phone = phone || user.phone;
        user.address = address || user.address;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            gender: updatedUser.gender,
            lastname: updatedUser.lastname,
            firstname: updatedUser.firstname,
            mail: updatedUser.mail,
            phone: updatedUser.phone,
            address: updatedUser.address,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;

    const count = await User.countDocuments({});

    const users = await User.find({}).limit(pageSize).skip(pageSize * (page - 1));
    res.json({users, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        if(user.isAdmin) {
            res.status(400);
            throw new Error('Impossible de supprimer un administrateur');
        }

        await user.deleteOne({ _id: user._id });
        res.json({ message: 'Utilisateur supprimé' });
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
   const user = await User.findById(req.params.id).select('-password');

    if(user) {
        res.status(200).json(user);
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const { gender, lastname, firstname, mail, phone, address, isAdmin } = req.body;
    const user = await User.findById(req.params.id);

    if(user) {
        user.gender = gender || user.gender;
        user.lastname = lastname || user.lastname;
        user.firstname = firstname || user.firstname;
        user.mail = mail || user.mail;
        user.phone = phone || user.phone;
        user.address = address || user.address;
        user.isAdmin = isAdmin;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            lastname: updatedUser.lastname,
            firstname: updatedUser.firstname,
            mail: updatedUser.mail,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}
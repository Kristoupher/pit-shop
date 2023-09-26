import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { mail, password } = req.body;

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
    res.cookie('jwt', '', {
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
    const user = await User.findById(req.user._id);

    if(user) {
        user.lastname = req.body.lastname || user.lastname;
        user.firstname = req.body.firstname || user.firstname;
        user.mail = req.body.mail || user.mail;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
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

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
   const users = await User.find({});
   res.json(users);
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
    const user = await User.findById(req.params.id);

    if(user) {
        user.lastname = req.body.lastname || user.lastname;
        user.firstname = req.body.firstname || user.firstname;
        user.mail = req.body.mail || user.mail;
        user.isAdmin = req.body.isAdmin;

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
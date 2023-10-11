import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/products/images/");
    },
    filename(req, file, cb) {
        cb(null, `product-${Date.now()}${path.extname(file.originalname)}`);
    }
});

//Import image pour la bannière d'une catégorie
const storageBanner = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/categories/banners/");
    },
    filename(req, file, cb) {
        cb(null, `category-${Date.now()}${path.extname(file.originalname)}`);
    }
});

//Import image pour l'image d'une catégorie
const storageImage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/categories/images/");
    },
    filename(req, file, cb) {
        cb(null, `category-${Date.now()}${path.extname(file.originalname)}`);
    }
});

    function checkFileType(file, cb) {
        const fileTypes = /jpg|jpeg|png|svg/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        }
        else {
            cb('Vous pouvez uniquement télécharger des images!');
        }
    }

const upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

const uploadBanner = multer({
    storage: storageBanner,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

const uploadImage = multer({
    storage: storageImage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
})

    router.post('/', upload.single('image'), (req, res) => {
        res.send({
            message: 'Image téléchargée',
            image: `/${req.file.path}`
        });
    });

router.post('/banner', uploadBanner.single('image'), (req, res) => {
    res.send({
        message: 'Image téléchargée',
        image: `/${req.file.path}`
    });
});

router.post('/image', uploadImage.single('image'), (req, res) => {
    res.send({
        message: 'Image téléchargée',
        image: `/${req.file.path}`
    });
});

router.delete('/:path', (req, res) => {
    const filename = req.params.path;
    const filepath =`uploads/products/images/${filename}`;
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send({
                message: 'Erreur lors de la suppression du fichier'
            });
        }
        else {
            res.send({
                message: 'Fichier supprimé'
            });
        }
    });
});

router.delete('/banner/:path', (req, res) => {
    const filename = req.params.path;
    const filepath =`uploads/categories/banners/${filename}`;
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send({
                message: 'Erreur lors de la suppression du fichier'
            });
        }
        else {
            res.send({
                message: 'Fichier supprimé'
            });
        }
    });
});

router.delete('/image/:path', (req, res) => {
    const filename = req.params.path;
    const filepath =`uploads/categories/images/${filename}`;
    fs.unlink(filepath, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send({
                message: 'Erreur lors de la suppression du fichier'
            });
        }
        else {
            res.send({
                message: 'Fichier supprimé'
            });
        }
    });
});


export default router;
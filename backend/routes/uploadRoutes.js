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
})

router.post('/', upload.single('image'), (req, res) => {
    res.send({
        message: 'Image téléchargée',
        image: `/${req.file.path}`
    });
});

router.delete('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, `uploads/products/images/${filename}`);

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
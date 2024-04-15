const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../public/images')
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

const filterFile = (req, file, cb) => {

    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') 
    { cb(null, true) } else { cb(null, false) }
}

const upload = multer({ storage: storage, fileFilter: filterFile })

module.exports = upload


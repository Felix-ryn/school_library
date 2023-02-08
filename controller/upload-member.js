const multer = require(`multer`)
const path = require(`path`)

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null,path.join(__dirname,`../image`) )
    },

    filename: (req, file, cb) => {
        cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({
    /** storage configuration */
    storage: storage,
    /** filter uploaded file */
    fileFilter: (req, file, cb) => {
        /** filter type of file */
        const acceptedType = [`image/jpg`, `image/jpeg`,
            `image/png`]
        if (!acceptedType.includes(file.mimetype)) {
            cb(null, false) /** refuse upload */
            return cb(`Invalid file type (${file.mimetype})`)
        }
        /** filter size of file */
        const fileSize = req.headers[`content-length`]
        const maxSize = (1 * 2024 * 2024) /** max: 1MB */
        if (fileSize > maxSize) {
            cb(null, false) /** refuse upload */
            return cb(`File size is too large`)
        }
        cb(null, true) /** accept upload */
    }
})
module.exports = upload
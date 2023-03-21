const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/techImages')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const mimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];

  if(mimeTypes.includes(file.mimetype)){
    return cb(null,true);
  } else {
    cb(new Error('Invalid file type. Only jpeg, jpg, png and gif image files are allowed.'));
  }
}
  
const upload = multer({ 
  storage: storage,
  limits:{fileSize: 2*1024*1024},
  fileFilter: fileFilter
}).single('image');

exports.fileUploadTech = (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            err.status = 400;
            next(err);
          } else {
            next();
          }
            
    });
}


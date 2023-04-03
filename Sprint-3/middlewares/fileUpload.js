const multer  = require('multer');

const storage = multer.memoryStorage();


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

exports.fileUpload = (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            err.status = 400;
            next(err);
          } else {
            next();
          }
            
    });
}


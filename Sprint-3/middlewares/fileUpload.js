const multer  = require('multer');

const storage = multer.memoryStorage();


const fileFilter = (req, files, cb) => {
  const mimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
  
  if(mimeTypes.includes(files.mimetype)){
    return cb(null,true);
  } else {
    cb(new Error('Invalid file type. Only jpeg, jpg, png and gif image files are allowed.'));
  }
}
  
const upload = multer({ 
  storage: storage,
  limits:{fileSize: 2*1024*1024},
  fileFilter: fileFilter
}).array('image',3);

exports.fileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A multer error occurred
      err.status = 400;
    }
    if (err) {
      // Other errors occurred
      return next(err);
    }
    next();
  });
}


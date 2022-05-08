import multer from 'multer';
import util from 'util'
const maxSize = 2 * 1024 * 1024;
let processFile = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");
let processFileMiddleware = util.promisify(processFile);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './src/uploads/')
  },
  
  filename: function (req: any, file: any, cb: any) {
      cb(null, file.originalname)
  }
});
const fileFilter = (req: any,file: any,cb: any) => {
  if(file.mimetype === "image/jpg"  || 
     file.mimetype ==="image/jpeg"  || 
     file.mimetype ===  "image/png"){
   
  cb(null, true);
 }else{
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
  }
}

const uploadToDisk = multer({storage: storage, fileFilter : fileFilter});
export { processFileMiddleware, uploadToDisk };
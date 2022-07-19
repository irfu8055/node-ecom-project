// fileupload.js

const multer  = require('multer');

const doFileUpload = (dest,uniqueValue,filedata)=>{
    // console.log(dest)
    // console.log(uniqueValue)
    // console.log(filedata)
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, dest)
        },
        filename: function (req, file, cb) {
          // 12345678xyz.jpg
          
          cb(null, uniqueValue+file.originalname)
        }
      })
      
    ////<input type="file" name="productImagePath" />  
    const upload = multer({ storage: storage }).single(filedata)
    return upload;
}

module.exports =  {
    doFileUpload
}
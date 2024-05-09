const multer = require("multer");
const mongourc=require("../db")
const fetchuser = require('../middleware/fetchuser');
const GridFsStorage = require("multer-gridfs-storage").GridFsStorage;

const storage = new GridFsStorage({
    url:"mongodb+srv://sharmithaj23:<password>@hostelproject.xalbqpy.mongodb.net/?retryWrites=true&w=majority&appName=HostelProject/app",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    
    file: (req, file) => {
       
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}profile_${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos_temporary",
            filename: `${Date.now()}profile_${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });
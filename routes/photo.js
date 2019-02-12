const express = require('express');
const app = express();
const router = express.Router();
const Photo= require('../models').Photo;
const multer = require('multer');
const bodyParser = require('body-parser');


const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads/');
    },
    filename:function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage:storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter:fileFilter
});

app.use(bodyParser.json());

router.post('/new', upload.single('photo'),(req, res, next)=>{
    const port = 'http://localhost:3003/';
    let newphoto = new Photo({
        url:port.concat(req.file.path),
        desc:req.body.desc,
        ref:req.body.ref,
        type:req.body.type,
    });
    return newphoto.save().
    then(results=>{
        res.status(201).json({
            photo:results,
        })
    }).
    catch(err=>{
        res.status(500).json({
            error:err
        })
    })
});

module.exports = router;
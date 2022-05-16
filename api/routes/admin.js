const express = require("express");
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const dataController = require('../controllers/dataController');

const router = express.Router();

require('dotenv').config();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var dir = 'public/uploads/';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
  
    filename: function(req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const maxSize = 10 * 1024 * 1024;

var upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) =>{
        if (
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
          ) {
            cb(null, true);
          } else {
            cb("Only .png, .jpg and .jpeg format allowed!", false);
            //return cb(new Error());
          }
    },
    limits: { fileSize: maxSize },
}).array('multi_files', 12);

router.get("/", (req, res)=>{
    //res.sendFile(path.join(__dirname, '../admin/index.html'));
    //res.sendFile(path.join(__dirname, '../views/admin.html'));
    //res.sendFile(path.join(__dirname, '../views/login.html'));
    return res.render('admin', {test:'test msg'})
})

router.get("/accounts", (req, res)=>{
    return res.render('admin', {pages:'accounts'})
})


router.get('/logout', (req, res) => {
    //console.log(req.session.user)
    req.session.destroy()
    return res.redirect('/')
})

router.get("/info/categories/types/", async (req, res) => {
    let data = await dataController.getTypes()
    //console.log(data)
    return res.json(data);
});

router.get("/info/categories/types/:cid", async (req, res) => {
    let cid = req.params.tid
    let data = await dataController.getTypeByCategoryId(cid)
    //console.log(data)
    return res.json(data);
});

router.get("/info/categories/types/:tid/products", async (req, res) => {
    let tid = req.params.tid
    //let data = await dataController.getProductsWithDeatilByTypeId(tid)
    let data = await dataController.getProductsWithNameByTypeId(tid)
    //console.log(data)
    return res.json(data);
});

router.get("/info/categories/types/:tid/products/th", async (req, res) => {
    let tid = req.params.tid
    let data = await dataController.getProductsWithDeatilTHByTypeId(tid)
    return res.json(data);
});

router.get("/info/categories/types/:tid/products/en", async (req, res) => {
    let tid = req.params.tid
    let data = await dataController.getProductsWithDeatilENByTypeId(tid)
    return res.json(data);
});

router.get("/info/categories/types/products", async(req, res) => {
    let data = await dataController.getProducts();
    console.log(data);
    return res.json(data);
});

router.get("/categories", async(req, res)=>{
    let data = await dataController.getCategories();
    return res.render('admin', {
        pages:'categories',
        data: data
    })
})

router.get("/categories/:id/types", async(req, res)=>{
    let id = req.params.id
    let data = await dataController.getTypeByCategoryId(id)
    return res.render('admin', {
        pages:'types',
        data: data
    })
})

router.get("/categories/types", async(req, res) => {
    let data = await dataController.getTypes()
    //console.log(data)
    return res.render('admin', {
        pages:'all_types',
        data: data
    })
});

router.get("/categories/types/products/TH", async(req, res) => {
    let data = await dataController.getProductsWithDeatilTH()
    //console.log(data)
    return res.render('admin', {
        pages:'all_products',
        data: data,
        language: 'TH'
    })
});

router.get("/categories/types/products/EN", async(req, res) => {
    let data = await dataController.getProductsWithDeatilEN()
    //console.log(data)
    return res.render('admin', {
        pages:'all_products',
        data: data,
        language: 'ENG'
    })
});

router.get("/categories/types/:tid/products", async(req, res) => {
    let tid = req.params.tid
    let data = await dataController.getProductsWithDeatilByTypeId(tid)
    //console.log(data)
    return res.render('admin', {
        pages:'products',
        id: tid
    })
});

router.get("/categories/types/products/:pid", async(req, res) => {
    let pid = req.params.pid
    let data = await dataController.getProductWithDetailById(pid)
    if(data.length == 0){
        return res.redirect('/admin')
    }
    let images = await dataController.getImageNameByProductId(pid)
    //console.log(data)
    //console.log(images)
    return res.render('admin', {
        pages:'edit',
        data: data,
        images: images
    })
});

router.get("/categories/types/:tid/products/create", async(req, res) => {
    let tid = req.params.tid
    return res.render('admin', {
        pages:'create',
        id: tid,
    })
});


router.post("/create", async(req, res)=>{
    
    upload(req, res, async (err) =>{
        
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            //{"name":"MulterError","message":"Unexpected field","code":"LIMIT_UNEXPECTED_FILE","field":"multi_files","storageErrors":[]}
            
            return res.status(203).send({msg: 'more-image'})
        } else if (err) {
            // An unknown error occurred when uploading.
            // msg from cb
            return res.status(203).send({msg: 'not-image'})
        }

        const files = req.files;
        //console.log(files)
        
        if(files.length < 1){   
            return res.status(203).send({msg: 'no-image'})
        }
        //upload complete do sth here below!
        
        let key = req.body.key
        let type = req.body.type
        let shopee = req.body.shopee
        let recommend = req.body.recommend

        let suggest = 'FALSE';
        if(recommend){
            suggest = 'TRUE'
        }

        let ematerial = null
        if(req.body.ematerial){
            ematerial = req.body.ematerial
        }

        let tmaterial = null
        if(req.body.tmaterial){
            tmaterial = req.body.tmaterial
        }
        //console.log(key)
        //console.log(type)
        
        let EN = {
            name: req.body.ename, 
            price: req.body.eprice, 
            brand: req.body.ebrand, 
            color: req.body.ecolor,
            size: req.body.esize,
            unit: req.body.eunit, 
            material: ematerial,
            status: req.body.estatus, 
            description: req.body.edescription, 
            property: req.body.eproperty, 
            delivery: req.body.edelivery, 
        }
        
        let TH = {
            name: req.body.tname, 
            price: req.body.tprice, 
            brand: req.body.tbrand, 
            color: req.body.tcolor,
            size: req.body.tsize, 
            unit: req.body.tunit, 
            material: tmaterial,
            status: req.body.tstatus, 
            description: req.body.tdescription, 
            property: req.body.tproperty, 
            delivery: req.body.tdelivery, 
        }

        if(!key || !type){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(203).send({msg: 'empty'})
        }

        for(t in TH){
            if(TH[t] == ''){
                for(let i = 0; i< files.length; i++){
                    fs.unlink('public/uploads/' + files[i].filename , (err) => {
                        if (err) throw err;
                    });
                }
                return res.status(203).send({msg: 'empty'})
            }
        }

        for(e in EN){
            if(EN[e] == ''){
                for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
                return res.status(203).send({msg: 'empty'})
            }
        }

        let checkProduct = await dataController.getProductByKey(key)
        if(checkProduct.length > 0){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
                //console.log(files[i].filename)
            }
            
            return res.status(203).send({msg: 'unique'})
        }
        
        await dataController.createProduct(key, shopee, suggest, type).then(
            async (product)=>{
                let detailEN = await dataController.createDetailENG(EN.name, EN.price, EN.brand, EN.color, EN.size, EN.unit, EN.material, EN.status, EN.description, EN.property, EN.delivery, product.insertId)
                let detailTH = await dataController.createDetailTH(TH.name, TH.price, TH.brand, TH.color, TH.size, TH.unit, TH.material, TH.status, TH.description, TH.property, TH.delivery, product.insertId)

                //images
                for(let i = 0; i< files.length; i++){
                    let storeImage = await dataController.createImage(files[i].filename, product.insertId)
                    //console.log(files[i].filename)
                }
                //
                return res.status(200).send({msg: 'ok'})   
            }
        );
        //console.log(product.insertId)
        
        //return res.status(203).send({msg: 'error'})
        
    })
})

router.post("/edit/keyorimage", (req, res)=>{

    upload(req, res, async (err) =>{
        if (err instanceof multer.MulterError) {  
            return res.status(203).send({msg: 'more-image'})
        } else if (err) {
            return res.status(203).send({msg: 'not-image'})
        }
        
        const files = req.files;

        //upload complete do sth here below!

        let id = req.body.id
        let key = req.body.key
        let shopee = req.body.shopee
        let recommend = req.body.recommend

        let suggest = 'FALSE';
        if(recommend){
            suggest = 'TRUE'
        }

        if(!key || !id || !shopee){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(203).send({msg: 'empty'})
        }
        
        let checkProductKey = await dataController.getProductKeyById(id)
        //console.log(checkProductKey[0].product_key)
        if(checkProductKey[0].product_key != key){
            let checkProduct = await dataController.getProductByKey(key) 
            if(checkProduct.length > 0){
                for(let i = 0; i< files.length; i++){
                    fs.unlink('public/uploads/' + files[i].filename , (err) => {
                        if (err) throw err;
                    });
                    //console.log(files[i].filename)
                }
                
                return res.status(203).send({msg: 'unique'})
            }else{
                await dataController.updateProductKey(id, key);
                await dataController.updateProduct(id, shopee, suggest);
                //images
                for(let i = 0; i< files.length; i++){
                    let storeImage = await dataController.createImage(files[i].filename, id)
                }
                //
                return res.status(200).send({msg: 'ok'})
            }
        }

        await dataController.updateProduct(id, shopee, suggest);

        if(files.length > 0){   
            //images
           for(let i = 0; i< files.length; i++){
               let storeImage = await dataController.createImage(files[i].filename, id)
           //console.log(files[i].filename)
           }
           return res.status(200).send({msg: 'ok'})
       //
       }

        return res.status(200).send({msg: 'ok'})
        
    })
    
})

router.post("/edit", async(req, res)=>{
    let id = req.body.id

    let ematerial = null
    if(req.body.ematerial){
        ematerial = req.body.ematerial
    }

    let tmaterial = null
    if(req.body.tmaterial){
        tmaterial = req.body.tmaterial
    }

    //console.log(id)
    let EN = {
        id: req.body.eid,
        name: req.body.ename, 
        price: req.body.eprice, 
        brand: req.body.ebrand, 
        color: req.body.ecolor,
        size: req.body.esize, 
        unit: req.body.eunit, 
        material: ematerial,
        status: req.body.estatus, 
        description: req.body.edescription, 
        property: req.body.eproperty, 
        delivery: req.body.edelivery, 
    }
    
    let TH = {
        id: req.body.tid,
        name: req.body.tname, 
        price: req.body.tprice, 
        brand: req.body.tbrand, 
        color: req.body.tcolor,
        size: req.body.tsize, 
        unit: req.body.tunit, 
        material: tmaterial,
        status: req.body.tstatus, 
        description: req.body.tdescription, 
        property: req.body.tproperty, 
        delivery: req.body.tdelivery, 
    }
    
    //console.log(EN)
    //console.log(TH)

    for(t in TH){
        if(TH[t] == ''){
            return res.status(203).send({msg: 'empty'})
        }
    }

    for(e in EN){
        if(EN[e] == ''){
            return res.status(203).send({msg: 'empty'})
        }
    }

    await dataController.updateDeatail(TH.id, TH.name, TH.price, TH.brand, TH.color, TH.size, TH.unit, TH.material, TH.status, TH.description, TH.property, TH.delivery)
    await dataController.updateDeatail(EN.id, EN.name, EN.price, EN.brand, EN.color, EN.size, EN.unit, EN.material, EN.status, EN.description, EN.property, EN.delivery)

    return res.status(200).send({msg: 'ok'})
})


router.post("/removeImage", async(req, res)=>{
    let id = req.body.id
    let name = req.body.name
    await dataController.deleteImageById(id).then(
        (data)=>{
            fs.unlink('public/uploads/' + name , (err) => {
                if (err) throw err;
            });
            return res.status(200).json({msg: 'ok'})
        }
    ).catch((err)=>{
        //console.log(err)
        return res.status(203).json({msg: 'error'})
    })
})

router.post("/delete/product", async(req, res)=>{
    let id = req.body.id

    if(!id){
        return res.status(203).json({msg: 'error'})
    }

    let images = await dataController.getImageByProductId(id)
    if(images.length> 0){
        for(let i=0;i<images.length;i++){
            fs.unlink('public/uploads/' + images[i].name , (err) => {
                if (err) throw err;
            });
        }
    }
       
    await dataController.deleteDetailsByProductId(id).then(
        async()=>{
            await dataController.deleteImageByProductId(id).then(
                async()=>{
                    await dataController.deleteProductById(id)
                    return res.status(200).json({msg: 'ok'})
                }
            )
        }
    ).catch((err)=>{
        //console.log(err)
        return res.status(203).json({msg: 'error'})
    })

})

//slide
router.get("/slides", async(req, res)=>{
    return res.render('admin', {
        pages:'slides',
    })
})

router.get("/slides/get", async(req, res)=>{
    let data = await dataController.getSlides();
    return res.json(data)
})

router.get("/slide", async(req, res)=>{
    return res.render('admin', {
        pages:'createslide',
    })
})

router.get("/slide/:sid", async(req, res) => {
    let sid = req.params.sid
    let data = await dataController.getSlideById(sid)
    if(data.length == 0){
        return res.redirect('/admin')
    }
    return res.render('admin', {
        pages:'editslide',
        data: data,
    })
});

router.post("/slide/create", async(req, res)=>{
    
    upload(req, res, async (err) =>{
        
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            //{"name":"MulterError","message":"Unexpected field","code":"LIMIT_UNEXPECTED_FILE","field":"multi_files","storageErrors":[]}
            
            return res.status(203).send({msg: 'more-image'})
        } else if (err) {
            // An unknown error occurred when uploading.
            // msg from cb
            return res.status(203).send({msg: 'not-image'})
        }

        const files = req.files;
        //console.log(files[0].filename)
        
        if(files.length < 1){   
            return res.status(203).send({msg: 'no-image'})
        }
        //upload complete do sth here below!
        let title_thai = req.body.title_thai
        let subtitle_thai = req.body.subtitle_thai
        let title_english = req.body.title_english
        let subtitle_english = req.body.subtitle_english
        let link = req.body.link

        if(!title_thai || !subtitle_thai || !title_english || !subtitle_english || !link){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(203).send({msg: 'empty'})
        }

      
        if(title_thai == '' || subtitle_thai == '' || title_english == '' || subtitle_english == '' || link == ''){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(203).send({msg: 'empty'})
        }
        try{
            await dataController.createSlide(title_thai,subtitle_thai, title_english, subtitle_english, link, files[0].filename)
            return res.status(200).send({msg: 'ok'})
        }catch(err){
            return res.status(203).send({msg: 'err'})
        }
       
    })
})

router.post("/slide/edit", async(req, res)=>{
    
    upload(req, res, async (err) =>{
        
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            //{"name":"MulterError","message":"Unexpected field","code":"LIMIT_UNEXPECTED_FILE","field":"multi_files","storageErrors":[]}
            return res.status(203).send({msg: 'more-image'})
        } else if (err) {
            // An unknown error occurred when uploading.
            // msg from cb
            return res.status(203).send({msg: 'not-image'})
        }

        const files = req.files;
        
        
        
        //upload complete do sth here below!
        let id = req.body.id
        let title_thai = req.body.title_thai
        let subtitle_thai = req.body.subtitle_thai
        let title_english = req.body.title_english
        let subtitle_english = req.body.subtitle_english
        let link = req.body.link
        let image = req.body.oldimage
        let oldimagename = req.body.oldimage

        if(files.length > 0){
            image = files[0].filename
        }


        if(!title_thai || !subtitle_thai || !title_english || !subtitle_english || !link){
            if(files.length > 0){
                for(let i = 0; i< files.length; i++){
                    fs.unlink('public/uploads/' + files[i].filename , (err) => {
                        if (err) throw err;
                    });
                }
            }
            
            return res.status(203).send({msg: 'empty'})
        }

      
        if(title_thai == '' || subtitle_thai == '' || title_english == '' || subtitle_english == '' || link == ''){
            if(files.length > 0){
                for(let i = 0; i< files.length; i++){
                    fs.unlink('public/uploads/' + files[i].filename , (err) => {
                        if (err) throw err;
                    });
                }
            }
            return res.status(203).send({msg: 'empty'})
        }
        try{
            await dataController.updateSlide(id, title_thai,subtitle_thai, title_english, subtitle_english, link, image)
            if(files.length > 0){
                fs.unlink('public/uploads/' + oldimagename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(200).send({msg: 'ok'})
        }catch(err){
            return res.status(203).send({msg: 'err'})
        }
       
    })
})

router.post("/slide/delete", async(req, res)=>{
    let id = req.body.id

    if(!id){
        return res.status(203).json({msg: 'error'})
    }

    try{
        let slide = await dataController.getSlideById(id)
        fs.unlink('public/uploads/' + slide[0].image , (err) => {
            if (err) throw err;
        });
        await dataController.deleteSlideById(id);
        
        return res.status(200).json({msg: 'ok'})
    }catch(err){
        //console.log(err)
        return res.status(203).json({msg: 'error'})
    }
    
})

//promotions
router.get("/promotions", async(req, res)=>{
    let data = await dataController.getPromotions()
    return res.render('admin', {
        pages:'promotions',
        data: data
    })
})

router.get("/product/:pid/promotion/create", async(req, res)=>{
    let pid = req.params.pid
    let data = await dataController.getProductWithDetailById(pid)
    return res.render('admin', {
        pages:'createpromotion',
        data: data
    })
})

router.get("/promotion/:pid", async(req, res) => {
    let pid = req.params.pid
    let data = await dataController.getPromotionById(pid)
    let product = await dataController.getProductWithDetailById(data[0].product_id)
    if(data.length == 0){
        return res.redirect('/admin')
    }
    return res.render('admin', {
        pages:'editpromotion',
        data: data,
        product: product
    })
});

router.post("/promotion/create", async(req, res)=>{
    upload(req, res, async (err) =>{
        
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            //{"name":"MulterError","message":"Unexpected field","code":"LIMIT_UNEXPECTED_FILE","field":"multi_files","storageErrors":[]}
            
            return res.status(203).send({msg: 'more-image'})
        } else if (err) {
            // An unknown error occurred when uploading.
            // msg from cb
            return res.status(203).send({msg: 'not-image'})
        }

        const files = req.files;
        //console.log(files[0].filename)
        
        if(files.length < 1){   
            return res.status(203).send({msg: 'no-image'})
        }
        //upload complete do sth here below!
        let name = req.body.promotion_name
        let product_id = req.body.product_id

        if(!name || !product_id){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(203).send({msg: 'empty'})
        }

      
        if(name == ''){
            for(let i = 0; i< files.length; i++){
                fs.unlink('public/uploads/' + files[i].filename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(203).send({msg: 'empty'})
        }
        try{
            await dataController.createPromotion(name, files[0].filename, product_id)
            return res.status(200).send({msg: 'ok'})
        }catch(err){
            return res.status(203).send({msg: 'err'})
        }
       
    })
})

router.post("/promotion/edit", async(req, res)=>{
    
    upload(req, res, async (err) =>{
        
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            //{"name":"MulterError","message":"Unexpected field","code":"LIMIT_UNEXPECTED_FILE","field":"multi_files","storageErrors":[]}
            return res.status(203).send({msg: 'more-image'})
        } else if (err) {
            // An unknown error occurred when uploading.
            // msg from cb
            return res.status(203).send({msg: 'not-image'})
        }

        const files = req.files;
        
        
        
        //upload complete do sth here below!
        let id = req.body.id
        let name = req.body.name
        let image = req.body.oldimage
        let oldimagename = req.body.oldimage

        if(files.length > 0){
            image = files[0].filename
        }


        if(!name || !id){
            if(files.length > 0){
                for(let i = 0; i< files.length; i++){
                    fs.unlink('public/uploads/' + files[i].filename , (err) => {
                        if (err) throw err;
                    });
                }
            }
            
            return res.status(203).send({msg: 'empty'})
        }

      
        if(name == '' || id == ''){
            if(files.length > 0){
                for(let i = 0; i< files.length; i++){
                    fs.unlink('public/uploads/' + files[i].filename , (err) => {
                        if (err) throw err;
                    });
                }
            }
            return res.status(203).send({msg: 'empty'})
        }
        try{
            await dataController.updatePromotion(id, name, image)
            if(files.length > 0){
                fs.unlink('public/uploads/' + oldimagename , (err) => {
                    if (err) throw err;
                });
            }
            return res.status(200).send({msg: 'ok'})
        }catch(err){
            return res.status(203).send({msg: 'err'})
        }
       
    })
})

router.post("/promotion/delete", async(req, res)=>{
    let id = req.body.id

    if(!id){
        return res.status(203).json({msg: 'error'})
    }

    try{
        let promotion = await dataController.getPromotionById(id)
        fs.unlink('public/uploads/' + promotion[0].image , (err) => {
            if (err) throw err;
        });
        await dataController.deletePromotionById(id);
        
        return res.status(200).json({msg: 'ok'})
    }catch(err){
        //console.log(err)
        return res.status(203).json({msg: 'error'})
    }
    
})


module.exports = router;
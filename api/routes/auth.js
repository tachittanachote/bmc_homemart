const express = require("express");
const bcrypt = require('bcrypt');
const dataController = require('../controllers/dataController')
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect('/admin')
});

/*router.post("/accounts/changepassword", async(req, res)=>{
  let oldpass = req.body.oldpass
  let newpass = req.body.newpass
  let confirmpass =req.body.conpass

  let username = 'admin';

  if(newpass != confirmpass){
    res.render('admin', {pages:'accounts', msg:'confirm password is not match!'})
    return;
  }

  let user = await dataController.findUserByUsername(username)
    if(user.length < 1){
      res.render('admin', {pages:'accounts',msg:"user not found!"})
      //res.status(401).json({msg:"Authenticate failed"})
      return;
    }else{
      //console.log(user[0])
      bcrypt.hash(oldpass, 10).then(async(hashOldPassword)=>{
          console.log(hashOldPassword)
          bcrypt.compare(hashOldPassword, user[0].password).then((result)=>{
              if(!result){
                res.render('admin', {pages:'accounts', msg:'incorrect old password'})
                //res.status(401).json({msg:"Authenticate failed"})
                return;
              }else{
                bcrypt.hash(newpass, 10).then(async(hashPassword)=>{
                  await dataController.updatePasswordByUsername(username, hashPassword).then(()=>{
                    req.session.destroy()
                    return res.redirect('/')
                  }).catch((err)=>{
                    console.log(err)
                    return res.render('admin', {pages:'accounts', msg:'something wrong. Plaese try again!'})
                  })
                }).catch((err)=>{
                  console.log(err)
                  return res.render('admin', {pages:'accounts', msg:'something wrong. Plaese try again!'})
                })
              }
          }).catch((err)=>{
              res.render('admin', {pages:'accounts',msg:"error1"})
              //res.status(401).json({msg:"Authenticate failed"})
              return;
          })
      }).catch((err)=>{
          res.render('admin', {pages:'accounts',msg:"error0"})
          //res.status(401).json({msg:"Authenticate failed"})
          return;
      })
      
  }
    
})*/


/*router.post("/api/register", async(req, res) => {
    let username = req.body.username
    let password = req.body.password
    bcrypt.hash(password, 10).then(async(hashPassword)=>{
      await dataController.registerUser(username, hashPassword).then(()=>{
        res.status(201).json({msg:"success"})
      }).catch((err)=>{
        console.log(err)
        res.status(500).json({msg:"error"})
      })
    }).catch((err)=>{
      console.log(err)
      res.status(500).json({msg:"error"})
    })
  });*/
  
router.post("/login", async (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if(username == '' || password == ''){
      res.render('login', {msg:"Authenticate failed"})
      return;
    }

    let user = await dataController.findUserByUsername(username)
    if(user.length < 1){
      res.render('login', {msg:"Authenticate failed"})
      //res.status(401).json({msg:"Authenticate failed"})
      return;
    }else{
      //console.log(user[0])
      bcrypt.compare(password, user[0].password).then((result)=>{
        if(!result){
          res.render('login', {msg:"Authenticate failed"})
          //res.status(401).json({msg:"Authenticate failed"})
          return;
        }else{
          req.session.user = user;
          //res.json("login passed!")
          //res.render('admin', {user})
          res.redirect('/admin/categories')
          return;
        }
      }).catch((err)=>{
        res.render('login', {msg:"Authenticate failed"})
        //res.status(401).json({msg:"Authenticate failed"})
        return;
      })
    }
  });


module.exports = router;

//
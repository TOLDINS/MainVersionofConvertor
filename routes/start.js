const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const json2csv = require('json2csv').parse;
const fields = ['email', 'name', 'address','city','state','zip','phone','corporation','subject'];
const opts = { fields };






router.get('/',(req,res)=>{
    res.render('main',{
        title: 'StartUp',
        
    });

})
router.get('/info',(req,res)=>{

    res.render('info');

})
router.get('/singup',(req,res)=>{
    


    res.render('singup');


})

router.post('/singup',urlencodedParser,(req,res)=>{
    
console.log(req.body);
  const user=new User({
       email: req.body.email,
        name:  req.body.name,
       address: req.body.address,
       city: req.body.city,
      zip:req.body.zip,
        phone:req.body.phone,
        comments:req.body.comments,
       corporationtype:req.body.corporation
    })

    try{
       user.save();

   }
    catch(e){
         throw (e);
    }

    
    
    res.redirect('/');




})


router.get('/admin',async (req,res)=>{
    try {
        const myData=  await User.find();
        const csv = json2csv(myData, opts);
        console.log(csv);

    res.render('admin',{
        Info:csv
    });

      } catch (err) {
        console.error(err);
      }



})


router.post('/admin',(req,res)=>{



res.render('/admin');


})

router.get('/login',(req,res)=>{



res.render('loginadmin');

})


router.post('/login', urlencodedParser,(req,res)=>{

    if(req.body.login==='Royal_Shark'){
        if(req.body.password==='manymoney'){


            res.redirect('admin')
            

        }
    }
    else{

        res.render('main');


    
    }
});


    




module.exports=router;
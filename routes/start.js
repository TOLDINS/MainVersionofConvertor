const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const bodyParser = require("body-parser");

const fs=require('fs');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const json2csv = require('json2csv').parse;
const fields = ['email', 'name', 'address','city','state','zip','phone','corporation','subject'];
const opts = { fields };

async function  csvWriter(data){

   await fs.writeFile('test.csv',data,(err)=>{

        if(err){
            console.log("Done");
        }
    })


}




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
        state:req.body.state,
        zip:req.body.zip,
        phone:req.body.phone,
        comments:req.body.comments,
        corporation:req.body.corporation
    })

    try{
       user.save();

   }
    catch(e){
         throw (e);
    }



    res.redirect('/');




})
router.post('/send',urlencodedParser,(req,res)=>{
console.log(req.body.email);
});

router.get('/admin',async (req,res)=>{
    try {
        const myData=  await User.find();
        const convert=JSON.stringify(myData);
        const esult=JSON.parse(convert);

        const csv = json2csv(myData, opts);
        console.log(csv);
        console.log(esult);
        csvWriter(csv);

    res.render('admin',{


           result:esult


    });

      } catch (err) {
        console.error(err);
      }



})


router.post('/admin',(req,res)=>{
res.sendfile(__dirname+'/test.csv');
})

router.get('/login',(req,res)=>{



res.render('loginadmin');

})


router.post('/login', urlencodedParser,(req,res)=>{

    if(req.body.login==='Royal_Shark'){
        if(req.body.password==='manyclients'){


            res.redirect('admin')


        }
    }
    else{

        res.render('main');



    }
});







module.exports=router;

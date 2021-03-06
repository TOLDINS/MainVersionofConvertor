const express=require('express');
const router=express.Router();
const User=require('../Models/User');
const bodyParser = require("body-parser");
const multer  = require("multer");
const fs=require('fs');
const urlencodedParser = bodyParser.urlencoded({extended: false});
const json2csv = require('json2csv').parse;
const fields = ['email', 'name', 'address','city','state','zip','phone','corporation','subject'];
const opts = { fields };
const nodemailer=require('nodemailer');

router.use(multer({dest:"uploads"}).single("filedata"));
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

});

router.get('/info',(req,res)=>{

    res.render('info');

});

router.get('/singup',(req,res)=>{



    res.render('singup');


});
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
        corporation:req.body.corporation,
      status:false,
    })

    try{
       user.save();

   }
    catch(e){
         throw (e);
    }



    res.redirect('/');




});


router.post('/send',urlencodedParser,async (req,res, next)=>{

    console.log(req.file);
    try {

        for (var i=0;i<req.body.food.length;i++)
        { const  query=User.where({email:req.body.food[i]});
            await query.findOne(  function (err,user) {
                if(err) return err;
                if(user){

                    user.status=true;

                    user.save();
                    console.log("sucesful")
                }

            });
        }
        const  query=User.where({email:req.body.food});
        await query.findOne(  function (err,user) {
            if(err) return err;
            if(user){

                user.status=true;

                user.save();
                console.log("sucesful")
            }

        });

    }catch (e) {
console.log("error")
    }
    const message={
        to: req.body.food,
        subject:'Done',
        text:req.body.text,
        attachments:[{filename:req.body.text,
            path:"./uploads/"+req.file.filename        }]
    }
    const transporter=nodemailer.createTransport(
        {
            host:'smtp.gmail.com',
            port:465,
            secure: true,
            auth:{
                user:'convertor.app@gmail.com',
                pass:'manyclients'
            }


        },
        {
            from:'Mailer Test <convertor.app@gmail.com>',
        }
    );
    const mailer=message=>{
        transporter.sendMail(message,(err,info)=>{
            if(err)return console.log(err);
            console.log('Email sent:', info)
        })
    };
   await mailer(message);
    try {
        const myData=  await User.find();
        const convert=JSON.stringify(myData);
        const result=JSON.parse(convert);

        const csv = json2csv(myData, opts);
        console.log(csv);
        console.log(result);
        csvWriter(csv);

      await res.redirect("/admin")
    } catch (err) {
        console.error(err);
    }}
    );

router.get('/admin',async (req,res)=>{
    try {
        const myData=  await User.find();
        const convert=JSON.stringify(myData);
        const result=JSON.parse(convert);

        const csv = json2csv(myData, opts);
        console.log(csv);
        console.log(result);
        csvWriter(csv);

    await res.render('admin',{
        result:result,


    });
      } catch (err) {
        console.error(err);
      }
});
router.post('/admin',(req,res)=>{
res.sendfile(__dirname+'/test.csv');
});

router.get('/login',(req,res)=>{

res.render('loginadmin');

});
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

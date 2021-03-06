const express=require('express');
const path=require('path');
const app =express();
const startRoute=require('./routes/start');
const exphbs=require('express-handlebars');
const mongoose=require('mongoose');
const hbss=exphbs.create(
    {
        layoutsDir: "views/layouts",
        defaultLayout: "empty",
        extname: "hbs"
    });
app.engine("hbs", hbss.engine);
app.set("view engine", "hbs");
app.set('views','views');

app.use('/',startRoute);
mongoose.connect('mongodb+srv://user:1234@cluster0-9gu3c.mongodb.net/test?retryWrites=true&w=majority',{
    useUnifiedTopology : true,
    useNewUrlParser : true
}).then(()=>console.log('Db connected')).catch(()=>console.log(error));

//




module.exports=app;

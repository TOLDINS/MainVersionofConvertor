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
const uri = "mongodb+srv://denis:1111@cluster0-9gu3c.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connect')
  });






module.exports=app;
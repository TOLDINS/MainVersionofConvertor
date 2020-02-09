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
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://denis:1111@cluster0-9gu3c.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});






module.exports=app;
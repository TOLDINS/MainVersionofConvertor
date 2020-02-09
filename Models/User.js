const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema=new Schema({

    email:{
        type:String,
        unigue:true
    },

    name:{
        type:String,
        unigue:true
    },
    address:{
        type:String,
        unique:true


    },
    city:{
        type:String

    },
    state:{
        type:String
    },
    zip:{
        type:Number

    },
    phone:{
        type:Number

    },
    comments:{
        type:String


    },
    corporation:{
        type:String




    }
})
module.exports=mongoose.model('User',userSchema);
import mongoose from "mongoose";




const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    role: {
        type:String,
        require:true
    },
    last_login:{
        type:String,
        require:true
    }   
},{timestamps:true})


const Admin = mongoose.model("admin",adminSchema)
export default Admin
import mongoose, {Schema,models,model} from "mongoose";

const UserSchema=new Schema({
    name:{type:String,required:true,trim:true,},
    username:{type:String,required:true,unique:true,trim:true,},
    email:{type:String,required:true,unique:true,trim:true,},
    image:{type:String, default:""},
    headline:{type:String,required:true,},
    bio:{type:String,required:true,trim:true,},
    skills:{type:[String],required:true,},
    githubURL:{type:String,default:"",},
    linkedInURL:{type:String,default:"",},
    providerIds:{type:String,default:"",},
},
{
    timestamps:true,

}
);
const User=models.User || model("User",UserSchema);
export default User;
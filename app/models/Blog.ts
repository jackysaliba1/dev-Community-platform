import mongoose,{Schema,models,model} from "mongoose";
const BlogSchema =new Schema({
    title:{type:String,required:true,trim:true,},
    slug:{type:String,required:true,unique:true,trim:true,},
    excerpt:{type:String,required:true,},
    content:{type:String,required:true,},
    coverImage:{type:String,default:"",},
    tags:{type:[String],default:[]},
    author:{ type: Schema.Types.ObjectId,ref:"User",required: true,},
    status:{ type: String,
      enum: ["draft", "published"],
      default: "draft",},
    publishedAt:{type:Date,},
},
{
timestamps:true,

});
const Blog=models.Blog || model("Blog",BlogSchema);
export default Blog;
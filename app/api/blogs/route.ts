import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import Blog from "@/app/models/Blog";
import { auth } from "@/auth";
import {NextResponse} from "next/server";

export async function GET(){

try{
await connectMongo();

 const blogs=await Blog.find().sort({createdAt:-1});

 return NextResponse.json(blogs);

 }catch(error){

 return NextResponse.json({message:"Failed to fetch blogs", details:String(error)},{status:500});

 }

}

export async function POST(request:Request){

 try{
const session = await auth();

if (!session?.user?.email) {
    return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
    );
}
 const body=await request.json();

 await connectMongo();
  const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        const slug = body.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

    const excerpt =
            body.content.length > 150
                ? body.content.slice(0, 150) + "..."
                : body.content;

 const created=await Blog.create({

 title:body.title,

 slug,
 excerpt,
 content:body.content,
 coverImage:body.coverImage,
 tags:body.tags,
 author:user._id,

status:"published",
publishedAt:new Date(),

 });

 return NextResponse.json(created, {status: 201});

}catch(error){

 return NextResponse.json(

 {message: "Failed to create a blog" ,details:String(error)}, {status: 500});
 }

}

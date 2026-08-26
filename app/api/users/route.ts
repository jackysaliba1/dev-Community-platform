import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import {NextResponse} from "next/server";
export async function GET(){
    try{
        await connectMongo();
        const users=await User.find().sort({createdAt:-1});
        return NextResponse.json(users);
    }catch(error){
    return NextResponse.json({error:"Failed to fetch developers" },{status:500});
    }
}
export async function POST(request:Request){
try{
    const body=await request.json();
    await connectMongo();
    const created=await User.create({
        name:body.name,
        username:body.username,
        email:body.email,
        image:body.image,
        headline:body.headline,
        bio:body.bio,
        skills: body.skills ?? [],
        githubURL:body.githubUrl,
        linkedInURL:body.linkedInUrl,
        providerIds:body.providerIds,
    });
        return NextResponse.json(created, {status: 201});
    }catch(error){
        return NextResponse.json(
    {message: "Failed to create developer", error: String(error)}, {status: 500});
        }
}

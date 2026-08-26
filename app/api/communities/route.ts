import connectMongo from "@/app/lib/Mongoose";
import Community from "@/app/models/Community";
import {NextResponse} from "next/server";
import User from "@/app/models/User";


export async function GET() {
try{
   await connectMongo();
   User;
   const communities=await Community.find().populate("members");
   return NextResponse.json({success:true, data: communities},{status:200});
}catch(error){
    return NextResponse.json({error:"Failed to fetch communities"},{status:500});
}
}
export async function POST(request:Request){
    try{
           const body = await request.json();
    await connectMongo();

    const created = await Community.create({
      name: body.name,
      slug: body.slug,
      description: body.description,
      tags: body.tags || [],
      category: body.category,
      image: body.image,
      createdBy: body.createdBy,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "A community with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create community", details: String(error) },
      { status: 500 }
    );
  }
}
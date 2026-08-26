import connectMongo from "@/app/lib/Mongoose";
import Community from "@/app/models/Community";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "@/app/models/User";
import { auth } from "@/auth";

export async function POST(request:Request, 
    {params}:{params:Promise <{id:string}>}){
        try{
            const session=await auth();
            if(!session?.user?.email){
                return NextResponse.json({success:false,message:"Unauthorized"},{status:401});
            }
            const {id}=await params;
            await connectMongo();
            const user=await User.findOne({
                email:session.user.email,
            });
            if(!user){
                return NextResponse.json({
                    success:false,message:"User not found",
                },{status:404});
            }
            const community=await Community.findById(id);
            if(!community){
                return NextResponse.json({success:false,message:"Community not found"},{status:404});
            }
            const alreadyJoined=community.members.some( (member:any)=>
                member.toString() === user._id.toString()
    );

    if (alreadyJoined) {
      return NextResponse.json(
        {
          success: false,
          message: "Already a member",
        },
        { status: 409 }
      );
    }

    community.members.push(user._id);

    await community.save();

    return NextResponse.json(
      {
        success: true,
        message: "Joined community successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to join community",
          details: error instanceof Error
                ? error.message
                : String(error),
      },
      { status: 500 }
    );
  }
}
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { id } = await params;

        await connectMongo();

        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        const community = await Community.findById(id);

        if (!community) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Community not found",
                },
                { status: 404 }
            );
        }

        // Remove the user from members
        community.members = community.members.filter(
            (member: any) =>
                member.toString() !== user._id.toString()
        );

        await community.save();

        return NextResponse.json(
            {
                success: true,
                message: "Left community successfully",
            },
            { status: 200 }
        );

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to leave community",
                details:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            { status: 500 }
        );
    }
}
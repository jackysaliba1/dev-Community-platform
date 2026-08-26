import { NextResponse } from "next/server";
import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import { auth } from "@/auth";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectMongo();

        const user = await User.findOne({
            email: session.user.email,
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}


export async function PATCH(request: Request) {
    try {
        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectMongo();

        const body = await request.json();

        const updatedUser = await User.findOneAndUpdate(
            {
                email: session.user.email,
            },
            {
                name: body.name,
                username: body.username,
                headline: body.headline,
                bio: body.bio,
                skills: body.skills,
                githubURL: body.githubURL,
                linkedInURL: body.linkedInURL,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Profile updated successfully",
                user: updatedUser,
            },
            { status: 200 }
        );

    } catch (error: any) {

        if (error?.code === 11000) {
            return NextResponse.json(
                {
                    error: "Username or email already exists",
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            {
                error: "Failed to update profile",
                details: String(error),
            },
            { status: 500 }
        );
    }
}
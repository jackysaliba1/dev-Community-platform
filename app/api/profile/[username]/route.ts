import { NextResponse } from "next/server";
import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import { auth } from "@/auth";
import { profileSchema } from "@/app/schemas/profileSchema";
import { ZodError } from "zod";

export async function GET(request: Request,
    { params }: { params: Promise<{ username: string }> }) {

    try {

        const session = await auth();

        if (!session?.user?.email) {

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        }
        const { username } = await params;

        await connectMongo();

        const user = await User.findOne({
            username
        });

        if (!user) {

            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );

        }

        return NextResponse.json(
            user,
            { status: 200 }
        );

    } catch (error) {

        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );

    }

}

export async function PATCH(
    request: Request
) {

    try {

        const session = await auth();

        if (!session?.user?.email) {

            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );

        }

        const body = await request.json();

        const validated =
            profileSchema.parse(body);

        await connectMongo();

        const updatedUser =
            await User.findOneAndUpdate(

                {
                    email: session.user.email,
                },

                {
                    name: validated.name,
                    headline: validated.headline,
                    bio: validated.bio,
                    githubURL: validated.githubURL,
                    linkedInURL: validated.linkedInURL,
                    skills: validated.skills || [],
                },

                {
                    new: true,
                }

            );

        return NextResponse.json(
            updatedUser,
            { status: 200 }
        );

    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: error.issues[0].message,
                },
                { status: 400 }
            );
        }

        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to update profile",
            },
            { status: 500 }
        );
    }

}
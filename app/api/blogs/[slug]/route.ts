import connectMongo from "@/app/lib/Mongoose";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";
import {NextResponse} from "next/server";
import { auth } from "@/auth";
export async function GET(request:Request, {params}:{params:Promise<{slug:string}>}
){
    try{
        await connectMongo();
        const {slug}=await params;
        const blog=await Blog.findOne({ slug });
        if(!blog){
            return NextResponse.json({message:"Blog not found"},{status:404});
        }
        return NextResponse.json(blog);
    }catch(error){
        return NextResponse.json({error:"Failed to fetch blog"},{status:500});
    }
}
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        await connectMongo();

        const session = await auth();

        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { slug } = await params;

        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        const currentUser = await User.findOne({
            email: session.user.email,
        });

        if (!currentUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (
            blog.author.toString() !==
            currentUser._id.toString()
        ) {
            return NextResponse.json(
                { error: "You can only edit your own blogs" },
                { status: 403 }
            );
        }

        const body = await request.json();

        const updated = await Blog.findOneAndUpdate(
            { slug },
            {
                title: body.title,
                excerpt: body.excerpt,
                content: body.content,
                coverImage: body.coverImage,
                tags: body.tags,
            },
            { new: true }
        );

        return NextResponse.json(updated);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to update blog" },
            { status: 500 }
        );
    }
}
   export async function DELETE(request:Request, {params}:{params:Promise <{slug:string}>}){
    try{
        await connectMongo();
          const session = await auth();

        // User must be logged in
        if (!session?.user?.email) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const {slug} =await params;
        const blog = await Blog.findOne({ slug });

        if (!blog) {
            return NextResponse.json(
                { error: "Blog not found" },
                { status: 404 }
            );
        }

        // Find the logged-in user
        const currentUser = await User.findOne({
            email: session.user.email,
        });

        if (!currentUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Make sure the user is the author
        if (
            blog.author.toString() !==
            currentUser._id.toString()
        ) {
            return NextResponse.json(
                { error: "You can only delete your own blogs" },
                { status: 403 }
            );
        }

        const deletedblog=await Blog.findOneAndDelete({slug});
        if(!deletedblog){
            return NextResponse.json({error:"Blog not found"},{status:404});
        }
        return NextResponse.json({message:"Blog deleted sucessfully"},{status:200});
    }catch(error){
        return NextResponse.json({error:"Failed to delete blog"},{status:500});
    }
   }

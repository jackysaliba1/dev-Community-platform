import Blog from "@/app/models/Blog";
import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import EditBlogForm from "@/components/EditBlogForm";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export default async function EditBlogPage({
    params,
}: Props) {

    const { slug } = await params;

    await connectMongo();

    const session = await auth();

    if (!session?.user?.email) {
        notFound();
    }

    const blogDoc = await Blog.findOne({ slug })
        .populate("author")
        .lean();

    if (!blogDoc) {
        notFound();
    }
    const blog = JSON.parse(
    JSON.stringify(blogDoc)
);

    const currentUser = await User.findOne({
        email: session.user.email,
    }).lean();

    if (
        !currentUser ||
        blog.author._id.toString() !==
            currentUser._id.toString()
    ) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-blue-900 text-white">
            <div className="max-w-3xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold mb-8">
                    Edit Blog
                </h1>
                       <EditBlogForm blog={blog} />

            </div>
        </main>
    );
}
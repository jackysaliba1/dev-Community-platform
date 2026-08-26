import { Metadata} from "next";
import connectMongo from "@/app/lib/Mongoose";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";
import { auth } from "@/auth";
import { notFound } from "next/navigation";
import Link from "next/link";
import DeleteBlogButton from "@/components/DeleteBlogForm";

interface Props{
    params:Promise<{
        slug:string;
    }>;
}

export async function generateMetadata({
    params,
}: Props):Promise<Metadata>{
    const {slug} =await params;
    await connectMongo();

    const blog=await Blog.findOne({
        slug,
        status:"published",
    }).lean();
    if(!blog){
        return{
            title:"Blog Not Found",
            description:"The requested blog coudn't be found",
        };
    }
    return{
        title:`${blog.title}| DevCommunity`,
        description:blog.content.substring(0,160),
    };
}
export default async function BlogDetailsPage({
    params,
}: Props) {

    const { slug } = await params;

    await connectMongo();

    
    const blog = await Blog.findOne({
        slug,
        status: "published",
    })
        .populate("author", "name username image")
        .lean();

   
    if (!blog) {
        notFound();
    }

    
    const session = await auth();

    let isAuthor = false;

    if (session?.user?.email) {

        const currentUser = await User.findOne({
            email: session.user.email,
        }).lean();

        if (
            currentUser &&
            blog.author &&
            currentUser._id.toString() === blog.author._id.toString()
        ) {
            isAuthor = true;
        }
    }

    
    const wordCount = blog.content
        .trim()
        .split(/\s+/)
        .length;

    const readingTime = Math.max(
        1,
        Math.ceil(wordCount / 200)
    );

   
    const relatedBlogs = await Blog.find({
        _id: { $ne: blog._id },
        status: "published",
        tags: { $in: blog.tags || [] },
    })
        .populate("author", "name username image")
        .limit(3)
        .lean();

    return (
        <main className="min-h-screen bg-blue-900 text-stone-100">

            <div className="max-w-4xl mx-auto px-6 py-12">

               

                <Link
                    href="/blogs"
                    className="inline-block mb-8 text-blue-300 hover:text-blue-200 transition"
                >
                    ← Back to Blogs
                </Link>


               

                {blog.coverImage && (
                    <div className="mb-8 overflow-hidden rounded-2xl border border-blue-800">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-64 md:h-96 object-cover"
                        />
                    </div>
                )}


                

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    {blog.title}
                </h1>


             

                <div className="flex items-center gap-3 mt-6">

                    {blog.author?.image ? (
                        <img
                            src={blog.author.image}
                            alt={blog.author.name || "Author"}
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-lg font-bold">
                            {blog.author?.name?.charAt(0)}
                        </div>
                    )}

                    <div>

                        <Link
                            href={`/profile/${blog.author?.username}`}
                            className="font-medium hover:text-blue-300 transition"
                        >
                            {blog.author?.name}
                        </Link>

                        <p className="text-sm text-stone-400">
                            @{blog.author?.username}
                        </p>

                    </div>

                </div>


              

                <div className="flex gap-3 text-sm text-stone-400 mt-4">

                    <span>
                        Published{" "}
                        {new Date(
                            blog.publishedAt || blog.createdAt
                        ).toLocaleDateString()}
                    </span>

                    <span>•</span>

                    <span>
                        {readingTime} min read
                    </span>

                </div>



                <div className="flex flex-wrap gap-2 mt-6">

                    {blog.tags?.map((tag: string) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-blue-950 border border-blue-700 rounded-full text-sm text-blue-200"
                        >
                            #{tag}
                        </span>
                    ))}

                </div>


            

                {isAuthor && (
                    <div className="flex gap-3 mt-8">

                        <Link
                            href={`/blogs/${blog.slug}/edit`}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                        >
                            Edit
                        </Link>

                    <DeleteBlogButton slug={blog.slug} />

                    </div>
                )}


               

                <article className="mt-10 bg-blue-950 border border-blue-800 rounded-2xl p-6 md:p-10">

                    <div className="whitespace-pre-wrap text-stone-200 leading-8">
                        {blog.content}
                    </div>

                </article>



                <section className="mt-14">

                    <h2 className="text-2xl font-bold mb-6">
                        Related Posts
                    </h2>

                    {relatedBlogs.length < 2 ? (

                        <p className="text-stone-400">
                            No related posts found.
                        </p>

                    ) : (

                        <div className="grid md:grid-cols-2 gap-5">

                            {relatedBlogs.map((related) => (

                                <Link
                                    key={related.slug}
                                    href={`/blogs/${related.slug}`}
                                    className="bg-blue-950 border border-blue-800 rounded-xl p-5 hover:border-blue-600 transition"
                                >

                                    <h3 className="text-lg font-semibold">
                                        {related.title}
                                    </h3>

                                    <p className="text-stone-400 mt-2 line-clamp-3">
                                        {related.excerpt ||
                                            related.content.substring(0, 150)}
                                    </p>

                                    <span className="inline-block mt-4 text-blue-300 text-sm">
                                        Read article →
                                    </span>

                                </Link>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}
import connectMongo from "@/app/lib/Mongoose";
import Blog from "@/app/models/Blog";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import User from "@/app/models/User";
export const revalidate=60;
type Props={
    searchParams:Promise<{
        search?:string;
        page?:string;
    }>;
};
export default async function BlogsPage({
    searchParams,
}: Props) {

    const { search, page } = await searchParams;

    await connectMongo();
    const currentPage=Number(page) || 1; //if no page given then 1 by default
    const limit=5;
  const query = {
  status: "published",
  ...(search
    ? {
        title: {
          $regex: search,
          $options: "i",
        },
      }
    : {}),
};
const totalBlogs=await Blog.countDocuments(query); //how many blogs match
const blogs=(await Blog.find(query).populate("author").sort({publishedAt:-1}).skip((currentPage-1)*limit).limit(limit));

const totalPages=Math.ceil(totalBlogs/limit);
return(
    <main className="bg-blue-900 min-h-screen text-white">
    <div className="max-w-5xl mx-auto px-6 py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Blogs
                </h1>

                <Link
                    href="/blogs/new"
                    className="bg-blue-400 text-white px-4 py-2 rounded"
                >
                    Create Blog
                </Link>

            </div>

            <form className="mb-8">

                <input
                    type="text"
                    name="search"
                    defaultValue={search}
                    placeholder="Search blogs..."
                    className="
w-full
bg-blue-800/40
border border-blue-700
rounded-lg
px-4
py-3
text-white
placeholder:text-blue-200
"
                />

            </form>

            <div className="space-y-6">

                {blogs.length === 0 ? (

                    <p>No blogs found.</p>

                ) : (

                    blogs.map((blog: any) => (

                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />

                    ))

                )}

            </div>

            {totalPages > 1 && (

                <div className="flex justify-between mt-10">

                    {currentPage > 1 ? (

                        <Link
                            href={`/blogs?page=${currentPage - 1}${search ? `&search=${search}` : ""}`}
                            className="text-blue-500 hover:underline"
                        >
                            ← Previous
                        </Link>

                    ) : (

                        <div />

                    )}

                    <span className="text-blue-200">
                        Page {currentPage} of {totalPages}
                    </span>

                    {currentPage < totalPages ? (

                        <Link
                            href={`/blogs?page=${currentPage + 1}${search ? `&search=${search}` : ""}`}
                            className="text-blue-300 hover:text-blue-200"
                        >
                            Next →
                        </Link>

                    ) : (

                        <div />

                    )}

                </div>

            )}
            </div>

        </main>

    );

}

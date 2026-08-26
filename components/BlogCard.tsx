import Link from "next/link";
import { BlogResponse } from "@/app/types";

type Props = {
    blog: BlogResponse;
};

export default function BlogCard({ blog }: Props) {

    const readingTime = Math.max(
        1,
        Math.ceil(blog.content.split(/\s+/).length / 200)
    );

    return (

        <Link
            href={`/blogs/${blog.slug}`}
            className="
            block
            bg-blue-800/40
            border border-blue-700
            rounded-xl
            p-5
            hover:border-blue-400
            hover:bg-blue-800/60
            transition
            "
        >

            <h2 className="text-2xl font-bold text-white hover:text-blue-200">
                {blog.title}
            </h2>

            <p className="text-gray-300 mt-3">
                {blog.content.substring(0, 150)}...
            </p>

            {blog.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                    {blog.tags.map((tag: string) => (
                        <span
                            key={tag}
                            className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <div className="flex justify-between items-center mt-5 text-sm text-blue-200/80">

                <span>
                    By {blog.author?.name}
                </span>

                <span>
                    {new Date(blog.createdAt).toLocaleDateString()}
                    {" • "}
                    {readingTime} min read
                </span>

            </div>

        </Link>

    );
}
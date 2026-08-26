"use client";
import  {useState} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import loading from "@/app/loading";

export default function NewBlogPage(){
    const router=useRouter();

    const[title,setTitle]=useState("");
    const[content,setContent]=useState("");
    const[tags,setTags]=useState("");
    const[loading,setLoading]=useState(false);

   async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
        const response = await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title.trim(),
                content: content.trim(),
                tags: tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag !== ""),
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Create blog error:", data);

            toast.error(
                data?.message || "Failed to create the blog"
            );

            return;
        }

        toast.success("Blog published successfully!");

        setTimeout(() => {
            router.push("/blogs");
            router.refresh();
        }, 800);

    } catch (error) {
        console.error("Request error:", error);
        toast.error("Something went wrong. Please try again.");
    } finally {
        setLoading(false);
    }
}
return (
    <main className="min-h-screen bg-blue-900 text-white px-6 py-12">

        <div className="max-w-3xl mx-auto">

            {/* Page Header */}
            <div className="mb-8">

                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Create Blog
                </h1>

                <p className="text-blue-100 mt-3">
                    Share your knowledge, ideas, and experience with the developer community.
                </p>

            </div>


            {/* Form Card */}
            <div className="
                bg-blue-800/40
                border border-blue-700
                rounded-2xl
                p-6 md:p-8
                shadow-xl
            ">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-7"
                >

                    {/* Title */}
                    <div>

                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold text-blue-100 mb-2"
                        >
                            Blog Title
                        </label>

                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter your blog title..."
                            className="
                                w-full
                                bg-blue-900/70
                                border border-blue-700
                                rounded-lg
                                px-4 py-3
                                text-white
                                placeholder:text-blue-300/60
                                outline-none
                                focus:border-blue-300
                                focus:ring-2
                                focus:ring-blue-300/20
                                transition
                            "
                            required
                        />

                    </div>


                    {/* Content */}
                    <div>

                        <label
                            htmlFor="content"
                            className="block text-sm font-semibold text-blue-100 mb-2"
                        >
                            Content
                        </label>

                        <textarea
                            id="content"
                            rows={10}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your blog content here..."
                            className="
                                w-full
                                bg-blue-900/70
                                border border-blue-700
                                rounded-lg
                                px-4 py-3
                                text-white
                                placeholder:text-blue-300/60
                                outline-none
                                resize-y
                                focus:border-blue-300
                                focus:ring-2
                                focus:ring-blue-300/20
                                transition
                            "
                            required
                        />

                    </div>


                    {/* Tags */}
                    <div>

                        <label
                            htmlFor="tags"
                            className="block text-sm font-semibold text-blue-100 mb-2"
                        >
                            Tags
                        </label>

                        <input
                            id="tags"
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="React, Next.js, TypeScript"
                            className="
                                w-full
                                bg-blue-900/70
                                border border-blue-700
                                rounded-lg
                                px-4 py-3
                                text-white
                                placeholder:text-blue-300/60
                                outline-none
                                focus:border-blue-300
                                focus:ring-2
                                focus:ring-blue-300/20
                                transition
                            "
                        />

                        <p className="text-xs text-blue-200/70 mt-2">
                            Separate multiple tags with commas.
                        </p>

                    </div>


                    {/* Submit */}
                    <div className="pt-2">

                        <button
                            type="submit"
                            className="
                                w-full
                                md:w-auto
                                bg-blue-300
                                text-blue-950
                                px-7 py-3
                                rounded-lg
                                font-semibold
                                hover:bg-blue-200
                                hover:shadow-lg
                                transition-all
                                duration-300
                            "
                        >
                        {loading ?  "Publishing...": "Publish blog"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    </main>
);
}
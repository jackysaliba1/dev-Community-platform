"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditBlogForm({
    blog,
}: {
    blog: any;
}) {

    const router = useRouter();

    const [title, setTitle] = useState(blog.title);
    const [content, setContent] = useState(blog.content);
    const [tags, setTags] = useState(
        blog.tags.join(", ")
    );

    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        const response = await fetch(
            `/api/blogs/${blog.slug}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    tags: tags
                        .split(",")
                        .map((tag:string) => tag.trim()),
                }),
            }
        );

        if (!response.ok) {
            alert("Failed to update blog");
            return;
        }

        router.push(
            `/blogs/${blog.slug}`
        );
        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <input
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
                className="w-full bg-blue-800 border border-blue-700 rounded-lg p-3"
            />

            <textarea
                rows={10}
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                className="w-full bg-blue-800 border border-blue-700 rounded-lg p-3"
            />

            <input
                value={tags}
                onChange={(e) =>
                    setTags(e.target.value)
                }
                className="w-full bg-blue-800 border border-blue-700 rounded-lg p-3"
            />

            <button
                type="submit"
                className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-400"
            >
                Save Changes
            </button>

        </form>
    );
}
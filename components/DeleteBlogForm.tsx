"use client";

import { useRouter } from "next/navigation";

export default function DeleteBlogButton({
    slug,
}: {
    slug: string;
}) {

    const router = useRouter();

    async function handleDelete() {

        const confirmed = window.confirm(
            "Delete this blog?"
        );

        if (!confirmed) return;

        const response = await fetch(
            `/api/blogs/${slug}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {

            router.push("/blogs");
            router.refresh();

        } else {

            alert("Failed to delete blog");

        }

    }

    return (
        <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-medium transition"
        >
            Delete
        </button>
    );
}
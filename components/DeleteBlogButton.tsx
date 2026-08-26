"use client";

import { useRouter } from "next/navigation";

interface Props {
    slug: string;
}

export default function DeleteBlogButton({ slug }: Props) {

    const router = useRouter();

    async function handleDelete() {

        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) {
            return;
        }

        try {

            const response = await fetch(
                `/api/blogs/${slug}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Failed to delete blog");
                return;
            }

            alert("Blog deleted successfully");

            router.push("/blogs");
            router.refresh();

        } catch (error) {

            console.error(error);
            alert("Something went wrong");

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
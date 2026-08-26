"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface Props {
    communityId: string;
    initialJoined: boolean;
}

export default function CommunityJoinButton({
    communityId,
    initialJoined,
}: Props) {

    const router = useRouter();
    const pathname = usePathname();

    const [joined, setJoined] = useState(initialJoined);
    const [loading, setLoading] = useState(false);

    async function handleClick() {

        setLoading(true);

        try {

            const response = await fetch(
                `/api/communities/${communityId}/membership`,
                {
                    method: joined ? "DELETE" : "POST",
                }
            );

            // User is not logged in
            if (response.status === 401) {

                router.push(
                    `/login?callbackUrl=${encodeURIComponent(pathname)}`
                );

                return;
            }

            const data = await response.json();

            if (!response.ok) {

                alert(
                    data.message || "Something went wrong"
                );

                return;
            }

            setJoined(!joined);

            router.refresh();

        } catch (error) {

            console.error(error);

            alert("Something went wrong");

        } finally {

            setLoading(false);

        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
                joined
                    ? "bg-red-600 hover:bg-red-500"
                    : "bg-blue-500 hover:bg-blue-400"
            } disabled:opacity-50`}
        >
            {loading
                ? "Please wait..."
                : joined
                    ? "Leave Community"
                    : "Join Community"
            }
        </button>
    );
}
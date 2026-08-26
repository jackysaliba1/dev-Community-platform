"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
    user: {
        name: string;
        username: string;
        headline: string;
        bio: string;
        skills: string[];
        githubURL: string;
        linkedInURL: string;
    };
};

export default function EditProfileForm({ user }: Props) {

    const router = useRouter();

    const [name, setName] = useState(user.name || "");
    const [username, setUsername] = useState(user.username || "");
    const [headline, setHeadline] = useState(user.headline || "");
    const [bio, setBio] = useState(user.bio || "");
    const [skills, setSkills] = useState(
        user.skills?.join(", ") || ""
    );
    const [githubURL, setGithubURL] = useState(
        user.githubURL || ""
    );
    const [linkedInURL, setLinkedInURL] = useState(
        user.linkedInURL || ""
    );

    const [loading, setLoading] = useState(false);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {

        e.preventDefault();

        setLoading(true);

        const response = await fetch("/api/profile", {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name,
                username,
                headline,
                bio,

                skills: skills
                    .split(",")
                    .map((skill: string) => skill.trim())
                    .filter((skill: string) => skill !== ""),

                githubURL,
                linkedInURL,
            }),
        });

        const data = await response.json();

        setLoading(false);

        if (!response.ok) {
            toast.error(
                data.error || "Failed to update profile"
            );
            return;
        }

        toast.success("Profile updated successfully!");

        router.push(`/profile/${username}`);

        router.refresh();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* Name */}

            <div>
                <label className="block mb-2 font-medium">
                    Name
                </label>

                <input
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />
            </div>


            {/* Username */}

            <div>
                <label className="block mb-2 font-medium">
                    Username
                </label>

                <input
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    required
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />

                <p className="text-sm text-blue-300 mt-2">
                    This is used in your public profile URL.
                </p>
            </div>


            {/* Headline */}

            <div>
                <label className="block mb-2 font-medium">
                    Headline
                </label>

                <input
                    value={headline}
                    onChange={(e) =>
                        setHeadline(e.target.value)
                    }
                    required
                    placeholder="Full Stack Developer"
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />
            </div>


            {/* Bio */}

            <div>
                <label className="block mb-2 font-medium">
                    Bio
                </label>

                <textarea
                    value={bio}
                    onChange={(e) =>
                        setBio(e.target.value)
                    }
                    required
                    rows={6}
                    placeholder="Tell other developers about yourself..."
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />
            </div>


            {/* Skills */}

            <div>
                <label className="block mb-2 font-medium">
                    Skills
                </label>

                <input
                    value={skills}
                    onChange={(e) =>
                        setSkills(e.target.value)
                    }
                    placeholder="React, Next.js, Node.js, MongoDB"
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />

                <p className="text-sm text-blue-300 mt-2">
                    Separate skills with commas.
                </p>
            </div>


            {/* GitHub */}

            <div>
                <label className="block mb-2 font-medium">
                    GitHub URL
                </label>

                <input
                    type="url"
                    value={githubURL}
                    onChange={(e) =>
                        setGithubURL(e.target.value)
                    }
                    placeholder="https://github.com/username"
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />
            </div>


            {/* LinkedIn */}

            <div>
                <label className="block mb-2 font-medium">
                    LinkedIn URL
                </label>

                <input
                    type="url"
                    value={linkedInURL}
                    onChange={(e) =>
                        setLinkedInURL(e.target.value)
                    }
                    placeholder="https://linkedin.com/in/username"
                    className="w-full rounded-xl border border-blue-700 bg-blue-800 px-4 py-3 text-white outline-none focus:border-blue-400"
                />
            </div>


            {/* Buttons */}

            <div className="flex gap-4 pt-4">

                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-500 px-6 py-3 font-semibold hover:bg-blue-400 transition disabled:opacity-50"
                >
                    {loading
                        ? "Saving..."
                        : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-xl border border-blue-600 px-6 py-3 font-semibold hover:bg-blue-800 transition"
                >
                    Cancel
                </button>

            </div>

        </form>
    );
}
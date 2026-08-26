import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectMongo from "../lib/Mongoose";
import User from "../models/User";
import Blog from "../models/Blog";
import Community from "../models/Community";
import Link from "next/link";

export default async function ProfilePage() {
    const session = await auth();

    // User must be logged in
    if (!session?.user?.email) {
        redirect("/login");
    }

    await connectMongo();

    // Get current logged-in user
    const user = await User.findOne({
        email: session.user.email,
    }).lean();

    // User not found
    if (!user) {
        return (
            <main className="min-h-screen bg-blue-900 text-stone-100 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-blue-950 border border-blue-800 rounded-2xl p-6 sm:p-8 text-center">

                    <h1 className="text-2xl font-bold mb-3">
                        Profile not found
                    </h1>

                    <p className="text-stone-300">
                        We couldn't find your profile.
                    </p>

                </div>
            </main>
        );
    }

    // Get only published blogs created by this user
    const blogs = await Blog.find({
        author: user._id,
        status: "published",
    })
        .sort({ createdAt: -1 })
        .lean();

    // Get communities where this user is a member
    const communities = await Community.find({
        members: user._id,
    })
        .sort({ createdAt: -1 })
        .lean();

    return (
        <main className="min-h-screen bg-blue-900 text-stone-100">

            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* ================= PROFILE HEADER ================= */}
                <section className="bg-blue-950 border border-blue-800 rounded-2xl p-5 sm:p-8 shadow-xl">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        {/* User information */}
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">

                            {/* Profile image */}
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name || "Profile"}
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-blue-800 flex-shrink-0"
                                />
                            ) : (
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-blue-800 flex items-center justify-center text-3xl font-bold flex-shrink-0">
                                    {user.name?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}

                            {/* Name and username */}
                            <div>

                                <h1 className="text-2xl sm:text-3xl font-bold text-stone-100">
                                    {user.name}
                                </h1>

                                <p className="text-blue-300 mt-1">
                                    @{user.username}
                                </p>

                                {user.headline && (
                                    <p className="text-stone-300 mt-3">
                                        {user.headline}
                                    </p>
                                )}

                            </div>

                        </div>


                        {/* Edit button */}
                        <Link
                            href="/profile/editProfile"
                            className="w-full md:w-auto inline-flex justify-center px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                        >
                            Edit Profile
                        </Link>

                    </div>

                </section>


                {/* ================= ABOUT ================= */}
                <section className="mt-6 bg-blue-950 border border-blue-800 rounded-2xl p-5 sm:p-8">

                    <h2 className="text-xl font-semibold mb-4">
                        About Me
                    </h2>

                    <p className="text-stone-300 leading-7 break-words">
                        {user.bio || "You haven't added a bio yet."}
                    </p>

                </section>


                {/* ================= SKILLS ================= */}
                <section className="mt-6 bg-blue-950 border border-blue-800 rounded-2xl p-5 sm:p-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Skills
                    </h2>

                    {Array.isArray(user.skills) && user.skills.length > 0 ? (

                        <div className="flex flex-wrap gap-2 sm:gap-3">

                            {user.skills.map((skill: string) => (

                                <span
                                    key={skill}
                                    className="px-3 sm:px-4 py-2 bg-blue-900 border border-blue-700 rounded-full text-sm text-blue-100"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    ) : (

                        <p className="text-stone-400">
                            No skills added yet.
                        </p>

                    )}

                </section>


                {/* ================= SOCIAL LINKS ================= */}
                <section className="mt-6 bg-blue-950 border border-blue-800 rounded-2xl p-5 sm:p-8">

                    <h2 className="text-xl font-semibold mb-4">
                        Connect
                    </h2>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3">

                        {user.githubURL && (
                            <a
                                href={user.githubURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center px-4 py-2 border border-blue-700 rounded-lg hover:bg-blue-900 transition"
                            >
                                GitHub
                            </a>
                        )}

                        {user.linkedinURL && (
                            <a
                                href={user.linkedinURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto text-center px-4 py-2 border border-blue-700 rounded-lg hover:bg-blue-900 transition"
                            >
                                LinkedIn
                            </a>
                        )}

                        {!user.githubURL && !user.linkedinURL && (
                            <p className="text-stone-400">
                                No social links added yet.
                            </p>
                        )}

                    </div>

                </section>


                {/* ================= JOINED COMMUNITIES ================= */}
                <section className="mt-6 bg-blue-950 border border-blue-800 rounded-2xl p-5 sm:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                        <h2 className="text-xl font-semibold">
                            Joined Communities
                        </h2>

                        <span className="text-sm text-blue-300">
                            {communities.length}{" "}
                            {communities.length === 1
                                ? "community"
                                : "communities"}
                        </span>

                    </div>


                    {communities.length === 0 ? (

                        <div className="border border-blue-800 bg-blue-900/50 rounded-xl p-6 text-center">

                            <p className="text-stone-300">
                                You haven't joined any communities yet.
                            </p>

                            <Link
                                href="/communities"
                                className="inline-block mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                            >
                                Explore Communities
                            </Link>

                        </div>

                    ) : (

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            {communities.map((community: any) => (

                                <Link
                                    key={community._id.toString()}
                                    href={`/communities/${community.slug}`}
                                    className="group border border-blue-700 bg-blue-900/50 rounded-xl p-4 hover:border-blue-400 hover:bg-blue-900 transition"
                                >

                                    <div className="flex items-center justify-between gap-3">

                                        <div className="min-w-0">

                                            <h3 className="font-semibold truncate group-hover:text-blue-300 transition">
                                                {community.name}
                                            </h3>

                                            <p className="text-sm text-blue-300 mt-1">
                                                {community.category}
                                            </p>

                                        </div>

                                        <span className="text-blue-300">
                                            →
                                        </span>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </section>


                {/* ================= PUBLISHED BLOGS ================= */}
                <section className="mt-6 bg-blue-950 border border-blue-800 rounded-2xl p-5 sm:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                        <h2 className="text-xl font-semibold">
                            Published Blogs
                        </h2>

                        <span className="text-sm text-blue-300">
                            {blogs.length}{" "}
                            {blogs.length === 1
                                ? "blog"
                                : "blogs"}
                        </span>

                    </div>


                    {blogs.length === 0 ? (

                        <div className="border border-blue-800 bg-blue-900/50 rounded-xl p-6 text-center">

                            <p className="text-stone-300">
                                You haven't published any blogs yet.
                            </p>

                            <Link
                                href="/blogs/new"
                                className="inline-block mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
                            >
                                Write a Blog
                            </Link>

                        </div>

                    ) : (

                        <div className="space-y-4">

                            {blogs.map((blog: any) => (

                                <Link
                                    key={blog._id.toString()}
                                    href={`/blogs/${blog.slug}`}
                                    className="block border border-blue-700 rounded-xl p-4 sm:p-5 hover:bg-blue-900 hover:border-blue-500 transition"
                                >

                                    <div className="flex flex-col gap-2">

                                        <h3 className="font-semibold text-lg sm:text-xl">
                                            {blog.title}
                                        </h3>

                                        <p className="text-stone-400 text-sm sm:text-base leading-6">
                                            {blog.excerpt ||
                                                `${blog.content.substring(0, 120)}...`}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-2 mt-2">

                                            {blog.tags?.slice(0, 4).map(
                                                (tag: string) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2.5 py-1 bg-blue-900 border border-blue-700 rounded-full text-xs text-blue-200"
                                                    >
                                                        #{tag}
                                                    </span>
                                                )
                                            )}

                                        </div>

                                        <p className="text-xs text-stone-500 mt-2">
                                            {new Date(
                                                blog.publishedAt ||
                                                blog.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}
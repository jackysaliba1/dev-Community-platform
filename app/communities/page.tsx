import Link from "next/link";
import connectMongo from "@/app/lib/Mongoose";
import Community from "@/app/models/Community";
import User from "@/app/models/User";
import { auth } from "@/auth";

export const revalidate = 60;

export default async function CommunitiesPage() {

    await connectMongo();

    const session = await auth();

    let currentUser = null;

    if (session?.user?.email) {
        currentUser = await User.findOne({
            email: session.user.email,
        }).lean();
    }

    const communities = await Community.find()
        .sort({ createdAt: -1 })
        .lean();

    return (
        <main className="min-h-screen bg-blue-900 text-white">

            {/* Header */}
            <section className="px-6 pt-16 pb-10">

                <div className="mx-auto max-w-6xl text-center">

                    <h1 className="text-4xl font-bold md:text-5xl">
                        Find your developer community
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-200">
                        Connect with developers, discover new ideas,
                        and grow together.
                    </p>

                </div>

                {/* Search + Create */}
                <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-4 sm:flex-row">

                    <input
                        type="text"
                        placeholder="Search communities..."
                        className="flex-1 rounded-xl border border-blue-700 bg-blue-800 px-5 py-4 text-white placeholder-blue-300 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
                    />

                    <Link
                        href="/communities/createCommunity"
                        className="rounded-xl bg-white px-6 py-4 text-center font-semibold text-blue-900 transition hover:bg-blue-100"
                    >
                        + Create Community
                    </Link>

                </div>

            </section>

            {/* Communities */}
            <section className="mx-auto max-w-6xl px-6 pb-16">

                <div className="mb-8">

                    <h2 className="text-2xl font-bold">
                        Popular Communities
                    </h2>

                    <p className="mt-2 text-blue-300">
                        Discover communities and connect with other developers.
                    </p>

                </div>

                {communities.length === 0 ? (

                    <div className="rounded-2xl border border-blue-700 bg-blue-800/50 p-10 text-center">

                        <h3 className="text-xl font-semibold">
                            No communities yet
                        </h3>

                        <p className="mt-2 text-blue-200">
                            Be the first to create a developer community!
                        </p>

                    </div>

                ) : (

                    <div className="grid gap-6 md:grid-cols-2">

                        {communities.map((community: any) => {

                            const joined =
                                currentUser &&
                                community.members?.some(
                                    (member: any) =>
                                        member.toString() ===
                                        currentUser._id.toString()
                                );

                            return (

                                <div
                                    key={community._id.toString()}
                                    className="rounded-2xl border border-blue-700 bg-blue-800 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400"
                                >

                                    {/* Name + Joined Badge */}
                                    <div className="flex items-center gap-3 flex-wrap">

                                        <h3 className="text-2xl font-bold">
                                            {community.name}
                                        </h3>

                                        {joined && (
                                            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-medium">
                                                ✓ Joined
                                            </span>
                                        )}

                                    </div>

                                    {/* Category */}
                                    <span className="inline-block mt-3 rounded-full bg-blue-700 px-3 py-1 text-sm text-blue-100">
                                        {community.category}
                                    </span>

                                    {/* Members */}
                                    <p className="mt-4 text-sm text-blue-300">
                                        👥 {community.members?.length || 0} member
                                        {community.members?.length !== 1 ? "s" : ""}
                                    </p>

                                    {/* Description */}
                                    <p className="mt-5 leading-6 text-blue-100">
                                        {community.description}
                                    </p>

                                    {/* View button */}
                                    <div className="mt-6">

                                        <Link
                                            href={`/communities/${community.slug}`}
                                            className="inline-block rounded-lg bg-white px-5 py-3 font-semibold text-blue-900 transition hover:bg-blue-100"
                                        >
                                            View Community →
                                        </Link>

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>

        </main>
    );
}
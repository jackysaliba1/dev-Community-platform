import Hero from "@/components/Hero";
import CommunityCard from "@/components/CommunityCard";
import BlogCard from "@/components/BlogCard";
import DeveloperCard from "@/components/DeveloperCard";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import Link from "next/link";

import connectMongo from "./lib/Mongoose";
import User from "./models/User";
import Blog from "./models/Blog";
import Community from "./models/Community";

export const dynamic = "force-dynamic";

export const revalidate = 60;

const Page = async () => {

    await connectMongo();

    const [
        developersCount,
        blogsCount,
        communitiesCount,
        featuredDevelopers,
        recentBlogs,
        featuredCommunities,
    ] = await Promise.all([
        User.countDocuments(),
        Blog.countDocuments(),
        Community.countDocuments(),

        User.find()
            .sort({ createdAt: -1 })
            .limit(3),

        Blog.find()
            .populate("author")
            .sort({ createdAt: -1 })
            .limit(3),

        Community.find()
            .sort({ createdAt: -1 })
            .limit(3),
    ]);

    return (

        <main className="bg-blue-900 min-h-screen text-white">

            <Hero />

            {/* Statistics */}

            <section className="max-w-6xl mx-auto px-6 py-10">

                <h2 className="text-3xl font-bold mb-8">
                    Platform Statistics
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Link
                        href="/developers"
                        className="bg-blue-800/40 border border-blue-700 rounded-xl p-6 text-center hover:border-blue-400 transition"
                    >
                        <h3 className="text-4xl font-bold">
                            {developersCount}
                        </h3>

                        <p className="text-blue-100 mt-2">
                            Developers
                        </p>
                    </Link>

                    <Link
                        href="/blogs"
                        className="bg-blue-800/40 border border-blue-700 rounded-xl p-6 text-center hover:border-blue-400 transition"
                    >
                        <h3 className="text-4xl font-bold">
                            {blogsCount}
                        </h3>

                        <p className="text-blue-100 mt-2">
                            Blogs
                        </p>
                    </Link>

                    <Link
                        href="/communities"
                        className="bg-blue-800/40 border border-blue-700 rounded-xl p-6 text-center hover:border-blue-400 transition"
                    >
                        <h3 className="text-4xl font-bold">
                            {communitiesCount}
                        </h3>

                        <p className="text-blue-100 mt-2">
                            Communities
                        </p>
                    </Link>

                </div>

            </section>

           {/* Featured Communities */}

            <section className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold">
                        Featured Communities
                    </h2>

                    <Link
                        href="/communities"
                        className="text-blue-300 hover:text-blue-200"
                    >
                        View All
                    </Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {featuredCommunities.map((community: any) => (
                        <CommunityCard
                            key={community._id}
                            community={community}
                        />
                    ))}

                </div>

            </section>

           {/*recent blogs*/}

            <section className="max-w-6xl mx-auto px-6 py-10">

                <div className="flex justify-between items-center mb-8">

                    <h2 className="text-3xl font-bold">
                        Recent Blogs
                    </h2>

                    <Link
                        href="/blogs"
                        className="text-blue-300 hover:text-blue-200"
                    >
                        View All
                    </Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {recentBlogs.map((blog: any) => (
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                        />
                    ))}

                </div>

            </section>

            <Footer />

        </main>

    );
};

export default Page;
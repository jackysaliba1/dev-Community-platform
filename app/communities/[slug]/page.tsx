import connectMongo from "@/app/lib/Mongoose";
import Community from "@/app/models/Community";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";
import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";
import CommunityJoinButton from "@/components/CommunityJoinButton";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

const Page = async ({ params }: Props) => {
    const { slug } = await params;

    await connectMongo();

    const community = await Community.findOne({
        slug,
    }).populate("members");

    if (!community) {
        notFound();
    }

    // Get logged-in user
    const session = await auth();

    let isMember = false;

    if (session?.user?.email) {
        const currentUser = await User.findOne({
            email: session.user.email,
        });

        if (currentUser) {
            isMember = community.members.some(
                (member: any) =>
                    member._id.toString() ===
                    currentUser._id.toString()
            );
        }
    }

    // Get blogs related to this community
   const blogs = await Blog.find({
    status: "published",
    tags: {
        $in: community.tags || [],
    },
})
    .populate("author")
    .sort({
        createdAt: -1,
    })
    .limit(5);

    return (
        <main className="min-h-screen bg-blue-900 text-white">

            <section className="max-w-5xl mx-auto px-6 py-10 space-y-10">

                {/* Community information */}
                <div>

                    <h1 className="text-4xl font-bold">
                        {community.name}
                    </h1>

                    <span className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                        {community.category}
                    </span>

                    <p className="mt-5 text-lg text-stone-200">
                        {community.description}
                    </p>

                    <p className="mt-5 text-blue-200">
                        👥 {community.members.length} member
                        {community.members.length !== 1 ? "s" : ""}
                    </p>

                    {/* JOIN / LEAVE BUTTON */}
                    <div className="mt-6">
                        <CommunityJoinButton
                            communityId={community._id.toString()}
                            initialJoined={isMember}
                        />
                    </div>

                </div>


                {/* Members */}
                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Members
                    </h2>

                    {community.members.length === 0 ? (

                        <p className="text-stone-400">
                            No members yet.
                        </p>

                    ) : (

                        <div className="flex flex-wrap gap-4">

                            {community.members.map((member: any) => (

                                <Link
                                    key={member._id.toString()}
                                    href={`/profile/${member.username}`}
                                    className="bg-blue-800/50 border border-blue-700 rounded-xl px-4 py-3 hover:bg-blue-700/60 transition"
                                >

                                    <p className="font-semibold">
                                        {member.name}
                                    </p>

                                    <p className="text-sm text-blue-200">
                                        @{member.username}
                                    </p>

                                </Link>

                            ))}

                        </div>

                    )}

                </div>


                {/* Related blogs */}
                <div>

                    <h2 className="text-2xl font-bold mb-5">
                        Related Blogs
                    </h2>

                    {blogs.length === 0 ? (

                        <p className="text-stone-400">
                            No related blogs for this community yet.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {blogs.map((blog: any) => (

                                <Link
                                    key={blog._id.toString()}
                                    href={`/blogs/${blog.slug}`}
                                    className="block bg-blue-800/40 border border-blue-700 rounded-xl p-5 hover:bg-blue-800/70 transition"
                                >

                                    <h3 className="text-xl font-bold">
                                        {blog.title}
                                    </h3>

                                    <p className="text-blue-200 mt-2">
                                        By {blog.author?.name}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-4">

                                        {blog.tags.map(
                                            (tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            )
                                        )}

                                    </div>

                                </Link>

                            ))}

                        </div>

                    )}

                </div>

            </section>

        </main>
    );
};

export default Page;
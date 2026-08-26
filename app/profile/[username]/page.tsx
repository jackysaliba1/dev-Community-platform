import { auth } from "@/auth";
import connectMongo from "@/app/lib/Mongoose";
import User from "@/app/models/User";
import Blog from "@/app/models/Blog";
import Community from "@/app/models/Community";
import Link from "next/link";
import { notFound } from "next/navigation";


type Props = { 
    params: Promise<{ 
        username: string; 
    }>; 
}; 
 
export default async function PublicProfilePage({ 
    params, 
}: Props) { 
 
    const { username } = await params; 
 
    await connectMongo(); 
 
    const session = await auth(); 
 
    const user = await User.findOne({ 
        username, 
    }).lean(); 
 
    if (!user) { 
        notFound(); 
    } 
 
    const isOwner = 
        session?.user?.email === user.email; 
 
    const blogs = await Blog.find({ 
        author: user._id, 
        status: "published", 
    }) 
        .sort({ publishedAt: -1 }) 
        .lean(); 
 
    const communities = await Community.find({ 
        members: user._id, 
    }).lean(); 
 
    return ( 
        <main className="min-h-screen bg-blue-900 text-white"> 
 
            <div className="max-w-5xl mx-auto px-6 py-10"> 
 
                {/* Profile */} 
                <section className="bg-blue-800/40 border border-blue-700 rounded-2xl p-6 md:p-8"> 
 
                    <div className="flex flex-col md:flex-row gap-6"> 
 
                        {user.image ? ( 
                            <img 
                                src={user.image} 
                                alt={user.name} 
                                className="w-28 h-28 rounded-full object-cover border-2 border-blue-400" 
                            /> 
                        ) : ( 
                            <div className="w-28 h-28 rounded-full bg-blue-700 flex items-center justify-center text-3xl font-bold"> 
                                {user.name.charAt(0)} 
                            </div> 
                        )} 
 
                        <div className="flex-1"> 
 
                            <h1 className="text-3xl font-bold"> 
                                {user.name} 
                            </h1> 
 
                            <p className="text-blue-200 mt-1"> 
                                @{user.username} 
                            </p> 
 
                            <p className="text-lg font-medium mt-4"> 
                                {user.headline || "Developer"} 
                            </p> 
 
                            <p className="text-stone-300 mt-3 leading-7"> 
                                {user.bio || "No bio yet."} 
                            </p> 
 
                            {/* Joined */} 
                            <p className="text-sm text-blue-200/70 mt-4"> 
                                Joined{" "} 
                                {new Date( 
                                    user.createdAt 
                                ).toLocaleDateString()} 
                            </p> 
 
                            {/* Edit Profile */} 
                            {isOwner && ( 
                                <Link 
                                    href="/profile/editProfile" 
                                    className="inline-block mt-5 bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-lg font-medium transition" 
                                > 
                                    Edit Profile 
                                </Link> 
                            )} 
 
                        </div> 
 
                    </div> 
 
                    {/* Skills */} 
                    <div className="mt-8"> 
 
                        <h2 className="font-semibold mb-3"> 
                            Skills 
                        </h2> 
 
                        {user.skills?.length > 0 ? ( 
 
                            <div className="flex flex-wrap gap-2"> 
 
                                {user.skills.map( 
                                    (skill: string) => ( 
                                        <span 
                                            key={skill} 
                                            className="px-3 py-1 bg-blue-700 border border-blue-600 rounded-full text-sm" 
                                        > 
                                            {skill} 
                                        </span> 
                                    ) 
                                )} 
 
                            </div> 
 
                        ) : ( 
 
                            <p className="text-stone-400"> 
                                No skills added yet. 
                            </p> 
 
                        )} 
 
                    </div> 
 
                    {/* Social links */} 
                    <div className="flex flex-wrap gap-4 mt-8"> 
 
                        {user.githubURL && ( 
                            <a 
                                href={user.githubURL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-300 hover:text-blue-200 hover:underline" 
                            > 
                                GitHub 
                            </a> 
                        )} 
 
                        {user.linkedInURL && ( 
                            <a 
                                href={user.linkedInURL} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-300 hover:text-blue-200 hover:underline" 
                            > 
                                LinkedIn 
                            </a> 
                        )} 
 
                    </div> 
 
                </section> 
 
                {/* Communities */} 
                <section className="mt-12"> 
 
                    <h2 className="text-2xl font-bold mb-5"> 
                        Joined Communities 
                    </h2> 
 
                    {communities.length === 0 ? ( 
 
                        <div className="bg-blue-800/30 border border-blue-800 rounded-xl p-6 text-stone-400"> 
                            <p> 
                                This developer hasn't joined 
                                any communities yet. 
                            </p> 
                        </div> 
 
                    ) : ( 
 
                        <div className="grid md:grid-cols-2 gap-4"> 
 
                            {communities.map( 
                                (community) => ( 
 
                                    <Link 
                                        key={community._id.toString()} 
                                        href={`/communities/${community.slug}`} 
                                        className="bg-blue-800/40 border border-blue-700 rounded-xl p-5 hover:border-blue-400 transition" 
                                    > 
 
                                        <h3 className="font-semibold text-lg"> 
                                            {community.name} 
                                        </h3> 
 
                                        <p className="text-blue-200 text-sm mt-2"> 
                                            {community.category} 
                                        </p> 
 
                                    </Link> 
 
                                ) 
                            )} 
 
                        </div> 
 
                    )} 
 
                </section> 
 
                {/* Blogs */} 
                <section className="mt-12"> 
 
                    <h2 className="text-2xl font-bold mb-5"> 
                        Authored Blogs 
                    </h2> 
 
                    {blogs.length === 0 ? ( 
 
                        <div className="bg-blue-800/30 border border-blue-800 rounded-xl p-6 text-stone-400"> 
                            <p> 
                                This developer hasn't published 
                                any blogs yet. 
                            </p> 
                        </div> 
 
                    ) : ( 
 
                        <div className="space-y-4"> 
 
                            {blogs.map((blog) => ( 
 
                                <Link 
                                    key={blog._id.toString()} 
                                    href={`/blogs/${blog.slug}`} 
                                    className="block bg-blue-800/40 border border-blue-700 rounded-xl p-5 hover:border-blue-400 hover:bg-blue-800/60 transition" 
                                > 
 
                                    <h3 className="text-xl font-semibold"> 
                                        {blog.title} 
                                    </h3> 
 
                                    <p className="text-stone-300 mt-2 line-clamp-2"> 
                                        {blog.excerpt || 
                                            blog.content.substring( 
                                                0, 
                                                150 
                                            )} 
                                    </p> 
 
                                    <div className="text-sm text-blue-200/70 mt-4"> 
                                        {new Date( 
                                            blog.publishedAt || 
                                            blog.createdAt 
                                        ).toLocaleDateString()} 
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
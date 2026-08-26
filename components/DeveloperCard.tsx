import Link from "next/link";

export default function DeveloperCard({
    developers                                //props in a different way
}:{
    developers:any;
})  {
    return(
           <Link href={`/profile/${developers.username}`}
        className="border rounded-xl p-5 hover:border-blue-500 transition">

        <h3 className="text-xl font-semibold">{developers.name}</h3>
        <p className="text-gray-400 mt-2">{developers.bio}</p>
        <p className="text-sm text-gray-500 mt-3">{developers.title}</p>


        </Link>
    )
}
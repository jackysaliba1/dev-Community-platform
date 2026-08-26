import React from 'react'
import {auth,signIn,signOut}  from "@/auth"

const page = async () => {
    const session=await auth() //is someone currently logged in?
  return (
    <div className='p-[50px]'>
      <h2>Github Auth test page</h2>

      {session? (
        <div>
            <h1>Welcome, {session?.user?.name}!</h1>
             <img src={session?.user?.image || ""} alt="" width={80} height={80} />
          <p>{session?.user?.email}</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign Out</button>
          </form>
        </div>
      ) : (
        <div>
          <p>You are not signed in.</p>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button type="submit" className="bg-blue-600 text-white p-5 mt-10">
              Sign In with GitHub
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;

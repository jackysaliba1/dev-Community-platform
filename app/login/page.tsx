"use client";

import { signIn } from "next-auth/react";
import {useState} from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
     const [accepted, setAccepted] = useState(false);
  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-6 bg-blue-900">
     <div className="w-full max-w-[350px] space-y-4">
        <h1 className="text-3xl font-semibold text-center text-white">Sign in to your account</h1>

    <button
    disabled={!accepted}
  onClick={() => signIn("github", { callbackUrl: "/" })}
  className="w-full bg-white text-gray-900 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
>
  <FaGithub size={24} className="text-black" />
  <span>Continue with GitHub</span>
</button>

<button
disabled={!accepted}
  onClick={() => signIn("google", { callbackUrl: "/" })}
  className="w-full bg-white text-gray-900 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition"
>
  <FaGoogle size={24} className="text-black" />
  <span>Continue with Google</span>
</button>

        {/* Google button comes next, once GitHub is confirmed working */}
        <div className="flex justify-center items-start gap-2 text-white text-sm">
  <input
    type="checkbox"
    id="terms"
    checked={accepted}
    onChange={(e) => setAccepted(e.target.checked)}
    className="mt-1"
  />

  <label htmlFor="terms">
    I accept the{" "}
    <a
      href="/terms"
      className="underline"
      target="_blank"
    >
      Terms & Conditions
    </a>
  </label>
</div>
</div>
    </div>
    </>
  );
}

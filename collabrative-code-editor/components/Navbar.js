"use client";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="flex justify-center items-center gap-12 bg-white w-full h-10">
      <Link href={"/"}>HOme</Link>
      <Link href={"/userProfile"}>userProfile</Link>

      {session ? (
        <LogoutButton />
      ) : (
        <div className="flex gap-12">
          <Link href={"/sign-in"}>Signin</Link>
          <Link href={"/sign-up"}>Signup</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;

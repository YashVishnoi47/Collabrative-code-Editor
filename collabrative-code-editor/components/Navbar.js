"use client";
import Link from "next/link";
import React from "react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button3 from "./utilityComponents/Button3";
import Link1 from "./utilityComponents/Link1";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-center items-center bg-white w-full h-16">
      <div className="w-[40%] -2 h-full gap-8 flex justify-start items-center">
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-4xl cursor-pointer font-bold"
        >
          LOGO
        </h1>
        <Link1 link={"/"} text={"About"}></Link1>
        <Link1 link={"userProfile"} text={"Dasboard"}></Link1>
      </div>

      <div className="w-[40%] -2 px-2 h-full gap-8 flex justify-end items-center">
        {session ? (
          <LogoutButton text={"Login"} />
        ) : (
          <div className="flex gap-4">
            <Button3
              onClick={() => {
                router.push(".signup");
              }}
              text={"Sign Up"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

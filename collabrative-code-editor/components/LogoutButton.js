"use client";
import { signOut, useSession } from "next-auth/react";
import Button2 from "./utilityComponents/Button2";
import { IoLogOut } from "react-icons/io5";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <button title="Logout" className="cursor-pointer" onClick={handleLogout}>
      <IoLogOut className="text-3xl hover:scale-110 transition-all duration-300 ease-in-out" />
    </button>
  );
};

export default LogoutButton;

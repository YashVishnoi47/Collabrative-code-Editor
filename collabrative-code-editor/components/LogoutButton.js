"use client"
import { signOut, useSession } from "next-auth/react";
import Button2 from "./utilityComponents/Button2";
const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;





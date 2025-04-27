"use client"
import { signOut, useSession } from "next-auth/react";

const LogoutButton = () => {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

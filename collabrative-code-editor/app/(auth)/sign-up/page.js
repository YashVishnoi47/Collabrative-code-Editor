"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    userName: "",
    FirstName: "",
    LastName: "",
    aboutUser: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await fetch("api/auth/signUp", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/sign-in");
    } else {
      const { message } = await res.json();
      alert(message);
    }
  };

  return (
    <div className="w-full h-screen gap-4 flex flex-col justify-center items-center border-2 border-red-600">
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <form
        className="flex flex-col w-[35%] rounded-2xl  border-black h-[80%] border-2 gap-5 justify-center items-center"
        onSubmit={handleSignUp}
      >
        <input
          type="text"
          placeholder="UserName"
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="FirstName"
          onChange={(e) =>
            setFormData({ ...formData, FirstName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="LastName"
          onChange={(e) =>
            setFormData({ ...formData, LastName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="aboutUser"
          onChange={(e) =>
            setFormData({ ...formData, aboutUser: e.target.value })
          }
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

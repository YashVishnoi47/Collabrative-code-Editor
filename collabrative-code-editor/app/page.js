"use client";
import shortUUID from "short-uuid";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [uniqueId, setUniqueId] = useState(null);
  const router = useRouter();

  // Creating  prrivate coding Rooms
  const createPrivateRoom = async (e) => {
    e.preventDefault();

    const id = shortUUID.generate();
    setUniqueId(id);

    const res = await fetch("/api/room/createRoom", {
      method: "POST",
      body: JSON.stringify({
        roomName: "My Room",
        codingLang: "JavaScript",
        roomID: id,
      }),
    });

    if (res.ok) {
      router.push(`/${id}`);
    } else {
      // const { message } = await res.json();
      alert("message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen bg-gray-100">
      <h1>{session?.user.userName}</h1>
      <h1>Collaborative Code Editor</h1>
      <button
        onClick={createPrivateRoom}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Private Room
      </button>
    </div>
  );
}

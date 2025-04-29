"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/utilityComponents/SearchBar";
import Button2 from "@/components/utilityComponents/Button2";
import UserRooms from "@/components/UserRooms";
import Loader from "@/components/utilityComponents/Loader";
import { useRouter } from "next/navigation";
import shortUUID from "short-uuid";

const UserProfile = () => {
  const { data: session } = useSession();
  const [uniqueId, setUniqueId] = useState(null);
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetching User Rooms
  useEffect(() => {
    const FetchUserRooms = async () => {
      try {
        const res = await fetch("/api/room/fetchRoom");
        if (!res.ok) {
          throw new Error("Failed To fetch room");
        }

        const data = await res.json();
        setRooms(data.rooms);
      } catch (error) {
        console.error("Fetch User Error", error);
      }
    };

    FetchUserRooms();
  }, [session]);

  // Creating  prrivate coding Rooms
  const createPrivateRoom = async (e) => {
    e.preventDefault();

    const id = shortUUID.generate();
    if (id) {
      setLoading(true);
    }
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
      setLoading(false);
      router.push(`/${id}`);
    } else {
      // const { message } = await res.json();
      alert("message");
    }
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="p-8 rounded-2xl shadow-lg bg-white text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Access Restricted
          </h1>
          <p className="text-gray-600 mb-6">
            Please log in to access this page.
          </p>
          <Link
            href="/sign-in"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full justify-center items-center flex flex-col gap-12">
      <div className="w-[80%] flex flex-col min-h-[90vh] mt-10 -2 border-black">
        {/* top section */}
        <div className="w-full border-b-2 py-2 justify-between flex items-center  h-[10vh]">
          <SearchBar />
          {/* <div className="flex gap-6">
           
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="w-full flex flex-col items-start h-[90vh] -2 border-red-700">
          {/* Header Text */}
          <div className="w-full py-2 mt-2 flex justify-between items-start gap-2">
            <div className="w-1/2 flex flex-col gap-2">
              <h1 className="text-3xl font-bold">
                {" "}
                <span className="capitalize">{session?.user.userName}</span>s
                Rooms
              </h1>
              <p className="text-gray-500">Total Rooms - {rooms.length}</p>
            </div>
            <div className="w-1/2 flex justify-end items-center">
              <div className="flex gap-4">
                <Button2
                  createPrivateRoom={createPrivateRoom}
                  loading={loading}
                  width={"120px"}
                  text={"Create Room"}
                />
                <Button2 text={"Join Room"} />
              </div>
            </div>
          </div>

          {/* User Rooms */}
          <div className="rooms mt-6 flex flex-col gap-4 w-full h-full items-center  flex-wrap">
            {rooms.length > 0 ? (
              <div className="flex flex-wrap w-full justify-center  sm:justify-start items-center gap-8">
                {rooms.map((room) => (
                  <UserRooms key={room._id} room={room} />
                ))}
              </div>
            ) : (
              <div className="w-full h-1/2 flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const UserProfile = () => {
  const { data: session } = useSession();
  const [rooms, setRooms] = useState([]);
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
    <div className="w-full h-full flex flex-col gap-12">
      {/* Profile Bar */}
      <div className="w-full bg-gray-300 h-52 flex">
        {/* left side of the profile Bar */}
        <div className="w-[20%] h-full flex justify-start items-center border-2 border-red-800">
          <Image
            src={"/profile.png"}
            width={150}
            height={150}
            alt="profile"
          ></Image>
        </div>
      </div>

      {rooms.length > 0 ? (
        <ul className="flex flex-col gap-12">
          {rooms.map((room) => (
            <Link href={`${room.roomID}`} key={room._id}>
              {room.roomName}
            </Link>
          ))}
        </ul>
      ) : (
        <p>No rooms found</p>
      )}
    </div>
  );
};

export default UserProfile;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { RiDeleteBin6Line } from "react-icons/ri";

const UserRooms = ({ room, index }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${room._id}`);
  };

  const handleDelete = async () => {
    const res = await fetch("/api/room/deleteRoom", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId: room._id }),
    });

    if (res.ok) {
      router.push('/userProfile');
      router.refresh();
    } else {
      console.error("Error deleting room");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="min-w-[350px] hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex flex-col rounded-3xl h-[300px] border-1 hover:shadow-2xl transition-all duration-300 ease-in-out"
    >
      {/* Room Image */}
      <div className="w-full h-[65%] relative bg-gray-500 rounded-3xl">
        {/* <div className="absoulte flex right-1 bg-gray-500 rounded-3xl"> */}
        <RiDeleteBin6Line
          onClick={handleDelete}
          className="text-4xl hover:scale-110 transition-all duration-300 ease-in-out absolute p-2 border-2 right-4 top-4 bg-white rounded-full"
        />

        {/* </div> */}
      </div>

      {/* Room Details */}
      <div className="w-full h-[35%] flex flex-col justify-start items-start px-4 py-1">
        {/* Room Name */}
        <h1 className="font-semibold text-3xl line-clamp-1 w-full">
          {room?.roomName || "Room 1"}
        </h1>

        {/* Other Details */}
        <div className="w-full flex mt-1 ">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-yellow-600 text-sm line-clamp-1 w-full">
              {room?.codingLang || "Language"}
            </p>
            <p className="text-gray-500 text-sm line-clamp-1 w-full">
              {formatDate(room?.createdAt) || "Created At"}
            </p>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <p className="text-gray-500 text-sm line-clamp-1 w-full">
              {room?.idPublic ? "Public" : "Private"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRooms;

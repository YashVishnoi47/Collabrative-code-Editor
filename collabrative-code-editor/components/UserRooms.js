"use client";
import { formatDate } from "@/lib/utils";
import React from "react";
import { useRouter } from "next/navigation";

const UserRooms = ({ room }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`${room.roomID}`);
    }

  return (
    <div onClick={handleClick} className="min-w-[350px] cursor-pointer flex flex-col rounded-3xl h-[300px] border-1 hover:shadow-2xl transition-all duration-300 ease-in-out">
      {/* Room Image */}
      <div className="w-full h-[65%] relative bg-gray-500 rounded-3xl"></div>

      {/* Room Details */}
      <div className="w-full h-[35%] flex flex-col justify-start items-start px-4 py-1">
        {/* Room Name */}
        <h1 className="font-semibold text-3xl line-clamp-1 w-full">
          {room?.roomName || "Room 1"}
        </h1>

        {/* Other Details */}
        <div className="w-full flex mt-1 ">
          <div className="flex flex-col gap-1 w-full">
            {/* <p className="text-gray-500 text-sm line-clamp-1 w-full">
              {room?.roomID || "Room ID"}
            </p> */}
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

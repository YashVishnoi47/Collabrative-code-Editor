"use client";
import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Link from "next/link";
import SearchBar from "@/components/utilityComponents/SearchBar";
import Button2 from "@/components/utilityComponents/Button2";
import UserRooms from "@/components/UserRooms";
import Loader from "@/components/utilityComponents/Loader";
import { useRouter } from "next/navigation";
import shortUUID from "short-uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { roommFormSchema } from "@/lib/validator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const form = useForm({
    resolver: zodResolver(roommFormSchema),
    defaultValues: {
      roomName: "",
      codingLang: "",
      idPublic: false,
    },
  });

  // Fetching User Rooms When the session is available.
  useEffect(() => {
    const FetchUserRooms = async () => {
      try {
        setFetching(true);
        const res = await fetch("/api/room/fetchRoom");

        const data = await res.json();
        console.log("User Rooms", data);

        if (data) {
          setFetching(false);
        }
        setRooms(data.rooms || []);
      } catch (error) {
        console.error("Fetch User Error", error);
        setRooms([]);
        setFetching(false);
      }
    };

    FetchUserRooms();
  }, [session]);

  // Creating prrivate coding Rooms
  const createPrivateRoom = async (values) => {
    setLoading(true);

    const res = await fetch("/api/room/createRoom", {
      method: "POST",
      body: JSON.stringify({
        roomName: values.roomName,
        codingLang: values.codingLang,
      }),
    });

    if (res.ok) {
      triggerRef.current?.click();
      router.refresh();
      setLoading(false);
    } else {
      alert("Error creating room");
      setLoading(false);
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
                <Dialog>
                  <DialogTrigger asChild>
                    <div>
                      <Button2
                        loading={loading}
                        width={"120px"}
                        text={"Create Room"}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className={`font-semibold text-2xl`}>
                        Create Room
                      </DialogTitle>
                      <DialogDescription asChild>
                        <Form {...form}>
                          <form
                            onSubmit={form.handleSubmit(createPrivateRoom)}
                            className="space-y-8"
                          >
                            {/* Room Name */}
                            <FormField
                              control={form.control}
                              name="roomName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>RoomName</FormLabel>
                                  <FormControl>
                                    <Input placeholder="RoomName" {...field} />
                                  </FormControl>
                                  <FormDescription></FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {/* Language */}
                            <FormField
                              control={form.control}
                              name="codingLang"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Select Room Language</FormLabel>
                                  <FormControl>
                                    {/* <Select
                                      // value={field.value}
                                      defaultValue="javascript"
                                    >
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Language" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="javascript">
                                          Javascript
                                        </SelectItem>
                                        <SelectItem value="html">
                                          HTML
                                        </SelectItem>
                                        <SelectItem value="css">CSS</SelectItem>
                                      </SelectContent>
                                    </Select> */}
                                    <select
                                      value={field.value}
                                      onChange={(e) =>
                                        field.onChange(e.target.value)
                                      }
                                      id="tech"
                                      name="tech"
                                    >
                                      <option value="javascript">
                                        JavaScript
                                      </option>
                                      <option value="html">HTML</option>
                                      <option value="css">CSS</option>
                                    </select>
                                  </FormControl>
                                  <FormDescription></FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <button type="submit">Submit</button>
                          </form>
                        </Form>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

                <Button2
                  createPrivateRoom={createPrivateRoom}
                  text={"Join Room"}
                />
              </div>
            </div>
          </div>

          {/* User Rooms */}
          <div className="rooms mt-6 flex flex-col gap-4 w-full h-full items-center  flex-wrap">
            {rooms.length > 0 ? (
              <div className="flex flex-wrap w-full justify-center sm:justify-start items-center gap-8">
                {rooms.map((room) => (
                  <UserRooms key={room._id} room={room} />
                ))}
              </div>
            ) : (
              <div className="w-full h-1/2 flex justify-center items-center">
                {fetching ? (
                  <Loader />
                ) : (
                  <h1 className="text-2xl font-semibold text-gray-500">
                    No Rooms Found
                  </h1>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

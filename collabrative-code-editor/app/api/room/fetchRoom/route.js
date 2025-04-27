import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export const GET = async () => {
  await connectDB();
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userID = session.user._id;

    if (!userID) {
      return NextResponse.json({ error: "UserID not found" }, { status: 401 });
    }
    const rooms = await Room.find({ createdBy: userID });

    if (rooms.length > 0) {
      return NextResponse.json({ rooms }, { status: 200 });
    } else {
      return Response.json({ message: "Room Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

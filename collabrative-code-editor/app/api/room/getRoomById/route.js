import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";

export const GET = async (req) => {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    console.log("Room ID", roomId);

    if (!roomId) {
      return new Response("Room ID is required", { status: 400 });
    }

    const room = await Room.findById(roomId);

    if (room) {
      return new Response(JSON.stringify(room), { status: 200 });
    }
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

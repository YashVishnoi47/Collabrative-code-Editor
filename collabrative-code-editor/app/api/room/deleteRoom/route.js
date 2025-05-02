import Room from "@/lib/db/models/room.model";
import { connectDB } from "@/lib/db/db";

export async function DELETE(request) {
  try {
    await connectDB();

    const { roomId } = await request.json();

    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return new Response("Room not found", { status: 404 });
    }

    return new Response("Room deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting room:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

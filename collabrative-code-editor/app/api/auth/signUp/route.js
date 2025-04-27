import { hash } from "bcrypt";
import User from "@/lib/db/models/user.model";
import { connectDB } from "@/lib/db/db";

export const POST = async (req) => {
  const {
    name,
    email,
    password,
    FirstName,
    LastName,
    aboutUser,
    userName,
  } = await req.json();
  await connectDB();

  const exsistingUser = await User.findOne({ email });
  if (exsistingUser)
    return new Response("User already exists", { status: 409 });

  const hashPassword = await hash(password, 12);

  const user = await User.create({
    name,
    email,
    FirstName,
    LastName,
    aboutUser,
    userName,
    password: hashPassword,
  });

  return Response.json(
    { message: "User Created Successfully" },
    { status: 201 }
  );
};

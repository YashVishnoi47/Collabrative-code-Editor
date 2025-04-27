import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI);

    connection.isConnected = dbConnection.connections[0].readyState;
    console.log("Connected to MongoDB:", connection.isConnected);

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if connection fails
    
  }
};

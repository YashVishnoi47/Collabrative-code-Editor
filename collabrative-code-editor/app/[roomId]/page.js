"use client";
import { SocketContext } from "@/context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { useParams } from "next/navigation";
import { html } from "@codemirror/lang-html";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params.roomId;
  const socket = useContext(SocketContext);
  const [code, setCode] = useState("<h1>Hello World</h1>");
  const [activeUsers, setActiveUsers] = useState([]);

  // Remove after NEXTAUTH.js is implemented - this is a temporary solution.
  const randomName = "testUser-" + Math.floor(Math.random() * 1000);
  const userName = session?.user.userName || randomName;

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ Socket not available yet...");
      return;
    }

    socket.emit("join_document", roomId, userName);

    socket.on("users-in-room", (users) => {
      setActiveUsers(users);
    });

    socket.on("changes", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("changes");
      socket.off("users-in-room");
    };
  }, [socket, roomId]);

  const handleCodeChange = (value, viewUpdate) => {
    setCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "index.html",
    });
  };

  if(!roomId || roomId === "undefined"){
    return <div>No Room Available</div>
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🧠 Live Code + Output</h2>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[html()]}
        onChange={handleCodeChange}
        theme="light"
      />

      <h3>🔍 Output</h3>
      <iframe
        srcDoc={code}
        title="Output"
        sandbox="allow-scripts"
        width="100%"
        height="300px"
        style={{
          marginTop: "1rem",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <div
        style={{
          marginBottom: "1rem",
          padding: "1rem",
          background: "#f4f4f4",
          borderRadius: "6px",
        }}
      >
        <h4>👤 Active Users:</h4>
        <ul>
          {activeUsers.map((user) => (
            <li key={user.socketId}>🟢 {user.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default page;

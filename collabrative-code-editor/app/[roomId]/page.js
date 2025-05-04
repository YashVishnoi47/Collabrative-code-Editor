"use client";
import { SocketContext } from "@/context/SocketContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const WebDevEditor = dynamic(() =>
  import("@/components/codeEditors/WebDevEditor")
);

const Room = () => {
  const { data: session } = useSession();
  const params = useParams();
  const roomId = params.roomId;
  const socket = useContext(SocketContext);
  const [code, setCode] = useState("<h1>Hello World</h1>");
  const [activeUsers, setActiveUsers] = useState([]);
  const userName = session?.user.userName || "TEST";
  const [room, setRoom] = useState([]);
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World</h1>");
  const [cssCode, setCssCode] = useState("h1 { color: red; }");
  const [jsCode, setJsCode] = useState("console.log('Hello!');");
  const [srcDoc, setSrcDoc] = useState("");

  // Fetching the room data by roomId.
  useEffect(() => {
    const getRoomById = async () => {
      const res = await fetch(`/api/room/getRoomById?roomId=${roomId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setRoom(data);
    };

    if (roomId) {
      getRoomById();
    }
  }, [roomId]);

  // All the socket events of all the Languages are handled here.
  useEffect(() => {
    if (!socket) {
      console.log("⚠️ Socket not available yet...");
      return;
    }

    socket.emit("join_document", roomId, userName);

    socket.on("users-in-room", (users) => {
      setActiveUsers(users);
    });

    socket.on("changes", ({ code, file, lang }) => {
      if (lang === "webDev") {
        if (file === "html") setHtmlCode(code);
        else if (file === "css") setCssCode(code);
        else if (file === "js") setJsCode(code);
      }
    });

    return () => {
      socket.off("changes");
      socket.off("users-in-room");
    };
  }, [socket, roomId]);

  if (!roomId || roomId === "undefined") {
    return <div>No Room Available</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen p-4 bg-gray-100">
      {room.codingLang === "webDev" ? (
        <div className="flex flex-col">
          <WebDevEditor
            srcDoc={srcDoc}
            setSrcDoc={setSrcDoc}
            setHtmlCode={setHtmlCode}
            setCssCode={setCssCode}
            setJsCode={setJsCode}
            htmlCode={htmlCode}
            cssCode={cssCode}
            jsCode={jsCode}
            roomId={roomId}
            socket={socket}
            userName={userName}
            setActiveUsers={setActiveUsers}
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
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-gray-800">Room Not Found</h1>
          <p className="mt-2 text-gray-600">
            The room you are looking for does not exist.
          </p>
        </div>
      )}
    </div>
  );
};

export default Room;

// Only for development purpose
// const handleCodeChange = (value, viewUpdate) => {
//   setCode(value);
//   socket.emit("code-change", {
//     roomId: roomId,
//     code: value,
//     file: "index.html",
//   });
// };

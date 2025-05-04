"use client";
import React, { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

const WebDevEditor = ({
  socket,
  roomId,
  userName,
  setActiveUsers,
  htmlCode,
  cssCode,
  jsCode,
  setHtmlCode,
  setCssCode,
  setJsCode,
  setSrcDoc,
  srcDoc,
}) => {
  //   Debounce Function to update the srcDoc after a delay.
  useEffect(() => {
    const timeout = setTimeout(() => {
      const combined = `
            <html>
              <head>
                <style>${cssCode}</style>
              </head>
              <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
              </body>
            </html>
          `;
      setSrcDoc(combined);
    }, 300);
    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode, jsCode]);

  // This function is called when the code in the editor changes.
  const handleHTMLCodeChange = (value, viewUpdate) => {
    setHtmlCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "html",
      lang: "webDev",
    });
  };

  const handleCSSCodeChange = (value, viewUpdate) => {
    setCssCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "css",
      lang: "webDev",
    });
  };

  const handleJSCodeChange = (value, viewUpdate) => {
    setJsCode(value);
    socket.emit("code-change", {
      roomId: roomId,
      code: value,
      file: "js",
      lang: "webDev",
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <div>
        <h2>🧠 Live Code + Output</h2>
        <div className="flex justify-between w-full">
          {/* HTML */}
          <CodeMirror
            value={htmlCode}
            height="300px"
            width="450px"
            extensions={[html()]}
            onChange={handleHTMLCodeChange}
            theme="light"
          />
          {/* CSS */}
          <CodeMirror
            value={cssCode}
            height="300px"
            width="450px"
            extensions={[css()]}
            onChange={handleCSSCodeChange}
            theme="light"
          />
          {/* JavaScript */}
          <CodeMirror
            value={jsCode}
            height="300px"
            width="450px"
            extensions={[javascript()]}
            onChange={handleJSCodeChange}
            theme="light"
          />
        </div>

        <h3>🔍 Output</h3>
        <iframe
          srcDoc={srcDoc}
          title="Output"
          sandbox="allow-scripts"
          width="100%"
          height="300px"
          style={{
            marginTop: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#fff",
          }}
        />
      </div>

      
    </div>
  );
};

export default WebDevEditor;

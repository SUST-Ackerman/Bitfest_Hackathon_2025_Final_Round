"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Quill from "quill";

const Editor = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Ensure editorRef is available and set up socket connection once
        if (editorRef.current && !socket) {
            console.log("Initializing socket connection...");
            // Initialize socket connection only once
            const socketInstance = io(); // Replace with your server URL if necessary
            setSocket(socketInstance);

            console.log("Initializing Quill editor...");
            // Initialize Quill editor
            const quill = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: "1" }, { header: "2" }, { font: [] }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["bold", "italic", "underline"],
                        ["link"],
                        [{ align: [] }],
                        ["image"],
                        [{ color: [] }, { background: [] }],
                        ["clean"],
                    ],
                },
            });

            // Emit editor changes to the server
            quill.on("text-change", (delta) => {
                if (socketInstance) {
                    socketInstance.emit("editor-change", delta);
                }
            });

            // Listen for updates from other users
            socketInstance.on("editor-change", (delta) => {
                quill.updateContents(delta);
            });

            // Clean up socket connection when component unmounts
            return () => {
                socketInstance.disconnect();
            };
        }
    }, []); // Empty dependency array to run only once

    return (
        <div>
            <h2>Collaborative Text Editor</h2>
            <div ref={editorRef} className="h-full w-full" style={{ height: "500px", border: "1px solid #ccc" }}></div>
        </div>
    );
};

export default Editor;

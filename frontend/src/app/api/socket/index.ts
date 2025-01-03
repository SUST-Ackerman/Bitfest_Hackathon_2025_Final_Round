import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

// You can also use the `NextApiRequest` and `NextApiResponse` types from Next.js
let io: Server;

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        return res.status(200).send("Socket.io server is up!");
    }

    if (req.method === "POST") {
        // Cast res.socket as any to give access to `server`
        if (!io) {
            const server = (res.socket as any).server; // Type casting to any to access `server`
            io = new Server(server);
            
            io.on("connection", (socket) => {
                console.log("a user connected");

                // Broadcast editor changes
                socket.on("editor-change", (delta: any) => {
                    socket.broadcast.emit("editor-change", delta);
                });

                socket.on("disconnect", () => {
                    console.log("user disconnected");
                });
            });
        }

        return res.status(200).send("Socket initialized.");
    }
};

export default handler;

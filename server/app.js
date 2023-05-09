import { Server } from "socket.io";

const io = new Server(5000, {
    cors: {
        origin: ["http://localhost:5173", "https://chatsocketioapp.netlify.app"]
    }
});

io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    if(id) socket.join(id);
    console.log(`[CONNECT] Incoming: ${id}`);

    socket.on('message-send', ({ recipients, message }) => {
        console.log(`[MESSAGE] ${id} sending "${message} to ${recipients}"`)
        recipients.forEach((recipient) => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('message-receive', {
                recipients: newRecipients,
                sender: id,
                message,
            })
        })
    })
})

const express = require("express")
const { notFoundHandler, badRequestHandler, genericErrorHandler } = require("./errorHeandlers")
const cors = require("cors")
const { join } = require("path")
const listEndpoints = require("express-list-endpoints")
const mongoose = require("mongoose")
const staticFolderPath = join(__dirname, "../public")
const profileRouter = require('./routes/profiles')
const port = process.env.PORT
const experienceRouter = require("./routes/experience")
const post = require("./routes/post")
const server = express()

const {
    addUserToRoom,
    removeUser,
    getUser,
    getUsersInRoom,
} = require("./chatUtils/users")
const addMessage = require("./chatUtils/messages")

const http = require("http")
const socketio = require("socket.io")
const httpServer = http.createServer(server)
const io = socketio(httpServer)


io.on("connection", (socket) => {
    console.log("New WebSocket connection ", socket.id)

    socket.on("join", async (options) => {
        console.log("JOINED", options)
        try {
            const { username, room } = await addUserToRoom({
                id: socket.id,
                ...options,
            })

            socket.join(room)

            const welcomeMessage = {
                sender: "Admin",
                text: `Welcome to ${room}`,
                createdAt: new Date(),
            }

            socket.emit("message", welcomeMessage)

            const messageToRoomMembers = {
                sender: "Admin",
                text: `${username} is online!`,
                createdAt: new Date(),
            }

            socket.broadcast.to(room).emit("message", messageToRoomMembers)

            const roomMembers = await getUsersInRoom(room)
            io.to(room).emit("roomData", {
                room: room,
                users: roomMembers,
            })
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("chat", async ({ text, room }) => {
        console.log(text, room)
        try {
            const user = await getUser(room, socket.id)

            const messageContent = {
                sender: user.username,
                text,
                createdAt: new Date(),
            }

            const response = await addMessage(
                messageContent.text,
                user.username,
                room
            )
            if (response) {
                io.to(room).emit("message", messageContent)
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("leave", async ({ room }) => {
        try {
            const user = await removeUser(socket.id, room)
            const message = {
                username: "Admin",
                text: `${user.username} has left!`,
                createdAt: new Date(),
            }

            const roomMembers = await getUsersInRoom(room)
            if (user) {
                io.to(room).emit("message", message)
                io.to(room).emit("roomData", {
                    room: room,
                    users: roomMembers,
                })
            }
        } catch (error) {
            console.log(error)
        }
    })
})

// const {
//     notFoundHandler,
//     badRequestHandler,
//     otherGenericErrorHandler,
//     newlyDefinedErrorHandler,
//   } = require("./errorHandler")


server.use(express.static(staticFolderPath))
server.use(express.json())

server.use(cors())

server.use("/post", post)
server.use("/profiles", profileRouter)
server.use("/experiences", experienceRouter)

server.use(badRequestHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


// server.use(notFoundHandler)
// server.use(badRequestHandler)
// server.use(newlyDefinedErrorHandler)
// server.use(otherGenericErrorHandler)

console.log(listEndpoints(server))



mongoose.connect("mongodb+srv://eriseld:troy1894@cluster0.j7g0j.mongodb.net/linkedindb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(
        httpServer.listen(port || 3000, () => {
            console.log("Running on port", port || 3000)
        })
    )
    .catch((err) => console.log(err))


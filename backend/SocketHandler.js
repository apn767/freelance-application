const { Chat, Project } = require("./schema.js");
const { v4: uuid } = require('uuid');

const SocketHandler = (io) => {
    io.on('connection', (socket) => {

        // Handle joining chat rooms for freelancers
        socket.on("join-chat-room", async ({ projectId, freelancerId }) => {
            try {
                const project = await Project.findById(projectId);

                if (!project) {
                    socket.emit('error', { message: 'Project not found' });
                    return;
                }

                if (project.freelancerId === freelancerId) {
                    await socket.join(projectId);
                    console.log(socket.rooms);

                    socket.broadcast.to(projectId).emit("user-joined-room");

                    let chats = await Chat.findById(projectId);

                    if (!chats) {
                        const newChat = new Chat({
                            _id: projectId,
                            messages: []
                        });

                        await newChat.save();
                        chats = newChat;
                    }

                    socket.emit('messages-updated', { chats });
                } else {
                    socket.emit('error', { message: 'Freelancer not authorized for this project' });
                }
            } catch (error) {
                console.error('Error in join-chat-room:', error);
                socket.emit('error', { message: 'An error occurred while joining the chat room' });
            }
        });

        // Handle joining chat rooms for clients
        socket.on("join-chat-room-client", async ({ projectId }) => {
            try {
                const project = await Project.findById(projectId);

                if (!project) {
                    socket.emit('error', { message: 'Project not found' });
                    return;
                }

                if (project.status === "Assigned" || project.status === "Completed") {
                    await socket.join(projectId);
                    console.log(socket.rooms);

                    socket.broadcast.to(projectId).emit("user-joined-room");

                    let chats = await Chat.findById(projectId);

                    if (!chats) {
                        const newChat = new Chat({
                            _id: projectId,
                            messages: []
                        });

                        await newChat.save();
                        chats = newChat;
                    }

                    socket.emit('messages-updated', { chats });
                } else {
                    socket.emit('error', { message: 'Project status does not allow joining chat room' });
                }
            } catch (error) {
                console.error('Error in join-chat-room-client:', error);
                socket.emit('error', { message: 'An error occurred while joining the chat room' });
            }
        });

        // Handle updating messages
        socket.on('update-messages', async ({ projectId }) => {
            try {
                const chat = await Chat.findOne({ _id: projectId });
                if (!chat) {
                    socket.emit('error', { message: 'Chat not found' });
                    return;
                }

                console.log('updating messages');
                socket.emit('messages-updated', { chat });
            } catch (error) {
                console.error('Error updating messages:', error);
                socket.emit('error', { message: 'An error occurred while updating messages' });
            }
        });

        // Handle sending new messages
        socket.on('new-message', async ({ projectId, senderId, message, time }) => {
            try {
                const chat = await Chat.findOneAndUpdate(
                    { _id: projectId },
                    { $addToSet: { messages: { id: uuid(), text: message, senderId, time } } },
                    { new: true }
                );

                if (!chat) {
                    socket.emit('error', { message: 'Chat not found' });
                    return;
                }

                console.log(chat);
                io.to(projectId).emit('messages-updated', { chat }); // Emit to all clients in the room
                socket.broadcast.to(projectId).emit('message-from-user');
            } catch (error) {
                console.error('Error adding new message:', error);
                socket.emit('error', { message: 'An error occurred while adding a new message' });
            }
        });
    });
};

module.exports = SocketHandler;

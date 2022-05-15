const socket = require('socket.io')
const io = socket()
const formotMessage = require('../utils/timeMiddleware')
const {
    userJoin,
    getCurrectUser,
    userLeft,
    userFilter
} = require('../utils/users')

io.on('connection', socket => {
    // console.log('Socket io is working');
    socket.on('joinRoom', (userQuery) => {
        const user = userJoin(userQuery.username, userQuery.room, socket.id)
        socket.join(user.room)

        socket.emit('message', formotMessage('Admin [BOT]', 'Здарова'))

        socket.broadcast.to(user.room).emit('join', formotMessage('Admin [BOT]', `${user.username} присоединился к чату`))

        // users, room
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: userFilter(user.room)
        })
    })





    // xabar jo'natish
    socket.on('chatMessage', (msg) => {
        const user = getCurrectUser(socket.id)
        io.to(user.room).emit('message', formotMessage(user.username, msg))
    })

    socket.on('disconnect', () => {
        const user = userLeft(socket.id)
        if (user) {
            io.to(user.room).emit('leave', formotMessage('Admin [BOT]', `${user.username} покинул чат`))

            // users, room
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: userFilter(user.room)
            })
        }

    })
})



module.exports = io
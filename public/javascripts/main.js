const socket = io();
const MessagesField = document.querySelector('.chat__messages');
const form = document.querySelector('#chat-form');
const inp = document.querySelector('.chat__message');
const btnExit = document.querySelector('.chat_exit');
const roomName = document.querySelector('#room_name');
const users = document.querySelector('#users');  // massiv

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

socket.emit('joinRoom', ({ username, room }))

console.log(username, room);

socket.on('message', (data) => {
    outputMessage(data)
    MessagesField.scrollTop = MessagesField.scrollHeight
    inp.value = ''
    inp.focus()
})

socket.on('join', (data) => {
    outputMessage(data)
})

socket.on('roomUsers', (data) => {
    writeRoomName(data.room)
    writeUsersName(data.users)
})

const writeRoomName = (room) => {
    roomName.innerHTML = room
}

const writeUsersName = (usersList) => {
    users.innerHTML = ''
    usersList.forEach((val) => {
        const li = document.createElement('li')
        li.innerHTML = val.username
        users.appendChild(li)
    })
}

const outputMessage = (data) => {
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="message">
        <div class="meta">
        <p class="meta__username">${data.username}</p>
        <span class="meta__time">${data.time}</span>
        <p class="meta__text">${data.text}</p>
        </div>
        </div>
    `
    document.querySelector('.chat__messages').appendChild(div)
}

socket.on('leave', (data) => {
    outputMessage(data)
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let msg = inp.value

    socket.emit('chatMessage', msg)
})
const usersDB = []

const userJoin = (username, room, id) => {
    const user = { username, room, id }
    usersDB.push(user)
    return user
}

const getCurrectUser = (id) => {
    return user = usersDB.find((user => user.id === id))  // id to'g'ri kesa shu id li useri qaytaradi
}

const userLeft = (id) => {
    const index = usersDB.findIndex((user) => user.id === id)  // index kalit

    return user = usersDB.splice(index, 1)[0]
}

const userFilter = (room) => {
    return usersDB.filter((user) => user.room === room)
}

module.exports = {
    userJoin,
    getCurrectUser,
    userLeft,
    userFilter
}
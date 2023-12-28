const users = []

const addUser = (username, room) => {
    const existingUser = users.find(user => user.username.trim().toLowerCase() === username.trim().toLowerCase());
    if(existingUser) {
        throw Error('user already exists');
    }
    const user = {username, room };
    users.push(user);
    return { user };
}

const getUser = username => {
    let user = users.find(user => user.username == username);
    return user;
}

const deleteUser = (username) => {
    const index = users.findIndex((user) => user.username === username);
    if (index !== -1) return users.splice(index, 1)[0];
}

const getUsers = (room) => users.filter(user => user.room === room)

module.exports = { addUser, getUser, deleteUser, getUsers }
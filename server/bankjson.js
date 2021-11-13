const fs = require('fs')
const uniqid = require('uniqid')
const validator = require('validator');

const addNewUser = ({ id, passportId, cash, credit, name, email }) => {
    const users = laodingUsers()
    const duplicateUsers = users.filter(user => {
        return user.id !== id
    })
    if (duplicateUsers.length === users.length) {
        if (validator.isEmail(email) && validator.isNumeric(id) && id.length === 9  ) {
            users.push({
                id: id,
                passportId: uniqid(),
                cash: cash,
                credit: credit,
                name: name,
                email: email
            })
            saveUseres(users)
            console.log(users);
            console.log('save new user');
        } else {
            console.log('the email or the id not valide')
        }
    } else {
        console.log('user is exsited');
    }
}



const saveUseres = (user) => {
    const dataJson = JSON.stringify(user)
    fs.writeFileSync('users.json', dataJson)
}

const laodingUsers = () => {
    try {
        const dataBuffer = fs.readFileSync('users.json')
        const data = JSON.parse(dataBuffer.toString())
        return data
    } catch (e) {
        return []
    }
}

module.exports = {
    laodingUsers,
    saveUseres,
    addNewUser
}
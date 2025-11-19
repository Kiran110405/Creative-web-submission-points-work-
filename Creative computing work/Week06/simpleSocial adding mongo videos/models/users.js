// let userData=[
//     {
//         username: "user1",
//         password: "123"
//     },{
//         username: "user2",
//         password: "456"
//     }
// ]

const mongoose=require('mongoose')
const {Schema, model} = mongoose

const userSchema=new Schema({
    username: String,
    password: String
})

const userData=model('users', userSchema)

async function addUser(usernameFromForm, password){
    // let found=userData.find(thisUser=>thisUser.username==username)
    let found=null
    found=await userData.findOne({username:usernameFromForm})
    if(found){
        return false
    } else {
        let newUser={
            username:usernameFromForm,
            password:password
        }
        // userData.push(newUser)
        await userData.create(newUser)
        return true
    }
}

async function checkUser(usernameFromForm, password){
    // let found=userData.find(thisUser=>thisUser.username==username)
    let found=null
    found=await userData.findOne({username:usernameFromForm})
    if(found){
        return found.password==password
    } else {
        return false
    }
    //return boolean true if it matches else false
}

module.exports={
    addUser,
    checkUser
}
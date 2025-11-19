// let nextPostID=3

// let postData=[
//     {
//         postid: 0,
//         message:"Hi it's Dave",
//         user:"Dave"
//     },{
//         postid: 1,
//         message:"Glad it's Thursday",
//         user:"Julie"
//     },{
//         postid: 2,
//         message:"I'm hungry",
//         user:"Sam"
//     }
// ]

const mongoose=require('mongoose')
const {Schema, model} = mongoose

const postSchema=new Schema({
    user: String,
    message: String,
    likes: Number,
    time: Date
})

const postData=model('posts', postSchema)

function getPosts(){
    return postData.slice()
}

function addPost(message, user){
    let newPost={
        // postid: nextPostID++,
        message: message,
        user: user,
        likes: 0,
        time: Date.now()
    }
    // postData.push(newPost)
    postData.create(newPost)
    .catch(err=>{
        console.log("Error: ", err)
    })
}

async function getLastNPosts(n=3){
    // postData.slice(-n).reverse()
    let foundPosts=[]
    foundPosts=await postData.find({}).sort({'time':-1}).limit(n).exec()
    return foundPosts
}

module.exports={
    getPosts,
    addPost,
    getLastNPosts
}
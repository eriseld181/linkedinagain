const express =  require("express")
const mongo = require("./postSchema")
const path = require("path")
const fs = require("fs-extra")
const multer = require("multer")
const upload = multer()
const q2m  = require("query-to-mongo")
const post = express.Router()
const imagePath = path.join(__dirname,"../../../post/image")


post.get("/", async(req,res,next)=>{
try{
    const query = q2m(req.query)
    const posts = await mongo.find(query.criteria, query.options.fields).populate("user")
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)
res.send(posts)
}catch(err){
    next(err)
}
})
post.get("/:_id", async(req,res,next)=>{
try{
   
const posts = await mongo.findById(req.params._id).populate("user")
res.send(posts)
}catch(err){
next(err)
}
})
post.post("/",async (req,res,next)=>{
try{ 
 
const newPost =  new mongo(  req.body )
 await newPost.save()
res.send( "Added" )
}catch(err){
next(err)
}
})
post.post("/:_id/image" , upload.single('image'),async(req,res,next)=>{
try{
await fs.writeFile(path.join(imagePath, `${req.params._id}.jpg`),req.file.buffer)

req.body={ image : `${req.params._id}.jpg`}
console.log(req.body)
const image = await mongo.findByIdAndUpdate(req.params._id, req.body)
console.log(image)
if(image){
    res.send("Image Added")
}else{
    res.send("Not exist")
}
}catch(err){
    next(err)
}
})



post.put("/:_id",async(req,res,next)=>{
try{
const posts = await mongo.findByIdAndUpdate(req.params._id,req.body )
 res.send("ok")
}catch(err){
    next(err)
}
})

post.delete("/:_id",async (req,res,next)=>{
try{
const post = await mongo.findByIdAndDelete(req.params._id)
if(post){
    res.send("Deleted")
}else{
    res.send("Not exist in database")
}
}catch(err){
    next(err)
}
})


module.exports = post




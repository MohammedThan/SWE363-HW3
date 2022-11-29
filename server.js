const express=require("express")
const app = express()

app.set('view engine', 'ejs');

app.get("/", function(req, res){
    res.sendFile("./public/index.html",{root:__dirname})
})

app.get("/FishFingerCSS", function(req, res){
    res.sendFile("./public/FishFingerCSS.html",{root:__dirname})
})


app.listen(3000)
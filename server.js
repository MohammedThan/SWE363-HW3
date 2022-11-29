const modes=require('./models/recipe_mode');

const express=require("express")
const app = express()
app.use(express.json())
app.use(express.static('public'));
app.set("view engine","njk")


let nunjucks=require('nunjucks');
nunjucks.configure(["views"],{
    autoescape:false,
    express: app
})

app.get("/", function(req, res){
    let xx=modes.getRecipeDetail()
    console.log(xx);
    res.render("index.njk",{"db":xx})
})

app.get("/recipes/:recipe_id", function(req, res){
    res.render("FishFingerCSS.njk",modes)
})


app.listen(3000)
const modes=require('./models/recipe_mode');

const express=require("express")
const app = express()
app.use( express.static('public'));
app.use(express.static(__dirname+"/public"))
app.use(express.json())
app.set("view engine","njk")
// app.use("/asset",express.static("asset"));


let nunjucks=require('nunjucks');
nunjucks.configure(["views"],{
    autoescape:false,
    express: app
})

app.get("/", function(req, res){
    let db=modes.getAllRecipes()
    res.render("index.njk",{"db":db})
})


app.get("/recipes/:recipe_id", function(req, res){
    let db=modes.getRecipeDetail(req.params.recipe_id)
    // let comments=modes.getComments(req.params.recipe_id)
    // console.log(req.params.recipe_id)
    // console.log(modes.getRecipeDetail(1))
    res.render("recipe.njk",{"db":db})
})

app.get("/recipes/:recipe_id/comments", function(req, res){
    let comments=modes.getComments(req.params.recipe_id)

    res.json(comments)
})

app.post("/recipes/:recipe_id/comments",function(req, res){
    var tmpJson=JSON.stringify(req.body)
    var myJson=JSON.parse(tmpJson)
    console.log(req.params.recipe_id)

    modes.addComment(req.params.recipe_id,myJson)
    // let db=modes.getRecipeDetail(req.params.recipe_id)
    // res.render("recipe.njk",{"db":db})

});


app.listen(3000)
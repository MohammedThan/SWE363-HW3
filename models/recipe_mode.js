const db = require('better-sqlite3')('recipes_store.db3');

function getAllRecipes(){
    const res = db.prepare('select * from recipes;').all();
    return res;
}

function getRecipeDetail(recipe_id){
    const res = db.prepare('select * from recipes,ingredients,method where recipes.id=? AND ingredients.recipe_id=? AND method.recipe_id=? ;').all(recipe_id,recipe_id,recipe_id);
    return res[0]
}


function getComments(recipe_id){
    const res = db.prepare('select * from comments where comments.recipe_id=?;').all(recipe_id);
    return res;
}

function addComment(recipe_id, comment){
    theComment=validComment(recipe_id,comment);
    const insert = db.prepare('INSERT INTO  comments (id, "author", "comment", recipe_id) VALUES (@id, @author, @comment, @recipe_id)');


    const result = insert.run(theComment);

    let message = 'Error in creating review';
    if (result.changes) {
      message = 'Review created successfully';
    }
    
    console.log(message);
    return {message};


}

function validComment(recipe_id,comment) {
    if (!comment) {
        let error = new Error("No object is provided");
        error.statusCode = 400;
        throw error;

    } else if(comment.id===null || comment.author===null || comment.comment===null ){
        let error = new Error("some field is missing"); 
        error.statusCode = 400;
        throw error;
    }

    return {
        id:comment.id,
        author:comment.author,
        comment:comment.comment,
        recipe_id:recipe_id
    };
}

module.exports={getAllRecipes,  getRecipeDetail, getComments,addComment}
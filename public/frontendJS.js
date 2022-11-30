
function showComments(recipe_id){

    var ourReq=new XMLHttpRequest();

    ourReq.open('GET',`/recipes/${recipe_id}/comments`)

    ourReq.onload= ()=>{
        var ourData=JSON.parse( ourReq.responseText)
        var commentContainer = document.getElementById("comments");
        commentContainer.innerHTML="";

        for(i=0;i<ourData.length;i++){
          htmlString="  <dd> "+ourData[i].comment+ "<br>-"+ourData[i].author+"</dd>"
          commentContainer.insertAdjacentHTML("beforeend",htmlString)
        }

    }
    ourReq.send()
    

}


function seeComments() {

    var x = document.getElementsByClassName("hide");
    if (x[0].style.display === "block") {
      x[0].style.display = "none";
      x[1].style.display = "none";

    } else {
        x[0].style.display = "block";
        x[1].style.display = "block";
    }

    }


function sendComment(recipe_id){

    console.log(`/recipes/${recipe_id}/comments`)

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.open("POST", `/recipes/${recipe_id}/comments`);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({author:document.getElementById('name').value, comment:document.getElementById('comment').value}));



}
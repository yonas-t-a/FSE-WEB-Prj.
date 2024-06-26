let menu = document.getElementById("dasNavmenuList");
dasNavmenuList.style.maxHeight = "0px";

function toggleMenu(){
    if( dasNavmenuList.style.maxHeight == "0px"){
        dasNavmenuList.style.maxHeight = "600px"
    } else{
        dasNavmenuList.style.maxHeight = "0px"
    }
}
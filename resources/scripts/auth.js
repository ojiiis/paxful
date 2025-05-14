let params = getAllParams(url = window.location.href)
console.log(params,)
if(params['a']!=undefined){
    [...document.getElementsByClassName("auth-sections")].forEach((elem)=>elem.style.display = "none");
    document.getElementById(params['a']).style.display = "block";
}else{
     document.getElementById("sign-up").style.display = "block";
}
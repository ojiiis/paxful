let params = getAllParams(url = window.location.href);
if(params['a']!=undefined){
    [...document.getElementsByClassName("auth-sections")].forEach((elem)=>elem.style.display = "none");
    document.getElementById(params['a']).style.display = "flex";
}else{
     document.getElementById("sign-in").style.display = "flex";
}
let params = getAllParams(url = window.location.href);
if(params['a']!=undefined){
    [...document.getElementsByClassName("auth-sections")].forEach((elem)=>elem.style.display = "none");
    document.getElementById(params['a']).style.display = "flex";
    if(params['a'] == "sign-up" && params['email'] != undefined){
document.getElementById('email').value = params['email'];
    }
}else{
     document.getElementById("sign-in").style.display = "flex";
}
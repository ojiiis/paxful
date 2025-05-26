  function getAllParams(url = window.location.href) {
    const params = {};
    const queryString = url.split('?')[1];

    if (!queryString) return params;

    const pairs = queryString.split('&');

    for (const pair of pairs) {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }

    return params;
}
let params = getAllParams(url = window.location.href);
if(params['a']!=undefined){
    [...document.getElementsByClassName("auth-sections")].forEach((elem)=>elem.style.display = "none");
    document.getElementById(params['a']).style.display = "flex";
    if(params['a'] == "sign-up" && params['email'] != undefined){
document.getElementById('email').value = params['email'];
    }
}else{
     if(document.getElementById("sign-in"))document.getElementById("sign-in").style.display = "flex";
}


const auth = new Promise((res,rej)=>{
    (async function(){
   try{
     const key = localStorage.getItem('key'); let auth = {status:false}; if(key != null){let isAuth = await fetch(`${api}/auth/${key}`); auth = await isAuth.json()}
     res(auth);
   }catch(e){
     rej({status:false})
   }
})();
})


const loading = () =>{
      var loading = document.createElement("div");
    loading.id = 'app-loading-ani';
    loading.style.cssText = `background:rgba(0,0,0,0.5);display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100vw;height:100vh;background-image:url('resources/images/laoding.gif');background-position:center;background-size:200px;background-repeat:no-repeat`;
    document.body.style.overflowY = 'hidden';
    document.body.appendChild(loading);
}

const loaded = () =>{
   document.body.style.overflowY = 'auto';
   document.getElementById('app-loading-ani').remove();
}
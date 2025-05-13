  document.getElementById("close-cookie-pop").onclick = () => document.getElementById("cookie-pop").remove();
       document.getElementById("close-qr-code").onclick = () => document.getElementById("qr-code").remove();
  [...document.getElementsByClassName("capsule-show-options")].forEach(element => {
     element.onclick = ()=> {
        [...document.getElementsByClassName("options")].forEach((elem)=>{
            if(elem != element.parentElement.children[1]){
                elem.style.display = "none"; 
            }
          
        });
       
        if(element.parentElement.children[1].style.display == "none" || element.parentElement.children[1].style.display == ""){
            element.parentElement.children[1].style.display = "flex";
        }else{
            element.parentElement.children[1].style.display = "none";
        }
   
    if(element.parentElement.children[1].getBoundingClientRect().right > window.innerWidth){
      let moveBack = element.parentElement.children[1].getBoundingClientRect().right - window.innerWidth;
      element.parentElement.children[1].style.left = -(moveBack+20)+'px';
    }
        
     }
    //console.log();
  });
  
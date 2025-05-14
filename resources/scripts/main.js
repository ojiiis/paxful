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
   
  });
  

[...document.querySelectorAll('.options span')].forEach((elements)=>{
    elements.onclick = ()=>{
       // console.log(elements.innerText);
        [...elements.parentElement.children].forEach(elem=>{
            if(elem != elements){
                elem.classList.remove("selected");
            }
        });
        let value = elements.textContent, content = elements.innerHTML;
        elements.parentElement.parentElement.children[0].innerHTML = content+' <i class="bi bi-arrow-down"></i>';
        elements.classList.add("selected");
        elements.parentElement.style.display = "none";
        elements.parentElement.parentElement.children[2].value= value;
    }
  // 
});

[...document.getElementsByClassName('has-submenu')].forEach(elem=>{

   elem.onclick = (e)=>{
    e.stopPropagation();
     [...document.getElementsByClassName('submenu')].forEach((el)=>{
        if(el != elem){
            el.classList.remove('toggle-flex');
        }
     }); 
      //console.log()
      elem.children[1].classList.toggle('toggle-flex');
   }
});

[...document.getElementsByClassName('has-child')].forEach(elem=>{
   elem.onclick = (e)=>{
    e.stopPropagation();

[...document.getElementsByClassName('has-child')].forEach(el=>{

     if(el.getElementsByClassName('child')[0] != elem.getElementsByClassName('child')[0]){
       el.getElementsByClassName('child')[0].classList.remove('toggle-flex');  
        el.getElementsByClassName('child')[0].style.display = "none";
     }
  
});
     elem.getElementsByClassName('child')[0].classList.toggle('toggle-flex');
  
   }
});

document.getElementById("menu").onclick = function(){
    if(document.getElementsByClassName('navigation-wrapper')[0].style.display == "" || document.getElementsByClassName('navigation-wrapper')[0].style.display == "none"){
         document.getElementsByClassName('navigation-wrapper')[0].style.setProperty('display', 'flex', 'important');
    }else{
         document.getElementsByClassName('navigation-wrapper')[0].style.setProperty('display', 'none', 'important');
    }
  
};
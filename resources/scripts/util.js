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
  document.getElementById("close-cookie-pop").onclick = () => document.getElementById("cookie-pop").remove();
  document.getElementById("close-qr-code").onclick = () => document.getElementById("qr-code").remove();
  const tr = document.querySelectorAll('#app-right .table-row');
  if (tr.length) {
  tr[tr.length - 1].style.borderBottom = 'none';
}

if(document.getElementById("copy-address")){
 document.getElementById("copy-address").onclick = function(){
      const originalInput = document.getElementById("bitcoin-address");
  const tempInput = document.createElement("input");
  tempInput.value = originalInput.value;

  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // Mobile support
  document.execCommand("copy");
  document.body.removeChild(tempInput);

    // Optional: Show confirmation
  //  alert("Copied: " + input.value);
   }
  }


[...document.getElementsByTagName("form")].forEach(item=>{
item.addEventListener('submit',function(e){
e.preventDefault();
var data = {}
var thisData = new FormData(this);
thisData.forEach((v,k)=>{
    data[k] = v;
})
let route = this.action.length?api+"/"+this.action.split("/").slice(-1)[0]:api;
fetch(route,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
}).then(r=>r.json()).then(r=>console.log(r))


});
});

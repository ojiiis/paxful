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
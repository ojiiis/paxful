
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


[...document.getElementsByTagName("form")].forEach(form => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = e.submitter;
    const oldBtnText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
    const data = {};
    const formData = new FormData(this);

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const action = this.action.trim();
    const route = action.length ? api + "/" + action.split("/").pop() : api;

    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        if (!result.status) {
          runAlert(result.message, "error");
        } else {
          const redirect = form.getAttribute("redirect");
          runAlert(result.message, "success");
          localStorage.setItem("key",result.data);
          if (redirect && redirect.length > 0) {
            setTimeout(() => {
              location = redirect;
            }, 2000);
          }
          if(action.split("/").pop() == "sign_up" || action.split("/").pop() == "sign_in"){
              localStorage.setItem("key",result.data);
          }
        }

        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
      })
      .catch(error => {
        console.error("Fetch error:", error);
        runAlert("An error occurred. Please try again.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
      });
  });
});


const runAlert = (message,type = 'success') =>{
       if(document.getElementById("alert"))document.getElementById("alert").remove();
     let errDiv = document.createElement("div");
     errDiv.textContent = message;
     errDiv.id = 'alert';
     errDiv.classList.add(type);
     errDiv.style.animation = 'show_alert 1s forwards';
     document.body.appendChild(errDiv);
     setTimeout(()=>{
       errDiv.style.animation = 'none';
       errDiv.style.animation = 'hide_alert 1s forwards';
     },2000);
}


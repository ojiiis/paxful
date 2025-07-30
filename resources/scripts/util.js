[...document.getElementsByClassName('close_modal')].forEach(elements=>{
   elements.onclick = function(){
      document.getElementById(elements.getAttribute('data')).style.display = 'none';
   }
});

if(document.getElementById("close-cookie-pop"))document.getElementById("close-cookie-pop").onclick = () => document.getElementById("cookie-pop").remove();
  if(document.getElementById("close-qr-code"))document.getElementById("close-qr-code").onclick = () => document.getElementById("qr-code").remove();
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
   runAlert('Copied...', "success");
   }
  }

const temptData = {};
[...document.getElementsByTagName("form")].forEach(form => {
  
     form.addEventListener("submit", async function (e) {
      if(form.classList.contains('create')){
            //create form submission
                e.preventDefault();
      const form = e.target;
  const formData = new FormData(form);
  const params = new URLSearchParams(formData).toString();
  const submitBtn = e.submitter;
    const oldBtnText = submitBtn.textContent;
    
    if(formData.get('stage') == 2){
     // console.log(temptData);
      const arg = new URLSearchParams(temptData.stage1+'&'+params);
      const data = Object.fromEntries(arg.entries());
       submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
try{
   let d = await fetch(api+'/add_offer',{
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":localStorage.getItem('key')
      },
      body: JSON.stringify(data)

 });
 let e = await d.json();
   if (!e.status) {
          runAlert(e.message, "error");
        }else if(e.data.redirect){
             runAlert(e.message, "success");
                setTimeout(() => {
              location = e.data.url;
            }, 2000);
          }
}catch(e){
  console.log(e);
        runAlert("An error occurred. Please try again.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
}
  submitBtn.disabled = false;
  submitBtn.textContent = oldBtnText;

    }else if(formData.get('stage') == 1){
       
   if(formData.get('amount') <= 0 || formData.get('amount') == undefined ){
     runAlert('Enter a valid amount.','error');
     return;
   }else if(formData.get('payment_method') == "" || formData.get('payment_method') == undefined){ 
     runAlert('Select payment method.','error');
     return;
   }else{
     //  history.replaceState({}, '', 'create-offer.html?'+params);
   /// alert(params);
   temptData['stage1'] = params;
   document.getElementById("create_offer_step").style.display = 'flex';
   }
  }
      }else if(form.classList.contains('search-offers')){
            e.preventDefault();
      const form = e.target;
  const formData = new FormData(form);
  formData.set('coin', coinsName[formData.get('coin')]);
  const params = new URLSearchParams(formData).toString();

  const submitBtn = e.submitter;
    const oldBtnText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    submitBtn.disabled = true;
    document.getElementById("offer-search-result").classList.remove('no-data');
  (window.location.href.toString().includes('market.html'))?history.replaceState({}, '', 'market.html?'+params):location = 'market.html?'+params;
      let d = await fetch(api+'/market?'+params,{
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":localStorage.getItem('key')
      },

 });
     let f = await d.json();
     if(f.data.length){
            document.getElementById("offer-search-result").classList.remove('no-data');
      document.getElementById("offer-search-result").innerHTML = '';
f.data.forEach(v=>{
 document.getElementById("offer-search-result").appendChild(createTradeRow(v));
 document.getElementById("offer-search-result").appendChild(createOfferDetails(v));
});
     }else{
document.getElementById("offer-search-result").innerHTML = '';
document.getElementById("offer-search-result").classList.add('no-data');
     }
 document.getElementById("offer-search-result").scrollIntoView();    
        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
      }else{
        handleForm(form,e);
      }
    
  });

});

function handleForm(form,e){
   e.preventDefault();
    const submitBtn = e.submitter;
    const oldBtnText = submitBtn.textContent;
    submitBtn.textContent = "Processing...";
    
    submitBtn.disabled = true;
    const data = {};
    const formData = new FormData(form);

    formData.forEach((value, key) => {
      data[key] = value;
    });

    const action = form.action.trim();
    const route = action.length ? api + "/" + action.split("/").pop() : api;
    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":localStorage.getItem('key')
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
          if(action.split("/").pop() == "sign_up" || action.split("/").pop() == "sign_in"){
              localStorage.setItem("key",result.data);
          }
          if (redirect && redirect.length > 0) {
            setTimeout(() => {
              location = redirect;
            }, 2000);
          }else if(result.data.redirect){
             runAlert(result.message, "success");
                setTimeout(() => {
              location = result.data.url;
            }, 2000);
          }
         
        }

        submitBtn.disabled = false;
        submitBtn.textContent =  oldBtnText
      })
      .catch(error => {
        console.error("Fetch error:", error);
        runAlert("An error occurred. Please try again.", "error");
        submitBtn.disabled = false;
        submitBtn.textContent = oldBtnText;
      });
}
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-modal")) {
       closeModal1(e.target);
    }
});
const closeModal1 = (elem)=> {
   const targetId = elem.getAttribute("target-modal");
        const modal = document.getElementById(targetId);
        if (modal) modal.style.display = 'none';
}
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
     },4000);
}

[...document.getElementsByClassName('show-pass')].forEach((items)=>{
    items.onclick = function(){
      if(items.classList.contains('bi-eye')){
            items.classList.remove('bi-eye');
            items.classList.add('bi-eye-slash');
            items.parentElement.children[0].type = 'text';
            return;
      }
      items.classList.remove('bi-eye-slash');
      items.classList.add('bi-eye');
      items.parentElement.children[0].type = 'password';
    }
});




function createTradeRow(v) {
    const el = (tag, className, text) => {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text !== undefined) e.textContent = text;
        return e;
    };

    const row = el("div", "table-row");

    // Heading
    const heading = el("div", "heading");
    heading.appendChild(el("span", "", (v.type === "sell" || v.type === "Selling") ? "Selling" : "Buying"));
    heading.appendChild(el("span", "", v.date));
    row.appendChild(heading);

    // Column One
    const colOne = el("div", "column-one");
    const icon = el("i", `icon ${v.coinName.toLowerCase()}`);
    const label = el("span", "", `${v.coinName} (${v.coinSymbol.toUpperCase()})`);
    colOne.append(icon, label);
    row.appendChild(colOne);

    // Column Two
    const colTwo = el("div", "column-two");
    colTwo.append(el("b", "", v.localValue), el("b", "", v.paymentMethod));
    row.appendChild(colTwo);

    // Column Three
    const colThree = el("div", "column-three");
    colThree.appendChild(el("span", "", `${v.sellingPrice} / ${v.coinSymbol.toUpperCase()}`));
    const viewBtn = el("a", "btn", "View");
    viewBtn.onclick = () => {
      document.getElementById(v.id).style.display = "flex";
      document.getElementById(v.id).style.overflowY = "auto";
    };
    colThree.appendChild(viewBtn);
    row.appendChild(colThree);

    // Footer
    row.appendChild(el("div", "footer", v.tradeTerms));

    return row;
}


let isSendingOtp = 0;
async function send_otp(){
  if(isSendingOtp == 0){
    isSendingOtp = 1;
  this.textContent = "...";
const req = await fetch(api+"/resend-otp",{
  method:"POST",
    headers:{
                        "Authorization":localStorage.getItem('key')
 }
});
const res = await req.json();
isSendingOtp = 0;
 this.textContent = "Send";
runAlert(res.message);
  }
}

function startFutureCountdown(futureTime,elem) {
  // Future time should be a Date object or timestamp
  const futureDate = futureTime * 1000;

  // Set up an interval to update the countdown every second
  const countdownInterval = setInterval(() => {
    const currentTime = new Date().getTime(); // Get current time in milliseconds
    const timeRemaining = futureDate - currentTime; // Difference in milliseconds

    // If the countdown has finished
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      elem.textContent = "Time's up!";
    } else {
      // Calculate minutes and seconds from milliseconds
      const minutes = Math.floor(timeRemaining / 60000); // 60,000 ms in a minute
      const seconds = Math.floor((timeRemaining % 60000) / 1000); // Remaining seconds

      // Format time as mm:ss
       elem.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
      // Log the remaining time (you can update the DOM instead)
     // console.log(formattedTime);
    }
  }, 1000); // Update every second (1000 ms)
}

// Example: Countdown to a time 5 minutes from now
//const futureTime = new Date().getTime() + 5 * 60 * 1000; // 5 minutes from current time
//startFutureCountdown(futureTime);


function createOfferDetails(data) {
    const el = (tag, className, text) => {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (text !== undefined) e.textContent = text;
        return e;
    };

    const wrapper = el("div", "offer-single-descp");
    wrapper.id = data.id;

    const container = el("div", "gbtp-trade-container");

    // Seller Info Section
    const seller = el("div", "gbtp-trade-seller");

    const header = el("div", "gbtp-seller-header");
    header.appendChild(el("div", "gbtp-avatar", data.user?.charAt(0).toUpperCase()));

    const details = el("div", "gbtp-seller-details");
    details.appendChild(el("div", "gbtp-seller-name", data.user));
    details.appendChild(
        el(
            "div",
            "gbtp-seller-meta",
            `Feedback • 100% | ${new Date(+data.lastActive * 1000).toLocaleString()}`
        )
    );

    const badges = el("div", "gbtp-badges");
    ["Email", "SMS", "Verified"].forEach(badge => badges.appendChild(el("span", "gbtp-badge", badge)));
    details.appendChild(badges);
    header.appendChild(details);
    seller.appendChild(header);

    const stats = el("div", "gbtp-seller-stats");

    const addStat = (label, value, isButton = false) => {
        const stat = el("div", "gbtp-stat");
        if (label === "Notes") stat.classList.add("gbtp-notes");
        stat.appendChild(el("label", "", label));
        if (label === "Notes") {
            const box = el("div", "gbtp-notes-box");
            box.textContent = data.tradeTerms || "—";
            stat.appendChild(box);
        } else if(label === "Payment Duration" && data.url){
           const e = document.createElement("span");
           e.className = "gbtp-value";
           stat.appendChild(e);
          startFutureCountdown(data.endingAt,e);
        }else if (isButton) {
            stat.appendChild(el("span", "gbtp-btn-small", value));
        } else {
            stat.appendChild(el("span", "gbtp-value", value));
        }
        stats.appendChild(stat);
    };
   
    addStat("Price", data.sellingPrice);
    if(!data.url){
    addStat("Available", `${data.value} ${data.coinSymbol.toUpperCase()}`);
    }
  
    addStat("Payment Duration", data.duration);
    addStat("Payment Method", data.paymentMethod, true);
    if (data.tradeTerms) addStat("Notes", data.tradeTerms);

if(data.status !== undefined){
    let ab = document.createElement("a");
    ab.href= "javascript:void(0)";
  
   if(data.type == "Buying" || data.type == "buy"){

      if(data.status == null || data.status == ""){
 ab.textContent = 'Make as paid';
     ab.onclick = ()=> {
     showModal('crypto-trade-action');
         let tac = ` <p>Click the button below to confirm that you have made the payment. Clicking the confirmation button without making the payment may result in your account being blocked.</p>
                  <br><form method="POST" class="form"  action="/trade_action" onsubmit="handleForm(this,event)">
                      
                            <input type="hidden" name="tid" value="${data.id}">
                            <div class="auth-btn">
                                <button class="btn">I've made payment</button>
                            </div>
                </form>       `;
     
      document.getElementById("trade-action-content").innerHTML =tac;
    };
    }else if(data.status == "payed"){
     ab.textContent = 'You make trade as paid'; 
    }else if(data.status == "completed"){
      ab.textContent = 'Trade concluded'; 
    }else{
       ab.textContent = 'Trade is now on dispute'; 
    }
   
   }else{
      if(data.status == null || data.status == "" || data.status == "payed"){
    ab.onclick = ()=> {
       showModal('crypto-trade-action');   
        document.getElementById('crypto-trade-action').style.display = 'flex';
        let tac = ` <p>Ensure that funds have been properly confirmed as received before releasing the coins, as released coins may not be recoverable.</p>
                  <form method="POST" class="form"  action="/trade_action"  onsubmit="handleForm(this,event)">
                            <div class="form-group">
                                <label>Enter your transaction pin</label>
                                <input type="password" name="tp" placeholder="1234">
                            </div>
                            <div class="form-group">
                                <label>Otp*</label>
                                <div class="input-i">
                                    <input type="password" name="otp"  placeholder="1234"><i class="btn-input-i" onclick="send_otp()">send</i>
                                </div>
                            </div>
                            <input type="hidden" name="tid" value="${data.id}">
                            <div class="auth-btn">
                                <button class="btn">Release coin</button>
                            </div>
                </form>       `;
          document.getElementById("trade-action-content").innerHTML =tac;
    };
    ab.textContent = 'Release coin';
      }else if(data.status == "completed"){
      ab.textContent = 'Trade concluded'; 
    }else{
       ab.textContent = 'Trade is now on dispute'; 
    }
   }
 const stat = el("div", "gbtp-stat");
    if(data.status == null || data.status == ""){
 stat.appendChild(el("label", "", 'Action'));
    }
   stat.appendChild(ab);
   stats.appendChild(stat);
  }
   seller.appendChild(stats);

    // Trade Form Section (use real <form> instead of div)
   
   
    const form = document.createElement("form");
    form.className = "gbtp-trade-form";
   
    form.setAttribute("data-offer-id", data.id); // Optional: for backend or JS reference
 
      if(!data.url){
      if(data.type == "Buying" || data.type == "buy"){
        form.action = "/join_trade";
      }else{
         form.action = "/pause_trade";
      }
   form.onsubmit = function(e){
       handleForm(form,e);
    }
      }else{
          form.onsubmit = function(e){
       e.preventDefault();
    }
      }
          const hiddenInput1 = document.createElement("input");
        hiddenInput1.type = "hidden";
        hiddenInput1.name="buy_coin";
 const hiddenInput2 = document.createElement("input");
        hiddenInput2.type = "hidden";
         hiddenInput2.name = "oid";
        hiddenInput2.value=data.id;
form.appendChild(hiddenInput1);
form.appendChild(hiddenInput2);
   const actionButtons = el("div", "gbtp-action-buttons");
   
if(data.type == "Buying" || data.type == "buy"){
    const formGroup = (labelText, currency, isReceive = false) => {
        const group = el("div", "gbtp-form-group");
        group.appendChild(el("label", "", labelText));

        const inputBox = el("div", "gbtp-input-box");
        const input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.required = true;
        input.placeholder = "0.00";
        input.name = isReceive ? "receive" : "pay";
        if (isReceive) input.readOnly = true;

        inputBox.appendChild(input);
        inputBox.appendChild(el("span", "gbtp-currency", currency));
        group.appendChild(inputBox);

        return { group, input };
    };
 let payField,receiveField;
  if(!data.url){
     payField = formGroup("I will pay", data.currency);
     receiveField = formGroup("I will receive", data.coinSymbol.toUpperCase(), true);
  }else{
      payField = formGroup("I am paying", data.currency);
      payField.input.value = data.localValuePlain;
      payField.input.disabled = true;
     receiveField = formGroup("To receive", data.coinSymbol.toUpperCase(), true);
      receiveField.input.value = data.value;
  }
    form.appendChild(payField.group);
    form.appendChild(receiveField.group);

    const pricePerCoin = parseFloat(data.sellingPrice.split(" ")[0].replace(/,/g, ""));
    const availableAmount = parseFloat(data.value);
    payField.input.addEventListener("input", () => {
        const payAmount = parseFloat(payField.input.value.replace(',', ''));
        if (isNaN(payAmount) || payAmount <= 0) {
            receiveField.input.value = "";
            return;
        }

        const coinsToReceive = payAmount / pricePerCoin;

        if (coinsToReceive > availableAmount) {
            const maxFiat = (availableAmount * pricePerCoin).toFixed(2);
            payField.input.value = maxFiat;
            receiveField.input.value = availableAmount.toFixed(8);
        } else {
            receiveField.input.value = coinsToReceive.toFixed(8);
        }
    });
  if(data.url){
       const dispute = document.createElement("button");
    dispute.type = "submit";
    dispute.className = "btn gbtp-btn btn-danger";
    dispute.textContent = "Dispute";

      const view_chat = document.createElement("button");
     view_chat.onclick = () =>window.location.href = data.url;
      view_chat.className = "btn gbtp-btn";
       view_chat.textContent = "View chat";
       actionButtons.append(view_chat,dispute);
       
  }else{
     const buyBtn = document.createElement("button");
    buyBtn.type = "submit";
    buyBtn.className = "btn gbtp-btn";
    buyBtn.textContent = "Buy";
     actionButtons.append(buyBtn);
  }
 }else{
   const formGroup = (labelText, currency, isReceive = false) => {
        const group = el("div", "gbtp-form-group");
        group.appendChild(el("label", "", labelText));

        const inputBox = el("div", "gbtp-input-box");
        const input = document.createElement("input");
        input.type = "number";
        input.step = "any";
        input.required = true;
        input.placeholder = "0.00";
        input.name = isReceive ? "receive" : "pay";
        if (isReceive) input.readOnly = true;

        inputBox.appendChild(input);
        inputBox.appendChild(el("span", "gbtp-currency", currency));
        group.appendChild(inputBox);

        return { group, input };
    };
  let payField,receiveField;
 
  if(data.url && data.url.length > 0){
        payField = formGroup("I receive", data.currency);
      payField.input.value = data.localValuePlain;
      payField.input.disabled = true;
     receiveField = formGroup("To send", data.coinSymbol.toUpperCase(), true);
      receiveField.input.value = data.value;
        form.appendChild(payField.group);
    form.appendChild(receiveField.group);
        const dispute = document.createElement("button");
    dispute.type = "submit";
    dispute.className = "btn gbtp-btn btn-danger";
    dispute.textContent = "Dispute";

      const view_chat = document.createElement("button");
      view_chat.onclick = () =>window.location.href = data.url;
      view_chat.className = "btn gbtp-btn";
       view_chat.textContent = "View chat";
       actionButtons.append(view_chat,dispute);
  }else{
    let pauseBtn;
  if(data.value > 0){ 
     pauseBtn = document.createElement("button");
    pauseBtn.type = "submit";
    pauseBtn.className = "btn gbtp-btn";
    pauseBtn.textContent = "Pause";
  }else{
     pauseBtn = "";
  }
   const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn gbtp-btn-nbg btn-danger";
    deleteBtn.textContent = "Delete";
      actionButtons.append(pauseBtn, deleteBtn);
}

 }

 const cancelBtn = document.createElement("button");
    cancelBtn.type = "button";
    cancelBtn.className = "btn gbtp-btn-nbg btn-danger close-modal";
    cancelBtn.setAttribute("target-modal", data.id);
    cancelBtn.textContent = "Cancel";
     actionButtons.append(cancelBtn);
   
    form.appendChild(actionButtons);

    form.appendChild(
        el("p", "gbtp-disclaimer", "If trading is risky, the crypto you purchased will be locked for 24 hours.")
    );

    container.append(seller, form);
    wrapper.appendChild(container);

    return wrapper;
}


             function showModal(data){
                if(document.getElementById(data))document.getElementById(data).style.display = "flex";
                 document.getElementById("body").style.overflowY = 'hidden';
               
             }
             function closeModal(data){
               if(document.getElementById(data))document.getElementById(data).style.display = "none";
                document.getElementById("body").style.overflowY = 'auto';
              
             }
             [...document.getElementsByClassName("modal-header-btn")].forEach(el=>{
              
              el.onclick = ()=>closeModal(el.getAttribute("data"));
            
             });
              [...document.getElementsByClassName("show-modal")].forEach(el=>{
               
              el.onclick = ()=>showModal(el.getAttribute("data"));
             
             });
            document.getElementById("show-active-trade").onclick = async function(){
                   
                   
                   loading();
                   let req = await fetch(api+"/active_trades",{ 
                     method:"POST",
                     headers:{
                        "Authorization":localStorage.getItem('key')
                    }});
                   let res = await req.json();
                    loaded();
                    showModal('active-trade');
                    if(res.data.length == 0)document.getElementById("active-trade-content").classList.add('no-data');
                   if(res.status){
                    document.getElementById("active-trade-content").innerHTML = "";
                     for(let v of res.data){
                         document.getElementById("active-trade-content").append(createTradeRow(v));
                         document.getElementById("active-trade-content").append(createOfferDetails(v));
                     }
                   }
            };
        
  function insertHiddenOption(elements,value = null){
               let sub =  [...cryptoPaymentMethods].filter(i=>{
           
             return i.name == elements.textContent;
           });
          let op = '';
         sub[0].methods.forEach((v)=>{
            op += `<span onclick='handleOptionsMenu(this)'>${v.name}</span>`;
         });
                elements.parentElement.parentElement.parentElement.parentElement.insertAdjacentHTML('afterend',`<div id="op-menu" class="inner-capsule flex responsive">
                             <div class="label" id="pah">using</div>
                             <div class="input flex no-gap">
                                 <div>
                                 
                                </div>
                                <div class="dropdown-value">
                                    <div class="value flex capsule-show-options" onclick="handleOptions(this)">${(value == null)?sub[0].methods[0].name:value} <i class="bi bi-arrow-down"></i></div>
                                    <div class="options" id="payment_method_selected">
                                      ${op}
                                    </div>
                                    <input type="hidden" name="payment_method_selected" value="${(value == null)?sub[0].methods[0].name:value}">
                                </div>
                             </div>
                         </div>`);
}
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
let params = getAllParams();
if(params['a']!=undefined){
    [...document.getElementsByClassName("auth-sections")].forEach((elem)=>elem.style.display = "none");
    document.getElementById(params['a']).style.display = "flex";
    if(params['a'] == "sign-up" && params['email'] != undefined){
document.getElementById('email').value = params['email'];
    }
}else{
     if(document.getElementById("sign-in"))document.getElementById("sign-in").style.display = "flex";
}
const getOrdinalSuffix = (n) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
const intDateTimeStr = (dateInt) =>{
const date = new Date(dateInt * 1000);
const options = { day: 'numeric', month: 'long', year: 'numeric' };
const day = date.getDate();
return `${getOrdinalSuffix(day)} ${date.toLocaleString('en-GB', { month: 'long' })}, ${date.getFullYear()}`;
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

function capitalizeFirstLetter(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}




        const currencies = [
  { "code": "AED", "name": "United Arab Emirates Dirham" },
  { "code": "AFN", "name": "Afghan Afghani" },
  { "code": "ALL", "name": "Albanian Lek" },
  { "code": "AMD", "name": "Armenian Dram" },
  { "code": "ANG", "name": "Netherlands Antillean Guilder" },
  { "code": "AOA", "name": "Angolan Kwanza" },
  { "code": "ARS", "name": "Argentine Peso" },
  { "code": "AUD", "name": "Australian Dollar" },
  { "code": "AWG", "name": "Aruban Florin" },
  { "code": "AZN", "name": "Azerbaijani Manat" },
  { "code": "BAM", "name": "Bosnia-Herzegovina Convertible Mark" },
  { "code": "BBD", "name": "Barbadian Dollar" },
  { "code": "BDT", "name": "Bangladeshi Taka" },
  { "code": "BGN", "name": "Bulgarian Lev" },
  { "code": "BHD", "name": "Bahraini Dinar" },
  { "code": "BIF", "name": "Burundian Franc" },
  { "code": "BMD", "name": "Bermudian Dollar" },
  { "code": "BND", "name": "Brunei Dollar" },
  { "code": "BOB", "name": "Bolivian Boliviano" },
  { "code": "BRL", "name": "Brazilian Real" },
  { "code": "BSD", "name": "Bahamian Dollar" },
  { "code": "BTN", "name": "Bhutanese Ngultrum" },
  { "code": "BWP", "name": "Botswanan Pula" },
  { "code": "BYN", "name": "Belarusian Ruble" },
  { "code": "BZD", "name": "Belize Dollar" },
  { "code": "CAD", "name": "Canadian Dollar" },
  { "code": "CDF", "name": "Congolese Franc" },
  { "code": "CHF", "name": "Swiss Franc" },
  { "code": "CLP", "name": "Chilean Peso" },
  { "code": "CNY", "name": "Chinese Yuan" },
  { "code": "COP", "name": "Colombian Peso" },
  { "code": "CRC", "name": "Costa Rican Colón" },
  { "code": "CUP", "name": "Cuban Peso" },
  { "code": "CVE", "name": "Cape Verdean Escudo" },
  { "code": "CZK", "name": "Czech Koruna" },
  { "code": "DJF", "name": "Djiboutian Franc" },
  { "code": "DKK", "name": "Danish Krone" },
  { "code": "DOP", "name": "Dominican Peso" },
  { "code": "DZD", "name": "Algerian Dinar" },
  { "code": "EGP", "name": "Egyptian Pound" },
  { "code": "ERN", "name": "Eritrean Nakfa" },
  { "code": "ETB", "name": "Ethiopian Birr" },
  { "code": "EUR", "name": "Euro" },
  { "code": "FJD", "name": "Fijian Dollar" },
  { "code": "FKP", "name": "Falkland Islands Pound" },
  { "code": "FOK", "name": "Faroese Króna" },
  { "code": "GBP", "name": "British Pound Sterling" },
  { "code": "GEL", "name": "Georgian Lari" },
  { "code": "GGP", "name": "Guernsey Pound" },
  { "code": "GHS", "name": "Ghanaian Cedi" },
  { "code": "GIP", "name": "Gibraltar Pound" },
  { "code": "GMD", "name": "Gambian Dalasi" },
  { "code": "GNF", "name": "Guinean Franc" },
  { "code": "GTQ", "name": "Guatemalan Quetzal" },
  { "code": "GYD", "name": "Guyanaese Dollar" },
  { "code": "HKD", "name": "Hong Kong Dollar" },
  { "code": "HNL", "name": "Honduran Lempira" },
  { "code": "HRK", "name": "Croatian Kuna" },
  { "code": "HTG", "name": "Haitian Gourde" },
  { "code": "HUF", "name": "Hungarian Forint" },
  { "code": "IDR", "name": "Indonesian Rupiah" },
  { "code": "ILS", "name": "Israeli New Shekel" },
  { "code": "IMP", "name": "Isle of Man Pound" },
  { "code": "INR", "name": "Indian Rupee" },
  { "code": "IQD", "name": "Iraqi Dinar" },
  { "code": "IRR", "name": "Iranian Rial" },
  { "code": "ISK", "name": "Icelandic Króna" },
  { "code": "JEP", "name": "Jersey Pound" },
  { "code": "JMD", "name": "Jamaican Dollar" },
  { "code": "JOD", "name": "Jordanian Dinar" },
  { "code": "JPY", "name": "Japanese Yen" },
  { "code": "KES", "name": "Kenyan Shilling" },
  { "code": "KGS", "name": "Kyrgystani Som" },
  { "code": "KHR", "name": "Cambodian Riel" },
  { "code": "KID", "name": "Kiribati Dollar" },
  { "code": "KMF", "name": "Comorian Franc" },
  { "code": "KRW", "name": "South Korean Won" },
  { "code": "KWD", "name": "Kuwaiti Dinar" },
  { "code": "KYD", "name": "Cayman Islands Dollar" },
  { "code": "KZT", "name": "Kazakhstani Tenge" },
  { "code": "LAK", "name": "Laotian Kip" },
  { "code": "LBP", "name": "Lebanese Pound" },
  { "code": "LKR", "name": "Sri Lankan Rupee" },
  { "code": "LRD", "name": "Liberian Dollar" },
  { "code": "LSL", "name": "Lesotho Loti" },
  { "code": "LYD", "name": "Libyan Dinar" },
  { "code": "MAD", "name": "Moroccan Dirham" },
  { "code": "MDL", "name": "Moldovan Leu" },
  { "code": "MGA", "name": "Malagasy Ariary" },
  { "code": "MKD", "name": "Macedonian Denar" },
  { "code": "MMK", "name": "Myanma Kyat" },
  { "code": "MNT", "name": "Mongolian Tugrik" },
  { "code": "MOP", "name": "Macanese Pataca" },
  { "code": "MRU", "name": "Mauritanian Ouguiya" },
  { "code": "MUR", "name": "Mauritian Rupee" },
  { "code": "MVR", "name": "Maldivian Rufiyaa" },
  { "code": "MWK", "name": "Malawian Kwacha" },
  { "code": "MXN", "name": "Mexican Peso" },
  { "code": "MYR", "name": "Malaysian Ringgit" },
  { "code": "MZN", "name": "Mozambican Metical" },
  { "code": "NAD", "name": "Namibian Dollar" },
  { "code": "NGN", "name": "Nigerian Naira" },
  { "code": "NIO", "name": "Nicaraguan Córdoba" },
  { "code": "NOK", "name": "Norwegian Krone" },
  { "code": "NPR", "name": "Nepalese Rupee" },
  { "code": "NZD", "name": "New Zealand Dollar" },
  { "code": "OMR", "name": "Omani Rial" },
  { "code": "PAB", "name": "Panamanian Balboa" },
  { "code": "PEN", "name": "Peruvian Sol" },
  { "code": "PGK", "name": "Papua New Guinean Kina" },
  { "code": "PHP", "name": "Philippine Peso" },
  { "code": "PKR", "name": "Pakistani Rupee" },
  { "code": "PLN", "name": "Polish Zloty" },
  { "code": "PYG", "name": "Paraguayan Guarani" },
  { "code": "QAR", "name": "Qatari Rial" },
  { "code": "RON", "name": "Romanian Leu" },
  { "code": "RSD", "name": "Serbian Dinar" },
  { "code": "RUB", "name": "Russian Ruble" },
  { "code": "RWF", "name": "Rwandan Franc" },
  { "code": "SAR", "name": "Saudi Riyal" },
  { "code": "SBD", "name": "Solomon Islands Dollar" },
  { "code": "SCR", "name": "Seychellois Rupee" },
  { "code": "SDG", "name": "Sudanese Pound" },
  { "code": "SEK", "name": "Swedish Krona" },
  { "code": "SGD", "name": "Singapore Dollar" },
  { "code": "SHP", "name": "Saint Helena Pound" },
  { "code": "SLE", "name": "Sierra Leonean Leone" },
  { "code": "SOS", "name": "Somali Shilling" },
  { "code": "SRD", "name": "Surinamese Dollar" },
  { "code": "SSP", "name": "South Sudanese Pound" },
  { "code": "STN", "name": "São Tomé and Príncipe Dobra" },
  { "code": "SYP", "name": "Syrian Pound" },
  { "code": "SZL", "name": "Swazi Lilangeni" },
  { "code": "THB", "name": "Thai Baht" },
  { "code": "TJS", "name": "Tajikistani Somoni" },
  { "code": "TMT", "name": "Turkmenistani Manat" },
  { "code": "TND", "name": "Tunisian Dinar" },
  { "code": "TOP", "name": "Tongan Paʻanga" },
  { "code": "TRY", "name": "Turkish Lira" },
  { "code": "TTD", "name": "Trinidad and Tobago Dollar" },
  { "code": "TVD", "name": "Tuvaluan Dollar" },
  { "code": "TWD", "name": "New Taiwan Dollar" },
  { "code": "TZS", "name": "Tanzanian Shilling" },
  { "code": "UAH", "name": "Ukrainian Hryvnia" },
  { "code": "UGX", "name": "Ugandan Shilling" },
  { "code": "USD", "name": "United States Dollar" },
  { "code": "UYU", "name": "Uruguayan Peso" },
  { "code": "UZS", "name": "Uzbekistani Som" },
  { "code": "VES", "name": "Venezuelan Bolívar Soberano" },
  { "code": "VND", "name": "Vietnamese Dong" },
  { "code": "VUV", "name": "Vanuatu Vatu" },
  { "code": "WST", "name": "Samoan Tala" },
  { "code": "XAF", "name": "Central African CFA Franc" },
  { "code": "XCD", "name": "East Caribbean Dollar" },
  { "code": "XOF", "name": "West African CFA Franc" },
  { "code": "XPF", "name": "CFP Franc" },
  { "code": "YER", "name": "Yemeni Rial" },
  { "code": "ZAR", "name": "South African Rand" },
  { "code": "ZMW", "name": "Zambian Kwacha" },
  { "code": "ZWL", "name": "Zimbabwean Dollar" }
];



countries = [
  { "code": "AF", "name": "Afghanistan" },
  { "code": "AL", "name": "Albania" },
  { "code": "DZ", "name": "Algeria" },
  { "code": "AS", "name": "American Samoa" },
  { "code": "AD", "name": "Andorra" },
  { "code": "AO", "name": "Angola" },
  { "code": "AI", "name": "Anguilla" },
  { "code": "AQ", "name": "Antarctica" },
  { "code": "AG", "name": "Antigua and Barbuda" },
  { "code": "AR", "name": "Argentina" },
  { "code": "AM", "name": "Armenia" },
  { "code": "AW", "name": "Aruba" },
  { "code": "AU", "name": "Australia" },
  { "code": "AT", "name": "Austria" },
  { "code": "AZ", "name": "Azerbaijan" },
  { "code": "BS", "name": "Bahamas" },
  { "code": "BH", "name": "Bahrain" },
  { "code": "BD", "name": "Bangladesh" },
  { "code": "BB", "name": "Barbados" },
  { "code": "BY", "name": "Belarus" },
  { "code": "BE", "name": "Belgium" },
  { "code": "BZ", "name": "Belize" },
  { "code": "BJ", "name": "Benin" },
  { "code": "BM", "name": "Bermuda" },
  { "code": "BT", "name": "Bhutan" },
  { "code": "BO", "name": "Bolivia" },
  { "code": "BA", "name": "Bosnia and Herzegovina" },
  { "code": "BW", "name": "Botswana" },
  { "code": "BV", "name": "Bouvet Island" },
  { "code": "BR", "name": "Brazil" },
  { "code": "IO", "name": "British Indian Ocean Territory" },
  { "code": "BN", "name": "Brunei Darussalam" },
  { "code": "BG", "name": "Bulgaria" },
  { "code": "BF", "name": "Burkina Faso" },
  { "code": "BI", "name": "Burundi" },
  { "code": "KH", "name": "Cambodia" },
  { "code": "CM", "name": "Cameroon" },
  { "code": "CA", "name": "Canada" },
  { "code": "CV", "name": "Cape Verde" },
  { "code": "KY", "name": "Cayman Islands" },
  { "code": "CF", "name": "Central African Republic" },
  { "code": "TD", "name": "Chad" },
  { "code": "CL", "name": "Chile" },
  { "code": "CN", "name": "China" },
  { "code": "CX", "name": "Christmas Island" },
  { "code": "CC", "name": "Cocos (Keeling) Islands" },
  { "code": "CO", "name": "Colombia" },
  { "code": "KM", "name": "Comoros" },
  { "code": "CG", "name": "Congo" },
  { "code": "CD", "name": "Congo (Democratic Republic)" },
  { "code": "CK", "name": "Cook Islands" },
  { "code": "CR", "name": "Costa Rica" },
  { "code": "CI", "name": "Côte d'Ivoire" },
  { "code": "HR", "name": "Croatia" },
  { "code": "CU", "name": "Cuba" },
  { "code": "CW", "name": "Curaçao" },
  { "code": "CY", "name": "Cyprus" },
  { "code": "CZ", "name": "Czech Republic" },
  { "code": "DK", "name": "Denmark" },
  { "code": "DJ", "name": "Djibouti" },
  { "code": "DM", "name": "Dominica" },
  { "code": "DO", "name": "Dominican Republic" },
  { "code": "EC", "name": "Ecuador" },
  { "code": "EG", "name": "Egypt" },
  { "code": "SV", "name": "El Salvador" },
  { "code": "GQ", "name": "Equatorial Guinea" },
  { "code": "ER", "name": "Eritrea" },
  { "code": "EE", "name": "Estonia" },
  { "code": "ET", "name": "Ethiopia" },
  { "code": "FK", "name": "Falkland Islands (Malvinas)" },
  { "code": "FO", "name": "Faroe Islands" },
  { "code": "FJ", "name": "Fiji" },
  { "code": "FI", "name": "Finland" },
  { "code": "FR", "name": "France" },
  { "code": "GF", "name": "French Guiana" },
  { "code": "PF", "name": "French Polynesia" },
  { "code": "TF", "name": "French Southern Territories" },
  { "code": "GA", "name": "Gabon" },
  { "code": "GM", "name": "Gambia" },
  { "code": "GE", "name": "Georgia" },
  { "code": "DE", "name": "Germany" },
  { "code": "GH", "name": "Ghana" },
  { "code": "GI", "name": "Gibraltar" },
  { "code": "GR", "name": "Greece" },
  { "code": "GL", "name": "Greenland" },
  { "code": "GD", "name": "Grenada" },
  { "code": "GP", "name": "Guadeloupe" },
  { "code": "GU", "name": "Guam" },
  { "code": "GT", "name": "Guatemala" },
  { "code": "GG", "name": "Guernsey" },
  { "code": "GN", "name": "Guinea" },
  { "code": "GW", "name": "Guinea-Bissau" },
  { "code": "GY", "name": "Guyana" },
  { "code": "HT", "name": "Haiti" },
  { "code": "HM", "name": "Heard Island and McDonald Islands" },
  { "code": "VA", "name": "Holy See (Vatican City State)" },
  { "code": "HN", "name": "Honduras" },
  { "code": "HK", "name": "Hong Kong" },
  { "code": "HU", "name": "Hungary" },
  { "code": "IS", "name": "Iceland" },
  { "code": "IN", "name": "India" },
  { "code": "ID", "name": "Indonesia" },
  { "code": "IR", "name": "Iran, Islamic Republic of" },
  { "code": "IQ", "name": "Iraq" },
  { "code": "IE", "name": "Ireland" },
  { "code": "IM", "name": "Isle of Man" },
  { "code": "IL", "name": "Israel" },
  { "code": "IT", "name": "Italy" },
  { "code": "JM", "name": "Jamaica" },
  { "code": "JP", "name": "Japan" },
  { "code": "JE", "name": "Jersey" },
  { "code": "JO", "name": "Jordan" },
  { "code": "KZ", "name": "Kazakhstan" },
  { "code": "KE", "name": "Kenya" },
  { "code": "KI", "name": "Kiribati" },
  { "code": "KP", "name": "Korea (Democratic People's Republic of)" },
  { "code": "KR", "name": "Korea (Republic of)" },
  { "code": "KW", "name": "Kuwait" },
  { "code": "KG", "name": "Kyrgyzstan" },
  { "code": "LA", "name": "Lao People's Democratic Republic" },
  { "code": "LV", "name": "Latvia" },
  { "code": "LB", "name": "Lebanon" },
  { "code": "LS", "name": "Lesotho" },
  { "code": "LR", "name": "Liberia" },
  { "code": "LY", "name": "Libya" },
  { "code": "LI", "name": "Liechtenstein" },
  { "code": "LT", "name": "Lithuania" },
  { "code": "LU", "name": "Luxembourg" },
  { "code": "MO", "name": "Macao" },
  { "code": "MG", "name": "Madagascar" },
  { "code": "MW", "name": "Malawi" },
  { "code": "MY", "name": "Malaysia" },
  { "code": "MV", "name": "Maldives" },
  { "code": "ML", "name": "Mali" },
  { "code": "MT", "name": "Malta" },
  { "code": "MH", "name": "Marshall Islands" },
  { "code": "MQ", "name": "Martinique" },
  { "code": "MR", "name": "Mauritania" },
  { "code": "MU", "name": "Mauritius" },
  { "code": "YT", "name": "Mayotte" },
  { "code": "MX", "name": "Mexico" },
  { "code": "FM", "name": "Micronesia (Federated States of)" },
  { "code": "MD", "name": "Moldova (Republic of)" },
  { "code": "MC", "name": "Monaco" },
  { "code": "MN", "name": "Mongolia" },
  { "code": "ME", "name": "Montenegro" },
  { "code": "MS", "name": "Montserrat" },
  { "code": "MA", "name": "Morocco" },
  { "code": "MZ", "name": "Mozambique" },
  { "code": "MM", "name": "Myanmar" },
  { "code": "NA", "name": "Namibia" },
  { "code": "NR", "name": "Nauru" },
  { "code": "NP", "name": "Nepal" },
  { "code": "NL", "name": "Netherlands" },
  { "code": "NC", "name": "New Caledonia" },
  { "code": "NZ", "name": "New Zealand" },
  { "code": "NI", "name": "Nicaragua" },
  { "code": "NE", "name": "Niger" },
  { "code": "NG", "name": "Nigeria" },
  { "code": "NU", "name": "Niue" },
  { "code": "NF", "name": "Norfolk Island" },
  { "code": "MK", "name": "North Macedonia" },
  { "code": "MP", "name": "Northern Mariana Islands" },
  { "code": "NO", "name": "Norway" },
  { "code": "OM", "name": "Oman" },
  { "code": "PK", "name": "Pakistan" },
  { "code": "PW", "name": "Palau" },
  { "code": "PS", "name": "Palestine, State of" },
  { "code": "PA", "name": "Panama" },
  { "code": "PG", "name": "Papua New Guinea" },
  { "code": "PY", "name": "Paraguay" },
  { "code": "PE", "name": "Peru" },
  { "code": "PH", "name": "Philippines" },
  { "code": "PN", "name": "Pitcairn" },
  { "code": "PL", "name": "Poland" },
  { "code": "PT", "name": "Portugal" },
  { "code": "PR", "name": "Puerto Rico" },
  { "code": "QA", "name": "Qatar" },
  { "code": "RE", "name": "Réunion" },
  { "code": "RO", "name": "Romania" },
  { "code": "RU", "name": "Russian Federation" },
  { "code": "RW", "name": "Rwanda" },
  { "code": "BL", "name": "Saint Barthélemy" },
  { "code": "SH", "name": "Saint Helena, Ascension and Tristan da Cunha" },
  { "code": "KN", "name": "Saint Kitts and Nevis" },
  { "code": "LC", "name": "Saint Lucia" },
  { "code": "MF", "name": "Saint Martin (French part)" },
  { "code": "PM", "name": "Saint Pierre and Miquelon" },
  { "code": "VC", "name": "Saint Vincent and the Grenadines" },
  { "code": "WS", "name": "Samoa" },
  { "code": "SM", "name": "San Marino" },
  { "code": "ST", "name": "Sao Tome and Principe" },
  { "code": "SA", "name": "Saudi Arabia" },
  { "code": "SN", "name": "Senegal" },
  { "code": "RS", "name": "Serbia" },
  { "code": "SC", "name": "Seychelles" },
  { "code": "SL", "name": "Sierra Leone" },
  { "code": "SG", "name": "Singapore" },
  { "code": "SX", "name": "Sint Maarten (Dutch part)" },
  { "code": "SK", "name": "Slovakia" },
  { "code": "SI", "name": "Slovenia" },
  { "code": "SB", "name": "Solomon Islands" },
  { "code": "SO", "name": "Somalia" },
  { "code": "ZA", "name": "South Africa" },
  { "code": "GS", "name": "South Georgia and the South Sandwich Islands" },
  { "code": "SS", "name": "South Sudan" },
  { "code": "ES", "name": "Spain" },
  { "code": "LK", "name": "Sri Lanka" },
  { "code": "SD", "name": "Sudan" },
  { "code": "SR", "name": "Suriname" },
  { "code": "SJ", "name": "Svalbard and Jan Mayen" },
  { "code": "SE", "name": "Sweden" },
  { "code": "CH", "name": "Switzerland" },
  { "code": "SY", "name": "Syrian Arab Republic" },
  { "code": "TW", "name": "Taiwan" },
  { "code": "TJ", "name": "Tajikistan" },
  { "code": "TZ", "name": "Tanzania" },
  { "code": "TH", "name": "Thailand" },
  { "code": "TL", "name": "Timor-Leste" },
  { "code": "TG", "name": "Togo" },
  { "code": "TK", "name": "Tokelau" },
  { "code": "TO", "name": "Tonga" },
  { "code": "TT", "name": "Trinidad and Tobago" },
  { "code": "TN", "name": "Tunisia" },
  { "code": "TR", "name": "Turkey" },
  { "code": "TM", "name": "Turkmenistan" },
  { "code": "TC", "name": "Turks and Caicos Islands" },
  { "code": "TV", "name": "Tuvalu" },
  { "code": "UG", "name": "Uganda" },
  { "code": "UA", "name": "Ukraine" },
  { "code": "AE", "name": "United Arab Emirates" },
  { "code": "GB", "name": "United Kingdom" },
  { "code": "US", "name": "United States of America" },
  { "code": "UM", "name": "United States Minor Outlying Islands" },
  { "code": "UY", "name": "Uruguay" },
  { "code": "UZ", "name": "Uzbekistan" },
  { "code": "VU", "name": "Vanuatu" },
  { "code": "VE", "name": "Venezuela" },
  { "code": "VN", "name": "Vietnam" },
  { "code": "VG", "name": "Virgin Islands (British)" },
  { "code": "VI", "name": "Virgin Islands (U.S.)" },
  { "code": "WF", "name": "Wallis and Futuna" },
  { "code": "EH", "name": "Western Sahara" },
  { "code": "YE", "name": "Yemen" },
  { "code": "ZM", "name": "Zambia" },
  { "code": "ZW", "name": "Zimbabwe" }
]

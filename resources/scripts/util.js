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
  
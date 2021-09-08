function ajax(method, url) {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open(method, url);
        req.onreadystatechange = () => {
            if (req.readyState === 4) {
                if (req.status === 200) {
                    resolve(req.response);
                } else {
                    reject(req);
                }
            }
        }
        req.send();
    });
}
ajax("GET", 'http://hahaha.com:8888/friends.json').then(res=>{
    res = JSON.parse(res);
    alert(res[0].val);
});

function jsonp(url) {
    return new Promise((resolve, reject) => {
        const random = "carmineCallBack" + Math.random();
        window[random] = data => {
            resolve(data);
        };
        const scriptEle = document.createElement('script');
        scriptEle.src = `${url}?callback=${random}`;
        scriptEle.onload = () => {
            scriptEle.remove();
        };
        scriptEle.onerror = () => {
            reject();
        };
        document.body.appendChild(scriptEle);
    });
}
jsonp('http://hahaha.com:8888/friends.js').then(data => {
    alert(data[0].val);
})
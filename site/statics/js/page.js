export const pages = [
    "/about",
    "/main",
    "/blog/kube"
];

export function loadPage(pageName, onComplete) {
    const path = `/statics/pages${pageName}.page.html`;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) return; // or whatever error handling you want

        onComplete({name: pageName, content: this.responseText});
    };
    xhr.send();
}
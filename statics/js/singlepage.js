const cachedFiles = {};

const routes = {
    "/main": {
        title: "Main Content"
    },
    "/test": {
        title: "This is a test page"
    }
}

function loadFile(fileName) {
    const path =  `/statics/pages${fileName}.page.html`;
    if (Object.prototype.hasOwnProperty.call(cachedFiles, fileName)) {
        document.getElementsByTagName("main")[0].innerHTML = cachedFiles[fileName];
        document.title = routes[fileName].title;
        return;
    }

    var xhr= new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want

        cachedFiles[fileName] = this.responseText;
        loadFile(fileName);
    };
    xhr.send();
}

function loadLocationOrMain() {
    let loc = window.location.pathname;
    if (loc == "" || loc == "/") {
        loc = "/main";
    }
    loadFile(loc);
}

window.addEventListener("hashchange", (event) => {
    event.preventDefault();

    loadLocationOrMain();
});

window.onpopstate = () => {
    loadLocationOrMain();
}

window.onload = () => {
    loadLocationOrMain();

    let elements = document.getElementsByTagName("menu");

    let menuItems = elements[0].getElementsByTagName("a");

    for (let i = 0; i < menuItems.length; i++) {
        menuItems[i].addEventListener("click", (event) => {
            event.preventDefault();

            const anchor = event.target;

            window.history.pushState({}, anchor.dataset.title, anchor.pathname);
            loadLocationOrMain();
        });
    }
}

import { loadPage } from "./page.js";

const cachedFiles = {};

const pageTitle = "Evan Digby";

function setTitle(el) {
    const divs = el.getElementsByTagName("div");

    if (divs.length > 0) {
        for (let i = 0; i < divs.length; i++) {
            if (Object.prototype.hasOwnProperty.call(divs[i].dataset, "title")) {
                document.title = `${pageTitle} - ${divs[i].dataset.title}`;
                return;
            }
        }
    } else {
        console.log("zero");
    }

    document.title = pageTitle;
}

function updatePage(html) {
    const el = document.getElementsByTagName("main")[0];
    el.innerHTML = html;
    setTitle(el);
}

function loadFile(fileName) {
    if (Object.prototype.hasOwnProperty.call(cachedFiles, fileName)) {
        updatePage(cachedFiles[fileName])
        return;
    }

    loadPage(fileName, function(event) {
        cachedFiles[event.name] = event.content;
        loadFile(fileName);
    });
}

function loadLocationOrMain() {
    let loc = window.location.pathname;
    if (loc == "" || loc == "/") {
        loc = "/main";
    }
    loadFile(loc);
}

if (typeof(Worker) !== "undefined") {
    const w = new Worker("/statics/js/worker.js");

    w.onmessage = function(event) {
        cachedFiles[event.data.name] = event.data.content;
    }
}

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

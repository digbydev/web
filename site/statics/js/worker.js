import { pages, loadPage } from "./page.js";

for (i = 0; i < pages.length; i++) {
    loadPage(pages[i], postMessage);
}
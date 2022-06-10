import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js';

import { logout as apiLogout } from './api/data.js';


// import { homePage } from './views/home.js';
// import { catalogPage } from './views/catalog.js';
// import { normalCatalogPage } from './views/normalCatalog.js';
// import { myListingPage } from './views/myListings.js';
// import { createPage } from './views/create.js';
// import { loginPage } from './views/login.js';
// import { registerPage } from './views/register.js';
// import { editPage } from './views/edit.js';
// import { detailsPage } from './views/details.js';
// import { searchByYearPage } from './views/searchByYear.js';

import * as api from './api/data.js';
window.api = api;

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();


// page('/', decorateContext, homePage);
// page('/home', decorateContext, homePage);
// page('/catalog', decorateContext, normalCatalogPage);
// page('/myListings', decorateContext, myListingPage);
// page('/details/:id', decorateContext, detailsPage);
// page('/edit/:id', decorateContext, editPage);
// page('/create', decorateContext, createPage);
// page('/register', decorateContext, registerPage);
// page('/login', decorateContext, loginPage);
// page('/searchByYear', decorateContext, searchByYearPage);


// page.start();


// function decorateContext(ctx, next) {
//     ctx.setUserNav = setUserNav;
//     ctx.user = getUserData();
//     ctx.render = (content) => render(content, main);

//     next();
// }

function setUserNav() {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        [...document.querySelectorAll('.profile')].map(x => x.style.display = 'block inline');
        [...document.querySelectorAll('.guest')].map(x => x.style.display = 'none');
    } else {
        [...document.querySelectorAll('.profile')].map(x => x.style.display = 'none');
        [...document.querySelectorAll('.guest')].map(x => x.style.display = 'block inline');
    }
}

function logout(event) {
    apiLogout();
    setUserNav();
    page.redirect('/');
}
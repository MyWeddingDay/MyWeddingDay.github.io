//import page from '//unpkg.com/page/page.mjs';
import {render, page } from './lib.js';

import { logout as apiLogout } from './api/data.js';


import { homePage } from './views/home.js';
import { registerPage } from './views/auth/register.js';
import { loginPage } from './views/auth/login.js';
import { createPage } from './views/wedding/create.js';
import { editPage } from './views/wedding/edit.js';
import { detailsPage } from './views/wedding/details.js';
import { myWeddingPage } from './views/wedding/myWedding.js';

// import { searchByYearPage } from './views/searchByYear.js';

import * as api from './api/data.js';
window.api = api;

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();


page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
// page('/catalog', decorateContext, normalCatalogPage);
// page('/myListings', decorateContext, myListingPage);
page('/wedding/details/:id', decorateContext, detailsPage);
page('/wedding/details', decorateContext, detailsPage);
page('/myWedding', decorateContext, myWeddingPage);
page('/wedding/edit/:id', decorateContext, editPage);
page('/createWedding', decorateContext, createPage);
// page('/searchByYear', decorateContext, searchByYearPage);


page.start();


function decorateContext(ctx, next) {
    ctx.setUserNav = setUserNav;
    ctx.userId = sessionStorage.getItem('userId');
    ctx.render = (content) => render(content, main);

    next();
}

function setUserNav() {
    console.log('In userNav')
    const userId = sessionStorage.getItem('userId');
    if (userId) {
        [...document.querySelectorAll('.profile')].map(x => x.style.display = 'inline');
        [...document.querySelectorAll('.guest')].map(x => x.style.display = 'none');
    } else {
        [...document.querySelectorAll('.profile')].map(x => x.style.display = 'none');
        [...document.querySelectorAll('.guest')].map(x => x.style.display = 'inline');
    }
}

async function logout(event) {
    event.preventDefault();
    await apiLogout();
    setUserNav();
    page.redirect('/home');
}
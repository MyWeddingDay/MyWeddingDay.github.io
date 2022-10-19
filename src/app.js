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
import { eventsPage } from './views/events/events.js';
import { createEventPage } from './views/events/create.js';
import { editEventPage } from './views/events/editEvent.js';

import { storyPage } from './views/story/story.js';

// import { searchByYearPage } from './views/searchByYear.js';

import { wishesPage } from './views/wishes/wish.js';
import * as api from './api/data.js';
window.api = api;

const main = document.getElementById('main-content');
document.getElementById('logoutBtn').addEventListener('click', logout);
setUserNav();


page('/', decorateContext, homePage);
page('/home', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/wedding/details/:id', decorateContext, detailsPage);
page('/wedding/details', decorateContext, detailsPage);
page('/wedding/edit/:id', decorateContext, editPage);
page('/createWedding', decorateContext, createPage);
page('/myWedding', decorateContext, myWeddingPage);
page('/events', decorateContext, eventsPage);
page('/events/edit/:id', decorateContext, editEventPage);
page('/events/create', decorateContext, createEventPage);
page('/story',decorateContext, storyPage)
page('/wishes',decorateContext, wishesPage)




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
import {html} from '../../node_modules/lit-html/lit-html.js';
import { login } from '../api/data.js';
import { headerElement } from "./header.js";

const loginTemplate = (onSubmit) => html`
<div class="fh5co-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 animate-box">
                <h3>Login Page</h3>
                <form @submit=${onSubmit}>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="username">Username</label>
                            <input name="username" type="text" id="username" class="form-control" placeholder="Your Username">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="password">Password</label>
                            <input name="password" type="password" id="password" class="form-control" placeholder="Your password">
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Register" class="btn btn-primary">
                    </div>

                </form>		
            </div>

        </div>
        
    </div>
</div>`;

export async function loginPage(ctx) {
    const title = 'Login Page';
    const description = html`Don't have an account? <a  href="/register" >Create one here</a>.`
    headerElement(title, description);

    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const password = formData.get('password').trim();

        try {
            if (username == '' || password == '') {
                throw new Error('All fields are reqired');
            }

            await login(email, password);
            event.target.reset();
            ctx.setUserNav();
            //ctx.page.redirect('/');
        } catch (err) {
           return alert(err.message)
        }
    }
}
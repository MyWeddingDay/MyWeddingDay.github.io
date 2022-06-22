import { html } from './lib.js';
import { register } from '../api/data.js';
import { headerElement } from "./header.js";
//import { notify } from './common/notification.js';


const registerTemplate = (onSubmit) => html`
	<div class="fh5co-section">
		<div class="container">
			<div class="row">
				<div class="col-md-12 animate-box">
					<h3>Register Page</h3>
					<form @submit=${onSubmit}>
						<div class="row form-group">
							<div class="col-md-6">
								<label for="email">Email</label>
								<input name="email" type="text" id="email" class="form-control" placeholder="Your email address">
							</div>
						</div>

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

                        <div class="row form-group">
							<div class="col-md-6">
								<label for="repeatPass">Repeat Password</label>
								<input name="repeatPass" type="password" id="repeatPass" class="form-control" placeholder="Repeat Password">
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

export async function registerPage(ctx) {
    const title = 'Register Page';
    const description = html`Already have an account? <a class="invert" href="/login">Sign in here</a>.`
    headerElement(title, description);

    ctx.render(registerTemplate(onSubmit));
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('repeatPass').trim();

        try {
            if (email == '' || password == '' ||  username == '') {
                throw new Error('All fields are required!');
            }
            if (password != repass) {
                throw new Error('Passwords don\'t match!');
            }

            await register(email, username, password);
            event.target.reset();
            ctx.setUserNav();
            ctx.page.redirect('/');
        } catch (err) {
           return alert(err.message);
        }
    }
}
import { html } from '../lib.js';
import { createWedding } from '../api/data.js';
import { headerElement } from "./header.js";



const createTemplate = (onSubmit) => html`
<div class="fh5co-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 animate-box">
                <h3>Create wedding Page</h3>
                <form @submit=${onSubmit}>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="title">Title</label>
                            <input name="title" type="text" id="title" class="form-control" placeholder="Title">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="place">Wedding ceremony address</label>
                            <input name="place" type="text" id="place" class="form-control" placeholder="Wedding ceremony address">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="date">Wedding date</label>
                            <input name="date" type="text" id="date" class="form-control" placeholder="Wedding date">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="brideName">Bride Name</label>
                            <input name="brideName" type="text" id="brideName" class="form-control" placeholder="Bride Name">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="brideStory">Bride Story</label>
							<textarea name="brideStory" id="brideStory" cols="30" rows="10" class="form-control" placeholder="Write your story here"></textarea>

                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="groomName">Groom Name</label>
                            <input name="groomName" type="text" id="groomName" class="form-control" placeholder="Groom Name">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="groomStory">Groom Story</label>
							<textarea name="groomStory" id="groomStory" cols="30" rows="10" class="form-control" placeholder="Write your story here"></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Create" class="btn btn-primary">
                    </div>

                </form>		
            </div>

        </div>
        
    </div>
</div>`;

export async function createPage(ctx) {
    //TODO only one wedding for user!!
    const title = 'Create wedding Page';
    const description = html`Create your wedding details here?`
    await    headerElement(title, description);

    ctx.render(createTemplate(onSubmit))

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const place = formData.get('place').trim();
        const brideName = formData.get('brideName').trim();
        const brideStory = formData.get('brideStory').trim();
        const groomName = formData.get('groomName').trim();
        const groomStory = formData.get('groomStory').trim();
        const date = formData.get('date').trim();

        try {
            if (!title || !place || !brideName || !brideStory || !groomName || !groomStory || !date) {
                throw new Error('All fields are reqired');              
            }

            const item = {
                title: title,
                place: place,
                brideName: brideName,
                brideStory: brideName,
                groomName: groomName,
                groomStory: groomStory,
                date: date,
              };
              

            await createWedding(item);
            event.target.reset();
            ctx.page.redirect('/home');
        } catch (error) {
           return alert(error.message);
        }
    }
}
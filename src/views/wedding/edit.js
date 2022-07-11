import { html } from '../../lib.js';
import { updateWedding , getWeddingId } from '../../api/data.js';
import { headerElement } from "../header.js";



const editWeddingTemplate = (item, onSubmit) => html`
<div class="fh5co-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 animate-box">
                <h3>Create wedding Page</h3>
                <form @submit=${onSubmit}>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="title">Title</label>
                            <input name="title" type="text" id="title" class="form-control" placeholder="Title" .value=${item.title}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="place">Wedding ceremony address</label>
                            <input name="place" type="text" id="place" class="form-control" placeholder="Wedding ceremony address" .value=${item.place}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="date">Wedding date</label>
                            <!-- TODO .value dont work -->
                            <input name="date" type="date" id="date" class="form-control" placeholder="Wedding date" .value=${item.date}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="brideName">Bride Name</label>
                            <input name="brideName" type="text" id="brideName" class="form-control" placeholder="Bride Name" .value=${item.brideName}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="brideStory">Bride Story</label>
							<textarea name="brideStory" id="brideStory" cols="30" rows="10" class="form-control" placeholder="Write your story here" .value=${item.brideStory}></textarea>

                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="groomName">Groom Name</label>
                            <input name="groomName" type="text" id="groomName" class="form-control" placeholder="Groom Name" .value=${item.groomName}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="groomStory">Groom Story</label>
							<textarea name="groomStory" id="groomStory" cols="30" rows="10" class="form-control" placeholder="Write your story here" .value=${item.groomStory}></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Update" class="btn btn-primary">
                    </div>
                </form>		
            </div>
        </div>
    </div>
</div>`;

export async function editPage(ctx) {
	const wedding = await getWeddingId(ctx.params.id);
	const isOwner = ctx.userId == wedding.owner.objectId;
    if (!isOwner) {
        ctx.page.redirect('/');
    }

    const title = 'Update wedding Page';
    const description = html`Update your wedding details here?`;
    await headerElement(title, description);

    ctx.render(editWeddingTemplate(wedding, onSubmit))

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
                brideStory: brideStory,
                groomName: groomName,
                groomStory: groomStory,
                date: date,
              };
              

            await updateWedding(wedding.objectId, item);
            event.target.reset();
            ctx.page.redirect(`/wedding/details/${ctx.params.id}`);
        } catch (error) {
           return alert(error.message);
        }
    }
}
import { html } from '../../lib.js';
import { createEvent, getWeddingsByUserId } from '../../api/data.js';
import { headerElement } from '../header.js';



const createEventTemplate = (onSubmit) => html`
<div class="fh5co-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 animate-box">
                <h3>Create event Page</h3>
                <form @submit=${onSubmit}>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="title">Title</label>
                            <input name="title" type="text" id="title" class="form-control" placeholder="Title">
                        </div>
                    </div>
                    
                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="description">Description</label>
                            <input name="description" type="text" id="description" class="form-control" placeholder="Description">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="startTime">Start Time</label>
                            <input name="startTime" type="time" id="startTime" class="form-control" placeholder="Start Time">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="endTime">End Time</label>
                            <input name="endTime" type="time" id="endTime" class="form-control" placeholder="End Time">
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="date">Date</label>
                            <input name="date" type="date" id="date" class="form-control" placeholder="Date">
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

export async function createEventPage(ctx) {
    await headerElement('Add event Page', 'Create your evnt here!', '/images/img_bg_3.jpg');
    ctx.render(createEventTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const title = formData.get('title').trim();
        const description = formData.get('description').trim();
        const startTime = formData.get('startTime').trim();
        const endTime = formData.get('endTime').trim();
        const date = formData.get('date').trim();

        try {
            if (!title || !description || !startTime || !endTime || !date) {
                throw new Error('All fields are reqired');              
            }

            const item = {title, description, startTime, endTime, date};
            const weddings = await getWeddingsByUserId(ctx.userId);
            const weddingId = weddings[0].objectId;
            await createEvent(item, weddingId);

            event.target.reset();
            ctx.page.redirect('/events');
        } catch (error) {
           return alert(error.message);
        }
    }
}
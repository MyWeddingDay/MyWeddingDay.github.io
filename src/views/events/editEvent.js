import { html } from '../../lib.js';
import { deleteEvent, getEventById, updateEvent } from '../../api/data.js';
import { headerElement } from '../header.js';



const editEventTemplate = (onSubmit, event, onDelete) => html`
<div class="fh5co-section">
    <div class="container">
        <div class="row">
            <div class="col-md-12 animate-box">
                <h3>Update event Page</h3>
                <form @submit=${onSubmit}>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="title">Title</label>
                            <input name="title" type="text" id="title" class="form-control" placeholder="Title" .value=${event.title}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="description">Description</label>
                            <input name="description" type="text" id="description" class="form-control"
                                placeholder="Description"  .value=${event.description}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="startTime">Start Time</label>
                            <input name="startTime" type="time" id="startTime" class="form-control"
                                placeholder="Start Time" .value=${event.startTime}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="endTime">End Time</label>
                            <input name="endTime" type="time" id="endTime" class="form-control" placeholder="End Time" .value=${event.endTime}>
                        </div>
                    </div>

                    <div class="row form-group">
                        <div class="col-md-6">
                            <label for="date">Date</label>
                            <input name="date" type="date" id="date" class="form-control" placeholder="Date" .value=${event.date}>
                        </div>
                    </div>

                    <div class="form-group">
                        <input type="submit" value="Update" class="btn btn-primary">
                    </div>

                    <div class="form-group">
                        <button @click=${onDelete} class="btn btn-primary">Delete</button>
                    </div>
                </form>
            </div>

        </div>

    </div>
</div>`;

export async function editEventPage(ctx) {
    await headerElement('Update event Page', 'Update or delete your evnt here!', '/images/img_bg_3.jpg');
    const eventId = ctx.params.id;
    const event = await getEventById(eventId);
    const isOwner = ctx.userId == event.owner.objectId;
    if (!isOwner) {
        ctx.page.redirect(`/wedding/details/${event.wedding.objectId}`);
    }
    ctx.render(editEventTemplate(onSubmit, event, onDelete));

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

            const item = { title, description, startTime, endTime, date };
            await updateEvent(eventId, item);
            event.target.reset();
            ctx.page.redirect('/events');
        } catch (error) {
            return alert(error.message);
        }
    }

    async function onDelete(event) {
        event.preventDefault();

        const confirmed = confirm('Are you sure you want to dellete this item !!!');
        if (confirmed) {
            await deleteEvent(eventId);
            ctx.page.redirect('/events');
        }
    }
}
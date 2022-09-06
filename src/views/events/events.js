import { html, until } from '../../lib.js';
import { headerElement } from '../header.js'
import { getWeddingId, deleteWedding, getWeddingsByUserId, getAllEventsByUserId } from '../../api/data.js';
import { loaderTemplate } from '../common/loader.js';

const days = {
	// "sunday": 0, // << if sunday is first day of week
	0: "sunday",
	1: "monday",
	2: "tuesday",
	3: "wednesday",
	4: "thursday",
	5: "friday",
	6: "saturday",
  }

const eventsTemplate = (events) => html`
	<div id="fh5co-event" class="fh5co-bg" style="background-image:url(images/img_bg_3.jpg);  height: auto;">
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
					<span>Our Special Events</span>
					<h2>Wedding Events</h2>
				</div>
			</div>
			<div class="row">
				<div class="display-t">
					<div class="display-tc">
						<div class="col-md-10 col-md-offset-1">
						${events.length == 0 
						? html`<p>Don't have any wedding ceremony yet!!!</p>`
						: events.map(eventCardTemplate)	}
						</div>
					</div>
				</div>
			</div>
	
		</div>
	</div>`;

const eventCardTemplate = (event) => html`
	<div class="col-md-6 col-sm-6 text-center">
		<div class="event-wrap animate-box">
			<h3>${event.title}</h3>
			<div class="event-col">
				<i class="icon-clock"></i>
				<span>${event.startTime}</span>
				<span>${event.endTime}</span>
			</div>
			<div class="event-col">
				<i class="icon-calendar"></i>
				<span>${event.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
			</div>
			<p>${event.description}
			</p>
		</div>
	</div>`;

export async function eventsPage(ctx) {
	const header = document.getElementById('header');
	header.innerHTML = '';
	update();
	
	async function update() {
		ctx.render(until(populateTemplate(), loaderTemplate()));
	}

	async function populateTemplate() {
		const userId = ctx.userId;
		if (userId) {
			let events = await getAllEventsByUserId(userId);
			events.forEach(e => {
				e.date = new Date(e.date);
			});

			return eventsTemplate(events);
		} else {
			ctx.page.redirect('/login');
		}
	}
}
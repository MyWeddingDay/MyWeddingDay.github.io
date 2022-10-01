import { html, until } from '../lib.js';
import { headerElement } from './header.js';
import {getWeddings} from '../api/data.js';
import { loaderTemplate } from './common/loader.js';

const homeTemplate = (weddings) => html`
	<div id="fh5co-gallery">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
					<span>Our Wedding ceremonies</span>
					<h2>Wedding Gallery</h2>
					<p></p>
				</div>
			</div>
			<div class="row row-bottom-padded-md">
				<div class="col-md-12">
					<ul id="fh5co-gallery-list">
						${weddings.length == 0 ? html`<p>Don't have any wedding ceremony yet!!!</p>` : weddings.map(weddingCard)}
					</ul>		
				</div>
			</div>
		</div>
	</div>`;

const weddingCard = (wedding) => html`
					<li class="one-third animate-box" data-animate-effect="fadeIn" style="background-image: url(images/gallery-1.jpg); ">
						<a href="/wedding/details/${wedding.objectId}" class="color-2">
							<div class="case-studies-summary">
								<span>30 Guests</span>
								<h2>${wedding.brideName} &amp; ${wedding.groomName}</h2>
							</div>
						</a>
					</li>`;

export async function homePage(ctx) {
    await headerElement('Home Page', 'List of all weddings');
	ctx.render(until(populateTemplate(), loaderTemplate()));

	async function populateTemplate() {
		const weddings = await getWeddings();
		return homeTemplate(weddings);
	}
}
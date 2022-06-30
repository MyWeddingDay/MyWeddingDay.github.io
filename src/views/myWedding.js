import { html } from '../lib.js';
import { headerElement } from "./header.js";
import {getWeddings} from '../api/data.js'

const myWeddingTemplate = (weddings) => html`
	<div id="fh5co-gallery">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
					<h2>Wedding Gallery</h2>
				</div>
			</div>
			<div class="row row-bottom-padded-md">
				<div class="col-md-12">
					<ul id="fh5co-gallery-list">
						${weddings.length == 0 ? html`<p>Don't have any wedding ceremony yet!!!</p>` : weddings.map(myWeddingCard)}
					</ul>		
				</div>
			</div>
		</div>
	</div>`;

const myWeddingCard = (wedding) => html`
					<li class="one-third animate-box" data-animate-effect="fadeIn" style="background-image: url(images/gallery-1.jpg); ">
						<a href="/wedding/details/${wedding.objectId}" class="color-2">
							<div class="case-studies-summary">
								<span>30 Guests</span>
								<h2>${wedding.brideName} &amp; ${wedding.groomName}</h2>
							</div>
						</a>
					</li>`;

export async function myWeddingPage(ctx) {
    await headerElement('My Wedding Page', 'List of my weddings');
    //TODO make back4app API call
	const weddings = await getWeddings();
    const myWeddings = weddings.filter(x => x.owner.objectId == ctx.userId);
    ctx.render(myWeddingTemplate(myWeddings));
}
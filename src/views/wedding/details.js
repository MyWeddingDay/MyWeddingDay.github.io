import { html, until } from '../../lib.js';
import {headerElement} from '../header.js'
import { getWeddingId, deleteWedding, getWeddingsByUserId } from '../../api/data.js';
import { loaderTemplate } from '../common/loader.js';

const detailsTemplate = (item, onDelete, isOwner) => html`
	<div id="fh5co-couple">
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center fh5co-heading animate-box">
					<h2>Hello!</h2>
					<h3>${item.date}, ${item.place}</h3>
					<p>We invited you to celebrate our wedding</p>
				</div>
			</div>
			<div class="couple-wrap animate-box">
				<div class="couple-half">
					<div class="groom">
						<img src="/images/groom.jpg" alt="groom" class="img-responsive">
					</div>
					<div class="desc-groom">
						<h3>${item.groomName}</h3>
						<p>${item.groomStory}</p>
					</div>
				</div>
				<p class="heart text-center"><i class="icon-heart2"></i></p>
				<div class="couple-half">
					<div class="bride">
						<img src="/images/bride.jpg" alt="groom" class="img-responsive">
					</div>
					<div class="desc-bride">
						<h3>${item.brideName}</h3>
						<p>${item.brideStory}</p>
					</div>
				</div>
			</div>
			${isOwner ? html`		
			<div class="container">
				<a href="#" @click=${onDelete} class="btn btn-default btn-sm">Delete</a>
				<a href="/wedding/edit/${item.objectId}" class="btn btn-default btn-sm">Edit</a>
			</div>` : ''}
		</div>
	</div>`;

export async function detailsPage(ctx) {
	ctx.render(until(populateTemplate(), loaderTemplate()));
	
	async function populateTemplate() {
		const weddings = await getWeddingsByUserId(ctx.userId);
		const weddingId = ctx.params.id || weddings[0].objectId;
		const wedding = await getWeddingId(weddingId);
		await headerElement(html`${wedding.brideName.split(' ')[0]} &amp ${wedding.groomName.split(' ')[0]})`, 'We Are Getting Married');
		const isOwner = ctx.userId == wedding.owner.objectId;
		
		return detailsTemplate(wedding, onDelete, isOwner);

		async function onDelete(event) {
			event.preventDefault();
	
			const confirmed = confirm('Are you sure you want to dellete this item !!!');
			if (confirmed) {
				await deleteWedding(ctx.params.id);
				ctx.page.redirect('/');
			}
		}
	}
}
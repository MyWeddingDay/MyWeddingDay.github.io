import { html } from '../lib.js';
import { getWeddingId} from '../api/data.js';

const detailsTemplate = (item, onDelete, isOwner) => html`
	<header id="fh5co-header" class="fh5co-cover" role="banner" style="background-image:url(../../images/img_bg_2.jpg);" data-stellar-background-ratio="0.5">
		<div class="overlay"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-8 col-md-offset-2 text-center">
					<div class="display-t">
						<div class="display-tc animate-box" data-animate-effect="fadeIn">
							<h1>Joefrey &amp; Sheila</h1>
							<h2>We Are Getting Married</h2>
							<div class="simply-countdown simply-countdown-one"></div>
							<p><a href="#" class="btn btn-default btn-sm">Save the date</a></p>
							<p><a href="#" class="btn btn-default btn-sm">Save the date</a></p>
							<p><a href="#" class="btn btn-default btn-sm">Save the date</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>`;

export async function detailsPage(ctx) {
	document.getElementById('header').innerHTML = '';

	
    const item = await getWeddingId(ctx.params.id);
	console.log(item);
    const user = ctx.user;
    const isOwner = user && user._id == item.owner.objectId;
    ctx.render(detailsTemplate(item, onDelete, isOwner));

    async function onDelete(event) {
        event.preventDefault();

        const confirmed = confirm('Are you sure you want to dellete this item !!!');
        if (confirmed) {
            await deleteItemById(ctx.params.id);
            //ctx.page.redirect('/catalog');
        }
    }
}
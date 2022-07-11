import { html, render } from '../lib.js';

const headerTemplate = (title, description, imgUrl) => html`
			<header id="fh5co-header" class="fh5co-cover fh5co-cover-sm" role="banner"
				style="background-image:url(${imgUrl});">
				<div class="overlay"></div>
				<div class="fh5co-container">
					<div class="row">
						<div class="col-md-8 col-md-offset-2 text-center">
							<div class="display-t">
								<div class="display-tc animate-box" data-animate-effect="fadeIn">
									<h1>${title}</h1>
									<h2>${description}</h2>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
`;

export async function headerElement(title, description, imgUrl = '/images/img_bg_1.jpg') {
    const header = document.getElementById('header');

    render(headerTemplate(title, description, imgUrl), header);

}
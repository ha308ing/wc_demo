
		document.addEventListener('DOMContentLoaded',()=>{
			const confirmInput = (key, value) => {
				localStorage.setItem(key, value);
				nextScreen();
			}

			const set_active_screen = (active_screen) => {
				main_container.dataset['active_screen'] = active_screen;
			}
			
			const nextScreen = ()=>{
				// main_container.scrollBy({left: window.innerWidth, behavior:"smooth"});
				let currentShift = content_container.style.getPropertyValue('--translateN');
				content_container.style.setProperty('--translateN', currentShift * 1 + 1);
			}
			const previousScreen = ()=>{
				// main_container.scrollBy({left: -window.innerWidth, behavior:"smooth"});
				let currentShift = content_container.style.getPropertyValue('--translateN');
				content_container.style.setProperty('--translateN', currentShift * 1 - 1);
			}
			const main_container = document.querySelector('.main_container');
			const content_container = document.querySelector('.content_container');
			const gender_female = document.querySelector('.gender_option.gender_female');
			const gender_male = document.querySelector('.gender_option.gender_male');
			gender_female.addEventListener('click', ()=> {confirmInput('gender', 'female');main_container.dataset['gender']='female';});
			gender_male.addEventListener('click', ()=> {confirmInput('gender', 'male');main_container.dataset['gender']='male';});
			const navigation_confirm_age_input = document.querySelector('.navigation_confirm_age_input');
			const age_scroll_input = document.querySelector('.age_container age-scroll-input');
			const product_cards_carousel = document.querySelector('.product_container product-cards-carousel');
			navigation_confirm_age_input.addEventListener('click', ()=> {confirmInput('age', age_scroll_input.value || 0);
			product_cards_carousel.setAttribute('ga', localStorage.gender + localStorage.age);});
			// navigation_confirm_age.addEventListener('click', ()=>{confirmInput('age', age_scroll_input.value || 0)});
			// product_cards_carousel.setAttribute('age', localStorage.age);
			
			const buy_button = document.querySelector('.buy_button');
			buy_button.addEventListener('click', ()=>{
				let product_id = product_cards_carousel.getAttribute('value');
				localStorage.setItem('product_id', product_id)
				let gender = localStorage.getItem('gender');
				let age = localStorage.getItem('age');
				product_id = localStorage.getItem('product_id');
				alert(`
					gender: ${gender}\n
					age: ${age}\n
					product_id: ${product_id}
				`);
			});

			customElements.define('back-button', class extends HTMLElement {
				constructor() {
					super();
					this.shadow = this.attachShadow({mode: 'open'});
					const svg_container = document.createElement('template');
					svg_container.innerHTML = `
						<svg class="navigation_svg backward_icon navigation_backward" x="0px" y="0px" viewBox="0 0 512 512">
							<g>
								<path class="st3" d="M405.03,376.42L233.05,256l171.98-120.42c16.2-11.34,20.14-33.67,8.79-49.87l-16.65-23.78
								c-11.34-16.2-33.67-20.14-49.87-8.79L127.69,206.91c-2.09,1.17-4.07,2.55-5.92,4.15l-13.8,9.66c-7.11,4.98-11.85,12.07-13.98,19.83
								c-1.48,3.92-2.29,8.17-2.29,12.61v6.46c0,5.46,1.23,10.64,3.42,15.27c2.47,6.4,6.81,12.17,12.86,16.4l13.8,9.66
								c1.85,1.6,3.83,2.98,5.92,4.14L347.3,458.87c16.2,11.34,38.53,7.41,49.87-8.79l16.65-23.78
								C425.17,410.09,421.23,387.77,405.03,376.42z"/>
							</g>
						</svg>
					`;
					this.addEventListener('click',()=>{previousScreen()});
					this.shadow.append(svg_container.content);
					// this.append(shadow);
				}
			});
			customElements.define('forward-button', class extends HTMLElement {
				constructor() {
					super();
					this.shadow = this.attachShadow({mode: 'open'});
					const svg_container = document.createElement('template');
					svg_container.innerHTML = `
						<svg  x="0px" y="0px" viewBox="0 0 512 512">
			<path class="st2" d="M106.97,376.42L278.95,256L106.97,135.58c-16.2-11.34-20.14-33.67-8.79-49.87l16.65-23.78
			c11.34-16.2,33.67-20.14,49.87-8.79l219.61,153.78c2.09,1.17,4.07,2.55,5.92,4.15l13.8,9.66c7.11,4.98,11.85,12.07,13.98,19.83
			c1.48,3.92,2.29,8.17,2.29,12.61v6.46c0,5.46-1.23,10.64-3.42,15.27c-2.47,6.4-6.81,12.17-12.86,16.4l-13.8,9.66
			c-1.85,1.6-3.83,2.98-5.92,4.14L164.7,458.87c-16.2,11.34-38.53,7.41-49.87-8.79L98.18,426.3
			C86.83,410.09,90.77,387.77,106.97,376.42z"/>
		</svg>
					`;
					// this.addEventListener('click',()=>{nextScreen()});
					this.shadow.append(svg_container.content);
					// this.append(shadow);
				}
			});
			customElements.define('female-sign', class extends HTMLElement {
				constructor() {
					super();
					this.shadow = this.attachShadow({mode: 'open'});
					const svg_container = document.createElement('template');
					svg_container.innerHTML = `<svg  x="0px" y="0px"
	 viewBox="0 0 512 512">
					<style type="text/css">
					.st1{display:inline;fill:none;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
					.st2{fill:none;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;animation:color 5s;}
					@keyframes color {
						0% {
							stroke: #000;
						}
						50% {
							stroke: red;
						}
						100% {
							stroke: #000;
						}
					}
				</style>
				<g>
					<circle class="st2" cx="256" cy="164.56" r="127.27"/>
					<line class="st2" x1="181.89" y1="401.44" x2="331.89" y2="401.44"/>
					<line class="st2" x1="259.25" y1="294.56" x2="259.25" y2="474.72"/>
				</g>
				</svg>
					`;
					// this.addEventListener('click',()=>{nextScreen()});
					this.shadow.append(svg_container.content);
					// this.append(shadow);
				}
			});
			customElements.define('male-sign', class extends HTMLElement {
				constructor() {
					super();
					this.shadow = this.attachShadow({mode: 'open'});
					const svg_container = document.createElement('template');
					svg_container.innerHTML = `
					
					<svg x="0px" y="0px"
					 viewBox="0 0 512 512">
				<style type="text/css">
					.st0{fill:none;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
					.st2{display:inline;fill:none;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
					svg {
						max-height:50vh;
					}
					@media screen and (max-width: 900px) {
						svg{
							max-height:25vh;
						}
					}
				</style>
				<g>
					<circle class="st0" cx="208.31" cy="310.07" r="127.27"/>
					<line class="st0" x1="278.16" y1="75.36" x2="428.16" y2="75.36"/>
					<line class="st0" x1="430.96" y1="224.66" x2="430.96" y2="74.66"/>
					<line class="st0" x1="297.94" y1="215.85" x2="425.33" y2="88.46"/>
				</g>
				</svg>
`;
					// this.addEventListener('click',()=>{nextScreen()});
					this.shadow.append(svg_container.content);
					// this.append(shadow);
				}
			});
		});



	
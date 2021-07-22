import ProductCard from '../product-card/product-card.js';
export default class ProductCardsCarousel extends HTMLElement {

	static get observedAttributes() {
		return [
				'ids',
				'ga',
				'value',
				'product_title_color',
				'product_title_background'
			];
	}

	get ids() {
		return this.ids;
	}
	set ids(value) {
		this.setAttribute('ids', value);
	}

	get ga() {
		return this.ga;
	}
	set ga(value) {
		this.setAttribute('ga', value);
	}

	get value() {
		return this.value;
	}
	set value(v) {
		this.setAttribute('value', v);
	}

	get product_title_color() {
		return this.getAttribute('product_title_color') || '#000';
	}
	set product_title_color(value) {
		this.setAttribute('product_title_color', value);
	}

	get product_title_background() {
		return this.getAttribute('product_title_background') || '#fff';
	}
	set product_title_background(value) {
		this.setAttribute('product_title_background', value);
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (newValue != oldValue) {
			switch(name) {
				case 'ids': {
					// update product-cards

					break;
				}
				case 'ga':{
						// console.log(newValue);
						// newValue = newValue.split(',');
						let regex = /^(male|female)(\d+)$/gi;
						let v = regex.exec(newValue);
						let active_product_id = 0;
						

						let age = v[2];
						let gender = v[1];
							console.log(`gender: ${gender}`);
							console.log(`age: ${age}`);
						
						if (age && gender) {
							console.log(`gender: ${gender}`);
							console.log(`age: ${age}`);
							let f = document.createDocumentFragment();
							let send_data = new FormData();
							send_data.set('age', age);
							send_data.set('gender', gender);
							let r = fetch('./db_connect.php', {
								method: 'POST',
								body: send_data,
							});
							r.then(q=>q.json()).then(r=>{
								console.log(r);
								console.log('get data from server');
								this.product_container.innerHTML = '';
								for( let i in r ) {
									console.log(`${i}: ${newValue[i]}`);
									let product_card = document.createElement('product-card');
									if (i==0) {
										// product_card.classList.add('active');
										active_product_id = r[i].id;
									}
									product_card.setAttribute('product_id', r[i].id);
									product_card.setAttribute('product_title', r[i].title);
									product_card.setAttribute('product_image', `url('pictures/products/${r[i].image}')`);
									product_card.style.setProperty('order', i);
									// product_card.setAttribute('product_title_color', this.product_title_color);
									// product_card.setAttribute('product_title_background', this.product_title_background);
									// product_card.onclick = this.activate_product;
									product_card.addEventListener('click', (e)=>{this.value = e.target.product_id});
									f.append(product_card);
								}
								this.product_container.append(f);
								this.value = active_product_id;
								// console.log(active_product_id)
				
							});
							break;
							}
				}

				case 'product_title_color':
				case 'product_title_background': {
					if (newValue) {
					console.log(`${name}: ${newValue}`);
					this.product_container.style.setProperty('--'+name, newValue);
					break;
					}
				}
				case 'value': {
					//activate poduct by id
					let product_to_activate = this.product_container.querySelector(`[product_id="${newValue}"]`) || false;
					// let product_active = this.product_container.querySelector('product-card.active') || false;
					// console.log(newValue);
					// console.log(product_to_activate);
					// if(product_to_activate && product_to_activate != product_active) {
					// 	console.log(newValue);
					if(product_to_activate) {
						let id_to_activate = product_to_activate.getAttribute('product_id');
						this.activate_product_id(id_to_activate);
				}
					// }
					break;
					
				}
			}
		}
	}

	connectedCallback() {
	}

	constructor() {
		super();

		this.shadow = this.attachShadow({mode: 'open'});

		this.product_container = document.createElement('div');
		this.product_container.className = 'product_container';

		const style = document.createElement('style');
		style.textContent = `
			.product_container {
				--product_container_width: 60vw;
				--product_card_side: 20vh;
				--product_card_active_side: 40vh;
				display: flex;
				flex-flow: row nowrap;
				width: var(--product_container_width);
				height: 10vh;
				position: absolute;
				top: 5vh;
				left: calc( (100vw - var(--product_container_width)) / 2 );
				margin: 0;
				padding: 0;
				justify-content: space-between;
			}
			.product_container product-card {
				width: var(--product_card_side);
				height: var(--product_card_side);
				cursor: pointer;
			}
			.product_container product-card.active {
				position: absolute;
				height: var(--product_card_active_side);
				width: var(--product_card_active_side);
				top: 30vh;
				left: calc( (var(--product_container_width) - var(--product_card_active_side)) / 2 );
			}

			.button {
				padding: .5em .8em
				background: lightgreen;
				width: 5rem;
				font-size: 2rem;
				position: absolute;
				top: calc(50vh - 1rem);
				cursor: pointer;
			}

			.buy_button {
			}


			@media screen and (max-width: 900px) {
				.product_container {
					--product_container_width: 100vw;
					left: 0;
					top: 2vh;
				}
				.product_container product-card {
					--product_card_side: 20vw ;
				}
				.product_container product-card.active {
					--product_card_active_side: 35vw;
				}

				.buy_button {
					bottom: 2rem;
				}
			}

		`;

		const change_product = (next) => {
			const product_cards = this.product_container.querySelectorAll('product-card');
			const product_cards_limit= product_cards.length - 1;
			product_cards.forEach((pc, index) => {
				if (pc.classList.contains('active')) pc.classList.remove('active');
				let current_order = +pc.style.getPropertyValue('order');
				let next_order = next ? limited_sum(current_order, product_cards_limit) : limited_sub(current_order, product_cards_limit);
				if (next_order == 0) pc.classList.add('active');
				pc.style.setProperty('order', next_order);
			});
			// product_card_active.classList.remove('active');
		}

		this.activate_product = (event)=>{
			// const current_active = this.product_container.querySelector('product-card.active') || false;
			// const new_active = event.target;
			// new_active.style.setProperty('order', new_active.style.getPropertyValue('order'));
			// if(current_active) current_active.classList.remove('active');
			// new_active.classList.add('active');
			this.activate_product_id(event.target.getAttribute('product_id'));
		}

		this.activate_product_id = (id_to_activate)=>{
			const current_active = this.product_container.querySelector('product-card.active') || false;
			const new_active = this.product_container.querySelector(`product-card[product_id="${id_to_activate}"`) || false;
			console.log(id_to_activate);
			console.log(new_active);
			console.log(current_active);
			if (new_active && new_active != current_active) {
				new_active.style.setProperty('order', new_active.style.getPropertyValue('order'));
				if(current_active) current_active.classList.remove('active');
				new_active.classList.add('active');

			}
		}

		const buy_button = document.createElement('div')
		buy_button.textContent = 'Купить'
		buy_button.className = 'buy_button';


		const limited_sum = (input_number, limit) => {
			let next = input_number + 1;
			if (next > limit) next = 0;
			return next;
		}
		const limited_sub = (input_number, limit) => {
			let next = input_number - 1;
			if (next < 0 ) next = limit;
			return next;
		}
		const handle_buy_button = () => {
			let active_product = this.product_container.querySelector('product-card.active');
			let product_id = active_product.getAttribute('product_id');
			localStorage.setItem('product_id', product_id);
			let message = '';
			for (let k = 0; k < localStorage.length; k++) {
				let key = localStorage.key(k)
				message += `${key}: ${localStorage.getItem(key)}\n`;
			}
			console.log(message)
		}

		
		buy_button.addEventListener('click', ()=>{handle_buy_button()});

		// const button_next = document.createElement('div');
		// button_next.textContent = 'След.';
		// button_next.classList = 'button button_next';
		// button_next.addEventListener('click', ()=>{change_product(true);});

		// const button_previous = document.createElement('div');
		// button_previous.textContent = 'Пред.';
		// button_previous.className = 'button button_previous';
		// button_previous.addEventListener('click', ()=>{change_product(false);});
		

		// this.shadow.append(style, this.product_container, button_next, button_previous, buy_button);

		this.shadow.append(style, this.product_container);

		
		// let f = document.createDocumentFragment();
		// this.innerHTML = '';
		// let a = [142, 124, 14112, 124];

		// for( let i in a ) {
		// 	console.log(`${i}: ${a[i]}`);
		// 	let product_card = document.createElement('product-card');
		// 	product_card.setAttribute('product_id', a[i]);
		// 	product_card.setAttribute('product_image', './d_9_1.jpg');
		// 	f.append(product_card);
		// }
		// this.shadow.append(f);

	}

}

customElements.define('product-cards-carousel', ProductCardsCarousel);
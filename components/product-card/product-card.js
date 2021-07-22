export default class ProductCard extends HTMLElement {
	static get observedAttributes() {
		return [
				'product_id',
				'product_title',
				'product_image',
				'product_title_color',
				'product_title_background'
			]
	}

	get product_id() {
		return this.getAttribute('product_id') ||  'false';
	}
	set product_id(value) {
		this.setAttribute('product_id', value);
	}

	get product_title() {
		return this.getAttribute('product_title') || 'PRODUCT_TITLE_PLACEHOLDER';
	}
	set product_title(value) {
		this.setAttribute('product_title', value);
	}

	get product_image() {
		let image = 'green';
		// let image = 'url("./placeholder.jpg")';
		if (this.hasAttribute('product_image'))
			image = this.getAttribute('product_image');
		return image;
	}
	set product_image(value) {
		this.setAttribute('product_image', value);
	}

	get product_title_color() {
		return this.getAttribute('product_title_color');
	}
	set product_title_color(value) {
		this.setAttribute('product_title_color', value);
	}

	get product_title_background() {
		return this.getAttribute('product_title_background');
	}
	set product_title_background(value) {
		this.setAttribute('product_title_background', value);
	}

	connectedCallback() {
		this.slot_title.textContent = this.product_title;
		// this.slot_image.src = `url(${this.product_image})`;
		this.slot_title.setAttribute('slot', 'product_title');
		this.slot_image.setAttribute('slot', 'product_image');

		// this.productCard.style.setProperty('--product_image_background', '#000');
		// this.setStyleProperty('--product_image_background', 'green', this.product_image);
		// this.setStyleProperty('--product_title_color', '#000', this.product_title_color);
		// this.setStyleProperty('--product_title_background', 'red', this.product_title_background);


	}

	attributeChangedCallback(name, oldValue, newValue) {
		console.log(`${name}: ${newValue}`);
		if (newValue != oldValue) {
			switch(name) {
				case 'product_id': {
					// render / update product
					break;
				}
				case 'product_title': {
					// render / update product
					// let  validTitle = newValue || oldValue;
					if (newValue) {
						if(this.slot_title.style.display == 'none')
							this.slot_title.style.display = 'block';
						this.slot_title.textContent = newValue;
					}
					else {
						
						this.slot_title.textContent = '';
						this.slot_title.style.display = 'none';
					}
					
					break;
				}
				case 'product_image': {
					// render / update product
					if (newValue) {
						if(this.slot_title.style.display == 'none')
							this.slot_title.style.display = 'block';
						this.productCard.style.setProperty('--product_image_background', newValue);
					} else {
						this.productCard.style.display = 'none';
						console.warn(`Product card with id:'${this.product}' (title: '${this.product_title}') was hidden because of empty image path`);
					}
					break;
				}
				case 'product_title_color':
				case 'product_title_size':
				case 'product_title_background':
					 {
					// if (newValue)
					// this.productCard.style.setProperty('--'+name, newValue);
					// break;
				}
			}
		}
	}

	constructor() {
		super();

		this.shadow = this.attachShadow({mode: 'open'});

		let template = document.createElement('template');
		template.innerHTML = `
			<slot name='product_image'>&lt;product_image&gt;</slot>
			<slot name='product_title' class='product_title'>&lt;product_title&gt;</slot>
		`;

		this.productCard = document.createElement('div');
		this.productCard.className = 'product_card';

		let style = document.createElement('style');

		style.textContent = `
			.product_card {
				position: relative;
				width: 100%;
				height: 100%;
				display: block;
				overflow: hidden;
				background: #fff;
				border-radius: .5rem;
				border: 1px solid #ccc;
				text-align: center;
			}

			.product_image {
				background: var(--product_image_background);
				background-size: contain;
				background-position: center;
				background-repeat: no-repeat;
				display: block;
				position: absolute;
				height: 100%;
				width: 100%;
				margin: 0;
				padding: 0;
				top: 0;
				left: 0;
			}

			.product_title {
				background: var(--product_title_background);
				color: var(--product_title_color);
				display: block;
				left: 0;
				margin: 0;
				position: absolute;
				top: 0;
				transform: translateY(-1.5em);
				transition: transform .2s;
				width: 100%;
				height: 1.5em;
				font-size: 1rem;
				overflow: hidden;
				line-height: 1.5em;
			}

			.product_card:hover  .product_title {
				transform: translateY(0);
			}
		`;


		this.setStyleProperty = (property_name, default_value, new_value) => {
			// console.log(new_value);
			let value = default_value;
			if (new_value)
				value = new_value;
			this.productCard.style.setProperty(property_name, value);
		}


		this.slot_title = document.createElement('h3');
		this.slot_title.className = 'product_title';

		this.slot_image = document.createElement('span');
		this.slot_image.className = 'product_image';
		
		
		this.productCard.append(this.slot_image, this.slot_title);
		this.shadow.append(style, template, this.productCard);

	}
}

customElements.define('product-card', ProductCard);
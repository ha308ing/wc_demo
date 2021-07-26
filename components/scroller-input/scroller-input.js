export default class ScrollerInput extends HTMLElement {
	static get observedAttributes () {
		return ['min', 'max', 'height', 'value', 'active_number_background', 'active_number_color', 'number_color', 'number_background', 'number_opacity'];
	}

	get min() {
		let min = -10;
		if (this.getAttribute('min') || this.getAttribute('min') == 0)
			min = +this.getAttribute('min');
		return min;
	}
	set min(value) {
		this.setAttribute('min', value);
	}

	get max() {
		let max = 10;
		if (this.getAttribute('max') || this.getAttribute('max') == 0)
			max = +this.getAttribute('max');
		return max;
	}
	set max(value) {
		this.setAttribute('max', value);
	}

	get active_number_background() {
		active_number_background = this.getAttribute('active_number_background') || '';
	}
	set active_number_background(value) {
		this.setAttribute('active_number_background', value);
	}

	get number_background() {
		number_background = this.getAttribute('number_background') || '#fff';
	}
	set number_background(value) {
		this.setAttribute('number_background', value);
	}

	get active_number_color() {
		active_number_color = this.getAttribute('active_number_color') || '#fff';
	}
	set active_number_color(value) {
		this.setAttribute('active_number_color', value);
	}

	get number_color() {
		number_color = this.getAttribute('number_color') || '#ccc';
	}
	set number_color(value) {
		this.setAttribute('number_color', value);
	}

	get number_color_opacity() {
		number_color_opacity = this.getAttribute('number_color_opacity') || '.375';
	}
	set number_color_opacity(value) {
		this.setAttribute('number_color_opacity', value);
	}

	get height() {
		return this.getAttribute('height') || '100vh';
	}
	set height(value) {
		this.setAttribute('height', value);
	}

	get value() {
		return +this.getAttribute('value') || this.min;
	}
	set value(value) {
		
		const event = new CustomEvent("value-change", {
			detail: {value: value}
		});
		
		// this.addEventListener('value-change',(e)=>{
		// 	console.log(e.detail.value);
		// })

		// Dispatch the event.
		this.dispatchEvent(event);
		this.setAttribute('value', value);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue && newValue != oldValue) {
			switch(name) {
				case 'min':
				case 'max': {
					if (name == 'min') {
						if (newValue > this.max) this.min = this.max;
					}
					if (name == 'max') {
						if (newValue < this.min) this.max = this.min;
					}
					if (this.value > this.max) this.value = this.max;
					if (this.value < this.min) this.value = this.min;
					this.renderNumbers();
					this.scrollToActiveNumber();
					break;
				}
				case 'height': {
					this.main_container.style.setProperty('--height', newValue);
					break;
				}
				case 'active_number_background': {
					this.main_container.style.setProperty('--active_number_background', newValue);
					break;
				}
				case 'number_background': {
					this.main_container.style.setProperty('--number_background', newValue);
					break;
				}
				case 'number_opacity': {
					this.main_container.style.setProperty('--number_opacity', newValue);
					break;
				}
				case 'active_number_color': {
					this.main_container.style.setProperty('--active_number_color', newValue);
					break;
				}
				case 'number_color': {
					this.main_container.style.setProperty('--number_color', newValue);
					break;
				}
				case 'value': {
					if ( newValue < this.min || newValue > this.max ) {
						if (newValue < this.min) {
							this.value = this.min;
						}
						if (newValue > this.max) {
							this.value = this.max;
						}
					} else {
						this.value = newValue;
						this.scrollToActiveNumber();
					}
					break;
				}
			}
		}
	}

	connectedCallback() {
		this.main_container.style.setProperty('--height', this.height);
		setTimeout(()=>{this.scrollToActiveNumber();},10);
	}

	constructor() {
		super();

		this.shadow = this.attachShadow({mode: 'open'});

		let style_link = document.createElement('link');
		style_link.setAttribute('rel', 'stylesheet');
		style_link.setAttribute('href', './components/scroller-input/scroller-input.css');

		this.main_container = document.createElement('div');
		this.main_container.className = 'main_container';

		this.main_container.addEventListener('wheel', (e)=>{
			e.preventDefault();
			let currentScrollPos = +this.main_container.scrollTop;
			let scroll_delta = this.main_container.clientHeight / 3;
			this.main_container.scrollTop = e.deltaY > 0 ? 
				currentScrollPos + scroll_delta : 
				currentScrollPos - scroll_delta;
			let index = Math.round(this.main_container.scrollTop / scroll_delta, 0) + 1;
			this.activate_number_block(index);
		}, {passive: false});

		this.main_container.addEventListener('scroll', (e)=>{
			e.stopImmediatePropagation();
			let scroll_delta = this.main_container.clientHeight / 3;
			let index = Math.round(this.main_container.scrollTop / scroll_delta, 0) + 1;
			this.activate_number_block(index);
		}, {passive: true});

		this.activate_number_block = (index)=>{
			let number_block_to_activate = this.shadow.querySelector(`.number_block:nth-child(${index})`);
			if(this.shadow.querySelector('.number_block.active'))
				this.shadow.querySelector('.number_block.active').classList.remove('active');
			number_block_to_activate.classList.add('active');
			this.value = number_block_to_activate.textContent;
		}

		this.highlight_active_number_block = (index)=>{
			let number_block_to_activate = this.shadow.querySelector(`.number_block:nth-child(${index})`);
			if(this.shadow.querySelector('.number_block.active'))
				this.shadow.querySelector('.number_block.active').classList.remove('active');
			number_block_to_activate.classList.add('active');
		}

		this.scrollToActiveNumber = ()=>{
			if(this.shadow.querySelector('.number_block.active'))
				this.shadow.querySelector('.number_block.active').classList.remove('active');
			let active_number = this.main_container.querySelector(`.number_block[data-value="${this.value}"]`);
			active_number.classList.add('active');
			// active_number.scrollIntoView({block: 'center'});
			console.log(`active_number.offsetTop: ${active_number.offsetTop}`);
			console.log(`this.main_container.clientHeight / 2: ${this.main_container.clientHeight / 2}`);
			console.log(`active_number.clientHeight: ${active_number.clientHeight}`);
			console.log(`scroll to: ${active_number.offsetTop - this.main_container.clientHeight / 2}`);
			this.main_container.scrollTop = active_number.offsetTop + active_number.clientHeight / 2 - this.main_container.clientHeight / 2;
			// this.main_container.scrollTo({behavior:'smooth', top:active_number.offsetTop});
		}

		window.addEventListener('resize', ()=>{
			this.main_container.style.setProperty('--height', 0);
			this.main_container.style.setProperty('--height', this.height);
			this.scrollToActiveNumber();
		})

		this.renderNumbers = ()=>{
			this.numbers_container.innerHTML = '';
			let numbers_fragment = document.createDocumentFragment();
			for (let i = this.min, k = 0; i < this.max + 1; i++) {
				let number_block = document.createElement('div');
				number_block.dataset['index'] = k;
				number_block.dataset['value'] = i;
				number_block.className = 'number_block';
				number_block.textContent = i;
				numbers_fragment.append(number_block);
				k++;
			}

			this.numbers_container.append(numbers_fragment);
		}

		


		this.numbers_container = document.createElement('div');
		this.numbers_container.className = 'numbers_container';
		
		this.renderNumbers();
		this.main_container.append(this.numbers_container);
		this.shadow.append(style_link, this.main_container);
	}
}

customElements.define('scroller-input', ScrollerInput)
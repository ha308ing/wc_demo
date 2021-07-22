import ValueMeasure from '../value-measure/value-measure.js';
import ScrollerInput from '../scroller-input/scroller-input.js';

// customElements.define('value-measure', ValueMeasure);
// customElements.define('scroller-input', ScrollerInput);

export default class AgeScrollInput extends HTMLElement {
	static get observedAttributes() {
		return ['min', 'max', 'height', 'value', 'active_number_background', 'active_number_color', 'number_color', 'number_background', 'number_opacity'];
	}

	get min() {
		return +this.getAttribute('min') || 5;
	}
	set min(value) {
		this.setAttribute('min', value);
	}

	get max() {
		return +this.getAttribute('max') || 35;
	}
	set max(value) {
		this.setAttribute('max', value);
	}

	get active_number_background() {
		return this.getAttribute('active_number_background') || '#eee';
	}
	set active_number_background(value) {
		this.setAttribute('active_number_background', value);
	}

	get number_background() {
		return this.getAttribute('number_background') || 'transparent';
	}
	set number_background(value) {
		this.setAttribute('number_background', value);
	}

	get active_number_color() {
		return this.getAttribute('active_number_color') || '#fff';
	}
	set active_number_color(value) {
		this.setAttribute('active_number_color', value);
	}

	get number_color() {
		return this.getAttribute('number_color') || '#eee';
	}
	set number_color(value) {
		this.setAttribute('number_color', value);
	}

	get number_opacity() {
		return this.getAttribute('number_opacity') || '.375';
	}
	set number_opacity(value) {
		this.setAttribute('number_opacity', value);
	}

	get number_color_opacity() {
		return this.getAttribute('number_color_opacity') || '.375';
	}
	set number_color_opacity(value) {
		this.setAttribute('number_color_opacity', value);
	}

	get height() {
		return this.getAttribute('height') || '150px';
	}
	set height(value) {
		this.setAttribute('height', value);
	}

	get value() {
		return this.getAttribute('value') || '';
	}
	set value(value) {
		this.setAttribute('value', value);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if(newValue != oldValue) {
			switch(name) {
				case 'height': {
					this.age_input.setAttribute('height', newValue);
					break;
				}
				case 'min': {
					this.age_input.setAttribute('min', newValue);
					break;
				}
				case 'max': {
					this.age_input.setAttribute('max', newValue);
					break;
				}
				case 'value': {
					this.age_input.setAttribute('value', newValue);
					break;
				}
				case 'active_number_background': {
					this.age_input.style.setProperty('--active_number_background', newValue);
					break;
				}
				case 'number_background': {
					this.age_input.style.setProperty('--number_background', newValue);
					break;
				}
				case 'number_opacity': {
					this.age_input.style.setProperty('--number_opacity', newValue);
					break;
				}
				case 'active_number_color': {
					this.age_input.style.setProperty('--active_number_color', newValue);
					break;
				}
				case 'number_color': {
					this.age_input.style.setProperty('--number_color', newValue);
					break;
				}
			}
		}
	}

	connectedCallback() {
		this.age_input.setAttribute('min', this.min);
		this.age_input.setAttribute('max', this.max);
		this.age_input.setAttribute('height', this.height || '300px');
		this.age_input.setAttribute('active_number_background', this.active_number_background);
		this.age_input.setAttribute('active_number_color', this.active_number_color);
		this.age_input.setAttribute('number_color', this.number_color);
		this.age_input.setAttribute('number_background', this.number_background);
		this.age_input.setAttribute('number_opacity', this.number_opacity);
		this.container.style.setProperty('height', this.height || '300px');
		this.age_measure.style.setProperty('height', this.height || '300px');
		this.age_measure.style.setProperty('line-height', this.height || '300px');
		this.age_input.setAttribute('value', this.value || '');

		
		this.age_measure.setAttribute('measures', 'год года лет');
		this.age_measure.setAttribute('input_value', this.age_input.getAttribute('value'));
	}

	constructor() {
		super();

		this.shadow = this.attachShadow({mode: 'open'});



		// let age_scroll_script = document.createElement('script');
		// age_scroll_script.setAttribute('type', 'module');
		// age_scroll_script.setAttribute('src', '../scroller-input/scroller-input.js');

		// let age_measure_script = document.createElement('script');
		// age_measure_script.setAttribute('type', 'module');
		// age_measure_script.setAttribute('src', '../value-measure/value-measure.js');
		this.container = document.createElement('div');
		this.container.className = 'container';
		let style = document.createElement('style');
		style.textContent = `
			.container {
				position: relative;
				display: block;
				flex-flow: row nowrap;
				align-items:center;	  scrollbar-color: rebeccapurple green;
				scrollbar-width: thin;
				
			}
			.age_input {
				position: absolute;
				top: 0;
				left: 0;
				width:100%;
				// flex: 0 0 80%;
				

			}
			.age_measure {
				position: absolute;
				right: 25%;
				
				
				// width:20%
				// flex: 0 0 20%;
				// text-align: center;
			}
		`;

		this.age_input = document.createElement('scroller-input');
		this.age_input.className = 'age_input';
		console.log(this.age_input);
		
		this.age_input.addEventListener('value-change', (e)=>{
			console.log('hi');
			console.log(`age scroll change to: ${e.detail.value}`);
			this.age_measure.input_value = e.detail.value;
			this.value = e.detail.value;
		})

		this.age_measure = document.createElement('value-measure');
		this.age_measure.className = 'age_measure';
		this.container.append(this.age_input, this.age_measure);
		this.shadow.append(style, this.container);




	}
}

customElements.define('age-scroll-input', AgeScrollInput )
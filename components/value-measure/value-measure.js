export default class ValueMeasure extends HTMLElement {
	static get observedAttributes() {
		return ['input_value', 'measures', 'value'];
	}

	get value() {
		return this.getAttribute('value') || '';
	}
	set value(value) {
		this.setAttribute('value', value);
	}

	get input_value() {
		return this.getAttribute('input_value') || '';
	}
	set input_value(value) {
		this.setAttribute('input_value', value);
	}

	get measures() {
		return this.getAttribute('measures') || '';
	}
	set measures(value) {
		this.setAttribute('measures', value);
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue != oldValue) {
		switch(name) {
			case 'measures': {
				this.measures_array = this.getArray(newValue);
				this.value = this.do(this.input_value, this.measures_array);	
				// console.log(this.getArray(newValue));
				break;
			}
			case 'input_value': {
				this.measures_array = this.getArray(this.measures);
				this.value = this.do(newValue, this.measures_array);
				// console.log(this.value);
				break;
			}
			case 'value' :{
				this.value_span.textContent = newValue;
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

		this.value_span = document.createElement('span');
		this.shadow.append(this.value_span);

		this.do = (value, array) =>{
			console.log(`value: ${value}`);
			console.log(array);
			// let p = value.length == 1 ? 1 : value.length - 1;
			let p = 1;
			console.log(`p: ${p}`);
			let divider = Math.pow(10, p);
			console.log(`divider: ${divider}`);
			let modulo100 = +value % Math.pow(10, 2);
			let modulo10 = +value % Math.pow(10, 1);
			let result;
			if (modulo100 > 10 && modulo100 < 20) {
				result = array[2];
			} else {
				switch(modulo10) {
					case 1: {result = array[0]; break;}
					case 2:
					case 3:
					case 4: {result = array[1]; break;}
					case 0:
					case 5:
					case 6:
					case 7:
					case 8:
					case 9: {result = array[2]; break;}
				}
			}
			return result;
		}

		this.getArray = (input_array) => {
			let res_array = input_array.split(' ');
			if (res_array.length == 3) {
				return res_array;
			} else if (res_array.length > 3) {
				res_array = res_array.splice(0, 3);
			} else {
				for (let i = res_array.length; i < 3; i++) {
					res_array[i] = res_array[0];
				}
			}
			return res_array;
		}

	}
}

customElements.define('value-measure', ValueMeasure);
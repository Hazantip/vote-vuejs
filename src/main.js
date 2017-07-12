// - global css
import Vue from 'vue';
import VueTouch from 'vue-touch';
import './theme/theme.scss';

/**
 *
 */
function DOMLoaded() {

	const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

	Vue.use(VueTouch);

	// Hammer Pan Events: pan, panstart, panmove, panend, pancancel, panleft, panright, panup, pandown
	// TODO(done): image state styles
	// TODO(done): image slider state styles
	// TODO(done): image slider elements
	// TODO(done): image slider implement with results
	// TODO: stylize handle
	// TODO: set default 50%

	// - NEW!!!
	// TODO: make horizontal, start left (if have time make right too)
	// TODO: add feature stars
	// TODO: add feature like/dislike
	// TODO: add vote button
	// TODO: show result with fun animation after vote

	const sliderDefaults = {
		'enablePlay': false,			// - enable/disable events
		'startPoint': 'bottom',			// - define direction from the point: bottom, top, left, right
		'value': 0.5,
		'scale': {
			'element': '.slider-scale__line',
			'height': null				// - total scale height
		},
		'handle': {
			'position': {
				'y': 0					// - last handle position
			}
		},
		'timeline': {
			'initialResultsDelay': 1000
		},
		'style': {}						// - inline css object for handle
	};
	const slider = new Vue({
		'el': '#slider',
		'data': {
			...sliderDefaults,			// - default params
			'image': {
				'src': '/assets/images/singer.jpg'
			},
			'results': {
				'active': false,				// -
				'value': 0.7				// -
			}
		},
		'created': function() {
			//console.log('created', this);

			// - set scale size
			const height = this.querySelector(this.scale.element).clientHeight;
			this.setScale({ height });

			// - set initial value
			if (!this.results.active) {
				this.setPosition({ 'type': 'force', 'positionY': height * 0.5 });
			}

		},
		'beforeMount': function() {
			//console.log('beforeMount', this);
		},
		'mounted': function() {
			//console.log('mounted');

			// - set initial value
			if (this.results.active) {
				this.setPosition({ 'type': 'force', 'positionY': this.scale.height * this.results.value });
			}
			// - set enable play
			setTimeout(() => {
				this.enablePlay = true;
			}, this.timeline.initialResultsDelay);
		},
		'beforeUpdate': function() {
			//console.log('beforeUpdate');
		},
		'updated': function() {
			//console.log('updated');
		},
		'methods': {
			'onPanMove': function ({ type, deltaY }) {
				const positionY =
						this.startPoint === 'bottom'
							? this.handle.position.y + -(deltaY)
							: this.handle.position.y + deltaY;

				this.setPosition({ type, positionY });

			},
			'onPanEnd': function ({ deltaY }) {
				this.handle.position.y =
						this.startPoint === 'bottom'
							? this.handle.position.y + -(deltaY)
							: this.handle.position.y + deltaY;
			},
			'onTap': function ({ type, srcEvent }) {
				const offsetY = srcEvent.offsetY || srcEvent.layerY;
				const positionY =
						this.startPoint === 'bottom'
							? this.scale.height - offsetY
							: offsetY;

				this.setPosition({ type, positionY });
			},
			'setPosition': function({ type, ...rest }) {
				const height = this.querySelector(this.scale.element).clientHeight;
				this.setScale({ height }); // important for case when was resized

				//console.log(this.scale.element, this.scale.element.clientHeight);

				let { positionY } = rest;
				if (positionY < 0) {
					positionY = 0;
				}
				if (positionY > height) {
					positionY = height;
				}

				this.setValue({ positionY, height });

				this.style = {
					'transform': `translateY(${this.startPoint === 'bottom' ? -positionY : positionY}px)`,
					'transition': type === 'force' ? '' : 'none',
					'transitionDelay': type === 'force' ? `${this.timeline.initialResultsDelay}ms` : ''
				};

				if (type === 'tap' || type === 'force') {
					this.handle.position.y = positionY;
				}
			},
			'setScale': function(data) {
				this.scale = Object.assign(this.scale, data, {});
			},
			'setValue': function ({ positionY, height }) {
				this.value = positionY / height;
			},
			'printValue': function () {
				return Math.round(this.value * 100);
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', DOMLoaded);

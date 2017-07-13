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
	// TODO(done): set default 50%

	// - NEW!!!
	// TODO(done): make horizontal, start left (if have time make right too)
	// TODO: add feature stars
	// TODO: add feature like/dislike
	// TODO: add vote button
	// TODO: show result with fun animation after vote

	const sliderDefaults = {
		'enablePlay': false,			// - enable/disable events
		'startPoint': 'left',			// - define direction from the point: left, right
		'value': 0.5,
		'scale': {
			'element': '.slider-scale__line',
			'width': null				// - total scale height
		},
		'handle': {
			'position': {
				'x': 0					// - last handle position
			}
		},
		'timeline': {
			'enablePlayDelay': 1000
		},
		'style': {}						// - inline css object for handle
	};
	const slider = new Vue({
		'el': '#slider',
		'data': {
			...sliderDefaults,			// - default params
			'image': {
				'src': '/assets/images/singer.jpg'
			}
		},
		'created': function() {
			//console.log('created', this);

			const width = this.getScale().clientWidth;
			// - set initial value for slider
			this.setPosition({ 'type': 'force', 'positionX': width * 0.5 });
		},
		'beforeMount': function() {
			//console.log('beforeMount', this);
		},
		'mounted': function() {
			//console.log('mounted');

			// - set enable play
			setTimeout(() => {
				this.enablePlay = true;
			}, this.timeline.enablePlayDelay);
		},
		'beforeUpdate': function() {
			//console.log('beforeUpdate');
		},
		'updated': function() {
			//console.log('updated');
		},
		'methods': {
			'getScale': function () {
				const componentSelector = this.$options.el;
				return document.querySelector(componentSelector).querySelector(this.scale.element);
			},
			'setScale': function(data) {
				this.scale = Object.assign(this.scale, data, {});
			},
			'setValue': function ({ positionX, width }) {
				this.value = positionX / width;
			},
			'setPosition': function({ type, ...rest }) {
				const width = this.getScale().clientWidth;
				this.setScale({ width });

				let { positionX } = rest;
				if (positionX < 0) {
					positionX = 0;
				}
				if (positionX > width) {
					positionX = width;
				}

				this.setValue({ positionX, width });

				this.style = {
					'transform': `translateX(${this.startPoint === 'left' ? positionX : -positionX}px)`,
					'transition': type === 'force' ? '' : 'none',
					'transitionDelay': type === 'force' ? `${this.timeline.enablePlayDelay}ms` : ''
				};

				if (type === 'tap' || type === 'force') {
					this.handle.position.x = positionX;
				}
			},
			'onTap': function ({ type, srcEvent }) {
				const offsetX = srcEvent.offsetX || srcEvent.layerX;
				const positionX = this.startPoint === 'left' ? offsetX : this.scale.width - offsetX;

				this.setPosition({ type, positionX });
			},
			'onPanMove': function ({ type, deltaX }) {
				const positionX = this.getPanPositionX({ deltaX });
				this.setPosition({ type, positionX });

			},
			'onPanEnd': function ({ deltaX }) {
				// - store last position
				this.handle.position.x = this.getPanPositionX({ deltaX });
			},
			'getPanPositionX': function ({ deltaX }) {
				return this.startPoint === 'left' ? this.handle.position.x + deltaX : this.handle.position.x + -(deltaX);
			},
			'printValue': function () {
				return Math.round(this.value * 100);
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', DOMLoaded);

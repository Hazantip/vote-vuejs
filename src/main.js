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

	const sliderDefaults = {
		'enablePlay': true,				// - enable/disable events
		'enableSwipeX': true, 			// - default false
		'enableSwipeY': true,				// - not used
		'value': '0%',
		'scale': {
			'height': null				// - total scale height
		},
		'dot': {
			'position': {
				'y': 0					// - last dot position
			}
		},
		'style': {}						// - inline css object for dot
	};
	const slider = new Vue({
		'el': '#slider',
		'data': {
			...sliderDefaults,			// - default params
			'enablePlay': false,			// - initially overrides default value
			'timeline': {					// - not user
				'showHintDelay': 300,
				'hideHintDelay': 3000,
				'questionLeaveDuration': 300,
				'showResultsDuration': 3000
			}
		},
		'created': function() {
			//console.log('created');
		},
		'beforeMount': function() {
			//console.log('beforeMount');
		},
		'mounted': function() {
			//console.log('mounted');
			this.setScale({
				'height': this.$refs.line.clientHeight
			});
		},
		'beforeUpdate': function() {
			//console.log('beforeUpdate');
		},
		'updated': function() {
			//console.log('updated');
		},
		'methods': {
			'onPanMove': function ({ type, deltaY }) {
				const positionY = this.dot.position.y + deltaY;
				this.setPosition({ type, positionY });
			},
			'onPanEnd': function ({ deltaY }) {
				this.dot.position.y += deltaY;
			},
			'onTap': function ({ type, srcEvent }) {
				const positionY = srcEvent.offsetY;
				this.setPosition({ type, positionY });
			},
			'setPosition': function({ type, positionY }) {
				const height = slider.$refs.line.clientHeight;
				this.setScale({ height }); // important for case when was resized

				if (positionY < 0 || positionY > height) {
					return false;
				}

				this.setValue({ positionY, height });

				if (type === 'tap') {
					this.style = {
						'transform': `translateY(${positionY}px)`
					};
					this.dot.position.y = positionY;
				} else if (type === 'panmove') {
					this.style = {
						'transform': `translateY(${positionY}px)`
					};
				}
			},
			'setScale': function(data) {
				this.scale = Object.assign(this.scale, data, {});
			},
			'setValue': function ({ positionY, height }) {
				this.value = `${((positionY / height) * 100).toFixed(2)}%`;
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', DOMLoaded);

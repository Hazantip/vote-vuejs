// - global css
import Vue from 'vue';
import VueTouch from 'vue-touch';
import sliderComponent from './slider/slider.vue';
import './theme/theme.scss';

/**
 *
 */
function DOMLoaded() {

	const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

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

	Vue.use(VueTouch);
	const voteActivity = new Vue({
		el: '#slider',
		template: '<slider />',
		components: {
			'slider': sliderComponent
		}
	});
}

document.addEventListener('DOMContentLoaded', DOMLoaded);

// - global css
import Vue from 'vue';
import voteComponent from './vote/vote.vue';
import './theme/theme.scss';

/**
 *
 */
function DOMLoaded() {

	const delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

	// Hammer Pan Events: pan, panstart, panmove, panend, pancancel, panleft, panright, panup, pandown
	// TODO(done): image state styles
	// TODO(done): image vote state styles
	// TODO(done): image vote elements
	// TODO(done): image vote implement with results
	// TODO(done): set default 50%
	// TODO: stylize handle

	// - NEW!!!
	// TODO(done): make horizontal, start left (if have time make right too)
	// TODO(done): add feature stars
	// TODO(done): add vote button
	// TODO(done): show result with fun animation after vote

	const voteActivity = new Vue({
		el: '#vote',
		template: '<vote />',
		components: {
			'vote': voteComponent
		}
	});

	const voteActivity2 = new Vue({
		el: '#vote2',
		template: '<vote :data="{}"/>',
		components: {
			'vote': voteComponent
		},
		data() {
			return {
				'type': 'slider',
				'vote': {
					'results': 1
				}
			};
		}
	});
}

document.addEventListener('DOMContentLoaded', DOMLoaded);

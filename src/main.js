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

	const swiperDefaults = {
		enablePlay: true,				// enable/disable events
		enableSwipeX: true, 			// - default false
		enableSwipeY: true,				// - not used
		style: {},						// - inline css object
		scaleData: {
			'height': null
		}
	};
	const swiper = new Vue({
		el: '#slider',
		data: {
			...swiperDefaults,			// default params
			enablePlay: false,			// initially overrides default value
			timeline: {
				showHintDelay: 300,
				hideHintDelay: 3000,
				questionLeaveDuration: 300,
				showResultsDuration: 3000
			}
		},
		created: function() {
			//console.log('created');
		},
		beforeMount: function() {
			//console.log('beforeMount');
		},
		mounted: function() {
			//console.log('mounted');
			this.setScaleData({
				'height': this.$refs.line.clientHeight
			});
		},
		beforeUpdate: function() {
			//console.log('beforeUpdate');
		},
		updated: function() {
			//console.log('updated');
		},
		methods: {
			'onPanMove': function (props) {
				console.log('move: ', props);
				//this.setPosition(props);
			},
			'onPanEnd': function ({ type, deltaX, deltaY }, ...rest) {
				//console.log(type, deltaX, deltaY, rest);
			},
			'onPanUp': function({ type, deltaX, deltaY }, ...rest) {
				//console.log(type, deltaX, deltaY, rest);
			},
			'onPanDown': function(props) {
				//console.log(props, props.srcEvent.toElement.clientHeight);
			},
			'onTap': function (props) {
				//console.log('tap: ', props);
				this.setPosition(props);
			},
			'setPosition': function(props) {
				this.setScaleData({
					'height': props.srcEvent.srcElement.clientHeight // important for case when was resized
				});
				const offsetY = props.srcEvent.offsetY;
				if (offsetY < 0 || offsetY > this.scaleData.height) {
					return false;
				}

				this.style = {
					'transform': `translateY(${offsetY}px)`
				};
			},
			'setScaleData': function(data) {
				const prevData = this.scaleData;
				const nextData = data ? data : {
					height: swiper.$refs.line.clientHeight
				};
				this.scaleData = {
					...prevData,
					...nextData
				};
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', DOMLoaded);

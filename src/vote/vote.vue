<template>
	<div class="activity vote" :class="{ 'enable-play': enablePlay }">
		<div class="vote-main">

			<Slider v-if="type === 'slider'" :data="sliderData"></Slider>

			<Rating v-if="type === 'rating'" :data="ratingData"></Rating>

			<div class="vote-image" :style="[{ backgroundImage: 'url(' + this.image.src + ')' }]"></div>

		</div>
	</div>
</template>

<script>
	import Slider from './slider.vue';
	import Rating from './rating.vue';


	export default {
		'components': {
			Slider,
			Rating
		},
		'props': {
			data: Object,
			index: Number
		},
		'computed': {
			
		},
		data () {
			return {
				'type': 'rating',
				'enablePlay': false,			// - enable/disable events
				'timeline': {
					'enablePlayDelay': 1000
				},
				'image': {
					'src': '/assets/images/singer.jpg'
				},
				'sliderData': {
					'startPoint': 'left',
					'value': 0.55,
				},
				'ratingData': {
					
				}
			}
		},
		'mounted': function() {
			setTimeout(() => {
				this.enablePlay = true;
			}, this.timeline.enablePlayDelay);
		},
		'methods': {
			
		}
	}
</script>

<style lang="scss">
	/* add scss support */
	/* <style lang="scss" scoped> */
	/* TODO: scoped styles and separate css for each component */
	 @import 'vote.scss';
</style>

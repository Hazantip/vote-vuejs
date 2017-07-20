<template>
	<div class="vote" :class="{ 'enable-play': enablePlay }">
		<div class="vote-main">

			<Slider v-if="type === 'slider'" :data="sliderData"></Slider>

			<Rating v-if="type === 'rating'" :data="ratingData"></Rating>

			<div class="vote-image" :style="[{ backgroundImage: 'url(' + this.image.src + ')' }]"></div>
			
			<transition name="fade">
				<div v-if="vote.done" class="vote-done" :class="{ animate: vote.animate}">
					<div class="vote-done__text">
						<span v-for="n in vote.doneLetters">{{ n }}</span>
						<span class="percent">
							<div class="percent-part"></div>
							<div class="percent-part"></div>
						</span>
					</div>
				</div>
			</transition>

		</div>

		<div class="vote-button__wrap">
			<transition name="fade">
				<button v-show="enablePlay" :disabled="vote.done" @click="onVote" class="vote-button">vote</button>
			</transition>
		</div>

	</div>
</template>

<script>
	import Slider from './slider.vue';
	import Rating from './rating.vue';

	const types = {
		'slider': 'slider',
		'rating': 'rating'
	};

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
				'type': this.$parent._data.type || types.rating,
				'enablePlay': false,			// - enable/disable events
				'timeline': {
					'enablePlayDelay': 5000,
					'showVoteResults': 300
				},
				'image': {
					'src': '/assets/images/singer.jpg'
				},
				'sliderData': {
					'startPoint': 'left',
					'value': 0.49,
				},
				'ratingData': {
					
				},
				'vote': {
					'results': 0.98,
					'done': false,
					'doneLetters': [],
					'animate': false,
					...this.$parent._data.vote
				},
				...this.data,
			}
		},
		mounted () {
			setTimeout(() => {
				this.enablePlay = true;
			}, this.timeline.enablePlayDelay);
		},
		'methods': {
			onVote () {
				this.vote.done = true;
				this.vote.doneLetters = `${this.vote.results * 100}`.split('');
				setTimeout(() => {
					this.vote.animate = true;
				}, this.timeline.showVoteResults);
			}
		}
	}
</script>

<style lang="scss">
	// TODO: scoped styles and separate css for each component
	@import 'vote.scss';
</style>

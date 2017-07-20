<template>
	<div>
		<div class="vote-rate">
			<div class="vote-rate__inner">
				<ul class="vote-rate__list" :class="{ ltr: startPoint === 'left' }">
					<li class="vote-rate__item" v-for="n in starsCount" @mousedown="onTap(n)" @touchstart="onTap(n)">
						<Star :active="selected >= n"></Star>
					</li>
				</ul>
			</div>
		</div>
		<!--<div class="vote-value" v-if="value !== null">{{ printValue() }}</div>-->
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueTouch from 'vue-touch';
	import Star from './star.vue';

	Vue.use(VueTouch);

	export default {
		'components': {
			Star
		},
		'props': {
			data: Object,
			index: Number
		},
		'computed': {
			
		},
		data () {
			return {
				'startPoint': 'left',			// - define direction from the point: left, right
				'starsCount': 5,
				'selected': 1,
				...this.data					// - parent data
			}
		},
		mounted () {
			
		},
		'methods': {
			onTap (props) {
				this.selected = props;
			},
			printValue () {
				return Math.round(this.value * 100);
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>

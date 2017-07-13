<template>
	<div class="slider" :class="{ 'enable-play': enablePlay }">
		<div class="slider-main">
			<div class="slider-scale">
				<div class="slider-scale__inner">
					<v-touch @tap="onTap">
						<div class="slider-scale__line" ref="line">
						</div>
					</v-touch>
				</div>
				<v-touch @panmove="onPanMove" @panend="onPanEnd">
					<span class="slider-scale__handle" :style="[style, {}]" :class="startPoint"></span>
				</v-touch>
			</div>
			<div class="slider-value" v-if="value !== null">{{ printValue() }}</div>
			<div class="slider-image" :style="[{ backgroundImage: 'url(' + this.image.src + ')' }]"></div>
		</div>
	</div>
</template>

<script>
//	import twentytwenty from '../../../common/components/TwentyTwenty.vue';
//	import infoContentComponent from './infoContent.vue';
//	import InfoActivityRecord from '../../../common/components/info/model';
	
	export default {
		'components': {
			//	twentytwenty,
			//	'info-content': infoContentComponent
		},
		'props': {
			//	data: Object,
			//	index: Number
		},
		'computed': {
			// --
		},
		data () {
			return {
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
				'image': {
					'src': '/assets/images/singer.jpg'
				},
				'style': {}						// - inline css object for handle
			}
		},
		'mounted': function() {
			// - set initial value for slider
			const width = this.getScale().clientWidth;
			this.setPosition({ 'type': 'force', 'positionX': width * 0.5 });
			// - set enable play
			setTimeout(() => {
				this.enablePlay = true;
			}, this.timeline.enablePlayDelay);
		},
		'methods': {
			'getScale': function () {
				const component = this.$parent.$el;
				return component.querySelector(this.scale.element);
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
					'transform': `translateX(${this.startPoint === 'left' ? positionX : -positionX}px)`
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
	}
</script>

<style lang="scss" scoped>
	/* add scss support */
	/* <style lang="scss" scoped> */
	 @import 'slider.scss';
</style>

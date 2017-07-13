<template>
	<div>
		<div class="vote-scale">
			<div class="vote-scale__inner">
				<v-touch @tap="onTap">
					<div class="vote-scale__line" ref="line">
					</div>
				</v-touch>
			</div>
			<v-touch @panmove="onPanMove" @panend="onPanEnd">
				<span class="vote-scale__handle" :style="[style, {}]" :class="startPoint"></span>
			</v-touch>
		</div>
		<div class="vote-value" v-if="value !== null">{{ printValue() }}</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import VueTouch from 'vue-touch';

	Vue.use(VueTouch);
	
	export default {
		'components': {
			
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
				'value': 0.5,
				'scale': {
					'element': '.vote-scale__line',
					'width': null				// - total scale height
				},
				'handle': {
					'position': {
						'x': 0					// - last handle position
					}
				},
				'style': {},					// - inline css object for handle
				...this.data					// - parent data
			}
		},
		'mounted': function() {
			// - set initial value for vote
			const width = this.getScale().clientWidth;
			this.setPosition({ 'type': 'force', 'positionX': width * this.value });
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
	
</style>

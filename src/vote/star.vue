<template>
	<svg class="star" :class="{ active: active }" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
		<path d="M443.892,254.143c-7.448-1.082-120.463-17.504-127.414-18.514l-56.982-115.457
			c-5.222-10.59-20.379-10.599-25.61,0l-56.982,115.457L49.49,254.143c-5.379,0.781-9.847,4.55-11.528,9.719
			c-1.679,5.17-0.278,10.845,3.614,14.639l92.197,89.869l-21.765,126.901c-1.994,11.636,10.258,20.553,20.72,15.054l113.964-59.914
			c123.988,65.185,115.628,61.552,120.606,61.552c8.801,0,15.578-7.933,14.076-16.694l-21.765-126.899l92.198-89.869
			C460.264,270.257,455.59,255.843,443.892,254.143z"/>
	</svg>
</template>

<script>
	
	export default {
		'props': {
			active: Boolean,
			index: Number
		},
		'computed': {},
		data () {
			return {
				
			}
		},
	}
</script>

<style lang="scss" scoped>
	
</style>

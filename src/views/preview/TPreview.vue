<script lang="ts">


export default {
	name: 'TPreview',
	components: {
		
	},
	data() {
		return {
			projectionExample: {}
		}
	},
	methods: {},
	computed: {
		mode() {
			return import.meta.env.VITE_PATH_MEDIA
		},
	},
	async created(){
		
	}
}
</script>

<template>
	<main flex="column" width-100 padding-inline-1 padding-block-start-1>
		<!-- <View360 :projection="projectionExample" id="viewer"/> -->
	</main>
</template>

<style scoped>
#viewer{
	border: 5px dotted cadetblue;
}
</style>
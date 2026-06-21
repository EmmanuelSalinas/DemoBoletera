<script lang="ts">
import { RouterView } from 'vue-router'
import THeader from '@/components/base/THeader.vue'

export default {
	name: 'TLayoutMain',
	components: {
		THeader,
		RouterView,
	},
	data: function () {
		return {
			isOpen: true,
		}
	},
	methods: {},
	created() {
		if (window.innerWidth <= window.innerHeight || window.innerWidth < 800) {
			this.isOpen = false
		}
	},
}
</script>

<template>
	<div class="main-layout" flex="column" id="main_layout_wrapper">
		<THeader />
		<div :is-open="isOpen" flex="column" class="main-layout__displayer-wrapper">
			<RouterView class="main-layout__displayer" />
		</div>
		
	</div>
</template>

<style scoped>
.main-layout {
	width: 100vw;
	max-width: 100%;
	height: 100dvh; /* o el tamaño que necesites */
  	overflow-y: auto;
}


.main-layout__displayer {
	/* background-image: url('@/assets/image/gallosBackgroundMain2.svg');
	background-repeat: no-repeat;
	background-size: cover; */
	flex: 1 1 auto;
}

.main-layout__displayer-wrapper {
	padding-top: 6rem !important;
	flex: 1 1 auto;
	/* border: 2px dashed orchid */
}

@media (orientation: portrait) or ((width >=300px) and (width <=850px)) {
	.main-layout__displayer-wrapper {
		padding-top: 5rem !important;
		overflow-y: auto;
	}
}
</style>
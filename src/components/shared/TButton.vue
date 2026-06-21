<script lang="ts">
import { routeLocationKey } from 'vue-router'
import router from '@/app/router'
export default {
	name: 'TButton',
	props: {
		type: {
			type: String,
			default: 'clickeable'
		},
		text: {
			type: String,
			default: '',
		},
		backgroundColor: {
			type: String,
			default: 'rgb(0,0,0)',
			required: false
		},
		color: {
			type: String,
			default: 'rgb(255,255,255)',
			required: false
		},
		border: {
			type: String,
			default: 'none',
			required: false
		},
		displayIconWrappper: {
			type: String,
			default: 'row',
		},
		icon: {
			type: [String, Object],
			default: null
			/* required: false */
		},

		class: {
			type: String,
			default: ''
		},
		disabled: {
			type: Boolean,
			default: false
		},
		idElement: {
			type: String,
			default: ''
		}
	},
	methods: {
		onClickButton(path: any) {
			if (path) {
				router.push({ path: path })
			}
		},
	},
	computed: {
		isComponentIcon() {
			return typeof this.icon === 'object'
		}
	}

}
</script>

<template>
	<button v-if="type == 'submit'" :style="{ color: color }" type:type :disabled="disabled" class="button" clickable>
		<span class="button__caption">{{ text }}</span>
	</button>
	<button v-else-if="type === 'clickeable'" :class="class"
		:style="{ color: color, background: backgroundColor, border: border }" :disabled="disabled" class="button"
		clickable @click="$emit('clicked')">
		<span :style="{
			display: 'flex',
			'flex-direction': (displayIconWrappper as any)
		}" :class="icon !== undefined ? 'hasIcon' : ''" class="button__caption">{{ text }}
			<template v-if="icon !== undefined">
				<component v-if="isComponentIcon" :is="icon" class="icon-svg" :style="{ 'color': color }" />

				<img v-else :style="{
					'margin-inline-end': ((text as any).length > 0 && displayIconWrappper === 'row-reverse') ? '0.5rem' : '0 !important',
					'margin-inline-start': ((text as any).length > 0 && displayIconWrappper === 'row') ? '0.5rem' : '0 !important',
				}" :src="(icon as any)" alt="">
			</template>
		</span>
	</button>
</template>

<style scoped>
.button,
.button_menu {
	display: flex;
	justify-content: center;
	align-items: center;
	padding-inline: 1.5rem;

}

.button__caption{
	font-family: 'SN Pro';
	font-size: 15px;
	font-weight: light !important;
	letter-spacing: 0.5px;
}
.button {
	border: none;
	border-radius: 0.375rem;
	height: 3rem;
}

button[disabled=true] {
	border-radius: 1.5625rem;
	width: 2.5rem;
	height: 2.5rem;
}



.hasIcon {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.hasIcon img {
	/* margin-inline-start: 1.5rem; */
	width: 2rem;
	height: 2rem;
	/* margin-right: 1rem; */
}

button:hover {
	cursor: pointer;
}

.button-file-icon {
	border: none;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	width: 2.2rem;
	height: 2.2rem;
	min-width: 2.2rem;
	min-height: 2.2rem;
	max-width: 2.2rem;
	max-height: 2.2rem;
	border-radius: 10%;
}

.button-file-icon>.hasIcon {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.button-file-icon>.hasIcon>img {
	padding-inline-end: 0;
}

.button-file-icon>.hasIcon:hover {
	border: none;
}

.icon-svg {
	width: 26px;
	height: 26px;
}

.noHasPadding {
	padding-inline: 0 !important;
	padding: .5rem;
}

.hasPaddingLanrge {
	padding-inline: 10rem !important;
}

.camera-button img {
	filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%) hue-rotate(330deg) brightness(106%) contrast(101%);
}

.pay-bonus__button img {
	filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(26%) hue-rotate(19deg) brightness(107%) contrast(105%);
	margin-right: 1rem;
}

@media only screen and (min-width: 500px) and (max-width: 799px) {
	.fan-id__button span {
		font-size: 1.4rem !important;
	}
}

@media only screen and (min-width: 800px) and (max-width: 1100px) {
	.fan-id__button span {
		font-size: 2rem !important;
	}

	.camera-button img {
		width: 15rem !important;
		height: 15rem !important;
	}
}
</style>

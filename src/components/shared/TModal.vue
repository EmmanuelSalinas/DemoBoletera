<script lang="ts">
import TButton from '@/components/shared/TButton.vue'
import TInput from '@/components/shared/TInput.vue'

export default {
	name: 'TModal',
	components: {
		TButton,
		TInput,
	},
	props: {
		isDocumentPrevie: {
			type: Boolean,
			default: false,
		},
		nameModal: {
			type: String,
			default: 'modalNameDefault'
		},
		style: {
			type: [String , Object],
		}
	},
	data: function () {
		return {}
	},
	methods: {
		onCloseModal(event: any) {
			const wrapperForm: any = this.$refs[this.nameModal]
			if (wrapperForm && !wrapperForm.contains(event.target)) {
				this.$emit('closeModal', this.nameModal)
			}
		},
	}
}
</script>

<template>
	<div class="modal" flex="column" @click="onCloseModal">
		<section class="modal__ticket" :ref="nameModal" :style="style" flex-row align-center justify-center>
			<span class="modal__close-icon" @click="$emit('closeModal')"></span>
			<section class="modal__wrapper-content" flex-column>
				<slot name="modal__title" />
				<span style="overflow: auto; margin-block: 1.5rem;" padding-3 width-100 ref="docInfo">
					<slot name="modal__content" />
				</span>
			</section>
		</section>
	</div>
</template>

<style scoped>


.modal__ticket {
	border-radius: 1rem;
	background: white;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	width: 60%;
	height: 80%;
	margin: auto;
	position: relative;
}

.modal__wrapper-content {
	/* border: 3px dashed yellow; */
	height: 100%;
	width: 80%;
}

.modal__close-icon {
	background-image: url('@/assets/icon/closeIcon.svg');
	height: 2.5rem;
	width: 2.5rem;
	position: absolute;
	right: 6rem;
	top: 3rem;
	background-repeat: no-repeat;
	background-size: cover;
	background-position-x: right;
	background-position-y: bottom;
}

.modal__close-icon:hover {
	cursor: pointer;
	transform: scale(1.1);
}

.modal {
	top: 0;
	left: 0;
	position: fixed;
	display: flex;
	z-index: 9999999999999 !important;
	height: 100dvh;
	width: 100vw;
	overflow-y: auto;
	transition: opacity 0.3s ease;
	background: color-mix(in srgb, rgb(36, 40, 51), transparent 30%);
}

@media (orientation: portrait) and ((width >= 320px) and (width <= 500px)){
	.modal__ticket{
		width: 100% !important;
	}

	.modal__wrapper-content > span{
		padding-inline: 0 !important;
	}
} 
</style>

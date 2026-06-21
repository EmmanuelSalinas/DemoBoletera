<script lang="ts">
export default {
	name: 'TCheckbox',
	props: {
		is_active: {
			type: Boolean,
			default: true,
		},
		value: {
			type: Boolean,
		},
		label: {
			type: String,
			default: '',
		},
		style: {
			type: [Object, String],
		},
		idElement: {
			type: String,
			default: 'checkComponent'
		},
		nameGroup: {
			type: String,
			default: ''
		},
		inLine: {
			type: Boolean,
			default: false
		},
		class: {
			type: String,
			default: ''
		},


	},

	methods: {
		emitValue(event: any) {

			/* this.$emit('input:value', (event.target as HTMLInputElement).value) */
			this.$emit('input:value', Boolean(this.value))
		}
	},
	computed: {
		isChecked() {
			if (this.value === true) {
				return true
			} else {
				return false
			}


		},
	},
}
</script>

<template>
	<div class="checkbox" flex-column :class="(inLine) ? 'checkbox-inline' : null">
		<label for="checkbox__input_1" class="checkbox__label"></label>
		<input :active="is_active" type="checkbox" id="checkbox__input_1" class="checkbox__input" :checked="isChecked"
			:value="value" @input="emitValue" :name="nameGroup" />
		<label :class="class" class="input__label" for=""><small :style="style">{{ label }}</small></label>
		<slot name="check__content" />
	</div>

</template>

<style scoped>
.text-card {
	flex-wrap: wrap;
}

.isLarge-wrapper {
	/* flex-wrap: wrap; */
	/* border-bottom: groove; */
}

.input__label>small {
	color: black;
	font-size: .8rem;
}

.subtitle__label {
	font-weight: 700;
}

.title__label {
	color: #263238;
	font-weight: 800;
}

.amount__label {
	color: #000462;
	font-weight: 700;
	font-size: xx-large;
	align-self: center;
}

.checkbox {
	display: flex;
	/* justify-content: space-between; */
}

input[type='checkbox'].checkbox__input {
	width: 2rem;
	height: 2rem;
	-webkit-appearance: none;
	background: gainsboro;
	cursor: pointer;
}

input:checked[type='checkbox']::after {
	content: url(../../assets/icon/checked.svg);
	background: var(--business-entity-blue-ray);
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	width: 100%;
}

input[type='checkbox'].checkbox__input,
input:checked[type='checkbox']::after {
	border-radius: 0.25rem;
}

.checkbox__input[active='false'] {
	pointer-events: none;
}

.checkbox-inline {
	flex-direction: row;
	padding-block: 1rem;
	align-items: center;
}

.checkbox-inline label {
	padding-left: 1rem;
}

@media only screen and (min-width: 500px) and (max-width: 800px) {
	.terms__conditions small {
		font-size: .9rem !important;
	}
}

@media only screen and (min-width: 800px) and (max-width: 1100px) {
	.terms__conditions small {
		font-size: 1.4rem !important;
	}
}
</style>

<script lang="ts">
export default {
	name: 'TInput',
	data() {
		return {
			valueQuantity: '',
			valueSearcher: '',
			MaskQuantityData: {
				decimal: '.',
				separator: ',',
				prefix: '$ ',
				precision: 2,
				masked: false,
				placeholder: this.placeholder,
			},
			MaskKilometersData: {
				decimal: '.',
				separator: ',',
				prefix: ' ',
				suffix: 'Km',
				precision: 2,
				masked: false,
				placeholder: this.placeholder,
			},
			MaskHoursData: {
				decimal: '.',
				separator: '',
				prefix: '',
				suffix: 'Hrs',
				precision: 2,
				masked: false,
				placeholder: this.placeholder,
			},
			MaskIvaData: {
				decimal: '.',
				separator: ',',
				prefix: '',
				suffix: '%',
				precision: 2,
				nullValue: '',
				masked: false,
				reverseFill: false,
				minimumFractionDigits: 1,
				max: 100,
				placeholder: this.placeholder,

			},
			MaskRetentionData: {
				decimal: '.',
				separator: ',',
				prefix: '',
				suffix: '%',
				precision: 2,
				nullValue: '',
				masked: false,
				reverseFill: false,
				minimumFractionDigits: 1,
				max: 100,
				placeholder: this.placeholder,

			},
			MaskNumericInteger: {
				decimal: '.',
				separator: ',',
				prefix: '',
				suffix: '',
				precision: 0,
				nullValue: '',
				masked: false,
				reverseFill: false,
				minimumFractionDigits: 0,
				max: 9999999999,
				placeholder: this.placeholder,

			},
		}
	},
	methods: {
		lawhila() {
			this.$emit('functionEmit')
		},
		__emitValue(event: any, type: any, regex: any) {
			const valor = (event.target as HTMLInputElement).value
			if (type == 'numeric') {
				if (
					!new RegExp(/[0-9]/).test(event.key) ||
					event.target.value.length > 9
				) {
					return event.preventDefault()
				}
				this.$emit('input:value', valor)
				this.$emit('update:modelValue', valor)
			} else if (type == 'numericWithoutLength') {
				if (!new RegExp(/[0-9]/).test(event.key)) {
					return event.preventDefault()
				}
				this.$emit('input:value', valor)
				this.$emit('update:modelValue', valor)
			} else if (type == 'rfc') {
				if (event.target.value.length > 12) {
					return event.preventDefault()
				}
				this.$emit('input:value', valor)
				this.$emit('update:modelValue', valor)
			} else if (type == 'curp') {
				if (event.target.value.length > 17) {
					return event.preventDefault()
				}
				this.$emit('input:value', valor)
				this.$emit('update:modelValue', valor)
			} else if (type == 'nss') {
				if (
					!new RegExp(/[0-9]/).test(event.key) ||
					event.target.value.length > 10
				) {
					return event.preventDefault()
				}
				this.$emit('input:value', valor)
				this.$emit('update:modelValue', valor)
			} else if (type == 'numericOnly') {
				if (
					(!new RegExp(/[0-9]/).test(event.key) && event.key != '.') ||
					event.target.value.length > this.lengthInformation
				) {
					return event.preventDefault()
				}
				this.$emit('input:value', valor)
				this.$emit('update:modelValue', valor)
			} else {
				if (event.target.value.length <= this.lengthInformation) {
					this.$emit('input:value', valor)
					this.$emit('update:modelValue', valor)
				} else {
					return event.preventDefault()
				}
			}
		},
		__emitValueQuantity(event: any) {
			let value = (event.target as HTMLInputElement as any).unmasked
			if (value.length <= this.lengthInformation) {
				this.$emit('input:value', (event.target as HTMLInputElement as any).unmasked)
				this.$emit('update:modelValue', value)
			} else {
				return event.preventDefault()

			}
		},
		__handleInput(event: Event) {
	const valor = (event.target as HTMLInputElement).value;
	this.$emit('input:value', valor);
	this.$emit('update:modelValue', valor);
},
		clickFileUpload() {
			//@ts-ignore
			this.$refs.inputCaptcha.click()
		}
	},
	props: {
		is_active: {
			type: Boolean,
			default: true,
		},
		value: {
			type: [String, Number],
		},
		modelValue: [String, Number],
		label: {
			type: String,
		},
		type: {
			type: String,
		},
		placeholder: {
			type: String,
		},
		error: {
			type: String,
			default: '',
		},
		regex: {
			type: undefined,
		},
		classText: {
			type: String,
			default: ''
		},
		hasBorder: {
			type: Boolean,
			default: true,
		},
		iconMony: {
			type: Boolean,
			default: false,
		},
		is_searcher: {
			type: Boolean,
			default: false,
		},
		is_fileInput: {
			type: Boolean,
			default: false,
		},
		lengthInformation: {
			type: Number,
			default: 500,
		},
		is_KG: {
			type: Boolean,
			default: false,
		},
		idInput: {
			type: String,
			required: false,
		},
		isUpperCase: {
			type: Boolean,
			default: false,
		},

	},
	computed: {
		mode() {
			return import.meta.env.VITE_PATH_MEDIA
		},
		currentValue() {
			return this.modelValue !== undefined ? this.modelValue : this.value
		}
	},
	mounted() {
		if (typeof this.value === 'number') {
			(this.valueQuantity as any) = this.value
		}
		if (this.type?.toString() === 'search') {
			(this.valueSearcher as any) = this.value
		}
	},
	watch: {
		value() {
			(this.valueSearcher as any) = this.value
		}
	}
}
</script>

<template>
	<!-- inputs -->
	<div v-if="type?.toString() != 'search' && type?.toString() != 'quantity' && type?.toString() != 'integer'"
		:is_searcher="is_searcher" class="input" flex-column :style="{
			position: is_fileInput ? 'relative' : 'relative'
		}">
		<label class="input__label" :class="classText" for="">{{ label }}</label>
		<input ref="inputCaptcha" class="input__captcha" :value="currentValue"
			:class="{ [classText]: true, 'border-red': error.length > 0, 'hasPaddingTop': is_fileInput }"
			:iconMony="iconMony" :iconKG="is_KG" :active="is_active" :hasBorder="hasBorder" :is_searcher="is_searcher"
			:id="idInput" :isUpperCase="isUpperCase" v-bind="{ type: type, placeholder: placeholder }"
			@input="__handleInput" @blur="$emit('blurElement')"
			@keypress="__emitValue($event, type, regex)" />
		<span @click="clickFileUpload" v-if="is_fileInput" class="input__captcha-icon-file"> </span>

		<label class="input__label input__error-message" for="" small>{{ error }}</label>
	</div>
	<div v-else-if="type.toString() === 'quantity'" class="input" flex-column>
		<label :class="classText" class="input__label" for="">{{ label }}</label>
		<vue-number :class="classText" flex="row" basis="100" grow="1" class="input__captcha" :active="is_active"
			:hasBorder="hasBorder" :max="lengthInformation" v-model="valueQuantity" v-bind="MaskQuantityData"
			@input="__emitValueQuantity($event)"></vue-number>
		<label class="input__label input__error-message" for="" small>
			{{ error }}
		</label>
	</div>
	<div v-else-if="type.toString() === 'integer'" class="input" flex-column>
		<label :class="classText" class="input__label" for="">{{ label }}</label>
		<vue-number :class="classText" flex="row" basis="100" grow="1" class="input__captcha" :active="is_active"
			:hasBorder="hasBorder" v-model="valueQuantity" v-bind="MaskNumericInteger"
			@input="__emitValueQuantity($event)"></vue-number>
		<label class="input__label input__error-message" for="" small>
			{{ error }}
		</label>
	</div>
	<!-- only input search, this wrap a button inside -->
	<div v-else class="input input-search" flex-row>
		<label class="input__label" for="" :class="classText">{{ label }}</label>
		<span class="searchWraperInput">
			<input id="searcher" class="input__captcha" v-model="valueSearcher" v-bind="{ placeholder: placeholder }"
				@input="__handleInput"
				@keypress="__emitValue($event, type, regex)" />
<div flex-row justify-center align-center style="padding-inline-end: 15px;">
	<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  width="30px"
  height="30px"
  fill="none" 
  stroke="#5D6966" 
  stroke-width="2.5" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <circle cx="11" cy="11" r="7" />
  <line x1="21" y1="21" x2="16.65" y2="16.65" />
</svg>
</div>
		</span>
		<!-- <label class="input__label input__error-message" small
			><small>{{ error }}</small></label
		> -->
	</div>
</template>
<style scoped>
.textWhite {
	color: white !important;
}


.input__captcha.textWhite {
	background-color: white !important;
	border: 0.2px solid rgb(255 255 255) !important;
	color: black !important;
}

.textWhite::placeholder {
	color: rgb(100, 100, 100) !important;
}

.input__label {
	color: black;
}

form,
.input>.input__captcha {
	margin-block: 0.25rem;
}

.input__captcha {
	height: 3.125rem;
	min-height: 3.125rem;
	border: none;
	padding-inline: 1rem;
	flex: 1 1 auto;
	background: transparent !important;
	color: black !important;
	border: 0.125rem solid rgba(36, 40, 51, 0.5);
	border-radius: 7px;
}

.input__captcha.border-red {
	border: 0.125rem solid rgba(220, 0, 77, 1);
}

.input>.input__captcha:focus,
.input>.input__captcha:hover {
	outline: none;
	border: 0.125rem solid rgba(0, 0, 0, 0.8);
	cursor: pointer;
}

.input>.input__captcha.border-red:focus,
.input>.input__captcha.border-red:hover {
	outline: none;
	border: 0.125rem solid rgba(220, 0, 77, 1);
	cursor: pointer;
}

/* ----------------------------------------------------------- */
::-webkit-calendar-picker-indicator {
	filter: invert(48%) sepia(3%) saturate(11%) hue-rotate(344deg) brightness(89%) contrast(84%);
}

/* ----------------------------------------------------------- */

[hasBorder='false'] {
	border: none;
	cursor: not-allowed;
}

[active='false'] {
	pointer-events: none;
	cursor: not-allowed;
	background: none;
	padding: 0;
}

[hasBorder='false'] :hover {
	cursor: not-allowed !important;
}

[active='false'] :hover {
	cursor: not-allowed !important;
}

[hasBorder='true'] {
	background: none;
	padding-inline: 1rem;
}

/* --------------------------------- */
.input-search {
	align-items: baseline;
	column-gap: 0.5rem;
	/* flex: 1 1 auto; */
}

.input-search input {
	/* border: none; */
}

.input__captcha:hover {
	cursor: pointer;
}

.input__captcha[type='date'] {
	color: var(--color-neutral-600) !important;
	padding-inline: 1rem;
}

.input__captcha[type='date'][hasBorder='false']::-webkit-inner-spin-button,
.input__captcha[type='date'][hasBorder='false']::-webkit-calendar-picker-indicator,
.input__captcha[type='datetime-local'][hasBorder='false']::-webkit-inner-spin-button,
.input__captcha[type='datetime-local'][hasBorder='false']::-webkit-calendar-picker-indicator {
	display: none;
	-webkit-appearance: none;
}

.input__captcha[type='date']::placeholder {
	content: 'YYYY-MM-DD' !important;
}

.input__captcha[iconMony='true'] {
	/* background: url('@/assets/icon/dashboard/cashIcon.svg') no-repeat right; */
	background-size: 1.5rem;
	background-position: 98% 50%;
}

.input__captcha[iconKG='true'] {
	/* background: url('@/assets/icon/money.svg') no-repeat right; */
	background-size: 1.5rem;
	background-position: 98% 50%;
}

.input__captcha[type='date'][hasBorder='false'] {
	padding-inline: 0;
}

.input__captcha[is_searcher='true'] {
	margin-block-start: 0.25rem;
	margin-block-end: 0;
}

.input[is_searcher='true'] {
	position: relative;
}

.input__captcha-icon {
	/* background: url('@/assets/icon/search.svg') no-repeat right; */
	background-size: 1.5rem;
	background-position: 98% 50%;
	height: 2rem;
	width: 2rem;
	position: absolute;
	left: 93%;
	top: 25%;
}

.input__captcha-icon-file {
	/* background: url('@/assets/icon/loadFile.svg') no-repeat right; */
	background-size: 1.5rem;
	background-position: 98% 50%;
	height: 2rem;
	width: 2rem;
	position: absolute;
	right: 1rem;
	top: 25%;
}

.input__captcha-icon-KG {
	/* background: url('@/assets/icon/search.svg') no-repeat right; */
	background-size: 1.5rem;
	background-position: 98% 50%;
	height: 2rem;
	width: 2rem;
	position: absolute;
	left: 93%;
	top: 25%;
}

.input__captcha[is_searcher='true']:hover,
.input__captcha[is_searcher='true']:focus {
	border: none;
}

.input__captcha[isUpperCase='true'] {
	text-transform: uppercase;
}

.input__captcha[isUpperCase='true']::-webkit-input-placeholder {
	text-transform: none;
}

.input__form {
	flex: 1 1 auto;
	margin: 0;
	height: 3.25rem;
	margin-block-start: 0.25rem;
}

.whiteText {
	color: white !important;
}

.text-align-end {
	text-align: end;
}

.input__captcha[hasBorder='false']:hover {
	cursor: not-allowed;
}

@media (orientation: portrait) or (width <=900px) {
	/* .input__captcha{
			font-size: 1.1rem;
		} */

	.input__captcha {
		height: 4rem;
		font-size: 1.3rem;
		border: none;
		border-radius: 0.375rem;
		padding-inline: 1rem;
		flex: 1 1 auto;
		background: white;
		color: var(--color-neutral-500) !important;
		border: 0.125rem solid rgba(36, 40, 51, 0.5);
	}

	.input__label {
		font-size: 1.2rem;
	}
}

input[type="date"]::-webkit-calendar-picker-indicator {
	display: block;
	/* background: url('@/assets/icon/calendarIcon.svg') no-repeat; */
	/* width: 20px;
	height: 20px; */
	border-width: thin;
}

input[type=file]::file-selector-button {
	display: none;
}

.hasPaddingTop {
	padding-top: 12px;
}

/* {
	display: none;
}

input[type=file] {
	width: auto;
} */


.searchWraperInput {
	display: flex;
	flex-direction: row;
	width: 100%;
	border: 2px solid var( --color-neutral-100);
	border-radius: 10px;
	box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.searchWraperInput:focus-within {
	border: 2px solid var(--color-primary-light);
}

.searchWraperInput>.input__captcha {
	border: none;
}

.searchWraperInput>.input__captcha:focus-visible {
	outline: none;
}

.searchWraperInput>img {
	margin-inline-end: 1rem;
}

/* VUE 3DS SDSD
	ASAASSS DENTRO DE ESTAS HISTORIAS SE CUENTA QUE LUCIFER ES UN ANGEL TERRIBLE, TELIBLE LOCO 
	CUANDO ESTABA LEJOS SE VEIA UNA FIGURA SOMBRIA DETRAS DE MI SAAS BNNNNB BVNSASAS 
*/
@media only screen and (min-width: 500px) and (max-width: 700px) {}

@media only screen and (min-width: 700px) and (max-width: 1100px) {
	.fan-id__information label {
		font-size: 1.4rem !important;
	}
	.fan-id__information input {
		height: 4.4rem !important;
	}
}
</style>

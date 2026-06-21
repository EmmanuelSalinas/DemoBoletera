<script lang="ts">
import TButton from '@/components/shared/TButton.vue'
import TModal from '@/components/shared/TModal.vue'
import TInput from '@/components/shared/TInput.vue'
import backend from '@/app/backend'
import Swal from 'sweetalert2'
/* @ts-ignore */
import { mapActions } from 'vuex'
export default {
	name: 'TLogin',
	components: {
		TInput,
		TButton,
		TModal,
	},
	props: {
		viewDisplayer: {
			type: String,
			default: 'default'
		},
		text: {
			type: String,
			default: 'Estas a un paso de completar tu compra, solo tienes que iniciar sesión en tu cuenta'
		}
	},
	data() {
		return {
			formLogin: {
				email: '',
				password: ''
			},
			errorformLogin: {
				email: '',
				password: ''
			},
			editInfo: {
				isOpenForgotPassModal: false
			},
			formForgotPass: {
				email: ''
			},
			errorsFormForgotPass: {
				mail: '',
			},
		}
	},
	methods: {
		...mapActions('session', ['useDataUser']),
		async onSendResetPass() {
			try {

				const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
				let isValidMail: any = false
				this.formForgotPass.email.length === 0 ? this.errorsFormForgotPass.mail = 'Campo vacio' : (regexEmail.test(this.formForgotPass.email) === false ? (this.errorsFormForgotPass.mail = 'El correo no tiene un formato valido') : isValidMail = true)

				if (isValidMail) {
					Swal.fire({
						title: 'Espera un momento',
						text: 'Al continuar con el proceso te llegará un correo electronico con tu nueva contraseña, ¿estas seguro de continuar?',
						confirmButtonText: 'Aceptar',
						showCancelButton: true,
						cancelButtonText: 'Cancelar',
						reverseButtons: true
					}).then(async (result) => {
						if (result.isConfirmed) {
							const { data, status } = await backend.post('/public/forgot-password', this.formForgotPass)
							if (status === 200) {
								this.editInfo.isOpenForgotPassModal = false
								this.formForgotPass.email = ''
								this.errorsFormForgotPass.mail = ''
								Swal.fire({
									title: 'Excelente',
									text: 'Ahora pouedes ir a tu correo electronico, en el encontraras tus nuevas credenciales para el acceso a la plataforma.',
									confirmButtonText: 'Aceptar',
								})
							} else {
								Swal.fire({
									title: 'Algo salio mal',
									text: data.message,
									confirmButtonText: 'Aceptar',
								})
							}
						}
					})
				}
			} catch (error) {
				console.log(error);
			}
		},
		async logginFirebaseWithCredentials() {
			/* const errorsForm = await this.validateForm()
			if (errorsForm === 0) {
				const auth = getAuth();
				signInWithEmailAndPassword(auth, this.formLogin.email, this.formLogin.password).then(async (userCredential: any) => {
					await this.loginSystem()
					const user = userCredential.user;
				}).catch((error: any) => {
					const errorCode = error.code;
					const errorMessage = error.message;
				});
			} */
		},
		logginFirebaseWithGoogle() {
			/* const auth = getAuth();
			const provider = new GoogleAuthProvider();
			signInWithPopup(auth, provider).then(async (result: any) => {
				
				// This gives you a Google Accessa Token. You can use it to access the Google API.
				const credential: any = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				let isAuthFirebase: any = isfirebaseAuth()
				
				this.formLogin.email = user.email
				this.formLogin.password = user.uid
				await this.loginSystem()
			}).catch((error: any) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
				this.formLogin.email = ''
				this.formLogin.password = ''
			}); */
		},
		async loginSystem() {
			try {
				const errorsForm = await this.validateForm()
				if (errorsForm === 0) {
					const { data, status } = await backend.post('/public/login', this.formLogin)
					console.log(data , status, ' Esta es la dataaaaaa--->');
					
					if (status === 200) {
						(this as any).useDataUser(data)
						if (this.viewDisplayer === 'default') {
							this.$router.push({ name: 'TLandingPage' })
						} else {
							this.$emit('successLogin')
						}
					}else if(status === 206){
						Swal.fire({
							icon:'warning',
							title: 'Espera un momento',
							text: data.message,
							confirmButtonText: 'Aceptar',
						}).then((response)=> {
							this.$router.push({
								name: 'TRegistry',
								query: { 
									emailToConfirm: this.formLogin.email
								}
							})
							
						})
					} else {
						this.formLogin.email = ''
						this.formLogin.password = ''
						Swal.fire({
							icon:'error',
							title: 'Algo salio mal',
							text: data.message,
							confirmButtonText: 'Aceptar',
						})
					}
				}
			} catch (error) {
				console.log(error);
			}
		},
		validateForm() {
			let counter = 0
			const errorVoidMessage = 'No se aceptan campos vacios'
			this.formLogin.email.length === 0 ? (this.errorformLogin.email = errorVoidMessage, counter++) : null
			this.formLogin.password.length === 0 ? (this.errorformLogin.password = errorVoidMessage, counter++) : null

			return counter
		},
		async closeModal() {
			try {
				this.editInfo.isOpenForgotPassModal = false
			} catch (error) {
				console.log(error);
			}
		},
		async confirmEmail(emailHashed: any) {
			try {
				const { data, status } = await backend.post('public/user/confirm', { email: emailHashed })
				if (status === 200) {
					Swal.fire({
						title: 'Excelente',
						text: 'Tu correo ha sido validado de forma correcta',
						confirmButtonText: 'Aceptar',
					}).then(async (result) => {
						this.$router.push({ name: 'TLogin' })
					})

				}
				/* const { events } = data */
			} catch (error: any) {
				console.log(error)
			}
		},
		validClickRegistry(){
			try{
				if (this.viewDisplayer === 'default') {
							this.$router.push({ name: 'TRegistry' })
				} else {
					this.$emit('seeRegistry')
				}
			}catch(error){
				console.log(error);
			}
		}
	},
	async created() {
		/* let isAuthFirebase: any = isfirebaseAuth() */


		if (this.$route.query.data) {
			await this.confirmEmail(this.$route.query.data)
		}
	}
}
</script>

<template>
	<main class="loggin" flex="row" wrap width-100 justify-center>
		<header basis="100" class="loggin__header-wrap" padding-block-end-2>
			<h1 padding-2 class="login__title-text" :class="viewDisplayer==='purchaseTickets' ? 'login__title-text-small' : ''" text-center>INICIA SESIÓN EN TU CUENTA</h1>
			<h5  v-if="viewDisplayer !== 'purchaseTickets'" text-center padding-inline-1>
				{{ text }}
			</h5>
		</header>
		<section basis="50" class="loggin__wrapper-content" flex="row" wrap>

			<TInput basis="100" grow="1" type="text" v-bind="{
				label: 'Correo electrónico',
				placeholder: 'Ingresa tu correo electrónico',
				classText: 'rgb(0, 4, 98)',
				error: errorformLogin.email,
				value: formLogin.email
			}" @input="(event: any) => {
				errorformLogin.email.length > 0 ? errorformLogin.email = '' : null
				formLogin.email = event.target.value
			}" />
			<TInput basis="100" grow="1" type="password" v-bind="{
				label: 'Contraseña',
				placeholder: 'Ingresa tu contraseña',
				classText: 'rgb(0, 4, 98)',
				error: errorformLogin.password,
				value: formLogin.password
			}" @input="(event: any) => {
				errorformLogin.password.length > 0 ? errorformLogin.password = '' : null
				formLogin.password = event.target.value
			}" />
			<TButton v-if="viewDisplayer === 'default'" basis="100" grow="1" margin-block-end-2 v-bind="{
				text: '¿Olvidaste tu contraseña?',
				type: 'clickeable',
				color: 'var(--gallos-orange)',
				backgroundColor: 'transparent'
			}" @click="() => {
				editInfo.isOpenForgotPassModal = true
			}" />
			<TButton button-border-radius basis="100" grow="1" v-bind="{
				text: 'Iniciar sesión',
				type: 'clickeable',
				backgroundColor: 'var(--gallos-orange)'
			}" @click.prevent="loginSystem()" />

			<span flex="row" justify-center width-100 padding-2>o</span>
			<article flex='column' align-center width-100>
				<header flex="row" width-100 justify-center>
					<p text-center>Logeate con alguna red social</p>
				</header>
				<form action="" padding-block flex="row" col-gap="1">
					<button class="user-signin__button-social-network disabledBtn" icon='apple' @click="" type="button"></button>
					<button class="user-signin__button-social-network" icon='google' @click="logginFirebaseWithGoogle()"
						type="button"></button>
					<button class="user-signin__button-social-network disabledBtn" icon='facebook2' @click=""
						type="button"></button>
				</form>
				<p  text-center>¿Aun no tienes cuenta?<a style="color: var(--gallos-orange); text-decoration: none; cursor: pointer;" @click="validClickRegistry()"> Registrate
						ahora</a></p>
			</article>
			<!-- <span flex-row>
				<p>aqui van los iconos</p>
			</span> -->
			<TModal v-if="editInfo.isOpenForgotPassModal" @closeModal="closeModal" :style="'height: auto !important;'">
				<template #modal__title>
					<h1 class="wrapper__title-modal" text-center padding-block-start-2>Recuperación de Contraseña</h1>
				</template>
				<template #modal__content>
					<section class="content-modal-wrapper">
						<p padding-block>Si haz olvidado tu contraseña, no te preocupes, llena los campos y te
							enviaremos un correo
							con las instrucciones correspondientes</p>


						<TInput basis="100" grow="1" type="text" v-bind="{
							label: 'Correo electrónico',
							placeholder: 'Ingresa tu correo electrónico',
							classText: 'rgb(0, 4, 98)',
							error: errorsFormForgotPass.mail,
							value: formForgotPass.email
						}" @input="(event: any) => {
							errorsFormForgotPass.mail.length > 0 ? errorsFormForgotPass.mail = '' : null
							formForgotPass.email = event.target.value
						}" />


						<span flex-row basis="100" col-gap="1" padding-block-start-2>
							<TButton basis="50" margin-block-end-2 v-bind="{
								text: 'Cancelar',
								type: 'clickeable',
								backgroundColor: 'rgb(0, 6, 137)'
							}" @click="closeModal()" />
							<TButton basis="50" v-bind="{
								text: 'Recuperar Contraseña',
								type: 'clickeable',
								backgroundColor: 'rgb(0, 6, 137)'
							}" @click.prevent="onSendResetPass" />
						</span>

					</section>
				</template>
			</TModal>
		</section>
	</main>
</template>
<style scoped>
button {
	cursor: pointer;
}

a {
	color: black;
	text-decoration: underline;
	font-weight: 600;
}

.loggin {
	padding-block-end: 2rem;
	align-content: center;
}

.login__title-text {
	color: black;
}

.login__title-text-small {
	font-size: 1.5rem;
}

@media only screen and (max-width: 600px){
	.loggin__wrapper-content{
		flex-basis: 90%;
	}
}


</style>

<script lang="ts">
/* import TAsideLink from '../shared/TAsideLink.vue'; */
import TButton from '../shared/TButton.vue';
/* import TButtonCircleMenu from '@/components/shared/TButtonCircleMenu.vue' */
/* import { mapGetters, mapActions } from 'vuex'
import backend from '@/app/backend' */
import { useRoute } from 'vue-router'
export default {
	name: 'THeader',
	components: { /* TAsideLink, */ TButton, /* TButtonCircleMenu */ },
	setup() {
        return {
            
        }
    },
	data: function () {
		return {
			activeSection: 'landing__inicio',/* este es el id de la seccion de la landing */
			showAsideMenu: false,
			compactContent: false,
			keysComponent: {
				userButton: 0,
			},
			toggelMenu: false,
			links_profile: [
				{
					path: '/system/profile-base/account',
					title: 'Perfil',
					/* image: (import.meta.env.MODE === 'development' ? '/src' : '') +
						'/assets/icon/LogOut-Icon.svg', */
				},
				{
					path: '/system/profile-base/events',
					title: 'Mis eventos',
					/* image: (import.meta.env.MODE === 'development' ? '/src' : '') +
						'/assets/icon/LogOut-Icon.svg', */
				},
				{
					path: '/system/inicio',
					title: 'Cerrar sesión',
					/* image: (import.meta.env.MODE === 'development' ? '/src' : '') +
						'/assets/icon/LogOut-Icon.svg', */
				},
			],
			links_profileToAside: [
				{
					/* path: '/system/profile-base/account', */
					name: 'TProfile__account',
					title: 'Mi Perfil',
					/* image: (import.meta.env.MODE === 'development' ? '/src' : '') +
						'/assets/icon/LogOut-Icon.svg', */
				},
				{
					/* path: '/system/profile-base/events', */
					name: 'TProfile__events',
					title: 'Mis Eventos',
					/* image: (import.meta.env.MODE === 'development' ? '/src' : '') +
						'/assets/icon/LogOut-Icon.svg', */
				},

			],
			linksLanding2: [
				{
					/* nameCan: 'Dashboard', */
					name: 'TLandingPage',
					title: 'Home'
				},
				{
					name: 'TListEvents',
					title: 'Compra de Boletos'
				}

			],
			linksLanding: [
			],
			linksLandingConst: [
				/* {
					idDOM: 'landing__inicio',
					title: 'INICIO'
				}, */
				{
					idDOM: 'landing__inicio',
					title: 'Inicio'
				},
				{
					idDOM: 'landing__noticias',
					title: 'Funcionalidades'
				},
				{
					idDOM: 'landing__noticias',
					title: 'Contacto'
				},
			],
			srcImgProfile: '',
			imageProducer: 'images/escGray.png',
		}
	},
	methods: {
		onSelectView() {
			const widthScreen = window.innerWidth
			if (widthScreen < 1000) {
				this.toggletoggelMenu()
			}
		},
		toggletoggelMenu() {
			this.showAsideMenu = !this.showAsideMenu
		},
		async errorTestPetition() {
			try {
				/* const { data, status } = await backend.get('events/reservation2222/')

				if (status === 200) {

				} else {

				} */
			} catch (error) {
				console.log(error);
			}
		},
		/* ...mapActions('session', ['logout']), */
		logoutAccount() {
			this.showAsideMenu = false
			/* this.logout() */
			this.$router.push({ name: 'TLandingPage' })
		},
		scrollToID(idContainer: any) {

			const element = document.getElementById(idContainer);
			if (element) {
				const offset = element.offsetTop;
				element.scrollIntoView({
					behavior: 'smooth',
				});
				this.activeSection = idContainer;
			}
		},
		handleScroll() {
			const scrollPosition = window.scrollY + 72 // Ajusta este valor según el header si es sticky

			this.linksLanding.forEach((element) => {
				const sectionId = (element as any).idDOM
				const section = document.getElementById(sectionId)

				if (section) {
					const rect = section.getBoundingClientRect()
					const offsetTop = window.scrollY + rect.top
					const offsetBottom = offsetTop + section.offsetHeight

					if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
						if (this.activeSection !== sectionId) {
							this.activeSection = sectionId
						}
					}
				}
			})
		},
		goToLoginAsideOption() {
			this.$router.push({ name: 'TLogin' });
			this.showAsideMenu = false
		},
	},
	computed: {
		mode() {
			return import.meta.env.VITE_PATH_MEDIA
		},
		getWidthScreen() {
			return window.innerWidth
		},

		isVisible() {
			const widthS: any = window.innerWidth
			if (widthS <= 1000) return true
				else return false
		},
	},
	mounted() {
		const landingMain: any = document.getElementById('displayer');
		if (landingMain !== undefined) {
			landingMain.addEventListener('scroll', this.handleScroll);
		} else {
			console.log('NO EXISTE THEADER');

		}


	},
	async created() {
		if (this.$route.name === 'TLandingPage') (this.linksLanding as any) = this.linksLandingConst 
			else (this.linksLanding as any) = []
	},
	watch: {
		'$route'(route) {
			// muestra los links de la landing solo si estas en la ruta de la landing
			if (route.name === 'TLandingPage') (this.linksLanding as any) = this.linksLandingConst 
				else (this.linksLanding as any) = []
		}
	}
}
</script>
<template>
	<header flex-row class="header-wrapper">
		<figure class="aside__image-wrapper" basis="20" flex-row justify-center align-center>
			<img class="gallosIcon" :src="mode + imageProducer" alt=""
				@click="()=>{
					$router.push({ name: 'TLandingPage', })
				}" style="margin-block: auto; " />
		</figure>
		<span  :compact="compactContent" flex-row align-center justify-space-between grow-1
			class="menu-routes__wrapper">
			<!-- <slot name="slot__sectionsLanding" /> -->
			<div flex-row style="" class="landing__sections-wrapper">
				<span v-for="(item, index) in linksLanding" :key="index" style="margin-inline: 2rem;">
					<p class="landing__sections-wrapper__item"
						:class="{ section_active: activeSection === (item as any).idDOM }"
						@click="() => { scrollToID((item as any).idDOM) }">{{ (item as any).title }}</p>
				</span>
			</div>
			<TButton margin-left-3 class="tickets__button playground__profile-nav-button" v-bind="{
				text: 'Comprar Boletos',
				backgroundColor: 'var(--color-info-dark)',
			}" @click.prevent="$router.push({ name:'TListEvents'
			 })" />
		</span>
		<span class="toggle-button-wrapper" flex-row  justify-end>
			<button clickable class="toggle-button" @click.prevent="toggletoggelMenu">
				<img :src="mode + 'icon/toggle-menu.svg'" alt="">
			</button>
		</span>
	</header>
	<aside v-if="showAsideMenu" class="aside-menu-wrapper" flex-column style="align-items: center;">
		<span class="toggle-button-wrapper" flex-row  justify-end>
			<button clickable class="toggle-button" @click.prevent="toggletoggelMenu"
				style="margin-inline-end: 0.8rem; margin-block-start: 1.4rem;">
				<img :src="mode + 'icon/close.svg'" alt="">
			</button>
		</span>
		<figure class="aside__image-wrapper-2" basis="20" flex-row justify-center align-center>
			<img class="gallosIconLarge" :src="mode + imageProducer" alt=""
				@click="()=>{
					$router.push({ name: 'TLandingPage', })
				}" style="margin-block: auto; " />
		</figure>
		<slot name="slot__sectionsLandingAside" />
		<div style="height: 65%; width: 95vw;">
			<TAsideLink class="aside__link playground__profile-aside-button" style="margin-inline-start: 3.5rem;"
				v-bind="{ routes: linksLanding2, displayContent: 'column' }" @clickOption="showAsideMenu = false" />
			<TAsideLink  class="aside__link playground__profile-nav-button"
				style="margin-inline-start: 3.5rem;" v-bind="{ routes: (true ? [...links_profileToAside, {
						name: 'TProfile__myBonogallo',
						title: 'Mi Bonogallo',
						/* image: (import.meta.env.MODE === 'development' ? '/src' : '') +
							'/assets/icon/LogOut-Icon.svg', */
					}] : links_profileToAside), displayContent: 'column' }"
				@clickOption=" showAsideMenu = false" />
		</div>
		
		
	</aside>
</template>

<style scoped>
.header-wrapper {
	position: absolute;
	z-index: 9999999999 !important;
	width: 100%;
	height: 6rem;
	align-items: center;
	background: white;
	box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
	/* background: var(--color-accent-dark);
	border-bottom: 4px solid var(--color-warning); */
}

.aside__image-wrapper {
	padding-inline-start: 3rem;
	justify-content: start;
}

.menu-routes__wrapper {
	padding-inline-end: 1rem;
	padding-inline-start: 1.5rem;
}

.tickets__button,
.login__button {
	border-radius: 8px;
	margin-top: .5rem;
	/* margin-right: 2rem; */
}

.gallosIcon,
.gallosIconLarge {
	user-select: none;
	/* pointer-events:; */
	/* width: 5.5rem;
	max-width: 5.5rem;
	min-width: 5.5rem; */
	cursor: pointer;
	/* margin-inline-start: 4rem; */
	/* border: .2rem dashed yellow; */
}


.aguanteIcon {
	width: 12rem;
	margin-inline-start: 1rem;
}

.toggle-button-wrapper {
	margin-inline-end: 0.8rem !important;
}

.toggle-button {
	border-radius: 5px;
	max-width: 2.3rem !important;
	max-height: 2.3rem !important;
	background: var(--color-accent);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border: none;
	cursor: pointer;
}

.toggle-button img {
	height: 1.4rem !important;
	width: 1.4rem !important;
}

/* .toggle-button-wrapper > .aside-menu-wrapper{
	padding-inline-end: 2rem !important;
} */

@media (orientation: portrait) or (width >=1000px) {

	.toggle-button-wrapper,
	.toggle-button {
		display: none;
	}

	.playground__profile-nav-button {
		display: flex;
	}

	.aside-menu-wrapper {
		display: none;
		z-index: 100 !important;
	}

}

@media (orientation: portrait) or ((width <=1000px)) {

	.aside__image-wrapper span {
		display: none;
	}

	.toggle-button-wrapper,
	.toggle-button {
		display: flex;
	}

	.menu-routes__wrapper {
		display: none;
	}

	.aside-menu-wrapper {
		display: flex;
		z-index: 9999999;
	}
}

@media (orientation: portrait) or ((width >=300px) and (width <=850px)) {
	.aside__image-wrapper span {
		display: none;
	}

	.aside__image-wrapper img {
		width: auto !important;
		min-width: 7rem !important;
		max-width: 7rem !important;
		max-height: 7rem !important;
		min-height: 7rem !important;
	}

	.header-wrapper {
		height: 5rem !important;
	}

	.toggle-button {
		width: 2.5rem !important;
		height: 2.5rem !important;
	}

	.toggle-button img {
		height: 1rem !important;
		width: 1rem !important;
	}

	.gallosIcon {
		max-height: 3rem !important;
		/* margin-inline-start: 4rem; */
		/* border: .2rem dashed yellow; */
	}

	.header-wrapper,
	.aside-menu-wrapper {
		/* padding-block: 1rem; */
		/* margin-inline-end: 0.8rem; */
		z-index: 99 !important;
	}
	


}



.aside-menu-wrapper {
	display: flex;
	width: 100%;
	height: 100dvh;
	position: absolute;
	background: black;
	overflow-y: auto;
	z-index: 150 !important;
}


.landing__sections-wrapper__item {
	font-size: 17px !important;
	color: var(--color-accent) !important;
	cursor: pointer;
	font-family: 'SN Pro';
	letter-spacing: 1px;
	font-weight: 400;
	transition: all 0.5s ease;
}

.section_active {
	color: var(--color-accent-dark) !important;
	font-weight: 600 !important;
	border-bottom: 2.6px solid var(--color-primary-dark);
	padding-bottom: 3px;
	/* box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) */
}
.gallosIcon{
	width: auto !important; 
	height: 2.5rem !important;
	/* max-width: auto !important; 
	min-width: 6rem !important;  */
	/* min-height: 10rem !important ;
	max-height: 10rem !important ; */
	cursor: pointer;
	/* margin-inline-start: 4rem; */
	/* border: .2rem dashed yellow; */
}
</style>

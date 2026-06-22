<script lang="ts">
import TInput from '@/components/shared/TInput.vue'
import TButton from '@/components/shared/TButton.vue'
import TCardEvent from '@/components/shared/TCardEvent.vue';
import TTickets__infoProducer from '@/views/ticketing/TTickets__infoProducer.vue';
export default {
	name: 'TListEvents',
	components: {
		TInput,
		TButton,
		TCardEvent,
		TTickets__infoProducer
	},
	data() {
		return {
			animId: 0 as number,
			eventList: [],
			textToSearch: '',
			keysComponent: {
				events: 0
			},
			editInfo: {
				sectionDisplayActive: 1,
			},
			sectionsView: [
				{
					id: 1,
					label: 'Eventos 🎟️',
					isActive: true,
					icon: ''
				},
				{
					id: 2,
					label: 'Info 👁️',
					isActive: false,
					icon: ''
				}
			],
			infoView: {
				showDetailModel: true,
				name: 'Mi boletera TAQUILLA',
				coverImage: '/assets/images/imgDefault.png',
				profileImage: '/assets/images/logo_esc.png',
				backgroundSite: {
					isImage: false,
					url: '/assets/image/dev/tenans/libertadores-bg.jpg',
					bgColor: '#f9f5e6'
				},
				description: '<h2>⚫ 🔵 ⚫ 🐓 <strong>¡El orgullo albiazul late más fuerte que nunca!</strong> 🐓 ⚫ 🔵 ⚫</h2><p><br></p><p class="ql-align-justify">Desde hace más de <strong>75 años</strong>, los <strong>Gallos Blancos de Querétaro</strong> han sido emblema de pasión, historia y resistencia en la liga MX. Fundados el 8 de julio de 1950, han librado caminos desde la Segunda División hasta convertirse en protagonistas de finales y campeonatos nacionales .</p><p class="ql-align-justify">Hoy, el Estadio Corregidora —también llamado el Coloso del Cimatario— vibra con <strong>35,500 aficionados</strong> listos para romper las tribunas en cada partido. Este recinto, que vio partir la Copa Mundial de 1986, es el escenario perfecto para vivir el fútbol con todo el poder del azul, blanco y negro.</p><p class="ql-align-justify">En su vitrina, los Gallos presumen la <strong>Copa MX (Apertura 2016)</strong> y la <strong>Supercopa MX (2016‑17)</strong>, además de finales históricas y preseas en Liga de Ascenso. Y si hablamos de grandes leyendas, no se puede olvidar al brasileño <strong>Ronaldinho</strong>, que en 2014 encendió La Corregidora con su magia y encendió el orgullo queretano.</p><p><br></p><p><br></p><p><br></p><h2>⚡ <strong>Activa tu corazón gallo… ¡Reserva ya tu boleto!</strong></h2><p><br></p><p class="ql-align-justify">Visita “Compra aquí tus boletos” y asegúrate un lugar en uno de los eventos más electrizantes del Bajío. No solo verás un partido: lo <strong>sentirás</strong>, lo <strong>gritarás</strong>, lo <strong>vivirás</strong>… y serás parte del grito: <strong>¡Gallo, Gallo, Gallo!</strong></p>',
				map: {
					lat: '',
					lng: '',
				},
				contact: {
					phone1: '443344556',
					phone2: '443344528',
					email1: 'mail1@gmail.com',
					email2: 'mail1@gmail.com'
				},
				social: {
					fb: '',
					x: '',
					insta: ''
				}
			}
		}
	},
	methods: {
		initCover() {
      const canvas = this.$refs.coverCanvas as HTMLCanvasElement
      const ctx = canvas.getContext('2d')!
      const palette = {
        bg:       '#2A2F2D',
        primary:  '#95D0BE',
        pdark:    '#6FAE9C',
        pdarkest: '#4E7E71',
        plight:   '#CFE7E0',
        accent:   '#3B413F',
      }

      const shapes = [
        { x: 0.72, y: 0.08,  size: 0.28, rot: 20,  color: palette.pdark,    alpha: 0.55, speed: 5.1, phase: 0   },
        { x: 0.55, y: -0.05, size: 0.22, rot: -15, color: palette.primary,  alpha: 0.20, speed: 6.7, phase: 1.2 },
        { x: 0.82, y: 0.35,  size: 0.18, rot: 50,  color: palette.pdarkest, alpha: 0.60, speed: 4.3, phase: 0.5 },
        { x: 0.10, y: 0.60,  size: 0.20, rot: 130, color: palette.pdark,    alpha: 0.30, speed: 7.2, phase: 2.1 },
        { x: -0.04,y: 0.10,  size: 0.26, rot: 200, color: palette.accent,   alpha: 0.80, speed: 5.8, phase: 0.9 },
        { x: 0.40, y: 0.70,  size: 0.15, rot: 80,  color: palette.primary,  alpha: 0.18, speed: 6.0, phase: 1.7 },
        { x: 0.90, y: 0.65,  size: 0.12, rot: 30,  color: palette.plight,   alpha: 0.12, speed: 8.0, phase: 3.0 },
        { x: 0.25, y: 0.90,  size: 0.20, rot: 160, color: palette.pdarkest, alpha: 0.45, speed: 5.5, phase: 2.4 },
      ]

      const resize = () => {
        canvas.width  = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
      }
      resize()
      this.onResize = resize
      window.addEventListener('resize', resize)

      const drawTri = (cx: number, cy: number, size: number, rot: number, color: string, alpha: number) => {
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate((rot * Math.PI) / 180)
        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(size * 0.866,  size * 0.5)
        ctx.lineTo(-size * 0.866, size * 0.5)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        ctx.restore()
      }

      const draw = (t: number) => {
        const W = canvas.width, H = canvas.height
        ctx.clearRect(0, 0, W, H)

        ctx.fillStyle = palette.bg
        ctx.fillRect(0, 0, W, H)

        const g1 = ctx.createRadialGradient(W * 0.75, H * 0.2, 0, W * 0.75, H * 0.2, W * 0.6)
        g1.addColorStop(0, 'rgba(78,126,113,0.35)')
        g1.addColorStop(1, 'transparent')
        ctx.fillStyle = g1
        ctx.fillRect(0, 0, W, H)

        // diagonal lines
        ctx.save()
        ctx.globalAlpha = 0.08
        ctx.strokeStyle = palette.primary
        ctx.lineWidth = 0.8
        ;[[0.48, 0, 0.78], [0.62, 0, 0.95]].forEach(([x1, , x2]) => {
          ctx.beginPath()
          ctx.moveTo((x1 as any) * W, 0)
          ctx.lineTo((x2 as any) * W, H)
          ctx.stroke()
        })
        ctx.restore()

        shapes.forEach(s => {
          const offset = Math.sin((t / 1000) * s.speed + s.phase) * 10
          const rot = s.rot + Math.sin((t / 1000) * (s.speed * 0.3) + s.phase) * 4
          drawTri(s.x * W, s.y * H + offset, s.size * Math.min(W, H), rot, s.color, s.alpha)
        })
      }

      const loop = (t: number) => {
        draw(t)
        this.animId = requestAnimationFrame(loop)
      }
      this.animId = requestAnimationFrame(loop)
    },

    onResize() {},
		eventClicked(event:any){
			try {	
                this.$router.push({ name: 'TTickets_proccessSale', query: { idEvent: (event as any).id } })
            } catch (error) {
                console.log(error);
            }
		},
		async onGetEvents() {
			try {
				(this.eventList as any) = [
					{
						id: 1,
						nameFunction: 'Evento 1',
						dateFunction: '2024-07-15',
						hourFunction: '20:00',
						flyer: '/assets/images/events/lasCatrinas.jpg',
						flyerMini: '/assets/images/imgDefault.png',
						theaterAddress: 'Auditorio Josefa Ortiz de Dominguez',
						classification: 'Familiar',
					},
					{
						id: 2,
						nameFunction: 'Evento 2',
						dateFunction: '2024-07-17',
						hourFunction: '20:00',
						flyer: '/assets/images/events/brincos.png',
						flyerMini: '/assets/images/imgDefault.png',
						theaterAddress: 'Auditorio Josefa Ortiz de Dominguez',
						classification: '+18',
					},
					
				]
			} catch (error) {
				console.log(error);
			}
		},
		events() {
			
		},
	},
	computed: {
		mode() {
			return import.meta.env.VITE_PATH_MEDIA
		},
	},
	async created() {
		await this.onGetEvents()
		
	},
	mounted(){
		this.initCover()
	},
	beforeUnmount() {
    if (this.animId) cancelAnimationFrame(this.animId)
    window.removeEventListener('resize', this.onResize)
  },
}
</script>

<template>
	<main class="ticket-container" flex="row">
		<section class="content-wrapper" flex-row>
		<div style="position: absolute; width: 2rem; height: 2rem; top: 1rem;right: 1rem;z-index: 99;">
			<p @click="()=>{eventList= []}" style="cursor: pointer;font-size: 2rem !important;">🚀</p>
		</div>
		
		<header class="header-wrapper">
				<div class="cover-img-wrapper">
  <canvas ref="coverCanvas" class="cover-canvas"></canvas>
  <div class="cover-shimmer"></div>
</div>
				<div class="header-tenant-info-wrapper" >
					<figure class="profile-img-wrapper">
						<img :src="mode + infoView.profileImage" alt="">
					</figure>
					<span class="profile-name-wrapper">
						<h4>{{ infoView.name }}</h4>
					</span>
				</div>
				<div class="header-social-wrapper">
					<figure class="iconMediax2">
						<img pulse-animation :src="mode + '/assets/icon/social-networks/fb-color.svg'" alt="">
					</figure>
					<figure class="iconMediax2">
						<img pulse-animation :src="mode + '/assets/icon/social-networks/insta-color.svg'" alt="">
					</figure>
					<figure class="iconMediax2">
						<img pulse-animation :src="mode + '/assets/icon/social-networks/yt-color.svg'" alt="">
					</figure>
					<figure class="iconMediax2">
						<img pulse-animation :src="mode + '/assets/icon/social-networks/x-color.svg'" alt="">
					</figure>
				</div>
			</header>
		<div style=" width: 100%; height: calc(100% - 350px)/* 350 is height image header */;">
		
			<section class="wrapper-btn-sections" style=" padding-top: 110px; padding-inline-start: 4rem;" flex-row >
						<h4 :class="itemSection.isActive ? 'activeSection' : ''" v-for="(itemSection, index) in sectionsView" :key="index" @click="()=>{
							sectionsView.forEach(element => {
								element.isActive = false
							});
							itemSection.isActive =  true
							editInfo.sectionDisplayActive = itemSection.id
						}">{{itemSection.label}}</h4>	
					</section>
			<transition name="fade">
				<section v-if="editInfo.sectionDisplayActive === 1" flex="row"  style="align-content: flex-start; flex-wrap:wrap;width: 100%; text-align: center" justify-center>
					<h1 basis="100" padding-block-start-2 class="main-title title-element">PRÓXIMOS EVENTOS</h1>
					<TInput  class="search-event__input" ref="searchEvent" v-bind="{
						placeholder: '¿Qué evento deseas buscar?',
						type: 'search'
					}" @keydown.delete="() => {
						
					}" @input="(event: any) => {
					}" />
		
		
					<section class="events-lists-wrapper" v-if="(eventList.length > 0)"  wrap basis="100">  
						<!-- <TCardEvent :key="keysComponent.events" :events="eventList"/> -->
						<TCardEvent :key="keysComponent.events" :events="eventList" @clickedEvent="eventClicked"/>
					</section>
					<section class="events-void-wrapper" v-else  wrap basis="100">  
						<h3>NO HAY EVENTOS EN ESTE MOMENTO</h3>
					</section>
				</section>
			</transition>
			<transition name="fade">
				<TTickets__infoProducer v-if="editInfo.sectionDisplayActive === 2" :info="infoView"/>
			</transition>
		</div>
	</section>
	</main>
</template>
<style scoped>
.ticket-container {
	min-height: 90vh;
	height: auto;
	width: 100%;
	justify-content: center !important;
	background: var(--color-primary-light);
	position: relative
}
.content-wrapper {
	background-color: white;
	position: relative;
	flex-wrap: wrap;
	justify-content: center;
	margin-inline: auto;
}

.header-wrapper {
	width: 100%;
	min-height: 350px !important;
	max-height: 350px !important;
	position: relative;
}



.header-tenant-info-wrapper {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	bottom: -100px;
	left: 30px;
}
.header-social-wrapper {
	position: absolute;
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
	bottom: 30px;
	right: 30px;
}

.header-social-wrapper>figure>img {
	cursor: pointer;
}

.profile-img-wrapper {
	margin-bottom: 1rem;
	border: 4px solid var(--color-primary-dark) !important;
	border-radius: 50%;
}

.profile-img-wrapper img {
	border-radius: 50%;
	display: block;
	width: 200px;
	height: 200px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	pointer-events: none;
	user-select: none;
}

.profile-name-wrapper {
	/* background-color: rgba(0, 0, 0, 0.51); */
	padding-inline: 2rem;
	padding-block: 0.2rem;
	margin-bottom: 0rem;
	margin-inline-start: 0.5rem;
	border-radius: 7px;
	
	color: var(--color-accent-darkest) !important;
}

.profile-name-wrapper>h4 {
	color: var(--color-accent-darkest) !important;
	/* color:red; */
	font-size: 26px;
	font-family: 'SN Pro' !important; 
	font-weight: 600 !important;

}


.btn-show-info {
	position: absolute;
	background: yellow;
	left: 10px;
	bottom: 20px;
}

.slide-fade-enter-from {
	transform: translateX(100%);
	/* Comienza fuera del viewport (a la derecha) */
	opacity: 0;
	/* Transparente al inicio */
}

.slide-fade-enter-active {
	transition: all 0.5s ease;
	/* Controla la duración y suavidad de la animación */
}

.slide-fade-enter-to {
	transform: translateX(0);
	/* Llega a su posición final */
	opacity: 1;
	/* Totalmente visible */
}

/* Salida: Desplazamiento de izquierda a derecha */
.slide-fade-leave-from {
	transform: translateX(0);
	/* Comienza desde su posición actual */
	opacity: 1;
	/* Totalmente visible */
}

.slide-fade-leave-active {
	transition: all 0.5s ease;
	/* Controla la duración y suavidad de la animación */
}

.slide-fade-leave-to {
	transform: translateX(100%);
	/* Se mueve fuera del viewport (a la derecha) */
	opacity: 0;
	/* Transparente al final */
}

.btn-show-details {
	margin-top: 0.5rem;
}


.wrapper-btn-sections > h4{
	padding-inline: 0.5rem;
	transition: all 0.6s ease;
	margin-top: 3rem;
	color: var(--color-accent-darkest);
	font-family: 'Quicksand' !important;
	font-size: 18px;
}
.wrapper-btn-sections > h4:hover:not(.activeSection){
	transition: all 0.6s ease;
	transform: scale(1.08);
	margin-inline: 1rem;
	cursor: pointer
	/* border-bottom: 2px solid var(--color-accent);
	color: var(--color-accent) ; */
}
.wrapper-btn-sections > h4.activeSection{
	margin-inline: 1rem;
	border-bottom: 2px solid var(--color-primary-dark);
	color: var(--color-primary-dark) ;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px); /* o scale(0.95) */
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.main-title {
	color: var(--color-neutral-600) !important;
	font-family: 'Quicksand' !important; 
	font-weight: 900 !important;
}

.search-event__input {
	margin-inline: auto;
	margin-top: 30px;
	align-self: center;
	width: 50% !important;
}

.event__buttonEvent-wrapper {
	align-self: center;
}

.event__buttonEvent-wrapper>h1 {
	padding-block: 2rem;
}

.imageEvent {
	background: transparent;
	border-radius: 1rem;
	height: auto;
	min-height: auto;
	max-height: auto;
	width: 10rem;
}

.imageEvent img {
	width: 100%;
	height: auto;
	border-radius: 1rem;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
}



.events-lists-wrapper{
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	padding-top: 2rem;

}


.content-wrapper {
	background-color: white;
}

.header-wrapper {
	background: var(--gallos-gray-lg);
	width: 100%;
	min-height: 350px !important;
	max-height: 350px !important;
	position: relative;
}

.cover-img-wrapper {
  display: block;
  width: 100%;
  height: 350px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  border-radius: 8px;  /* opcional, ajusta al tuyo */
}

.cover-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.cover-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(149,208,190,0.06) 50%, transparent 60%);
  animation: coverShimmer 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes coverShimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}
.header-tenant-info-wrapper {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: center;
	bottom: -100px;
	left: 30px;
}

.header-social-wrapper {
	position: absolute;
	display: flex;
	flex-direction: column;
	row-gap: 1rem;
	bottom: 30px;
	right: 30px;
}

.header-social-wrapper>figure>img {
	cursor: pointer;
}

.profile-img-wrapper {
	margin-bottom: 1rem;
	border: 4px solid var(--color-primary-dark) !important;
	border-radius: 50%;
}

.profile-img-wrapper img {
	border-radius: 50%;
	display: block;
	width: 200px;
	height: 200px;
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	pointer-events: none;
	user-select: none;
	/* padding: 2rem !important; */
}

.profile-name-wrapper {
	/* background-color: rgba(0, 0, 0, 0.51); */
	padding-inline: 2rem;
	padding-block: 0.2rem;
	margin-bottom: 0rem;
	margin-inline-start: 0.5rem;
	border-radius: 7px;
	font-family: 'oswald';
}

.profile-name-wrapper>h4 {
	color: var(--gallos-dark-blue);
	/* color:red; */
	font-size: 26px;
	font-weight: 800;
}

.btn-show-details {
	margin-top: 0.5rem;
}


.wrapper-btn-sections > h4{
	padding-inline: 0.5rem;
	transition: all 0.6s ease;
	margin-top: 3rem;
}
.wrapper-btn-sections > h4:hover:not(.activeSection){
	transition: all 0.6s ease;
	transform: scale(1.08);
	margin-inline: 1rem;
	cursor: pointer
	/* border-bottom: 2px solid var(--color-accent);
	color: var(--color-accent) ; */
}
.wrapper-btn-sections > h4.activeSection{
	margin-inline: 1rem;
	border-bottom: 2px solid var(--color-primary-dark);
	color: var(--color-primary-dark) ;
}


.slide-fade-enter-from {
	transform: translateX(100%);
	/* Comienza fuera del viewport (a la derecha) */
	opacity: 0;
	/* Transparente al inicio */
}

.slide-fade-enter-active {
	transition: all 0.5s ease;
	/* Controla la duración y suavidad de la animación */
}

.slide-fade-enter-to {
	transform: translateX(0);
	/* Llega a su posición final */
	opacity: 1;
	/* Totalmente visible */
}

/* Salida: Desplazamiento de izquierda a derecha */
.slide-fade-leave-from {
	transform: translateX(0);
	/* Comienza desde su posición actual */
	opacity: 1;
	/* Totalmente visible */
}

.slide-fade-leave-active {
	transition: all 0.5s ease;
	/* Controla la duración y suavidad de la animación */
}

.slide-fade-leave-to {
	transform: translateX(100%);
	/* Se mueve fuera del viewport (a la derecha) */
	opacity: 0;
	/* Transparente al final */
}



/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 767px) {
	.content-wrapper{
		min-width: 750px !important;
		width: 750px !important;
	}

	.search-event__input {
		align-self: center;
		width: 70% !important;
	}

	.event__cardsWrapper {
		flex-wrap: wrap;
		padding: 2rem;
	}

	.imageEvent {
		background: transparent;
		border-radius: 1rem;
		height: auto;
		min-height: 5rem;
		max-height: 20rem;
		width: 100% !important;
		flex-basis: 100%;
	}

	.imageEvent img {
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.event__buttonEvent-wrapper {
		flex-grow: 1;
	}

	.event__buttonEvent-wrapper button {
		width: 100%;
	}

	.event__buttonEvent-wrapper>h1 {
		padding-block: 1rem;
	}
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991px) {
	.content-wrapper{
		width: 970px !important;
		min-width: 970px !important;
	}
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199px) {
	.content-wrapper{
		width: 970px !important;
		min-width: 970px !important;
	}

	.event__cardsWrapper {
		padding-inline: 12%
	}
}



@media (orientation: portrait) or ((width >=300px) and (width <=850px)) {

	.search-event__input {
		align-self: center;
		width: 90%;
	}

	.event__cardsWrapper {
		flex-wrap: wrap;
		padding: 2rem;
	}

	.imageEvent {
		background: transparent;
		border-radius: 1rem;
		height: auto;
		min-height: 5rem;
		max-height: 20rem;
		width: 100% !important;
		flex-basis: 100%;
	}

	.imageEvent img {
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
	}

	.event__buttonEvent-wrapper>h1 {
		padding-block: 1rem;
		font-size: 1.5rem !important;
	}

	.search-event__input {
		width: 80% !important;
		/* border: 1px dashed darkcyan; */
	}

}

.events-void-wrapper{
	height: 50dvh;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.events-void-wrapper h3{
	font-size: 20px;
}
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
	.event__cardsWrapper {
		padding-inline: 15%
	}

	.content-wrapper{
		width: 1170px !important;
		max-width: 1170px !important;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
	}
}
</style>

<script lang="ts">
/* import 'moment/dist/locale/es' */
import moment from 'moment';
import TButton from '../shared/TButton.vue';
import { formatHours24To12, dateNow , formatDate} from '@/utils/fnDates';
moment.locale('es');
export default {
    name: 'TcardEvent',
    data() {
        return {
            listEvents: [],
            devTestEvent: [
                {
                    id: 1,
                    gender: {
                        id: 1,
                        name: 'Varonil'
                    },
                    urlEventImage: '/assets/image/wallpaper2.jpg',
                    nameEvent: 'Gallos vs Pachuca',
                    dateEvent: '30 de Abril',
                    timeEvent: '20:00'
                }
            ]
        }
    },
    emits: ['clickedEvent'], 
    components: {
		TButton,
	},
     props: {
        events: {
            type: Array,
            default: []
        },
        viewDisplayer: {
            type: String,
            default: 'sale'
        }
    },
    methods: {
        formatDate,
        formatHours24To12,
        asignClassGender(item: any) {
            try {
                let classStatus: any = ''
                switch (item.classification) {
                    case 'Familiar':
                        classStatus = 'varonil-wrapper';
                        break;
                    case '+18':
                        classStatus = 'femenil-wrapper';
                        break;
                    default:
                        classStatus = 'femenil-wrapper';
                }
                return classStatus
            } catch (error) {
                console.log(error);
            }
        },
        async validEventredirect(event: any) {
            try {
              this.$emit('clickedEvent', event)
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        mode() {
            return import.meta.env.VITE_PATH_MEDIA
        },
    },
    mounted() {
        if (this.events.length > 0) {
            (this.listEvents as any) = this.events;
        }
        /* (this.listEvents as any) = this.devTestEvent */
    }
}
</script>

<template>
    <div class="card-event-item" box-shadow-gallo flex-row wrap v-for="(item, index) in listEvents" :key="index">

        <figure class="card-event-item__image">
            <img :src="mode + (item as any).flyer" alt="">
            <div class="image-overlay"></div>
        </figure>
        <span class="card-event-item__gender" :class="asignClassGender(item)">
            {{ (item as any)?.classification }}
        </span>
        <div class="card-event-item__infoWrapper" flex-row>
            <h2  style="text-align: center; flex-basis: 100%;">{{ (item as any)?.nameFunction }}</h2>
            <h5  style="text-align: start; flex-basis: 45%;">
                <span class="card-item-date__icon-calendar">
                    <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="#5D6966" 
  stroke-width="2.5" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
  
  <line x1="3" y1="10" x2="21" y2="10" />
  
  <line x1="16" y1="2" x2="16" y2="6" />
  <line x1="8" y1="2" x2="8" y2="6" />
  
  <circle cx="8" cy="14" r="0.75" fill="#5D6966" />
  <circle cx="12" cy="14" r="0.75" fill="#5D6966" />
  <circle cx="16" cy="14" r="0.75" fill="#5D6966" />
  <circle cx="8" cy="18" r="0.75" fill="#5D6966" />
  <circle cx="12" cy="18" r="0.75" fill="#5D6966" />
  <circle cx="16" cy="18" r="0.75" fill="#5D6966" />
</svg>

                </span>
                {{ formatDate((item as any).dateFunction) }} a las {{ formatHours24To12((item as any).hourFunction) }}
            </h5>
            <h5  style="text-align: start; flex-basis: 45%;">
                <span class="card-item-date__icon-calendar">
                    <svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="#5D6966" 
  stroke-width="2.5" 
  stroke-linecap="round" 
  stroke-linejoin="round"
>
  <!-- Cuerpo del pin (teardrop) con punto inferior redondeado -->
  <path d="M21 10.5c0 5.25-9 12-9 12s-9-6.75-9-12a9 9 0 1 1 18 0z" />
  
  <!-- Círculo central o "hoyo" del pin -->
  <circle cx="12" cy="10.5" r="3" />
</svg>

                </span>
                {{ formatDate((item as any).dateEvent) }} a las {{ formatHours24To12((item as any).hourFunction) }}
            </h5>
            <TButton class="button_purchase" v-bind="{
                text: viewDisplayer === 'sale' ? 'Comprar Boletos' : viewDisplayer,
                type: 'clickeable',
                backgroundColor: 'var(--color-accent)',

            }" @click="validEventredirect(item)" />
        </div>
    </div>
</template>

<style scoped>
.card-event-item {
    position: relative;
    width: 100%;
    max-width: 480px;
    border-radius: 1.5rem;
    overflow: hidden;
    background-color: white;
    box-shadow: 
        0 4px 6px rgba(0, 0, 0, 0.07),
        0 10px 20px rgba(0, 0, 0, 0.08);
    margin-block: 2rem;
    display: flex;
    flex-direction: column;
    height: fit-content;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

.card-event-item:hover {
    transform: translateY(-8px);
    box-shadow: 
        0 12px 24px rgba(0, 0, 0, 0.12),
        0 20px 40px rgba(0, 0, 0, 0.15);
}
.card-event-item>.card-event-item__infoWrapper>.button_purchase {
    opacity: 0;
    max-height: 0; /* Colapsa la altura a 0 */
    padding-top: 0; /* Asegura que el padding no ocupe espacio */
    padding-bottom: 0;
    overflow: hidden; /* Oculta el texto desbordado mientras mide 0 */
    
    /* Animamos el cambio de altura y opacidad de forma lenta y estilizada */
    transition: max-height 0.6s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.4s ease,
                padding 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-event-item:hover>.card-event-item__infoWrapper>.button_purchase {
    opacity: 1;
    /* Dale un valor mayor a lo que estimas que mide tu botón (ej. 60px o 100px). 
       CSS animará solo hasta su altura real exacta. */
    max-height: 100px; 
    
    /* Restablece aquí el padding original que quieras que tenga tu botón */
    padding-top: 10px; 
    padding-bottom: 10px;
}
.card-event-item__image {
    position: relative;
    width: 100%;
    height: 220px;
    max-width: 100%;
    overflow: hidden;
    margin: 0;
}

.card-event-item__image > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
}

.card-event-item:hover .card-event-item__image > img {
    transform: scale(1.08);
}

/* Overlay sutil sobre la imagen */
.image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.1) 60%,
        rgba(0, 0, 0, 0.25) 100%
    );
    pointer-events: none;
}

.card-event-item__gender {
    position: absolute;
    right: 0;
    top: 1.2rem;
    color: white;
    font-weight: 700;
    font-size: 0.85rem;
    font-family: 'Oswald', sans-serif;
    letter-spacing: 0.5px;
    padding: 0.6rem 1.8rem 0.6rem 1.5rem;
    border-bottom-left-radius: 2rem;
    border-top-left-radius: 2rem;
    z-index: 10;
    text-transform: uppercase;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s ease;
}

.card-event-item:hover .card-event-item__gender {
    transform: translateX(-4px);
}

.card-event-item__infoWrapper {
    padding-inline: 2rem;
    flex-wrap: wrap;
    padding-top: 1.5rem;
    padding-bottom: 1.8rem;
    gap: 1rem;
    z-index: 999;
    justify-content: center;
}

.card-event-item__infoWrapper > h2 {
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--color-title);
    line-height: 1.3;
    letter-spacing: 0.3px;
}

.card-event-item__infoWrapper > h5 {
    font-size: 0.95rem !important;
    font-weight: 500;
    color: var(--color-neutral-600);
    display: flex;
    align-items: center;
    margin-top: -0.5rem;
    gap: 0.5rem;
}

.card-item-date__icon-calendar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    flex-shrink: 0;
    padding: 6px;
}

.card-item-date__icon-calendar img {
    width: 100%;
    height: 100%;
    filter: brightness(0) invert(1);
}

.button_purchase {
    margin-top: 0.5rem;
    align-self: stretch;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding: 0.9rem 1.5rem;
    transition: all 0.3s ease;
}

.button_purchase:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    transform: translateY(-2px);
}

/* Estilos por género con degradados */
.varonil-wrapper {
    background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success) 100%);
}

.femenil-wrapper {
    background: linear-gradient(135deg, var(--color-error) 0%, var(--color-error-light) 100%);
}

/* Responsive */
@media (max-width: 1200px) {
    .card-event-item {
        max-width: 320px;
    }
}

@media (max-width: 768px) {
    .card-event-item {
        max-width: 100%;
        margin-block: 1rem;
    }

    .card-event-item__image {
        height: 200px;
    }

    .card-event-item__infoWrapper > h2 {
        font-size: 1.6rem;
    }
}
</style>
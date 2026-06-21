<template>
  <div class="landing-root">

    <!-- ═══════════════════════════════════════════
         HERO SECTION
    ═══════════════════════════════════════════ -->
    <section class="hero-section">
      <div class="hero-bg-grid" aria-hidden="true"></div>
      <div class="hero-orb hero-orb--1" aria-hidden="true"></div>
      <div class="hero-orb hero-orb--2" aria-hidden="true"></div>

      <div class="hero-inner">
        <h1 class="hero-title">
          <span class="hero-title__line">ESC DEV</span>
          <span class="hero-title__line hero-title__line--accent">Demo Boletera </span>
        <div class="hero-badge">
          <span class="badge-dot"></span>
          Demo Técnico · Portfolio
        </div>
        </h1>
        

        <p class="hero-subtitle">
          Flujo básico de boletera digital. Funcionalidad con SVG interactivo,
          proceso de compra, descarga de tickets(PDF Style).
        </p>

        <div class="hero-cta-group">
          <a href="https://wa.me/524426770631" target="_blank" class="btn btn--primary">
            <span>Contactar</span>
          </a>
          <button @click="$router.push({name: 'TListEvents'})" class="btn btn--ghost">
            <span>Ir a demo </span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <!-- Illustration placeholder -->
        <div class="hero-illustration">
          <div class="illustration-frame">
            
          </div>
          <div class="illustration-label">Selección de asientos interactiva</div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         STACK STRIP
    ═══════════════════════════════════════════ -->
    <section class="stack-strip">
      <div class="strip-inner">
        <span v-for="tech in techStack" :key="tech.label" class="tech-pill">
          <span class="tech-pill__dot" :style="{ background: 'var(--color-primary)' }"></span>
          {{ tech.label }}
        </span>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════
         FEATURES SECTION
    ═══════════════════════════════════════════ -->
    <section class="features-section">
      <div class="section-header">
        <p class="section-eyebrow1 subtitle_landing">Funcionalidades</p>
        <h2 class="section-title1 title_landing"> ¿Qué encontraremos en<br/> este proyecto?</h2>
      </div>

      <div class="features-grid">
        <article
          v-for="(feature, i) in features"
          :key="i"
          class="feature-card"
          :class="{ 'feature-card--wide': feature.wide }"
        >
          <div v-if="!feature.wide" class="feature-card__icon-wrap">
            <span class="feature-card__icon" v-html="feature.icon"></span>
          </div>

          <!-- Illustration placeholder per feature -->
          <div v-if="feature.wide" class="feature-card__illustration">
            <div class="feat-illustration-box">
              <component :is="'div'" class="feat-illustration-inner" v-html="feature.illustration"></component>
            </div>
          </div>

          <div class="feature-card__body">
            <h3 class="feature-card__title">{{ feature.title }}</h3>
            <p class="feature-card__desc">{{ feature.desc }}</p>
            <div class="feature-card__tags">
              <span v-for="tag in feature.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

   
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#181B1A" fill-opacity="1" d="M0,192L48,208C96,224,192,256,288,261.3C384,267,480,245,576,202.7C672,160,768,96,864,58.7C960,21,1056,11,1152,21.3C1248,32,1344,64,1392,80L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
</svg>
   
<!-- ═══════════════════════════════════════════
      CONTACT SECTION
═══════════════════════════════════════════ -->
<section class="contact-section">
  <div class="contact-inner">

    <div class="contact-header">

      <p class="contact-eyebrow subtitle_landing">
        Atento a nuevas oportunidades
      </p>

      <h2 class="contact-title title_landing">
        Estas interesado en conytactarme o tienes <br> alguna propuesta, <span>¡hablemos!</span>
      </h2>

    </div>

    <div class="contact-grid">

  <a href="mailto:salinas.emmanuel.9810@gmail.com" class="contact-card">
    <figure class="contact-card__icon">
      <Email class="contact-card__icon-svg"/>
    </figure>

    <div class="contact-card__content">
      <h3>Correo</h3>
      <p>Para procesos de reclutamiento y oportunidades laborales.</p>
    </div>
  </a>

  <a href="https://wa.me/524426770631" target="_blank" class="contact-card">
    <figure class="contact-card__icon">
      <WhatsApp class="contact-card__icon-svg"/>
    </figure>

    <div class="contact-card__content">
      <h3>WhatsApp</h3>
      <p>Contacto rápido, respuesta rápida.</p>
    </div>
  </a>

  <a href="https://linkedin.com/in/tu-perfil" target="_blank" class="contact-card">
    <figure class="contact-card__icon">
      <LinkedIn class="contact-card__icon-svg"/>
    </figure>

    <div class="contact-card__content">
      <h3>LinkedIn</h3>
      <p>Trayectoria profesional.</p>
    </div>
  </a>
</div>


  </div>
</section>
    <!-- ═══════════════════════════════════════════
         CTA FOOTER BAND
    ═══════════════════════════════════════════ -->
    <!-- <section class="cta-band">
      <div class="cta-band__inner">
        <figure class="aside__image-wrapper" basis="100" flex-row justify-center align-center>
			    <img class="logoIcon" :src="mode + imageProducer" alt=""
			    	@click="()=>{
			    		$router.push({ name: 'TLandingPage', })
            }" style="margin-block: auto; " />
		    </figure>
      </div>
    </section> -->

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Email from '@/assets/icon/email.svg'
import WhatsApp from '@/assets/icon/whatsapp.svg'
import LinkedIn from '@/assets/icon/linkedin.svg'

interface TechItem {
  label: string
  color: string
}

interface Feature {
  icon: string
  title: string
  desc: string
  tags: string[]
  wide?: boolean
  illustration?: string
}

interface ArchFolder {
  name: string
  desc: string
}

interface FlowStep {
  icon: string
  title: string
  desc: string
}

export default defineComponent(<any>{
  name: "TLandingPage",
  components: { 
    Email, 
    WhatsApp, 
    LinkedIn 
  },
  data() {
    return {
      imageProducer: '/assets/images/logo_esc.png',
      mockSeats: [
        'taken','free','free','taken','selected','free',
        'free','free','taken','free','free','taken',
        'selected','free','free','free','taken','free',
        'free','taken','free','selected','free','free',
      ] as string[],

      techStack: [
        { label: 'Vue 3', color: '#3FC98A' },
        { label: 'TypeScript', color: '#3178C6' },
        { label: 'Tailwind CSS', color: '#06B6D4' },
        { label: 'Vite', color: '#646CFF' },
        { label: 'Vuex', color: '#95D0BE' },
        { label: 'Vue Router', color: '#6FAE9C' },
        { label: 'PayPal SDK', color: '#FFC857' },
        { label: 'MercadoPago', color: '#00B1EA' },
        { label: 'QRCode', color: '#F26D7D' },
        { label: 'vue-html2pdf', color: '#D89C27' },
      ] as TechItem[],

      features: [
        {
          icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="2" y="2" width="18" height="18" rx="3" stroke="currentColor" stroke-width="1.6"/><circle cx="8" cy="9" r="1.5" fill="currentColor"/><circle cx="14" cy="9" r="1.5" fill="currentColor"/><circle cx="11" cy="14" r="1.5" fill="#95D0BE"/></svg>`,
          title: 'Mapas SVG Interactivos',
          desc: 'Layouts de zonas y asientos renderizados desde vectores. Eventos nativos del DOM capturan IDs únicos para mutar estados visuales y calcular montos en tiempo real.',
          tags: ['SVG', 'DOM Events', 'Tailwind states'],
          wide: true,
          illustration: `<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;padding:16px;">
            ${Array.from({length: 24}, (_,i) => {
              const states = ['free','free','free','taken','selected','free']
              const s:any = states[i % states.length]
              const colors: Record<string,string> = { free:'#EAF6F2', taken:'#CBD7D5', selected:'#95D0BE' }
              return `<div style="width:100%;aspect-ratio:1;border-radius:4px;background:${colors[s]};border:1.5px solid ${s==='selected'?'#6FAE9C':'#E3EBEA'}"></div>`
            }).join('')}
          </div>`,
        },
        {
          icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M8 11h6M11 8v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
          title: 'Checkout con Sandboxes',
          desc: 'Integración con SDKs oficiales de PayPal y MercadoPago en modo prueba. Emula respuestas asíncronas exitosas y de error para bifurcar el flujo de la UI de forma realista.',
          tags: ['PayPal SDK', 'MercadoPago', 'Async flows'],
        },
        {
          icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="5" y="3" width="12" height="16" rx="2" stroke="currentColor" stroke-width="1.6"/><rect x="8" y="7" width="3" height="3" stroke="currentColor" stroke-width="1.2"/><rect x="8" y="12" width="6" height="1.2" rx=".6" fill="currentColor"/><rect x="8" y="14.5" width="4" height="1.2" rx=".6" fill="currentColor"/></svg>`,
          title: 'Generación de Boletos PDF',
          desc: 'Token único por compra inyectado en un generador QR embebido en plantilla HTML. Exportación directa al navegador como PDF limpio listo para impresión.',
          tags: ['qrcode-vue3', 'vue-html2pdf', 'PDF export'],
        },
        {
          icon: `<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 6h14M4 11h10M4 16h7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
          title: 'Arquitectura TS Estática',
          desc: 'Funciones puras con mocks fuertemente tipados que emulan latencia y respuestas de API REST. Migración a producción cambiando solo VITE_API_BASE_URL.',
          tags: ['TypeScript strict', 'Mock data', 'Axios interceptors'],
        },
      ] as Feature[],

      archPoints: [
        'Cero dependencia de servidor en runtime',
        'Axios con interceptores de request/response',
        'Vuex como única fuente de verdad del flujo',
        'Migración a API real sin tocar la UI',
        'Tipado estricto end-to-end con TypeScript',
      ] as string[],

      folderTree: [
        { name: 'app', desc: 'Core · router · vuex · axios' },
        { name: 'components', desc: 'Átomos reutilizables' },
        { name: 'views/ticketing', desc: 'Selección · mapas · checkout' },
        { name: 'views/preview', desc: 'Boletos · QR · PDF' },
        { name: 'assets', desc: 'SVGs · estilos globales' },
      ] as ArchFolder[],

      flowSteps: [
        {
          icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="var(--color-primary-dark)" stroke-width="1.8"/><circle cx="10" cy="13" r="2" fill="var(--color-primary)"/><circle cx="18" cy="13" r="2" fill="var(--color-primary)"/><circle cx="14" cy="18" r="2" fill="var(--color-primary-dark)"/></svg>`,
          title: 'Listado de datos',
          desc: 'Listado de eventos en exelente  presentación visual. La información es extraída de un mock JSON tipado que emula respuesta de API REST real.',
        },
        {
          icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="var(--color-primary-dark)" stroke-width="1.8"/><rect x="7" y="7" width="5" height="5" rx="1" fill="var(--color-primary-light)" stroke="var(--color-primary)" stroke-width="1.2"/><rect x="15" y="7" width="5" height="5" rx="1" fill="var(--color-primary)" stroke="var(--color-primary-dark)" stroke-width="1.2"/><rect x="7" y="15" width="5" height="5" rx="1" fill="var(--color-primary-light)" stroke="var(--color-primary)" stroke-width="1.2"/><rect x="15" y="15" width="5" height="5" rx="1" fill="var(--color-primary-light)" stroke="var(--color-primary)" stroke-width="1.2"/></svg>`,
          title: 'Seleccionar asientos',
          desc: 'Mapa SVG interactivo  jugando con información del evento seleccionado.',
        },
        {
          icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="var(--color-primary-dark)" stroke-width="1.8"/><rect x="7" y="10" width="14" height="8" rx="2" stroke="var(--color-primary-dark)" stroke-width="1.4"/><path d="M10 14h8" stroke="var(--color-primary)" stroke-width="1.4" stroke-linecap="round"/></svg>`,
          title: 'Proceso de Compra',
          desc: 'Previsualización de procesos de compra en sandbox con PayPal y MercadoPago. Respuestas asíncronas emuladas para testear bifurcaciones de UI en casos de éxito y error.',
        },
        {
          icon: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3" y="3" width="22" height="22" rx="4" stroke="var(--color-primary-dark)" stroke-width="1.8"/><rect x="8" y="8" width="5" height="5" stroke="var(--color-primary-dark)" stroke-width="1.4"/><rect x="15" y="8" width="5" height="5" stroke="var(--color-primary-dark)" stroke-width="1.4"/><rect x="8" y="15" width="5" height="5" stroke="var(--color-primary-dark)" stroke-width="1.4"/><rect x="16" y="16" width="3" height="3" fill="var(--color-primary)"/></svg>`,
          title: 'Descarga de Boletos',
          desc: 'En este apartado se presentan abilidades estrictas de maquetacion para la generacion de boletos digitales en PDF, con un diseño limpio en css y html.',
        }
      ] as FlowStep[],

      qrPattern: [
        [1,1,0,1,1],
        [1,0,0,0,1],
        [0,0,1,0,0],
        [1,0,0,0,1],
        [1,1,0,1,1],
      ] as number[][],
    }
  },
  computed: {
    mode() {
      			return import.meta.env.VITE_PATH_MEDIA

    },
    
  }
})
</script>

<style scoped>
/* ═══════════════════════════════════════
   TOKENS
═══════════════════════════════════════ */
.landing-root {
  --color-primary-lightest: #EAF6F2;
  --color-primary-light:    #CFE7E0;
  --color-primary:          #95D0BE;
  --color-primary-dark:     #6FAE9C;
  --color-primary-darkest:  #4E7E71;
  --color-accent:           #3B413F;
  --color-accent-dark:      #2A2F2D;
  --color-accent-darkest:   #181B1A;
  --color-success:          #3FC98A;
  --color-warning:          #FFC857;
  --color-error:            #F26D7D;
  --color-neutral-50:       #F9FBFB;
  --color-neutral-100:      #F1F5F5;
  --color-neutral-200:      #E3EBEA;
  --color-neutral-300:      #CBD7D5;
  --color-neutral-400:      #A9B7B4;
  --color-neutral-500:      #7C8A87;
  --color-neutral-600:      #5D6966;
  --color-neutral-700:      #414947;
  --color-neutral-800:      #2B302F;
  --color-neutral-900:      #181B1A;
  --color-background:       #EEF5F4;
  --color-background-light: #F8FBFB;
  --color-text-title:       #2A2F2D;
  --color-text-default:     #4B5653;
  --color-text-muted:       #7E908C;
  --color-border-light:     #E3EBEA;
  --color-border:           #CBD7D5;
  --shadow-soft:   0 4px 20px rgba(149,208,190,0.10);
  --shadow-medium: 0 8px 30px rgba(59,65,63,0.10);
  --shadow-hard:   0 12px 40px rgba(59,65,63,0.16);

  font-family: 'DM Sans', 'Nunito', system-ui, sans-serif;
  color: var(--color-text-default);
  background: var(--color-background-light);
  overflow-x: hidden;
}

/* ═══════════════════════════════════════
   SHARED
═══════════════════════════════════════ */
.section-eyebrow {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary-dark);
  margin-bottom: 10px;
}
.section-title {
  line-height: 1.15;
  color: var(--color-background-dark);
  letter-spacing: -0.025em;
}
.section-eyebrow1 {
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-text-title);
  margin-bottom: 10px;
}
.section-title1 {
  line-height: 1.15;
  color: var(--color-primary-dark);
  letter-spacing: -0.025em;
}
.section-header {
  text-align: center;
  margin-bottom: 52px;
}

/* ═══════════════════════════════════════
   BUTTONS
═══════════════════════════════════════ */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.18s ease;
}
.btn--primary {
  background: var(--color-primary-dark);
  color: #fff;
  box-shadow: 0 4px 16px rgba(111,174,156,0.28);
}
.btn--primary:hover {
  background: var(--color-primary-darkest);
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(111,174,156,0.36);
}
.btn--ghost {
  background: transparent;
  border: 1.5px solid var(--color-border);
  color: var(--color-text-title);
}
.btn--ghost:hover {
  border-color: var(--color-primary-dark);
  color: var(--color-primary-darkest);
  background: var(--color-primary-lightest);
}
.hero-cta-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-cta-group a:hover {
  text-decoration: none;
}

/* ═══════════════════════════════════════
   HERO
═══════════════════════════════════════ */
.hero-section {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 80px 40px 60px;
}
.hero-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(var(--color-border-light) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border-light) 1px, transparent 1px);
  background-size: 40px 40px;
  opacity: 0.5;
}
.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.hero-orb--1 {
  width: 520px; height: 520px;
  background: radial-gradient(circle, rgba(149,208,190,0.22) 0%, transparent 70%);
  top: -120px; right: -80px;
}
.hero-orb--2 {
  width: 340px; height: 340px;
  background: radial-gradient(circle, rgba(63,201,138,0.14) 0%, transparent 70%);
  bottom: 40px; left: -60px;
}
.hero-inner {
  position: relative;
  z-index: 1;
  max-width: 1160px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 40px;
}
.hero-inner > .hero-badge,
.hero-inner > .hero-title,
.hero-inner > .hero-subtitle,
.hero-inner > .hero-cta-group {
  grid-column: 1;
}
.hero-inner > .hero-illustration {
  grid-column: 2;
  grid-row: 1 / 5;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: var(--color-primary-lightest);
  border: 1px solid var(--color-primary-light);
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary-darkest);
  width: fit-content;
  letter-spacing: 0.04em;
  margin-top: 8px;
}
.badge-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--color-primary-dark);
  box-shadow: 0 0 0 3px rgba(149,208,190,0.3);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(149,208,190,0.3); }
  50%       { box-shadow: 0 0 0 6px rgba(149,208,190,0.1); }
}
.hero-title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  display: flex;
  flex-direction: column;
  color: var(--color-text-title);
  margin: 0;
}

.hero-subtitle {
  font-size: 1.05rem;
  line-height: 1.65;
  color: var(--color-text-muted);
  max-width: 420px;
  margin: 0;
}

/* Hero illustration */
.hero-illustration {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}
.illustration-frame {
  width: 100%;
  max-width: 440px;
  border-radius: 20px;
  border: 1.5px solid var(--color-border);
  background: #fff;
  box-shadow: var(--shadow-hard);
  overflow: hidden;
}
.illustration-inner {
  padding: 24px;
}
.mock-screen {}
.mock-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 18px;
}
.mock-bar span {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--color-neutral-200);
}
.mock-bar span:nth-child(1) { background: #F26D7D; }
.mock-bar span:nth-child(2) { background: #FFC857; }
.mock-bar span:nth-child(3) { background: #3FC98A; }
.mock-seat-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 7px;
  margin-bottom: 18px;
}
.mock-seat {
  aspect-ratio: 1;
  border-radius: 5px;
  border: 1.5px solid transparent;
  transition: transform 0.15s;
}
.mock-seat--free     { background: var(--color-primary-lightest); border-color: var(--color-border-light); }
.mock-seat--taken    { background: var(--color-neutral-200); border-color: var(--color-neutral-300); }
.mock-seat--selected { background: var(--color-primary); border-color: var(--color-primary-dark); }
.mock-price-tag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background);
  border-radius: 10px;
  padding: 12px 16px;
}
.mock-price-label { font-size: 0.78rem; color: var(--color-text-muted); font-weight: 600; }
.mock-price-value  { font-size: 1.1rem; font-weight: 800; color: var(--color-primary-darkest); }
.illustration-label {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.04em;
}

/* ═══════════════════════════════════════
   STACK STRIP
═══════════════════════════════════════ */
.stack-strip {
  background: var(--color-neutral-800);
  padding: 18px 40px;
  overflow: hidden;
}
.strip-inner {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  max-width: 1160px;
  margin: 0 auto;
  justify-content: center;
}
.tech-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 99px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 600;
  color: var(--color-primary-dark);
  letter-spacing: 0.03em;
}
.tech-pill__dot {
  width: 6px; height: 6px; border-radius: 50%;
}

/* ═══════════════════════════════════════
   FEATURES
═══════════════════════════════════════ */
.features-section {
  padding: 96px 40px;
  max-width: 1160px;
  margin: 0 auto;
}
.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.feature-card {
  background: #fff;
  border: 1.5px solid var(--color-border-light);
  border-radius: 18px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s;
}
.feature-card:hover {
  box-shadow: var(--shadow-medium);
  transform: translateY(-3px);
  border-color: var(--color-primary-light);
}
.feature-card--wide {
  grid-column: 1 / -1;
  flex-direction: row;
  align-items: center;
  gap: 32px;
}
.feature-card__icon-wrap {
  width: 46px; height: 46px;
  border-radius: 12px;
  background: var(--color-primary-lightest);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary-darkest);
  flex-shrink: 0;
}
.feature-card__illustration {
  flex-shrink: 0;
}
.feat-illustration-box {
  width: 240px;
  border-radius: 12px;
  border: 1.5px solid var(--color-border-light);
  overflow: hidden;
  background: var(--color-neutral-50);
}
.feature-card__body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.feature-card__title {
  font-size: 15px;
  font-weight: 700;
  color: var( --color-neutral-900);
  letter-spacing: -0.015em;
}
.feature-card__desc {
  font-size: 13px;
  line-height: 1.6;
  color: var( --color-neutral-400);
  margin: 0;
  padding-bottom: 13px;
}
.feature-card__tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.tag {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 99px;
  background: var(--color-primary-lightest);
  color: var(--color-primary-dark);
  border: 1px solid var(--color-primary-light);
  letter-spacing: 0.03em;
}

/* ═══════════════════════════════════════
   ARQUITECTURA
═══════════════════════════════════════ */
.arch-section {
  background: var(--color-background);
  padding: 96px 40px;
}
.arch-inner {
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.arch-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin: 16px 0 24px;
}
.arch-desc code {
  background: var(--color-primary-lightest);
  border: 1px solid var(--color-primary-light);
  border-radius: 5px;
  padding: 1px 7px;
  font-family: 'Fira Code', 'Menlo', monospace;
  font-size: 0.82em;
  color: var(--color-primary-darkest);
}
.arch-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.arch-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-default);
}
/* folder tree */
.folder-tree {
  background: var(--color-accent-darkest);
  border-radius: 16px;
  padding: 24px 28px;
  font-family: 'Fira Code', 'Menlo', monospace;
  font-size: 0.82rem;
  box-shadow: var(--shadow-hard);
}
.folder-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary-light);
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 16px;
}
.folder-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.folder-item__name {
  color: var(--color-primary);
  font-weight: 600;
  min-width: 170px;
}
.folder-item__desc {
  color: rgba(255,255,255,0.35);
  font-size: 0.75rem;
}
.folder-item__icon { flex-shrink: 0; }

/* ═══════════════════════════════════════
   FLOW
═══════════════════════════════════════ */
.flow-section {
  /* padding: 96px 40px; */
  padding-inline: 40px;
  padding-top: 20px;
  padding-bottom: 80px;
  max-width: 100%;
  margin: 0 auto;
  background-color: var(--color-neutral-900);
  border: none;
}
.flow-steps {
  display: flex;
  gap: 0;
  position: relative;
}
.flow-step {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 16px;
  position: relative;
}
.flow-step__num {
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: var(--color-primary-dark);
  margin-bottom: 10px;
}
.flow-step__connector {
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100%;
  height: 1.5px;
  background: linear-gradient(90deg, var(--color-primary-light), var(--color-border-light));
  z-index: 0;
}
.flow-step__icon {
  width: 60px; height: 60px;
  border-radius: 16px;
  background: #fff;
  border: 1.5px solid var(--color-border-light);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-soft);
  position: relative;
  z-index: 1;
  margin-bottom: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
}
.flow-step:hover .flow-step__icon {
  box-shadow: var(--shadow-medium);
  transform: translateY(-3px);
}
.flow-step__title {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0 0 6px;
}
.flow-step__desc {
  font-size: 12px;
  line-height: 1.55;
  color: var(--color-text-inverse);
  margin: 0;
  padding-inline: 15px;
}

/* ═══════════════════════════════════════
   CTA BAND
═══════════════════════════════════════ */
.cta-band {
  background: var(--color-accent-darkest);
  position: relative;
  overflow: hidden;
  min-height: 80vh;
}
.cta-band::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 60% at 0% 100%, rgba(149,208,190,0.10) 0%, transparent 70%);
}
.cta-band__inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;
}
.cta-text {
  flex: 1;
}
.cta-title {
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.025em;
  margin-bottom: 10px;
}
.cta-subtitle {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 28px;
  letter-spacing: 0.04em;
}
/* QR mock illustration */
.cta-illustration { flex-shrink: 0; }
.qr-mock {
  width: 100%; height: 120px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.12);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.qr-mock__inner {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.qr-row { display: flex; gap: 5px; }
.qr-cell {
  width: 12px; height: 12px; border-radius: 2px;
  background: rgba(255,255,255,0.1);
}
.qr-cell--filled { background: var(--color-primary); }

.hero-title__line{
    font-size: 27px !important; ;
    font-weight: 800;

    /* letter-spacing: 0.0px !important; */
}

.hero-title__line--accent {
  color: var(--color-primary-dark);
  font-size: 50px !important; 
  font-weight: 700;
}

/* ═══════════════════════════════════════
   CONTACT
═══════════════════════════════════════ */

.contact-section {
  background: var(--color-accent-darkest);
  padding: 0 40px 90px;
  position: relative;
}

.contact-inner {
  max-width: 1160px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 50px;
}

.contact-eyebrow {
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: .15em;
  font-size: .8rem;
  margin-bottom: 12px;
}

.contact-title {
  color: #fff;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: 14px;
}

.contact-title >span {
  color: var(--color-primary-darkest);
  font-size: 30px !important;
  font-weight: 700
}

.contact-description {
  max-width: 700px;
  margin: 0 auto;
  color: rgba(255,255,255,.55);
  line-height: 1.7;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.contact-card {
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 18px;
  padding: 10px 4px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 18px;
  transition: all .25s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  background: rgba(149,208,190,.08);
}

.contact-card__icon {
  
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.contact-card__body {
  flex: 1;
}

.contact-card__body h3 {
  color: #fff;
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 700;
}

.contact-card__body p {
  color: rgba(255,255,255,.5);
  margin: 0;
  font-size: .85rem;
  line-height: 1.5;
}

.contact-card__arrow {
  color: var(--color-primary);
  font-size: 20px;
  transition: transform .25s ease;
}

.contact-card:hover .contact-card__arrow {
  transform: translateX(5px);
}
.contact-section {
  background: var(--color-accent-darkest);
  padding: 80px 40px 120px;
}

.contact-inner {
  max-width: 1160px;
  margin: 0 auto;
}

.contact-header {
  text-align: center;
  margin-bottom: 60px;
}

.contact-eyebrow {
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: .18em;
  font-size: .75rem;
  font-weight: 700;
}

.contact-title {
  color: #fff;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.1;
}

.contact-title span {
  color: var(--color-primary);
}

.contact-grid {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}
.contact-card {
  position: relative;

  width: 200px;
  height: 250px;

  border-radius: 28px;

  background: rgba(255,255,255,.03);

  border: 1px solid rgba(255,255,255,.06);

  backdrop-filter: blur(10px);

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  text-decoration: none;

  transition: .35s ease;
}

.contact-card::before {
  content: '';

  position: absolute;
  inset: 0;

  background:
  radial-gradient(
    circle at top,
    rgba(149,208,190,.18),
    transparent 70%
  );

  opacity: 0;

  transition: .35s ease;
}

.contact-card:hover {
  transform: translateY(-8px);

  border-color: rgba(149,208,190,.4);

  box-shadow:
    0 20px 50px rgba(0,0,0,.35),
    0 0 30px rgba(149,208,190,.12);
}

.contact-card:hover::before {
  opacity: 1;
}
.contact-card__icon {
  font-size: 64px;

  transition: .35s ease;

  z-index: 2;
}

.contact-card:hover .contact-card__icon {
  transform:
    translateY(-50px)
    scale(.9);
}

.contact-card__content {
  position: absolute;

  bottom: 30px;
  left: 30px;
  right: 30px;

  text-align: center;

  opacity: 0;

  transform: translateY(25px);

  transition: .35s ease;

  z-index: 2;
}

.contact-card:hover .contact-card__content {
  opacity: 1;
  transform: translateY(0);
}

.contact-card__content h3 {
  color: white;

  margin: 0 0 10px;

  font-size: 1.1rem;
  font-weight: 700;
}

.contact-card__content p {
  color: rgba(255,255,255,.55);

  margin: 0;

  line-height: 1.5;

  font-size: .85rem;
}

.aside__image-wrapper {
	justify-content: center;
  
}
.contact-card__icon-svg{
  width: auto !important;
  height: 100px !important;
}
/* ═══════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════ */
@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
  .hero-inner > * { grid-column: 1 !important; grid-row: auto !important; }
  .features-grid { grid-template-columns: 1fr; }
  .feature-card--wide { flex-direction: column; }
  .arch-inner { grid-template-columns: 1fr; gap: 40px; }
  .flow-steps { flex-wrap: wrap; gap: 24px; }
  .flow-step__connector { display: none; }
  .cta-band__inner { flex-direction: column; text-align: center; }
  .hero-cta-group { justify-content: center; }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 600px) {
  .hero-section, .features-section, .arch-section, .flow-section, .cta-band { padding-left: 20px; padding-right: 20px; }
  .stack-strip { padding-left: 20px; padding-right: 20px; }
}

</style>

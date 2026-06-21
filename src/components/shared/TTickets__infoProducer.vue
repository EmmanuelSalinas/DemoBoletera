<!-- <template>
    <div>
        <div style="padding-inline: 5rem; padding-top: 2rem;" v-html="(info as any).description"></div>
        <section flex-row style="padding-inline: 2rem; column-gap: 1rem;">
            <div class="container-card-info">
                <figure class="wrapper-image-card">
                    <img src="@/assets/icon/social-networks/at.svg" alt="">
                    
                </figure>
                <h2 class="card-info__title">Mándanos un correito 😎</h2>
                <div flex-column style="width: 100%; margin-block: 2rem;">
                    <p text-center style="margin-bottom: 1rem; font-weight: 600;">
                        {{ (info as any).contact.email1 }}
                    </p>
                    <p text-center style="margin-bottom: 1rem; font-weight: 600;">
                        {{ (info as any).contact.email2 }}
                    </p>
                </div>
            </div>
            <div class="container-card-info">
                <figure class="wrapper-image-card">
                    <img src="@/assets/icon/social-networks/techSupport.svg" alt=""></img>
                    
                </figure>
                <h2 class="card-info__title">Atención telefónica personalizada</h2>
                <div flex-column style="width: 100%; margin-block: 2rem;">
                    <p text-center style="margin-bottom: 1rem; font-weight: 600;">
                        {{ (info as any).contact.phone1 }}
                    </p>
                    <p text-center style="margin-bottom: 1rem; font-weight: 600;">
                        {{ (info as any).contact.phone2 }}
                    </p>
                </div>
            </div>
        </section>

    </div>
</template>
<script lang="ts" setup>
    import { computed } from 'vue'
    import { useStore } from 'vuex'
    import { defineProps } from 'vue'
    import IconAt from '@/assets/icon/social-networks/at.svg'
    import IconTechSupport from '@/assets/icon/social-networks/techSupport.svg'

    /* const store = useStore() */

    /* console.log(store); */
    
    /* const brandingProducer = computed(() => store.state.producerData.producer) */
    // Aquí defines qué props acepta el componente
const props = defineProps<{
  info: object
}>()



</script>
<style scoped>
    .container-card-info{
        background: gainsboro;
        border-radius: 10px;
        min-height: 10rem;
        flex-basis: 50%;
        column-gap: 1rem;
        position: relative;
        margin-top: 8rem;
        margin-bottom: 5rem;
    }

    .wrapper-image-card{
        position: absolute;
        width: 5rem;
        height: 5rem;
        top: -2.5rem;
        left: 50%;
        transform: translateX(-50%);
    }

    .card-info__title{
        width: 100%;
        text-align: center;
        margin-top: 3.5rem;
        padding-inline: 5rem;
        font-family: 'oswald';
        font-size: 2rem !important;
        font-weight: 400;
        color: var(--gallos-sky-blue);
    }
    
</style> -->
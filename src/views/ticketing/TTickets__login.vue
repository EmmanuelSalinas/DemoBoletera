<script lang="ts">
import TButton from '@/components/shared/TButton.vue'
import TTimer from '@/components/shared/TTimer.vue';
import TLogin from '@/views/TLogin.vue';
/* import TRegistry from '@/views/TRegistry.vue'; */

export default {
    name: 'TTickets__login',
    components: {
        TButton,
        TTimer,
        TLogin,
        /* TRegistry */
    },
    methods: {},
    data(){
        return{
            isSelectOption: false,
            logginActivePreview: true
        }
    },
    computed: {
        mode() {
            return import.meta.env.VITE_PATH_MEDIA
        },
    },
    async created(){
        if(this.$attrs.methodSelected !== undefined){
            if((this.$attrs.methodSelected as any).id === 2){
                /* this.isSelectOption = true */
            }
        }
    }   
}
</script>

<template>
    <main  flex="row" wrap padding-inline-4 class="loginTicketWrapper">
        <h3 v-if='!isSelectOption' basis='100' padding-block-start-2 class="ticketPurchase__title" style="color:black; font-weight:600">
		    ***Para que tu compra sea mas segura te recomendamos iniciar sesión en nuestro sistema.***
		</h3>
        <div v-if='!isSelectOption' class="wrapper-buttons-tLogin-tickets" flex="row" wrap justify-center align-center basis="100" >
            <div basis=100 flex="row" justify-center>
                <TButton button-border-radius basis='50' class="invited__button" v-bind="{
                text: 'Iniciar Sesión',
                type: 'clickeable',
                color: 'white',
                backgroundColor: 'var(--gallos-orange)'
            }" @click.prevent="()=>{ isSelectOption =  true}" />    
            </div>
            <h5 padding-block>o</h5>
            <div  class="button-continueAsInvited" basis=100 flex="row" justify-center >
                <p basis="50" flex="row" justify-center @click.prevent="$emit('continueAsInvitied')" >Continuar Como Invitado</p> 
            </div>
            <!-- <TButton class="invited__button" v-bind="{
                text: 'Continuar como invitado',
                type: 'clickeable',
                color: 'black',
                backgroundColor: '#FFD070'
            }" @click.prevent="$emit('continueAsInvitied')" /> -->
        </div>
        <TLogin v-if='isSelectOption && logginActivePreview' viewDisplayer="purchaseTickets" @successLogin="() => {
            $emit('continueWithCredentials')
        }"
        @seeRegistry="()=>{
            logginActivePreview=false
        }" />
       <!--  <TRegistry v-if='isSelectOption && !logginActivePreview' viewDisplayer="purchaseTickets" @successRegistry="()=> {
            logginActivePreview=true
        }" @seeRegistry="()=>{
            logginActivePreview=true
        }"  /> -->
        <p class="selectOtherMethodButton" cursor-pointer v-if='isSelectOption' style="margin-inline: auto; margin-bottom: 5rem;" basis="70" @click.prevent="()=>{
            $emit('returnToFeesSelectedStatus')}" >Seleccionar otro método</p>
        <!-- <TButton class="invited__button" v-bind="{
            text: 'Continuar como invitado',
            type: 'clickeable',
            color: 'white',
            backgroundColor: 'rgb(117, 177, 250)'
        }" @click.prevent="$emit('continueAsInvitied')" />
        <TLogin viewDisplayer="purchaseTickets" @successLogin="() => {
            $emit('continueWithCredentials')
        }" /> -->

    </main>
</template>

<style scoped>
h1 {
    font-size: 2rem;
    color: #000462;
    font-weight: 800;
}

.invited__button {
    align-self: center;
}

.next__button {
    border-radius: 2rem;
    width: 25%;
}
.wrapper-buttons-tLogin-tickets{
    padding-block: 4rem;
}
.button-continueAsInvited > p {
    color: var(--gallos-orange);
    font-weight: 600;
    cursor: pointer;
}
.button-continueAsInvited > p :hover {
    transform: scale(1.02);
    cursor: pointer;
}

.selectOtherMethodButton{
    color: var(--gallos-orange);
	font-weight: 700;
	font-size: 1.1rem !important;
	text-decoration:underline;
	padding-top: 0.2rem;
	text-align: center;
}

.loginTicketWrapper{
    height: 100%;
    align-content: baseline;
}

@media (orientation: portrait) or ((width >=300px) and (width <=850px)) {
    main {
        padding: 0;
    }


    .invited__button {
        width: 100%;
    }

    .ticketPurchase__title{
        font-size: 1.2rem !important;
        padding-inline: 1.2rem !important;
    }

    .loginTicketWrapper{
        padding-inline: 0 !important;
    }
}
</style>

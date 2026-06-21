<script lang="ts">
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TTimer',
    data() {
        return {};
    },
    methods: {
    },
    computed: {
        ...mapGetters('timerPurchase', ['getFormattedTime']),
        formatedTime() {
            if (this.getFormattedTime === '00:00') {
                this.$emit('timeExpired')
                return this.getFormattedTime;
            } else {
                return this.getFormattedTime;
            }
        }
    }
};
</script>

<template>
    <div>
        <p class="eventDetail__title">{{ formatedTime }}</p>
    </div>
</template>

<style scoped>
p {
    font-size: 2rem;
    color: #E90F2A;
    font-weight: 800;
}



/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {


    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 1.4rem !important;
    }


}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 767px) {

    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 1.6rem !important;
    }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 991px) {

    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 1.6rem !important;
    }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199px) {

    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 1.8rem !important;
    }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {

    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 2rem !important;
    }
}
</style>
<script lang="ts">

import TCheckbox from '@/components/shared/TCheckbox.vue';


export default {
    name: 'TTickets__comissions',
    components: {
        TCheckbox
    },
    props: {
        fees: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            keysComponent: {
                deliveryMethods: {
                    1: 0,
                    2: 0
                }
            },
            deliveryFeesOptions: [],
            deliveryFeesPurchase: [],
            comissions: {}
        }
    },
    methods: {
        formatFn(value: any) {
            try {
                let valueFormatNumber = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
                return valueFormatNumber;
            } catch (error) {
                console.log(error);
            }
        },
        async fillterDeliveryFees() {
            try {
                for (const group in this.fees) {
                    if (group.toUpperCase() === 'METODOS DE ENTREGA') {
                        this.deliveryFeesOptions = this.fees[group];
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        async clickedCheckbox(event: any, fees: any, index: any) {
            try {
                if (fees.groupName.toUpperCase() !== 'OTROS') {
                    if ((event as any).target.value === 'false') {
                        (this.comissions as any)[fees.groupName].forEach((feesElement: any) => {
                            feesElement.value = false
                        });
                        const groupCheckboxesContainer: any = (this.$refs[fees.groupName] as any);
                        if (groupCheckboxesContainer) {
                            let checkboxesGroup = (groupCheckboxesContainer as any)[0].querySelectorAll('input[type="checkbox"]');
                            checkboxesGroup.forEach((checkboxItem: any) => {
                                checkboxItem.checked = false
                            });
                        }
                        fees.value = true
                        this.$emit('updateAplicationFees', this.comissions)
                    } else {
                        if (fees.groupName.toUpperCase() !== 'METODOS DE ENTREGA') {
                            fees.value = false
                                ; (this.comissions as any)[fees.groupName].forEach((feesElement: any) => {
                                    feesElement.value = false
                                })
                            this.$emit('updateAplicationFees', this.comissions)
                        } else {
                            (this.keysComponent as any).deliveryMethods[index + 1]++
                        }
                    }
                } else {
                    if ((event as any).target.value === 'false') {
                        fees.value = true
                        this.$emit('updateAplicationFees', this.comissions)
                    } else {
                        fees.value = false
                        this.$emit('updateAplicationFees', this.comissions)
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    computed: {
        hasFees() {
            let feesValidCounter: any = 0
            for (const commisionGroupItem in this.comissions) {
                if ((commisionGroupItem as any) === 'OTROS') {
                    (this.comissions as any)[commisionGroupItem].forEach((feesItem: any) => {
                        (feesItem.originalId !== 7 && feesItem.originalId !== 8 && feesItem.originalId !== 9 && feesItem.originalId !== 10) ? feesValidCounter++ : null;
                    });
                }
            }
            const showSectionFees: any = feesValidCounter > 0 ? true : false;
            return showSectionFees
        }
    },
    async created() {
        this.comissions = this.fees
        for (const feesGroup in this.comissions) {
            if (feesGroup === 'otros') {
                let percentComissionPurchase: any = (this.comissions as any)[feesGroup].find((element: any) => {
                    if(element.originalId === 7 || element.originalId === 9){
                        return element
                    }
                })
                percentComissionPurchase.value = true
                this.$emit('updateAplicationFees', this.comissions)
            }

        }
        await this.fillterDeliveryFees()
    }
}
</script>

<template>
    <section class="comissions" flex="row" row-gap='2' wrap>
        <template v-for="(commisionGroupItem, index) in comissions" :key="index">
            <div v-if="(commisionGroupItem as any)[0].groupName === 'METODOS DE ENTREGA'" :ref="'metodo de entrega'"
                flex-column class="comissions__wrapper" padding-2 width-100>
                <h2 class="eventDetail__title" style="text-transform: capitalize;">={{ (commisionGroupItem as
                    any)[0].groupName }}=</h2>
                <template v-for="(commisionItem, index) in commisionGroupItem" :key="(commisionItem as any).id">
                    <span class="comissions__feesItem" flex-row justify-space-between>
                        <span class="comissions__feesCheckbox" basis="10" flex-row justify-center align-center>
                            <TCheckbox :key="(keysComponent as any).deliveryMethods[index + 1]" basis="10" v-bind="{
                                value: (commisionItem as any).value,
                                nameGroup: (commisionItem as any).groupName,
                                is_active: !(commisionItem as any).forced
                            }" @click="async (event: Event) => {
                                if (!(commisionItem as any).forced) {
                                    await clickedCheckbox(event, (commisionItem as any), index)
                                }


                            }" />
                        </span>
                        <section class="comissions__feesDataInfo" flex-column basis="80">
                            <h3 padding-block-end-1>{{ (commisionItem as any).title }}</h3>
                            <h4 padding-block-end-1>{{ (commisionItem as any).subtitle }}</h4>
                            <h4>{{ (commisionItem as any).description }}</h4>
                        </section>
                        <span class="comissions__feesPrice" basis="10" flex-row justify-center align-center>
                            <h1>{{ (commisionItem as any).typeFees === 'CASH' ? formatFn((commisionItem as any).amount)
                                : ((commisionItem as any).amount + '%') }}</h1>
                        </span>
                    </span>
                </template>

            </div>

        </template>
        <template v-for="(commisionGroupItem, index) in comissions" :key="index">
            <div v-if="(commisionGroupItem as any)[0].groupName !== 'METODOS DE ENTREGA' && (commisionGroupItem as any)[0].groupName !== 'OTROS'"
                :ref="(commisionGroupItem as any)[0].groupName" flex-column class="comissions__wrapper" padding-2
                width-100>
                <h2 class="eventDetail__title" style="text-transform: capitalize;">={{ (commisionGroupItem as
                    any)[0].groupName }}=</h2>
                <template v-for="(commisionItem, index) in commisionGroupItem" :key="(commisionItem as any).id">
                    <span class="comissions__feesItem" flex-row justify-space-between>
                        <span class="comissions__feesCheckbox" basis="10" flex-row justify-center align-center>
                            <TCheckbox basis="10" v-bind="{
                                value: (commisionItem as any).value,
                                nameGroup: (commisionItem as any).groupName,
                                is_active: !(commisionItem as any).forced
                            }" @click="async (event: Event) => {
                                if (!(commisionItem as any).forced) {
                                    await clickedCheckbox(event, (commisionItem as any), index)
                                }
                            }" />
                        </span>
                        <section class="comissions__feesDataInfo" flex-column basis="80">
                            <h3 padding-block-end-1>{{ (commisionItem as any).title }}</h3>
                            <h4 padding-block-end-1>{{ (commisionItem as any).subtitle }}</h4>
                            <h4>{{ (commisionItem as any).description }}</h4>
                        </section>
                        <span class="comissions__feesPrice" basis="10" flex-row justify-center align-center>
                            <h1>{{ (commisionItem as any).typeFees === 'CASH' ? formatFn((commisionItem as any).amount)
                                : ((commisionItem as any).amount + '%') }}</h1>
                        </span>
                    </span>
                </template>
            </div>
        </template>
        <template v-for="(commisionGroupItem, index) in comissions" :key="index">
            <div v-if="(commisionGroupItem as any)[0].groupName === 'OTROS' && hasFees" :ref="'otros'" flex-column
                class="comissions__wrapper" padding-2 width-100>
                <h2 class="eventDetail__title" style="text-transform: capitalize;">={{ (commisionGroupItem as
                    any)[0].groupName }}=</h2>
                <template v-for="(commisionItem, index) in commisionGroupItem" :key="(commisionItem as any).id">
                    <span
                        v-if="(commisionItem as any).originalId !== 7 && (commisionItem as any).originalId !== 8"
                        class="comissions__feesItem" flex-row justify-space-between>
                        <span class="comissions__feesCheckbox" basis="10" flex-row justify-center align-center>
                            <TCheckbox basis="10" v-bind="{
                                value: (commisionItem as any).value,
                                nameGroup: (commisionItem as any).groupName,
                                is_active: !(commisionItem as any).forced
                            }" @click="async (event: Event) => {
                                if (!(commisionItem as any).forced) {
                                    await clickedCheckbox(event, (commisionItem as any), index)
                                }
                            }" />
                        </span>
                        <section class="comissions__feesDataInfo" flex-column basis="80">
                            <h3 padding-block-end-1>{{ (commisionItem as any).title }}</h3>
                            <h4 padding-block-end-1>{{ (commisionItem as any).subtitle }}</h4>
                            <h4>{{ (commisionItem as any).description }}</h4>
                        </section>
                        <span class="comissions__feesPrice" basis="10" flex-row justify-center align-center>
                            <h1>{{ (commisionItem as any).typeFees === 'CASH' ? formatFn((commisionItem as any).amount)
                                : ((commisionItem as any).amount + '%') }}</h1>
                        </span>
                    </span>
                </template>

            </div>

        </template>
    </section>
</template>

<style scoped>
h2 {
    font-size: 1.7rem;
    color: var(--gallos-red);
    font-weight: 800;
}

.comissions__wrapper {
    /* border: 2px solid var(--business-medium-gray); */
    border-radius: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background: white;
}

.comissions__feesItem {
    border-bottom: 2px solid var(--business-gray-second);
    padding: 2rem;
}

.comissions__feesItem:last-child {
    border-bottom: none !important;
}

.comissions__feesDataInfo h2 {
    font-size: 1.6rem;
    color: rgb(38, 50, 56);
    font-weight: 900;
}

.comissions__feesDataInfo h3 {
    font-size: 1.4rem;
    color: rgb(0, 0, 0);
    font-weight: 800;
}

.comissions__feesPrice h1 {
    color: black;
}


/* Extra small devices (phones, 600px and down) */
@media(orientation: portrait) and ((width >=300px) and (width <=850px)) {
    .comissions__feesItem {
        padding: 0rem;
        flex-wrap: wrap;
    }

    .omissions__feesCheckbox {
        padding-inline-start: .6rem !important;
    }

    .comissions__feesDataInfo {
        flex-basis: 80% !important;
        margin-block: 1rem !important;
    }

    .comissions__feesDataInfo>h3{
        font-size: 1rem !important;
        letter-spacing: 0.4px;
        text-transform: uppercase;
    }
    
    .comissions__feesDataInfo>h4 {
        font-size: 0.85rem !important;
        letter-spacing: 0.4px;
        color: black;
        text-transform:uppercase;
        color: var(--gallos-gray-2);
        font-weight: 500;
    }

    .comissions__feesDataInfo>h2 {
        font-size: 1.2rem !important;
        padding-block: 0.5rem;
    }

    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 1.1rem !important;   
    }

    .comissions__feesPrice {
        flex-basis: 100%;
    }

    .comissions__feesPrice>h1 {
        font-size: 1.2rem;
    }

    .comissions__feesCheckbox {
        padding-inline-end: 1rem;
    }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 730px) {
    .comissions__feesItem {
        padding: 0rem;
        flex-wrap: wrap;
    }

    .omissions__feesCheckbox {
        padding-inline-start: .6rem !important;
    }

    .comissions__feesDataInfo {
        flex-basis: 80% !important;
        padding-bottom: 1rem;
    }

    .comissions__feesDataInfo>h3,
    .comissions__feesDataInfo>h4 {
        font-size: 1.2rem !important;
        color: black;
    }

    .comissions__feesDataInfo>h2 {
        font-size: 1.2rem !important;
        padding-block: 0.5rem;
    }

    /* titles */
    .eventDetail__title,
    .eventDetail__title>br>span {
        font-size: 1.4rem !important;
    }

    .comissions__feesPrice {
        flex-basis: 10%;
    }

    .comissions__feesPrice>h1 {
        font-size: 1.4rem;
    }

    .comissions__feesCheckbox {
        padding-inline-end: 1rem;
    }
}

/* Medium devices (landscape tablets, 730px and up) */
@media only screen and (min-width: 730px) and (max-width: 991px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) and (max-width: 1199px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}
</style>

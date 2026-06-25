<script lang="ts">
import TTickets__comissions from "@/views/ticketing/TTickets__comissions.vue";
import TAccordion from "@/components/shared/TAccordion.vue";
import "vue-good-table-next/dist/vue-good-table-next.css";
import TTickets__login from "@/views/ticketing/TTickets__login.vue";
import TButton from "@/components/shared/TButton.vue";
import TTimer from "@/components/shared/TTimer.vue";
//@ts-ignore
import { VueGoodTable } from "vue-good-table-next";
import TModal from "@/components/shared/TModal.vue";
import TInput from "@/components/shared/TInput.vue";
//@ts-ignore
import { mapActions, mapGetters } from "vuex";
import Swal from "sweetalert2";
import moment from "moment";
//@ts-ignore
import CryptoJS from 'crypto-js';
//@ts-ignore
import _ from "lodash";
import { scrollToRef } from "@/utils/generals";


export default {
    name: "TTickets__sale",
    components: {
        TTickets__comissions,
        TTickets__login,
        TAccordion,
        TButton,
        TTimer,
        VueGoodTable,
        TModal,
        TInput,
    },
    data() {
        return {
            eventData: {},
            seatsData: {},
            couponToAplied: {},
            ticketToAplliedCoupon: {},
            seatSelected: [],
            couponsApplied: [],
            styleSeats: {
                minimumSizeSeat: "",
                maxSizeSeat: "",
                sizeSeat: "",
                heightContainerSeats: "",
                hasPadding: false,
            },
            deliveryFeeSelected: {},
            editInfo: {
                idEvent: 0,
                idReservation: 0,
                rotationXMap: 0,
                rotationAngleMap: 0,
                statusPurchase: "START",
                isAppliedCoupon: false,
                morePostSaleInfo: false,
                totalToPay: 0,
                iva: 0,
                finalTotalComissionsIVA: 0,
                totalWithComissions: 0,
                cahsPickUp: 0,
                comissionQuantity: 0,
                comissionGangway: 0,
                inbropiFees: 0,
                comissionSelected: 0,
                totalFeesNotForced: 0,
                totalFeesForced: 0,
                idZoneShowSeats: {},
                showSeatsModal: false,
                isShowTotalesDetail: false,
                isShowTicketingDetail: true,
                isShowFeesDetail: true,
                isConfirmPurchase: false,
                isCompletePurchase: false,
                methodPaySelected: {},
                isShowCouponModal: false,
                isShowDetailEvent: false,
                codeCouponAplied: "",
                imageStreetView: "",
                enclosureMap: {
                    lat: '',
                    lng: ''
                }
            },
            mandatoryCheckboxesPaymentMethodSelect: {
                termAndConditions: false,
                noticePrivacy: false,
                methodPayment: false,
                methodPaymentSelected: {},
            },
            keysComponent: {
                mapGoogle: 0,
                map: 0,
                seatsBlocks: 0,
                totalToPay: 0,
                feesInfo: 0,
                cash: 0,
                card: 0,
                paypal: 0,
                mercard: 0,
            },
            dataTableDetailPurchase: [],
            seatSelectedGrouped: [],
            formReservation: {
                idEvent: 0,
                total: 0,
                subTotal: 0,
                totalTickets: 0,
                totalFees: 0,
                inbropiFees: 0,
                idFan: 0,
                createAt: "",
                fees: [],
                coupons: [],
                tickets: [],
            },
            googleApiPromise: Promise.resolve<any>,
            tablesFull: [],
            lacationFormSettings: {
                zoomMap: 4,
                GOOGLEMAP_APIKEY: "AIzaSyDaVXgyqZrffu4d6CxpOTuHoucM4UXSxxA",
                center: { lat: 20.58994301867083, lng: -100.40266946807853 },
                centerMexico: { lat: 20.58994301867083, lng: -100.40266946807853 },
                markerOptions: { position: { lat: 20.58994301867083, lng: -100.40266946807853 } },
            },
            svgContent: "",
            chunkSelected: "",
            paginationCouponTable: {
                enabled: false,
                mode: "records",
                perPage: 10,
                perPageDropdown: [5, 10, 20],
                position: "down",
                dropdownAllowAll: false,
                nextLabel: "Siguiente",
                prevLabel: "Anterior",
                rowsPerPageLabel: "Elementos por paginación",
                ofLabel: "de",
                pageLabel: "pagina", // for 'pages' mode
                infoFn: (params: any) =>
                    `Mostrando del elemento ${params.firstRecordOnPage} al ${params.lastRecordOnPage}`,
            },
            columnsAppliedCoupon: [
                {
                    label: "ID",
                    field: "id",
                    visible: false,
                },
                {
                    label: "ZONA",
                    field: "section",
                    sortable: false,
                },
                {
                    label: "BLOQUE",
                    field: "chunk",
                    sortable: false,
                },
                {
                    label: "FILA/ASIENTO",
                    field: "seat",
                    sortable: false,
                },
                {
                    label: "COSTO UNITARIO",
                    field: "price",
                    sortable: false,
                },
            ],
            refOptionToPay: null,
            refChecks: null,
            calendarData: {
                key: "today",
                highlight: true,
                dates: null,
            },
        };
    },
    methods: {
        scrollToRef,
        /* ======================================================================= */
        /* ============FUNCIONES CALCULADORRAS==================================== */
        /* ======================================================================= */
        async onCalculateSubTotalPurchase() {
            /*  
                                  Esta funcion hace el calculo de total de boletaje
                              
                                  para hacer esto se hace la consulta de los lugares 
                                  seleccionados y se hace un calculo extra para saber
                                  si tienen cupones aplicados.
                                  En cada llamada a esta funcion se setea a 0 y se recalcula.
                  
                                  this.editInfo.totalToPay  -->  es la variable con el valor encontrado
                              */
            try {
                this.editInfo.totalToPay = 0;

                this.seatSelected.forEach((seatItem: any) => {
                    let amoutToSum: any = 0;

                    amoutToSum = amoutToSum + seatItem.subprice;
                    //to apply coupons-tickets
                    if (seatItem.idCoupon !== undefined && seatItem.idCoupon !== 0) {
                        if (seatItem.typeDisacount === "CASH") {
                            /* coupons-tickets CASH */

                            amoutToSum -= seatItem.amountCoupon;
                            seatItem.price = seatItem.subprice - seatItem.amountCoupon;
                        } else {
                            /* coupons-tickets PERCENT */
                            amoutToSum -= (seatItem.amountCoupon * seatItem.subprice) / 100;
                            seatItem.price =
                                seatItem.subprice -
                                (seatItem.amountCoupon * seatItem.subprice) / 100;
                        }
                    }
                    this.editInfo.totalToPay += amoutToSum;
                });

                let totalTicketing: any = 0;
                this.seatSelected.forEach((seatItem: any) => {
                    totalTicketing += seatItem.price;
                });

                //to apply coupons-purchase amount
                this.formReservation.coupons.forEach((couponItem: any) => {
                    if (couponItem.typeApplication !== "TICKET") {
                        if (couponItem.typeDisacount === "CASH") {
                            totalTicketing -= couponItem.value;
                        }
                    }
                });
                //to apply coupons-purchase porcent
                this.formReservation.coupons.forEach((couponItem: any) => {
                    if (couponItem.typeApplication !== "TICKET") {
                        if (couponItem.typeDisacount !== "CASH") {
                            totalTicketing -= (couponItem.value / 100) * totalTicketing;
                        }
                    }
                });
                //to apply coupons-VIP
                this.formReservation.coupons.forEach((couponItem: any) => {
                    if (couponItem.typeApplication === "TICKET") {
                        if (couponItem.typeCoupon === "VIP") {
                            this.editInfo.totalToPay -= couponItem.value;
                        }
                    }
                });

                this.editInfo.totalToPay = totalTicketing;

                /* set values */
                this.editInfo.totalWithComissions = 0;
                this.editInfo.totalWithComissions =
                    this.editInfo.totalToPay + this.editInfo.comissionQuantity;
                this.editInfo.inbropiFees = Number(
                    (
                        ((this.eventData as any).general.inbropiFees / 100) *
                        totalTicketing
                    ).toFixed(2)
                );

                /* format values */
                (this.editInfo.totalToPay as any) = await this.formatFn(
                    this.editInfo.totalToPay
                );
                (this.editInfo.totalWithComissions as any) = await this.formatFn(
                    this.editInfo.totalWithComissions
                );
            } catch (error) {
                console.log(error);
            }
        },
        async onCalculateFeesForced() {
            try {
                /* 
                                            FUNCION QUE CALCULA LAS COMISIONES FORSADAS
                    	
                                            *En esta funcion se setea el valor de las comisiones a 0, la variable es
                                            editInfo.comissionQuantity
                                            *Es imp[ortante el orden de aplicacion de las comisiones
                                            
                                            feestItem.isForced es la variable para aplicar este proceso
                                        */

                let totalFeesForced: any = 0;

                const seatsSelectedLen = this.seatSelected.length;
                /* this.editInfo.comissionQuantity = 0; */

                /* se recorre cada grupo de las comisiones */
                for (const group in (this.eventData as any).fees) {
                    /* se recorre cada comision del grupo iterado */
                    (this.eventData as any).fees[group].forEach(async (feesItem: any) => {
                        if (feesItem.forced === true) {
                            /* se excluyen las comisiones de pasarela $ y % */
                            if (
                                feesItem.originalId !== 7 &&
                                feesItem.originalId !== 8
                            ) {
                                /* comision de dinero al monto */
                                if (
                                    feesItem.typeApplication === "AMOUNT" &&
                                    feesItem.typeFees === "CASH" &&
                                    feesItem.value === true
                                ) {
                                    totalFeesForced += feesItem.amount;
                                    feesItem.cash = feesItem.amount;
                                }
                                /* comision de dinero al Ticket */
                                if (
                                    feesItem.typeApplication === "TICKET" &&
                                    feesItem.typeFees === "CASH" &&
                                    feesItem.value === true
                                ) {
                                    totalFeesForced =
                                        totalFeesForced + seatsSelectedLen * feesItem.amount;
                                    feesItem.cash = seatsSelectedLen * feesItem.amount;
                                }
                                /* comision de porcentaje al ticket */
                                if (
                                    feesItem.typeApplication === "TICKET" &&
                                    feesItem.typeFees === "PERCENT" &&
                                    feesItem.value === true
                                ) {
                                    this.seatSelected.forEach((seatSelectedItem: any) => {
                                        totalFeesForced =
                                            totalFeesForced +
                                            seatSelectedItem.price * (feesItem.amount / 100);
                                        feesItem.cash =
                                            seatSelectedItem.price * (feesItem.amount / 100);
                                    });
                                }
                                /* Comision de porcentaje al monto  */
                                if (
                                    feesItem.typeApplication === "AMOUNT" &&
                                    feesItem.typeFees === "PERCENT" &&
                                    feesItem.value === true
                                ) {
                                    let resultUnformat: any = await this.unformatFn(
                                        this.editInfo.totalToPay
                                    );
                                    totalFeesForced =
                                        totalFeesForced +
                                        (await this.unformatFn(this.editInfo.totalToPay)) *
                                        (feesItem.amount / 100);
                                    feesItem.cash =
                                        (await this.unformatFn(this.editInfo.totalToPay)) *
                                        (feesItem.amount / 100);
                                }
                            }
                        }
                    });
                }
                this.editInfo.totalWithComissions = 0;
                this.editInfo.totalWithComissions =
                    (await this.unformatFn(this.editInfo.totalToPay)) + totalFeesForced;
                this.editInfo.totalFeesForced = totalFeesForced;
                (this.editInfo.totalWithComissions as any) = await this.formatFn(
                    this.editInfo.totalWithComissions
                );
                /* await this.calculateFinalTotal(); */
            } catch (error) {
                console.log(error);
            }
        },
        async onCalculateFeesNotForced() {
            /* 
                                      FUNCION QUE CALCULA LAS COMISIONES NO FORSADAS
                  
                                      *En esta funcion se setea el valor de las comisiones a 0, la variable es
                                      editInfo.totalFeesNotForced  haciendo que el valor de estas comisiones 
                                      esten separadas de las forzadas.
                                  	
                                      *Es importante el orden de aplicacion de las comisiones
                                  */
            try {
                await this.onCalculateFeesForced();
                const seatsSelectedLen = this.seatSelected.length;
                this.editInfo.totalFeesNotForced = 0;
                const totalToPayNumber = await this.unformatFn(
                    this.editInfo.totalToPay
                );

                /* Se iteran los distintos grupos de comisiones */
                for (const group in (this.eventData as any).fees) {
                    /* Se iteran las distintas comisiones de cada grupo iterado  */
                    (this.eventData as any).fees[group].forEach(async (feesItem: any) => {
                        /* Solo se aplica el proceso a las comisiones no forzadas */
                        if (feesItem.forced === false) {
                            /* comision de dinero sobre monto total */
                            if (
                                feesItem.typeApplication === "AMOUNT" &&
                                feesItem.typeFees === "CASH" &&
                                feesItem.value === true
                            ) {
                                this.editInfo.totalFeesNotForced += feesItem.amount;
                                feesItem.cash = feesItem.amount;
                            }
                            /* comision de dinero sobre Ticket */
                            if (
                                feesItem.typeApplication === "TICKET" &&
                                feesItem.typeFees === "CASH" &&
                                feesItem.value === true
                            ) {
                                this.editInfo.totalFeesNotForced =
                                    this.editInfo.totalFeesNotForced +
                                    seatsSelectedLen * feesItem.amount;
                                feesItem.cash = seatsSelectedLen * feesItem.amount;
                            }
                            /* comision de porcentaje sobre ticket */
                            if (
                                feesItem.typeApplication === "TICKET" &&
                                feesItem.typeFees === "PERCENT" &&
                                feesItem.value === true
                            ) {
                                this.seatSelected.forEach(
                                    (seatSelectedItem: any, index: any) => {
                                        if (index === 0) {
                                            this.editInfo.totalFeesNotForced =
                                                this.editInfo.totalFeesNotForced +
                                                seatSelectedItem.price *
                                                (feesItem.amount / 100) *
                                                seatsSelectedLen;
                                            feesItem.cash =
                                                seatSelectedItem.price *
                                                (feesItem.amount / 100) *
                                                seatsSelectedLen;
                                        }
                                    }
                                );
                            }
                            /* comision de porcentaje sobre el monto total */
                            if (
                                feesItem.typeApplication === "AMOUNT" &&
                                feesItem.typeFees === "PERCENT" &&
                                feesItem.value === true
                            ) {
                                this.editInfo.totalFeesNotForced =
                                    this.editInfo.totalFeesNotForced +
                                    totalToPayNumber * (feesItem.amount / 100);
                                feesItem.cash = totalToPayNumber * (feesItem.amount / 100);
                            }
                        }
                    });
                }

                this.editInfo.totalWithComissions = 0;
                this.editInfo.comissionQuantity =
                    this.editInfo.totalFeesForced + this.editInfo.totalFeesNotForced;
                this.editInfo.totalWithComissions =
                    (await this.unformatFn(this.editInfo.totalToPay)) +
                    this.editInfo.inbropiFees +
                    this.editInfo.comissionQuantity;
                (this.editInfo.totalWithComissions as any) = await this.formatFn(
                    this.editInfo.totalWithComissions
                );
            } catch (error) {
                console.log(error);
            }
        },
        async calculateFinalTotal() {
            if (this.editInfo.statusPurchase === "START") {
                this.editInfo.finalTotalComissionsIVA = await this.unformatFn(
                    this.editInfo.totalWithComissions
                );
            } else {
                this.editInfo.iva = 0;
                this.editInfo.finalTotalComissionsIVA = 0;

                let unformatQuentity: any = await this.unformatFn(
                    this.editInfo.totalWithComissions
                ); /* + this.editInfo.inbropiFees */
                let feesOthers: any = (this.eventData as any).fees["OTROS"];

                (this.editInfo.iva as any) = Number(
                    (
                        (Number(feesOthers[0].cash) + Number(feesOthers[1].cash)) *
                        0.16
                    ).toFixed(2)
                );

                (this.editInfo.finalTotalComissionsIVA as any) =
                    Number(unformatQuentity) +
                    Number(this.editInfo.iva) +
                    Number(feesOthers[0].cash) +
                    Number(feesOthers[1].cash);
            }

            (this.editInfo.finalTotalComissionsIVA as any) = Number(
                (this.editInfo.finalTotalComissionsIVA as any).toFixed(2)
            );
        },
        async applyFees() {
            try {
                let feesApplied: any = [];
                for (const group in (this.eventData as any).fees) {
                    (this.eventData as any).fees[group].forEach((feesItem: any) => {
                        if (feesItem.value === true) {
                            feesApplied.push({
                                nameFees: feesItem.title,
                                id: feesItem.id,
                                amount: feesItem.cash,
                                originalId: feesItem.originalId,
                            });
                        }
                    });
                }
                const formFeesAplied = {
                    idReservation: this.editInfo.idReservation,
                    fees: feesApplied,
                    totalFees: Number(
                        (
                            Number(this.editInfo.comissionQuantity.toFixed(2)) -
                            Number(this.editInfo.comissionGangway.toFixed(2))
                        ).toFixed(2)
                    ),
                    totalFeesGangway: Number(this.editInfo.comissionGangway.toFixed(2)),
                    iva: Number(this.editInfo.iva),
                };
                this.formReservation.fees = feesApplied;
                const { data, status } =  {
                    data:{},
                    status: 200
                }/* await backend.post(
                    "reservation/applyFees ",
                    formFeesAplied
                ); */

                if (status === 200) {
                    await this.getdeliveryFee();
                    this.editInfo.statusPurchase = "FEESSELECTED";
                    this.scrollToRef("timer_section");
                } else {
                    Swal.fire({
                        title: "Lo sentimos",
                        text: "No pudimos guardar las comisiones, intentalo nuevamente",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async applyFeesPasarela() {
            try {
                this.editInfo.totalWithComissions = await this.unformatFn(
                    this.editInfo.totalWithComissions
                );
                const totalBeforePasarelaFees = this.editInfo.totalWithComissions;
                const totalFeesBeforePasarela = this.editInfo.comissionQuantity;

                for (const group in (this.eventData as any).fees) {
                    (this.eventData as any).fees[group].forEach(async (feesItem: any) => {
                        /* la comision de pasarela de porcentaje en la tabla de configuracion es el id 7 */
                        if (feesItem.originalId === 7) {
                            feesItem.value = true;
                            const amountPorcentToCash = Number(
                                (
                                    (this.editInfo.totalWithComissions * feesItem.amount) /
                                    100
                                ).toFixed(2)
                            );
                            feesItem.cash = amountPorcentToCash;
                            this.editInfo.comissionGangway = amountPorcentToCash;
                            /* this.editInfo.comissionQuantity =
                                                                          this.editInfo.comissionQuantity +
                                                                          ((totalBeforePasarelaFees * feesItem.amount) / 100); */
                            this.editInfo.comissionQuantity =
                                this.editInfo.comissionQuantity + amountPorcentToCash;
                        }
                    });
                }
                for (const group in (this.eventData as any).fees) {
                    (this.eventData as any).fees[group].forEach(async (feesItem: any) => {
                        /* comision pasarela efectibvo es el id 8 en la tabla de configuracion */
                        if (feesItem.originalId === 8) {
                            feesItem.value = true;
                            const amountCashTotal = Number(feesItem.amount.toFixed(2));
                            this.editInfo.comissionGangway =
                                this.editInfo.comissionGangway + amountCashTotal;
                            this.editInfo.comissionQuantity =
                                this.editInfo.comissionQuantity + amountCashTotal;
                            feesItem.cash = amountCashTotal;
                        }
                    });
                }
                (this.editInfo.totalWithComissions as any) = await this.formatFn(
                    this.editInfo.totalWithComissions
                );
            } catch (error) {
                console.log(error);
            }
        },
        /* ============================================================= */
        /* ===========TERMINAN FUNCIONES CALCULADORAS===================== */
        /* ============================================================= */

        async onShowEventDetail() {
            try {
                this.editInfo.isShowDetailEvent = true;
            } catch (error) {
                console.log(error);
            }
        },
        async validIfExitst(seatItem: any) {
            try {
                const exist = this.seatSelected.find(
                    (seatSelectedItem: any) =>
                        seatSelectedItem.seat === seatItem.seat &&
                        seatSelectedItem.row === seatItem.row &&
                        seatSelectedItem.idChunk === seatItem.idChunk
                );
                if (exist !== undefined) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async validSeatSold(seatItem: any) {
            try {
                if (seatItem.status === "AVALIABLE") {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onColorizeSeat(seatItem: any) {
            const svgContainer: any = this.$refs.svgContainer;

            let seatsTable: any = svgContainer.getElementsByClassName(
                "table-" + seatItem.chunk
            );
            if (seatsTable !== undefined) {
                let seatSelected = Array.from(seatsTable).filter((seat: any) =>
                    seat.classList.contains(seatItem.seat)
                );
                (seatSelected[0] as any)?.classList.add("seat-svg-selected");
            }
        },
        async onShowCouponAlert() {
            try {
                this.editInfo.isShowCouponModal = true;
                setTimeout(async () => {
                    let inputCodeToAplied: any =
                        document.getElementById("codeCouponToAplied");
                    inputCodeToAplied.querySelector("input").focus();
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        },
        formatFn(value: any) {
            /* Metodo que formatea un valor numerico a formato moneda */
            try {
                if (typeof value !== "string") {
                    let valueFormatNumber = Number(
                        value.toString().match(/^\d+(?:\.\d{0,2})?/)
                    );
                    /* let valueFormatNumber = Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value) */

                    return "$" + valueFormatNumber;
                } else {
                    return value;
                }
            } catch (error) {
                console.log(error);
            }
        },
        /* formatFn(value: any) {
                try {
                    let valueFormatNumber = Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                    }).format(value);
                    return valueFormatNumber;
                } catch (error) {
                    console.log(error);
                }
            }, */
        async unformatFn(value: any) {
            // Eliminar caracteres no numéricos (excepto el punto decimal y el signo negativo)
            const typeValue = typeof value;
            if (typeValue === "string") {
                let numberString = value.replace(/[^0-9.-]+/g, "");
                // Convertir la cadena resultante en un número
                let number = parseFloat(numberString);
                return number;
            } else {
                return value;
            }
        },
        /* scrollToRef(refName: any) {
            this.$nextTick(() => {
                const element: any = this.$refs[refName];

                if (element) {
                    if (typeof element.scrollIntoView === "function") {
                        element.scrollIntoView();
                    }
                }
            });
        }, */
        async loadSvgContent(urlPath: any) {
            try {
                const response = await fetch(urlPath, {
                    mode: 'cors',
                    credentials: 'omit',  // ← Agrega esto
                    cache: 'no-cache' 
                })
                    .then((response) => response.text())
                    .then((data) => {
                        (this.svgContent as any) = data;
                    })
                    .catch((error) => {
                        console.error("Error loading SVG:", error);
                    });
            } catch (error) {
                console.error("Error al obtener el SVG:", error);
            }
        },
        ...mapActions("timerPurchase", ["startTimer", "stopTimer", "resetTimer"]),
        async onConfirmReservationSeats() {
            try {
                if (this.seatSelected.length > 0) {
                    this.formReservation.idEvent = Number(this.editInfo.idEvent);
                    this.formReservation.total = await this.unformatFn(
                        this.editInfo.totalWithComissions
                    );
                    this.formReservation.subTotal = await this.unformatFn(
                        this.editInfo.totalToPay
                    );
                    this.formReservation.totalTickets = this.seatSelected.length;
                    this.formReservation.inbropiFees = this.editInfo.inbropiFees;

                    this.formReservation.createAt = moment().format("YYYY-MM-DD HH:mm");
                    (this.formReservation.tickets as any) = this.seatSelected.map(
                        (item: any) => {
                            return {
                                idSection: item.idSection,
                                idRow: item.idRow,
                                idChunk: Number(item.idChunk),
                                seatNum: item.seat,
                                row: item.row,
                                price: item.price,
                                idCoupon: item.idCoupon === undefined ? 0 : item.idCoupon,
                                amountCoupon:
                                    item.amountCoupon === undefined ? 0 : item.amountCoupon,
                            };
                        }
                    );
                    const { data, status } = {
                        data: {},status: 200
                    } /* await backend.post(
                        "reservation/create",
                        this.formReservation
                    ); */

                    if (status === 200) {
                        /* TO SELECT FIRST ITEM ON METODO DE ENTREGA  */
                        for (const group in (this.eventData as any).fees) {
                            (this.eventData as any).fees[group].forEach(
                                (feesItem: any, index: any) => {
                                    if (index === 0 && group === "METODOS DE ENTREGA") {
                                        feesItem.value = true;
                                    }
                                }
                            );
                        }
                        this.editInfo.idReservation = 1;
                        this.editInfo.statusPurchase = "SEATSELECTED";
                        this.editInfo.isConfirmPurchase = true;

                        /* alert('incomplete way, fix it') */

                        this.startTimer();
                        await this.onCalculateFeesNotForced();
                        await this.applyFeesPasarela();
                        await this.calculateFinalTotal();
                        this.scrollToRef("timer_section");
                    } else {
                        Swal.fire({
                            title: "Acción no valida",
                            text: "Ocurrio un error, intentelo nuevamente",
                            confirmButtonText: "Aceptar",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "Alto",
                        text: "Selecciona algún asiento",
                        confirmButtonText: "Aceptar",
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onCancelReservation() {
            try {
                Swal.fire({
                    title: "Espera un momento...",
                    text: "¿Quieres regresar a la seleccion de asientos?",
                    confirmButtonText: "Sí, Quiero Regresar",
                    showCancelButton: true,
                    cancelButtonText: "No,Permanecer Aquí",
                    reverseButtons: true,

                }).then(async (result) => {
                    if (result.isConfirmed) {
                        /* this.resetTimer(); */
                        /* this.$router.push({ name: "TTickets" }); */
                        await this.relaseSeatsReservation();
                        this.editInfo.statusPurchase = 'START'
                        for (const group in (this.eventData as any).fees) {
                            (this.eventData as any).fees[group].forEach((feeItem:any) => {
                                feeItem.value = false
                            });
                        }

                        this.formReservation.coupons = [];
                        this.formReservation.fees = [];
                        
                        this.formReservation.total = 0
                        this.formReservation.subTotal = 0
                        this.formReservation.totalTickets = 0
                        this.formReservation.totalFees = 0
                        this.formReservation.inbropiFees = 0
                        this.formReservation.idFan = 0
                        this.editInfo.iva = 0
                        this.editInfo.finalTotalComissionsIVA = 0
                        this.editInfo.totalWithComissions = 0
                        this.editInfo.comissionQuantity = 0
                        this.editInfo.comissionGangway = 0

                        await this.onCalculateSubTotalPurchase();
                        await this.onCalculateFeesNotForced();
                        await this.calculateFinalTotal();
                        
                    }
                });

            } catch (error) {
                console.log(error);
            }
        },

        async makePurchase() {
            try {
                const errorConter = await this.validDataToContinuePurchase();
                if (errorConter === 0) {
                    this.editInfo.methodPaySelected =
                        this.mandatoryCheckboxesPaymentMethodSelect.methodPaymentSelected;
                    if (this.token.length === 0) {
                        this.editInfo.statusPurchase = "PREVIEWLOGIN";
                    } else {
                        //here set the fanId to Data reservation
                        await this.updateFanId();
                    }
                    /* this.$emit('continueToPurchase', findedMethodPayment) */
                } else {
                    if (
                        !this.mandatoryCheckboxesPaymentMethodSelect.noticePrivacy ||
                        !this.mandatoryCheckboxesPaymentMethodSelect.termAndConditions
                    ) {
                        (this.refChecks as any).scrollIntoView({ behavior: "smooth" });

                        Swal.fire({
                            title: "Alto",
                            text: "Debes de aceptar el Aviso de Privacidad y los Términos y Condiciones del sistema.  Marcalos para poder continuar.",
                            confirmButtonText: "Aceptar",
                        });
                    }
                    if (!this.mandatoryCheckboxesPaymentMethodSelect.methodPayment) {
                        (this.refOptionToPay as any).scrollIntoView({ behavior: "smooth" });
                        Swal.fire({
                            title: "Alto",
                            text: "Debes de se	leccionar un método de pago para continuar",
                            confirmButtonText: "Aceptar",
                        });
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async validDataToContinuePurchase() {
            try {
                let errors: number = 0;
                this.mandatoryCheckboxesPaymentMethodSelect.noticePrivacy === false
                    ? errors++
                    : null;
                this.mandatoryCheckboxesPaymentMethodSelect.termAndConditions === false
                    ? errors++
                    : null;
                this.mandatoryCheckboxesPaymentMethodSelect.methodPayment === false
                    ? errors++
                    : null;
                return errors;
            } catch (error) {
                console.log(error);
            }
        },
        async updateFanId() {
            try {
                if (this.userData.fanID !== undefined) {
                    const { data, status } ={
                        data: {},status: 200
                    };
                     /* await backend.post("reservation/applyFan", {
                        idFan: this.userData.fanID,
                        idReservation: this.editInfo.idReservation,
                    }); */

                    if (status === 200) {
                        this.editInfo.statusPurchase = "READYTOPAY";
                    }
                } else {
                    Swal.fire({
                        title: "Lo sentimos",
                        text: "Intentamos aplicar tu fan id a la compra pero parece haber algun tema con tus credenciales, se continuará con la compra de forma normal",
                        confirmButtonText: "Aceptar",
                    });
                    this.editInfo.statusPurchase = "READYTOPAY";
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onGetEventData() {
            /* 
                                    Metodo para obtener los datos generales del evento
                                    */
            try {
                const { data, status } = {
                        data: {},status: 200
                    };
                 /* await backend.get(
                    "events/event/" + this.editInfo.idEvent
                ); */

                if (status === 200) {
                    this.eventData = {} /* data.event */;
                    this.editInfo.enclosureMap.lat = (this.eventData as any).general.enclosure.location.lat;
                    this.editInfo.enclosureMap.lng = (this.eventData as any).general.enclosure.location.lng;
                    (this.eventData as any).general.dateEvenUnformat = (
                        this.eventData as any
                    ).general.dateEvent;
                    (this.eventData as any).general.dateEvent = moment(
                        (this.eventData as any).general.dateEvent
                    ).format("dddd, D MMMM");
                    
                    
                    await this.loadSvgContent((this.eventData as any).general.enclosure.media.url);

                    /* SE RECORREN LAS COMISIONES PARA AGREGAR ATRIBUTOS */
                    for (const group in (this.eventData as any).fees) {
                        (this.eventData as any).fees[group] = (this.eventData as any).fees[
                            group
                        ].map((feesItem: any, index: any) => {
                            /* here start calculation fees to apply purchase amount */
                            if (
                                feesItem.forced === 1 &&
                                feesItem.typeApplication === "AMOUNT" &&
                                feesItem.typeFees === "CASH" &&
                                feesItem.originalId !== 7 &&
                                feesItem.originalId !== 8
                            ) {
                                this.editInfo.comissionQuantity += feesItem.amount;
                            }
                            let valueChecked: any = false;

                            if (
                                feesItem.forced === 1 &&
                                feesItem.originalId !== 7 &&
                                feesItem.originalId !== 8
                            ) {
                                if (
                                    feesItem.typeFees === "PERCENT" &&
                                    feesItem.typeApplication === "AMOUNT"
                                ) {
                                    valueChecked = false;
                                } else {
                                    valueChecked = true;
                                }
                            } else {
                                valueChecked = false;
                            }

                            return {
                                amount: feesItem.amount,
                                description: feesItem.description,
                                forced: feesItem.forced === 0 ? false : true,
                                groupName: feesItem.groupName,
                                id: feesItem.id,
                                originalId: feesItem.originalId,
                                subtitle: feesItem.subtitle,
                                title: feesItem.title,
                                typeApplication: feesItem.typeApplication,
                                typeFees: feesItem.typeFees,
                                value: valueChecked,
                                cash: feesItem.amount,
                            };
                        });
                    }

                }
            } catch (error) {
                console.log(error);
            }
        },
        async selectSeat(rowItem: any, columnItem: any) {
            try {
                let seatItem = (this.seatsData as any).seats[
                    (rowItem - 1) * (this.seatsData as any).total[0].column +
                    (columnItem - 1)
                ];
                const exist = await this.validIfExitst(seatItem); //this valid if seat is already selected by the customer
                if (!exist) {
                    let seatAvailable = await this.validSeatSold(seatItem); //this valid if seat is already sold

                    if (!this.editInfo.isAppliedCoupon) {
                        if (seatAvailable) {
                            let ticketPrice: any = (this.eventData as any).zones.find(
                                (ticketItem: any) => ticketItem.name === seatItem.section
                            );
                            (this.seatSelected as any).push({
                                ...seatItem,
                                price: (ticketPrice as any).price,
                                subprice: (ticketPrice as any).price,
                            });
                            const counterZones = _.countBy(this.seatSelected, "section");
                            const dataZones = _.groupBy(this.seatSelected, "section");

                            (this.seatSelectedGrouped as any) = Object.keys(dataZones).map(
                                (key) => ({
                                    nameSection: key,
                                    count: counterZones[key],
                                    data: dataZones[key][0], // Aquí se mantienen los objetos completos
                                })
                            );
                            await this.onColorizeSeat(seatItem);
                            const nameRefContainer =
                                "container-" +
                                seatItem.row +
                                "-" +
                                seatItem.seat +
                                "-" +
                                seatItem.idChunk;
                            const containerSelected: any = (
                                this.$refs[nameRefContainer] as any
                            )[0];
                            if (containerSelected) {
                                containerSelected.classList.add("seat-selected");
                            }
                            await this.onCalculateSubTotalPurchase();
                            await this.onCalculateFeesNotForced();
                            await this.calculateFinalTotal();
                            const widthScreen = window.innerWidth
                            if (widthScreen < 850) {
                                this.scrollToRef('seatsMobileRef')
                            }
                        } else {
                            Swal.fire({
                                title: "Ups",
                                text: "Lugar no disponible",
                                confirmButtonText: "Aceptar",
                            });
                        }
                    } else {
                        Swal.fire({
                            title: "Lo sentimos",
                            text: "Te informamos que una vez aplicado algun cupon a la compra ya no es posible egragar mas asientos a ella.",
                            confirmButtonText: "Aceptar",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "alto",
                        text: "¿Quieres quitar el asiento de tus apartados?",
                        confirmButtonText: "Aceptar",
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        reverseButtons: true,
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            const nameRefContainer =
                                "container-" +
                                seatItem.row +
                                "-" +
                                seatItem.seat +
                                "-" +
                                seatItem.idChunk;
                            const containerSelected: any = (
                                this.$refs[nameRefContainer] as any
                            )[0];
                            if (containerSelected) {
                                containerSelected.classList.remove("seat-selected");
                            }
                            let newSeatSelected: any = [];

                            this.seatSelected.forEach((seatSelectedItem: any) => {
                                if (
                                    seatSelectedItem.row === seatItem.row &&
                                    seatSelectedItem.seat === seatItem.seat &&
                                    seatSelectedItem.idChunk === seatItem.idChunk
                                ) {
                                } else {
                                    newSeatSelected.push(seatSelectedItem);
                                }
                            });

                            this.seatSelected = newSeatSelected;

                            const counterZones = _.countBy(this.seatSelected, "section");
                            const dataZones = _.groupBy(this.seatSelected, "section");

                            (this.seatSelectedGrouped as any) = Object.keys(dataZones).map(
                                (key) => ({
                                    nameSection: key,
                                    count: counterZones[key],
                                    data: dataZones[key][0], // Aquí se mantienen los objetos completos
                                })
                            );
                            await this.onCalculateSubTotalPurchase();
                            await this.onCalculateFeesNotForced();
                            await this.calculateFinalTotal();
                            //to reset seats svg
                            const svgContainer: any = this.$refs.svgContainer;

                            let seatsTable: any = svgContainer.getElementsByClassName(
                                "table-" + seatItem.chunk
                            );
                            if (seatsTable !== undefined) {
                                let seatSelected = Array.from(seatsTable).filter((seat: any) =>
                                    seat.classList.contains(seatItem.seat)
                                );
                                (seatSelected[0] as any)?.classList.remove("seat-svg-selected");
                            }
                        }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onGetSeatsByChunk() {
            try {
                /* const chunkNumber: any = this.chunkSelected.split("-")[1]; */
                const formToSearch: any = {
                    event: {
                        id: Number(this.$route.query.idEvent),
                        name: "",
                    },
                    zone: {
                        id: Number(
                            this.chunkSelected
                        ) /* AQUI DEBE DE IR this.chunkSelected */,
                        name: "",
                    },
                };

                const { data, status } = {
                        data: {
                            seats: []
                        },status: 200
                    }; /* await backend.post(
                    "events/seat",
                    formToSearch
                ); */
                if (data.seats.length > 0) {
                    /* (this.seatsData as any).seat = data.data;
                              (this.seatsData as any).total = [
                                  {
                                      row: data.data[0].chunk,
                                      column: data.data.length,
                                  },
                              ];
          
                              this.calculateSizeSeats(); */
                    /* const { data, status } = await backend.post(
                        "events/seat",
                        formToSearch
                    ); */
                    this.seatsData = data;
                    this.calculateSizeSeats();
                    this.keysComponent.seatsBlocks++;
                    Swal.fire({
                        title: "Modulo seleccionado",
                        text: "Se ha seleccionado el modulo correctamente",
                        confirmButtonText: "Aceptar",
                        timer: 1000,
                        toast: true,
                        position: "bottom-right",
                    });
                } else {

                    Swal.fire({
                        title: "Upps",
                        text: "El bloque aun no ha sido mapeado, contacta soporte",
                        confirmButtonText: "Aceptar",
                        timer: 2500,
                        toast: true,
                        position: "bottom-right",
                    })
                    console.log('que paso aqui');
                    this.seatsData = {}
                    this.keysComponent.seatsBlocks++;



                }


            } catch (error) {
                console.log(error);
            }
        },
        async calculateSizeSeats() {
            try {
                const seatsCounter: any = (this.seatsData as any).total[0].column;
                const rowsCounter: any = (this.seatsData as any).total.length;

                let heightContainerSeats: any = 0;
                let newSize = 100 / seatsCounter; // 100 is the porcent max
                let separatorGap: any = newSize / 3; //3 its a reference but it would be change to other number
                heightContainerSeats =
                    newSize * rowsCounter + separatorGap * rowsCounter;

                newSize -= separatorGap;

                this.styleSeats.heightContainerSeats = heightContainerSeats + "rem";
                this.styleSeats.sizeSeat = newSize + "rem";
                (this.styleSeats.minimumSizeSeat as any) = newSize;
                (this.styleSeats.maxSizeSeat as any) = newSize * 1.5;
            } catch (error) {
                console.log(error);
            }
        },
        onGetSeatsQuantitySelected(nameZone: any) {
            try {
                let setasByGroup: any = _.groupBy(
                    this.seatSelected,
                    ({ section } = Object()) => {
                        return section;
                    }
                );

                let zoneToReturn: any = setasByGroup[nameZone];
                if (zoneToReturn === undefined) {
                    return 0;
                } else {
                    return setasByGroup[nameZone].length;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addClickColorZone(classNameZone: any, itemTicket:any) {
            /* metodos para agregar estilos al mapa */
            try {
                if (this.editInfo.statusPurchase === "START") {
                    if(Boolean(itemTicket.isActive)){

                        const elementsTableSelected = document.getElementsByClassName(
                            "rowTableSectionsSelected"
                        );
    
                        Array.from(elementsTableSelected).forEach((elemento) => {
                            (elemento as any).classList.remove("rowTableSectionsSelected");
                        });
    
                        (this.eventData as any).zones.forEach((ticketType: any) => {
                            ticketType.isSelected = false;
                        });
    
                        const elementsSVGSelected =
                            document.getElementsByClassName("block-svg-click");
    
                        Array.from(elementsSVGSelected).forEach((elemento) => {
                            (elemento as any).classList.remove("block-svg-click");
                        });
    
                        const svgContainer: any = this.$refs.svgContainer;
                        const tableContainer: any = this.$refs.tableElement;
    
                        const tableRow: any =
                            tableContainer.getElementsByClassName(classNameZone);
                        if (tableRow.length > 0) {
                            tableRow[0].classList.add("rowTableSectionsSelected");
                        }
    
                        const elementosAzul: any =
                            svgContainer.getElementsByClassName(classNameZone);
                        Array.from(elementosAzul).forEach((elemento: any) => {
                            (elemento as any).classList.add("block-svg-click");
                        });
                    }else{
                        Swal.fire({
                            title: 'Upps',
                            text: 'Esta zona no esta disponible por ahora, intenta en otra.'
                        })
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        async addHoverColorZone(classNameZone: any) {
            /* metodos para agregar estilos al mapa */
            try {
                if (this.editInfo.statusPurchase === "START") {
                    const svgContainer: any = this.$refs.svgContainer;
                    const elementosAzul: any =
                        svgContainer.getElementsByClassName(classNameZone);
                    Array.from(elementosAzul).forEach((element: any) => {
                        (element as any).classList.add("block-svg-hover");
                    });

                    const elementsTableSelected = document.getElementsByClassName(
                        "rowTableSectionsHover"
                    );

                    Array.from(elementsTableSelected).forEach((elemento) => {
                        (elemento as any).classList.remove("rowTableSectionsHover");
                    });

                    const tableContainer: any = this.$refs.tableElement;
                    const tableRow: any =
                        tableContainer.getElementsByClassName(classNameZone);
                    tableRow[0].classList.add("rowTableSectionsHover");
                }
            } catch (error) {
                console.log(error);
            }
        },
        async quitHoverColorZone(classNameZone: any) {
            /* metodos para agregar estilos al mapa */
            try {
                if (this.editInfo.statusPurchase === "START") {
                    const svgContainer: any = this.$refs.svgContainer;
                    const elementosAzul: any =
                        svgContainer.getElementsByClassName(classNameZone);
                    Array.from(elementosAzul).forEach((elemento) => {
                        (elemento as any).classList.remove("block-svg-hover");
                    });

                    const elementsTableSelected = document.getElementsByClassName(
                        "rowTableSectionsHover"
                    );

                    Array.from(elementsTableSelected).forEach((elemento) => {
                        (elemento as any).classList.remove("rowTableSectionsHover");
                    });

                    (this.eventData as any).zones.forEach((ticketType: any) => {
                        ticketType.isSelected = false;
                    });

                    const tableContainer: any = this.$refs.tableElement;

                    const tableRow: any =
                        tableContainer.getElementsByClassName(classNameZone);
                    tableRow[0].classList.remove("rowTableSectionsHover");
                }
            } catch (error) {
                console.log(error);
            }
        },
       
        onChangeZoomMap() {
            this.lacationFormSettings.zoomMap = (
                this.$refs.googleMap as any
            ).map.zoom;
        },
        async colorizeRowTable(nameZone: any) {
            try {
                /* (this.eventData as any).zones.forEach((ticketType: any) => {
                            if (ticketType.className !== nameZone) {
                                ticketType.isSelected = false;
                            } else {
                                ticketType.isSelected = true;
                            }
                        });
                        this.editInfo.rotationXMap = 50; */
                const orientationZone: any = await this.getNameOrientationZone(
                    nameZone
                );
                let angle: any = 0;
                switch (orientationZone) {
                    case "north":
                        angle = 180;
                        break;
                    case "east":
                        angle = 270;
                        break;
                    case "west":
                        angle = 90;
                        break;
                    case "south":
                        angle = 0;
                        break;
                }
                const widhScreen:any = window.innerWidth; 
                const heightScreen:any = window.innerHeight;
                (this.eventData as any).zones.forEach((ticketType: any) => {
                    if (ticketType.className !== nameZone) {
                        ticketType.isSelected = false;
                    } else {
                        ticketType.isSelected = true;
                    }
                });
                if(widhScreen > heightScreen){

                    this.editInfo.rotationAngleMap = angle;
                    this.editInfo.rotationXMap = 50;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getNameOrientationZone(nameZone: any) {
            try {
                const northZone: any = ["platea-norte"];
                const westZone: any = [
                    "oriente-alto",
                    "central-oriente__alto",
                    "central-oriente__alto",
                    "oriente-alto",
                    "central-poniente__alto",
                    "central-oriente__bajo",
                ];
                const eastZone: any = [
                    "poniente-alto",
                    "central-poniente__alto",
                    "poniente-alto",
                    "azul-central",
                ];
                const southZone: any = ["platea-sur", "oriente-bajo"];

                const findOnNorth: any = northZone.find(
                    (zoneItem: any) => zoneItem === nameZone
                );
                const findOnWest: any = westZone.find(
                    (zoneItem: any) => zoneItem === nameZone
                );
                const findOnEast: any = eastZone.find(
                    (zoneItem: any) => zoneItem === nameZone
                );
                const findOnSouth: any = southZone.find(
                    (zoneItem: any) => zoneItem === nameZone
                );

                if (findOnNorth !== undefined) {
                    return "north";
                } else if (findOnWest !== undefined) {
                    return "west";
                } else if (findOnEast !== undefined) {
                    return "east";
                } else {
                    return "south";
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onClearTableNamesSections() {
            const elementsTableSelected = document.getElementsByClassName(
                "rowTableSectionsSelected"
            );
            const elementsSVGSelected =
                document.getElementsByClassName("block-svg-click");

            Array.from(elementsSVGSelected).forEach((elemento) => {
                (elemento as any).classList.remove("block-svg-click");
            });
            const colors = document.getElementsByClassName("block-svg-selected");
            for (let index = 0; index < colors.length; index++) {
                /* @ts-ignore */
                colors[index].classList.remove("block-svg-selected");
            }
        },
        getRefName(rowItem: any, columnItem: any) {
            /* 
                                    este metodo retorna un nombre para identificar a 
                                    cada recuadro como un asiento.
                                    */
            try {
                let seatItem = (this.seatsData as any).seats[
                    (rowItem - 1) * (this.seatsData as any).total[0].column +
                    (columnItem - 1)
                ];
                return seatItem.row + "-" + seatItem.seat + "-" + seatItem.idChunk;
            } catch (error) {
                console.log(error);
            }
        },
        setClassSeat(rowItem: any, columnItem: any) {
            /* 
                                    este metodo asigna una clase a cada asiento 
                                    en base a atributos que contenga
                                	
                                    -show
                                    -status[AVALIABLE, IN PAYMENT PROCESS, COURTESY, PAID, RESERVED]
                        
                                    */
            try {

                let seatItem: any = (this.seatsData as any).seats[
                    (rowItem - 1) * (this.seatsData as any).total[0].column +
                    (columnItem - 1)
                ];
                const existInSelectedByUser = this.seatSelected.find(
                    (seatSelectedItem: any) =>
                        seatSelectedItem.seat === seatItem.seat &&
                        seatSelectedItem.row === seatItem.row &&
                        seatSelectedItem.idChunk === seatItem.idChunk
                );

                if (seatItem.show === 0 && existInSelectedByUser === undefined) {
                    return "seatNoExist";
                } else if (
                    seatItem.status === "AVALIABLE" &&
                    existInSelectedByUser === undefined
                ) {
                    return "seatAvaible";
                } else if (
                    (seatItem.status === "IN PAYMENT PROCESS" ||
                        seatItem.status === "COURTESY" ||
                        seatItem.status === "PAID" ||
                        seatItem.status === "RESERVED") &&
                    existInSelectedByUser === undefined
                ) {
                    return "seatSold";
                }
                if (existInSelectedByUser !== undefined) {
                    return "seat-selected";
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onChangeColorModule(event: any) {
            /* metodos para agregar estilos al mapa */
            const element = document.elementFromPoint(event.clientX, event.clientY);


            if (element && element.classList.contains("cls-1")) {
                await this.onClearTableNamesSections();
                (this.chunkSelected as any) = Number(element.id);
                let classesItem = Array.from(element.classList);
                let nameZoneSelected = "";
                classesItem.forEach((className: any) => {
                    if (className !== "cls-1" && className !== "block-svg-selected") {
                        nameZoneSelected = className;
                    }
                });
                console.log(nameZoneSelected);
                const zoneSelected :any = (this.eventData as any).zones.find((zone:any)=>zone.className === nameZoneSelected)

                if(zoneSelected !== undefined){
                    if(Boolean((zoneSelected as any).isActive)){
                        const tableContainer: any = this.$refs.tableElement;
                const elementsTableSelected = tableContainer.getElementsByClassName(
                    "rowTableSectionsSelected"
                );

                Array.from(elementsTableSelected).forEach((elemento) => {
                    (elemento as any).classList.remove("rowTableSectionsSelected");
                });

                const tableRow: any =
                    tableContainer.getElementsByClassName(nameZoneSelected);
                if (tableRow.length > 0) {
                    tableRow[0].classList.add("rowTableSectionsSelected");
                }

                await this.colorizeRowTable(nameZoneSelected);
                element?.classList.add("block-svg-selected");
                await this.onGetSeatsByChunk();
                this.scrollToRef("selection_seat_section");
                    }else{
                        (this.chunkSelected as any) = "",
                        Swal.fire({
                            title: 'Upps',
                            text: 'Esta zona no esta disponible por ahora, intenta en otra.'
                        })
                    }
                }
                

                /* ELEMENT IS THE HTML ELEMENT, SAVE THE CLASSS OR ID TO MORE ACTIOS IN THE FUTURE */

            } else if (element) {
                Swal.fire({
                    title: "Upss",
                    text: "Selecciona una zona valida.",
                    confirmButtonText: "Aceptar",
                });
            }
        },
        async zoom(type: any) {
            try {
                if (type === 1) {
                    let heightContainerSeat = this.styleSeats.sizeSeat.split("rem")[0];
                    if (heightContainerSeat > this.styleSeats.minimumSizeSeat) {
                        this.styleSeats.sizeSeat =
                            Number(heightContainerSeat) - 0.2 + "rem";
                    } else {
                        await this.calculateSizeSeats();
                    }
                } else if (type === 2) {
                    let heightContainerSeat = this.styleSeats.sizeSeat.split("rem")[0];
                    if (heightContainerSeat < this.styleSeats.maxSizeSeat) {
                        this.styleSeats.sizeSeat =
                            Number(heightContainerSeat) + 0.2 + "rem";
                    } else {
                        await this.calculateSizeSeats();
                    }
                } else {
                    await this.calculateSizeSeats();
                }
            } catch (error) {
                console.log(error);
            }
        },
        onTimeExpired() {
            Swal.fire({
                title: "Lo sentimos",
                text: "Los 10 minutos han terminado, tu proceso se eliminará por lo que sugerimos empieces nuevamente",
                confirmButtonText: "Aceptar",
                timer: 10000,
            }).then((event: any) => {
                this.$router.push({ name: "TTickets" });
            });
        },
        setChildRefMethodSelect(refOption: any, refChecks: any) {
            this.refOptionToPay = refOption;
            this.refChecks = refChecks;
        },
        reloadBrick() {
            if ((window as any).cardPaymentBrickController) {
                (window as any).cardPaymentBrickController.unmount();
            }
            this.keysComponent.card++;
            this.keysComponent.cash++;
            this.keysComponent.paypal++;
            this.keysComponent.mercard++;
        },
        wasMadePayment(response: any) {
            const feeFilter: any = this.formReservation.fees.find((fee: any) => {
                if (
                    fee.originalId === 1 ||
                    fee.originalId === 2 ||
                    fee.originalId === 3
                ) {
                    return fee;
                } else {
                    return null;
                }
            });
            let paypalPaymenty: any = false;
            response?.isPaypal === true
                ? (paypalPaymenty = response?.isPaypal)
                : false;

            if (response.success) {
                /* const emailToSend: any = this.token.length === 0 ? 1 : 0; */
                this.$router.push({
                    name: "TTickets__finaliced",
                    query: {
                        email: response.email,
                        idReference: response.idReference,
                        idReservation: this.editInfo.idReservation,
                        idEvent: (this.eventData as any).general.id,
                        typePayment: response.typePayment,
                        fees: feeFilter.nameFees,
                        totalToPaid: this.editInfo.totalWithComissions,
                        isPaypal: paypalPaymenty,
                    },
                });
            } else {
                Swal.fire({
                    title: "Lo sentimos",
                    text: "Tu pago no pudo completarse, error: " + response.message,
                    confirmButtonText: "Aceptar",
                });
            }
        },
        async showSeats(itemsZone: any) {
            try {
                this.editInfo.idZoneShowSeats = itemsZone;
                this.editInfo.showSeatsModal = true

            } catch (error) {
                console.log(error);
            }
        },
        async handleBrowserBack(event: any) {
            // Evita que siga “back” automáticamente
            event.preventDefault()


            const { isConfirmed } = await Swal.fire({
                title: '¿Seguro que quieres ir atrás?',
                text: 'Los datos ingresados en la compra se perderán, liberando los lugares de la reservación',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, regresar',
                cancelButtonText: 'Continuar reservando'
            })

            if (isConfirmed) {
                // 3a) Si confirma, quita este listener y regresa de verdad
                (this.seatSelected.length > 0 && this.editInfo.statusPurchase !== 'START')  ?  await this.relaseSeatsReservation() : null;

                window.removeEventListener('popstate', this.handleBrowserBack)
                /* window.history.back() */
                this.$router.push({name: 'TTickets'})


            } else {
                // 3b) Si cancela, volvemos a empujar el mismo estado
                window.history.pushState(null, '', window.location.href)
            }
        },

        async getdeliveryFee() {
            try {
                const deliveryFees: any = (this.eventData as any).fees['METODOS DE ENTREGA']
                console.log(deliveryFees);
                let deliveryFeeSelected: any = {}
                deliveryFees.forEach((feeItem: any) => {
                    if (feeItem.value) deliveryFeeSelected = feeItem
                });
                this.deliveryFeeSelected = deliveryFeeSelected
            }
            catch (error) {
                console.log(error);

            }
        },
        async relaseSeatsReservation(){
            try{    

                const secretWord = import.meta.env.VITE_NCRYPT_SECRET_KEY

                const encrypted = CryptoJS.AES.encrypt(this.editInfo.idReservation.toString(), secretWord).toString();
                console.log('esta es la reservacion encriptada', encrypted);
                
                const { data, status} = {data: {}, status: 200} /* await backend.post('events/releaseSeats' , {data: encrypted}) */
                return status
            }catch(error){
                console.log(error);
            }

        }


    },
    computed: {
        mode() {
            return import.meta.env.VITE_PATH_MEDIA
        },
        ...mapGetters("session", ["userData", "token"]),
        /* funcion calculadoras */
        calculateTicketingValue() {
            /* 
                              Metodo que calcula en $ el costo total de boletaje
                          	
                              valor = boletaje + INBROPI FEESA
                          	
                              */
            try {
                let totalTicketing: any = 0;
                this.seatSelected.forEach((seatItem: any) => {
                    totalTicketing += seatItem.price;
                });

                //to apply coupons-purchase amount
                this.formReservation.coupons.forEach((couponItem: any) => {
                    if (couponItem.typeApplication !== "TICKET") {
                        if (couponItem.typeDisacount === "CASH") {
                            totalTicketing -= couponItem.value;
                        }
                    }
                });

                return Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(totalTicketing + this.editInfo.inbropiFees);
            } catch (error) {
                console.log(error);
            }
        },
        calculateFeesSelected() {
            /* Metodo que calcula el valor en $ de las comisiones seleccionadas */
            try {
                let numberToReturn: any = ((this.editInfo.totalFeesNotForced as any) +
                    this.editInfo.totalFeesForced) as any;

                return Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(numberToReturn);
            } catch (error) {
                console.log(error);
            }
        },
        calculateGanwayFees() {
            /* Metodo que calcula el valor en $ de las comisiones de pasarela */
            try {
                let numberToReturn: any =
                    this.editInfo.comissionGangway + this.editInfo.iva;
                return Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(numberToReturn);
            } catch (error) {
                console.log(error);
            }
        },
    },
    async created() {
        if (this.$route.query.idEvent) {
            (this.editInfo.idEvent as any) = this.$route.query.idEvent;
            await this.onGetEventData();

            (this.googleApiPromise as any) = this.loadGoogleMapsApi();
            (this.lacationFormSettings as any).markerOptions.position = {
                lat: Number(this.editInfo.enclosureMap.lat),
                lng: Number(this.editInfo.enclosureMap.lng),
            };
            (this.lacationFormSettings as any).zoomMap = 16;
            this.keysComponent.mapGoogle++;
            /* await this.onGenerateMarkerDataMap(); */
            (this.calendarData.dates as any) = moment(
                (this.eventData as any).general.dateEvenUnformat
            );
        } else {
            Swal.fire({
                title: "Lo sentimos",
                text: "Seras redireccionado al listado de eventos, selecciona el evento al que quieres asistir",
                confirmButtonText: "Aceptar",
            }).then((response) => {
                this.$router.push({ name: "TTickets" });
            });
        }

    },
    mounted() {
        // 1) Mete un estado extra en el historial, para que siempre haya dónde “rebotar”
        window.history.pushState(null, '', window.location.href)

        // 2) Escucha popstate (back/forward)
        window.addEventListener('popstate', this.handleBrowserBack)
        /* }); */
    },
    beforeUnmount() {
        window.removeEventListener('popstate', this.handleBrowserBack)
    },
};
</script>
<template>

    <main class="eventDetail eventDetail-container">
        <div class="ticketPurchase" flex="row" v-if="Object.keys((eventData as any)).length > 0" style="height: 100%;">
            <section class="ticketPurchase__left map__wrapper" ref="container" flex="row" wrap style="flex: 1;">
                <!-- div info event mobile -->
                <div flex="row" wrap basis="100" style="height: fit-content; padding-inline: 1rem;" justify-center
                    class="infoEventMobile">
                    <figure basis="70" class="ticketPurchase__flyerContainer" box-shadow-gallo>
                        <img :src="(eventData as any).general?.media?.flayerUrl" alt="" />
                    </figure>
                    <div flex="row" class="ticketPurchase__infoContainer" width-100 padding-inline-2 justify-center>
                        <h3 style="text-align: end !important;" font-oswald>
                            {{ (eventData as any).general.name }}
                        </h3>
                        <!-- <div @click="onShowEventDetail()" flex="row" justify-center align-center
                            style="margin-inline-start: 1rem;">
                            <img src="@/assets/icon/eye.svg" />
                        </div> -->
                    </div>
                    <!--  <div flex="row" class="ticketPurchase__placeAndDateContainer" padding-block-start-1 width-100 wrap
                        padding-inline-2>
                        <div basis="100" flex="row" padding-block-start-1>
                            <div @click="onShowEventDetail()" basis="50" flex="row" grow="1" justify-center
                                align-center>
                                <p>ver más</p>
                            </div>
                            <div basis="50" flex="row" justify-center v-if="
                                !editInfo.isAppliedCoupon &&
                                editInfo.statusPurchase === 'START'
                            ">
                            </div>
                            <section class="ticketPurchase__codeCoupon" v-if="editInfo.isAppliedCoupon" flex="row"
                                basis="50" justify-space-evenly align-center padding-inline-2>
                                <p>{{ (couponsApplied as any)[0]?.key_word }}</p>
                                <img class="iconMedia" :src="mode + '/assets/icon/ticketIcon.svg'" />
                            </section>
                        </div>
                    </div> -->
                    <div class="separator" style="
              border: 0.5px solid rgb(200, 200, 200);
              margin: auto;
              margin-block-start: 1.5rem;
            " width-90></div>
                </div>
                <!-- div contenedor de mapa y asientos -->
                <div v-if="editInfo.statusPurchase === 'START'" basis="100" flex="row" wrap class="mapSection">
                    <h3 basis="100" class="ticketPurchase__title" text-center>
                        Selecciona una zona en el mapa para escoger tus asientos
                    </h3>
                    <div flex-row width-100 class="mapSection__content">
                        <div ref="tableElement" flex-row justify-center
                            padding-inline-2>
                            <table class="table-prices" box-shadow-gallo style="top: auto !important">
                                <thead>
                                    <tr>
                                        <th scope="col" hidden>idTicket</th>
                                        <th scope="col">Zona</th>
                                        <th scope="col">Precio</th>
                                    </tr>
                                </thead>
                                <tbody v-if="(eventData as any).zones !== undefined">
                                    <tr v-for="(itemTicket, index) in (eventData as any).zones"
                                        :key="itemTicket.idTicket" :class="itemTicket.className"
                                        @mouseover.stop="addHoverColorZone(itemTicket.className)"
                                        @click.stop="addClickColorZone(itemTicket.className, itemTicket)"
                                        @mouseout.stop="quitHoverColorZone(itemTicket.className)">
                                        <td hidden>{{ itemTicket.idTicket }}</td>
                                        <td>{{ itemTicket.name }}</td>
                                        <td>{{ formatFn(itemTicket.price) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div flex="row" justify-center :key="keysComponent.map" class="mapContainer" padding-2
                            ref="svgContainer" v-html="svgContent" cursor-pointer
                            @click.prevent="onChangeColorModule($event)" :style="{
                                transform: `rotateX(${editInfo.rotationXMap}deg) rotateY(0deg) rotateZ(${editInfo.rotationAngleMap}deg)`,
                            }"></div>
                    </div>
                </div>
                <div class="seatsWrapper" ref="selection_seat_section" @key="keysComponent.seatsBlocks" grow="1"
                    basis="100" flex-row wrap text-center justify-center
                    v-if="(seatsData as any).seats && editInfo.statusPurchase === 'START'">
                    <h3 class="ticketPurchase__title" padding-block-end basis="100">
                        Selecciona la ubicación de tus asientos en el bloque
                        {{ (seatsData as any)?.seats[0].chunk }}
                    </h3>
                    <template style="width: 100% !important; padding-inline: 1.5rem;" flex-row wrap justify-start>
                        <div style="width: 100%; " flex-row justify-center>
                            <TButton class="ticketPurchase__couponButton couponButton__mobile  "
                                style="margin-bottom: 1rem;" v-bind="{
                                    icon: mode + '/assets/icon/ticketIcon.svg',
                                    text: 'Activar cupón',
                                    type: 'clickeable',
                                    color: 'var(--gallos-electric-blue)',
                                    backgroundColor: 'transparent',
                                    /* border: '1px solid var(--gallos-electric-blue)', */
                                }" @click.prevent="onShowCouponAlert()" />
                        </div>
                        <div class="zoomButtonsSeats" margin-block-2 flex-row col-gap="1" basis="90">
                            <TButton class="zoom__mobile" v-bind="{
                                type: 'clickeable',
                                color: 'white',
                                /* class: 'noHasPadding', */
                                backgroundColor: '#75B1FA',
                                icon: '/icon/less.svg',
                            }" @click.prevent="zoom(1)" />
                            <TButton class="zoom__mobile" v-bind="{
                                type: 'clickeable',
                                text: 'Reset',
                                /* class: 'noHasPadding', */
                                color: 'var(--gallos-dark-blue)',
                                backgroundColor: '#75B1FA',
                            }" @click.prevent="zoom(3)" />
                            <TButton class="zoom__mobile" v-bind="{
                                type: 'clickeable',
                                color: 'white',
                                /* class: 'noHasPadding', */
                                backgroundColor: '#75B1FA',
                                icon: '/icon/plus.svg',
                            }" @click.prevent="zoom(2)" />
                        </div>
                    </template>

                    <div flex-row class="wrapper-seats-scroll" margin-block-end-1 padding-block-end-1>
                        <div basis="100" flex-column class="wrapper-seats" :style="'width: 100%'">
                            <span v-for="(rowItem) in (seatsData as any).total.length" :key="rowItem" flex-row
                                justify-space-between grow="1">
                                <span grow="1" v-for="(columnItem) in (seatsData as any).total[0].column"
                                    :key="columnItem" flex-row scope="row">
                                    <div class="seat-wrapper-row" flex-row justify-center align-center
                                        v-if="columnItem === 1" :style="'width:' +
                                            styleSeats.sizeSeat +
                                            ';height: ' +
                                            styleSeats.sizeSeat +
                                            ';margin-right: .8rem'
                                            ">
                                        <h4>{{ (seatsData as any)?.total[rowItem - 1].row }}</h4>
                                    </div>

                                    <div :ref="'container-' + getRefName(rowItem, columnItem)"
                                        class="seat-wrapper-item seatWithMargin" :style="'width:' +
                                            styleSeats.sizeSeat +
                                            ';height: ' +
                                            styleSeats.sizeSeat
                                            " flex-row justify-center align-center
                                        :class="[setClassSeat(rowItem, columnItem)]"
                                        @click="selectSeat(rowItem, columnItem)">
                                        <p
                                            :style="'font-size: calc(' + styleSeats.sizeSeat + ' -' + ((styleSeats as any).minimumSizeSeat / 2) + ' rem) !important'">
                                            {{
                                                (seatsData as any).seats[
                                                    (rowItem - 1) * (seatsData as any).total[0].column +
                                                    (columnItem - 1)
                                                ].seat
                                            }}
                                        </p>
                                    </div>
                                </span>
                            </span>
                        </div>
                    </div>


                    <div style=" flex-grow: 1; margin-block: 2rem;" flex-row justify-center class="couponButton__mobile"
                        ref="seatsMobileRef">

                        <div class="ticketPurchase__tablePrices" v-if="seatSelectedGrouped.length > 0" wrap flex="row"
                            justify-center align-center>
                            <div class="ticketPurchase__ticketPrice" flex="row" wrap
                                v-for="(ticketItem, index) in (seatSelectedGrouped as any)" :key="index"
                                @click="showSeats(ticketItem)">
                                <div flex="row" basis="100" align-center>
                                    <figure basis="15" class="iconTicketItem" flex="row" justify-center>
                                        <img class="iconMedia" :src="mode + '/assets/icon/ticketIcon.svg'" alt="" />
                                    </figure>
                                    <h4 basis="70" class="nameZoneTicket" padding-inline-1>
                                        {{ ticketItem.nameSection }}
                                        <span class="counterTickets" style="margin-inline-start: 0.2rem">
                                            {{ ticketItem.count }}
                                        </span>
                                    </h4>
                                    <div basis="15" flex="row" justify-end>
                                        <p class="priceMaxZoneTicket" text-end>
                                            {{ formatFn((ticketItem as any).data.subprice) }}
                                        </p>
                                        <p class="priceMinZoneTicket" text-end>
                                            MXN mas comisiones
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>
                <!-- TIMER HEADER -->
                <div class="ticketPurchase__timer_header_wrapper"
                    v-if="editInfo.isConfirmPurchase && (editInfo.statusPurchase !== 'START' && editInfo.statusPurchase !== 'SEATSELECTED')"
                    style="width: 40%; height: fit-content; margin-inline: 30%;" flex-row wrap justify-center>
                    <h3 basis="100" text-center v-if="editInfo.isConfirmPurchase" padding-block-start-2
                        class="ticketPurchase__title ticketPurchase__title_timer">
                        TIEMPO RESTANTE
                    </h3>
                    <TTimer basis="100" class="ticketPurchase__timer" v-if="editInfo.isConfirmPurchase"
                        padding-block-start-1 @timeExpired="onTimeExpired()" flex-row justify-center />
                    <p padding-block class="ticketPurchase__timer-text"
                        v-if="editInfo.statusPurchase === 'SEATSELECTED'">
                        A partir de este momento, y con el objetivo de brindarle el mejor
                        servicio disponible de boletos a ti y a los demás clientes, dispones
                        de 10 minutos para completar tu compra.
                    </p>
                </div>
                <!-- Contenedor TIMER, FEES, METHOD PURCHASE -->
                <section class="ticketPurchase__wrapperCompletePurchase" ref="timer_section"
                    v-if="editInfo.statusPurchase !== 'START'" flex="column" width-100 text-center padding-inline-4
                    justify-center>
                    <h3 v-if="editInfo.statusPurchase === 'SEATSELECTED'" padding-block-start-2
                        class="ticketPurchase__title ticketPurchase__title_timer">
                        TIEMPO RESTANTE
                    </h3>
                    <TTimer class="ticketPurchase__timer" v-if="editInfo.statusPurchase === 'SEATSELECTED'"
                        padding-block-start-1 @timeExpired="onTimeExpired()" />

                    <p padding-block class="ticketPurchase__timer-text"
                        v-if="editInfo.statusPurchase === 'SEATSELECTED'">
                        A partir de este momento, y con el objetivo de brindarle el mejor
                        servicio disponible de boletos a ti y a los demás clientes, dispones
                        de 10 minutos para completar tu compra.
                    </p>

                    <div class="ticketPurchase__comissions-general-wrapper"
                        v-if="editInfo.statusPurchase === 'SEATSELECTED'" flex="row" justify-center wrap align-center>
                        <h3 class="ticketPurchase__title" basis="100" text-center padding-block>
                            COMISIONES
                        </h3>
                        <div class="eventDetail__comissions-white-wrapper" justify-center v-if="(eventData as any).fees"
                            flex-row basis="100">
                            <TTickets__comissions :fees="(eventData as any).fees" @updateAplicationFees="
                                async (dataFees: any) => {
                                    (eventData as any).fees = dataFees;
                                    keysComponent.feesInfo++;
                                    await onCalculateFeesNotForced();
                                    await applyFeesPasarela();
                                    await calculateFinalTotal();
                                }
                            " />
                        </div>
                    </div>
                    <!-- SELECCION DE METODO DE PAGO -->
                    <TTickets__selectionMethodPay ref="selectionMethodPayRef" :termAndConditionsValue="mandatoryCheckboxesPaymentMethodSelect.termAndConditions
                        " :noticePrivacyValue="mandatoryCheckboxesPaymentMethodSelect.noticePrivacy
                            " :methodPaymentValue="mandatoryCheckboxesPaymentMethodSelect.methodPayment
                                " @selectMethodPurchase="(methodSelected: any) => {
                                    mandatoryCheckboxesPaymentMethodSelect.methodPayment = true
                                    mandatoryCheckboxesPaymentMethodSelect.methodPaymentSelected = methodSelected
                                }" @checkBoxEmit="
                                    (checkbox:any, value:any) => {
                                        if (checkbox === 1) {
                                            mandatoryCheckboxesPaymentMethodSelect.termAndConditions =
                                                value;
                                        } else if (checkbox === 2) {
                                            mandatoryCheckboxesPaymentMethodSelect.noticePrivacy = value;
                                        }
                                    }
                                " @expose-ref="setChildRefMethodSelect"
                        v-if="editInfo.statusPurchase === 'FEESSELECTED'" style="height: 100%;" />
                    <!-- LOGIN -->
                    <TTickets__login v-if="editInfo.statusPurchase === 'PREVIEWLOGIN'" :methodSelected="mandatoryCheckboxesPaymentMethodSelect.methodPaymentSelected
                        " @returnToFeesSelectedStatus="
                            () => {
                                editInfo.statusPurchase = 'FEESSELECTED';
                            }
                        " @continueAsInvitied="
                            () => {
                                editInfo.statusPurchase = 'READYTOPAY';
                                scrollToRef('paymentBrick_section');
                            }
                        " @continueWithCredentials="
                            async () => {
                                await updateFanId();
                                scrollToRef('paymentBrick_section');
                            }
                        " />
                    <!-- <div>
						<TButton v-if="editInfo.statusPurchase === 'PREVIEWLOGIN' && userData.fanID  !== undefined" basis="70" class="ticketPurchase__couponButton" v-bind="{
									text: 'Seleccionar otro método',
									type: 'clickeable',
									color: 'black',
									backgroundColor: 'rgb(255, 205, 104)',
								}" @click.prevent="()=>{
									editInfo.statusPurchase = 'FEESSELECTED'
								}" />
					</div> -->

                    <!-- section bricks payment -->
                    <section class="eventDetail__payment-wrapper" flex-row padding-block-3
                        v-if="editInfo.statusPurchase === 'READYTOPAY'">

                        <span padding-inline-4 ref="paymentBrick_section" class="eventDetail__payment-form-wrapper"
                            basis="100">
                            <TCardPayment :key="keysComponent.card" v-if="(editInfo.methodPaySelected as any)?.id === 1"
                                :idReservation="editInfo.idReservation" :deliveryFee="deliveryFeeSelected"
                                :isCompletePurchase="editInfo.isCompletePurchase"
                                :totalToPay="(editInfo.finalTotalComissionsIVA as any)" @madePayment="wasMadePayment"
                                @reloadBrickEmiter="reloadBrick()" @returnToSelectFees="
                                    () => {
                                        reloadBrick()
                                        editInfo.statusPurchase = 'FEESSELECTED';
                                    }
                                " />
                            <TOxxo :key="keysComponent.cash" v-if="(editInfo.methodPaySelected as any)?.id === 2"
                                :totalToPay="editInfo.finalTotalComissionsIVA" :idReservation="editInfo.idReservation"
                                :deliveryFee="deliveryFeeSelected" :isCompletePurchase="editInfo.isCompletePurchase"
                                @madePayment="wasMadePayment" @reloadBrickEmiter="reloadBrick()" @returnToSelectFees="
                                    () => {
                                        reloadBrick()
                                        editInfo.statusPurchase = 'FEESSELECTED';
                                    }
                                " @CompletePurchaseOxxo="
                                    () => {
                                        editInfo.isCompletePurchase = true;
                                    }
                                " />
                            <TMercadoPago :key="keysComponent.mercard"
                                v-if="(editInfo.methodPaySelected as any)?.id === 3"
                                :totalToPay="editInfo.finalTotalComissionsIVA" :idReservation="editInfo.idReservation"
                                :deliveryFee="deliveryFeeSelected" :isCompletePurchase="editInfo.isCompletePurchase"
                                @madePayment="wasMadePayment" @reloadBrickEmiter="reloadBrick()" @refreshBrick="
                                    () => {
                                        keysComponent.mercard++;
                                    }
                                " @returnToSelectFees="
                                    () => {
                                        reloadBrick()
                                        editInfo.statusPurchase = 'FEESSELECTED';
                                    }
                                " />
                            <TPaypal :key="keysComponent.mercard" v-if="(editInfo.methodPaySelected as any)?.id === 4"
                                :totalToPay="(editInfo.finalTotalComissionsIVA as any)"
                                :isCompletePurchase="editInfo.isCompletePurchase" :deliveryFee="deliveryFeeSelected"
                                :idReservation="(editInfo.idReservation as any)" @madePayment="wasMadePayment"
                                @reloadBrickEmiter="reloadBrick()" @refreshBrick="
                                    () => {
                                        keysComponent.mercard++;
                                    }
                                " @returnToSelectFees="
                                    () => {
                                        reloadBrick()
                                        editInfo.statusPurchase = 'FEESSELECTED';
                                    }
                                " />
                        </span>
                    </section>
                </section>
                <!-- info totales MOBILE -->
                <div flex="row" basis="100" wrap align-center
                    class="ticketPurchase__infoTotales ticketPurchase__infoTotalesMobile" padding-inline-1>
                    <div v-if="editInfo.isShowTotalesDetail" basis="100" padding-inline-4 padding-block-end>
                        <h5 basis="100" flex="row" justify-space-between font-oswald>
                            BOLETAJE :
                            <span text-bolder color-blue-dark style="font-size: 1.5rem" font-oswald>
                                {{ calculateTicketingValue }}
                            </span>
                        </h5>
                        <div flex="row" wrap padding-bottom-1>
                            <p basis="100" font-oswald @click="
                                () => {
                                    editInfo.isShowTicketingDetail =
                                        !editInfo.isShowTicketingDetail;
                                }
                            " flex="row" align-center style="text-decoration: underline; cursor: pointer">
                                *Desglosar boletaje
                                <span><img v-if="!editInfo.isShowTicketingDetail"
                                        :src="'/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowTicketingDetail"
                                        :src="'/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                            <div v-if="editInfo.isShowTicketingDetail" basis="100" padding-inline-4 padding-block-2>
                                <span flex-row wrap basis="100">
                                    <h5 basis="100" width-100 font-oswald>
                                        BOLETAJE <span> <img style="width: 1rem;"
                                                :src="'/icon/rightArrow.svg'" alt=""></span> {{
                                                    editInfo.totalToPay }}
                                    </h5>
                                </span>
                                <span flex-row wrap basis="100">
                                    <h5 basis="100" width-100 font-oswald>
                                        CARGO POR SERVICIO <span> <img style="width: 1rem;"
                                                :src="'/icon/rightArrow.svg'" alt=""></span>
                                        {{ formatFn(editInfo.inbropiFees) }}
                                        <!-- $$$ -->
                                    </h5>
                                </span>
                            </div>
                        </div>
                        <h5 v-if="couponsApplied.length > 0" basis="100" flex="row" justify-space-between font-oswald>
                            CUPÓN :
                            <span text-bolder color-blue-dark style="font-size: 1.5rem" font-oswald>
                                {{ (couponsApplied as any)[0].key_word }} <span> <img style="width: 1rem;"
                                        :src=" '/icon/rightArrow.svg'" alt=""></span> {{
                                            (couponsApplied as any)[0].typeCoupon === "VIP"
                                                ? "1 Boleto gratis"
                                                : (couponsApplied as any)[0].valueCash
                                        }}
                            </span>
                        </h5>
                        <h5 v-if="editInfo.statusPurchase !== 'START'" basis="100" flex="row" justify-space-between
                            align-center font-oswald>
                            COMISIONES SELECCIONADAS:
                            <span text-bolder color-blue-dark style="font-size: 1.5rem">{{
                                calculateFeesSelected
                                }}</span>
                        </h5>
                        <div flex="row" wrap v-if="editInfo.statusPurchase !== 'START'" padding-bottom-1>
                            <p basis="100" @click="
                                () => {
                                    editInfo.isShowFeesDetail = !editInfo.isShowFeesDetail;
                                }
                            " flex="row" align-center style="text-decoration: underline; cursor: pointer" font-oswald>
                                *Desglosar comisiones
                                <span><img v-if="!editInfo.isShowFeesDetail"
                                        :src=" '/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowFeesDetail"
                                        :src=" '/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                            <div v-if="editInfo.isShowFeesDetail" basis="100" padding-inline-4 padding-block-2>
                                <span v-for="(feesGroup, index) in (eventData as any).fees" :key="index" flex-row wrap
                                    basis="100">
                                    <span v-for="feesItem in feesGroup" :key="feesItem.id" flex-row wrap basis="100">
                                        <h5 basis="100" v-if="
                                            feesItem.value === true &&
                                            feesItem.groupName !== 'OTROS'
                                        " width-100 font-oswald>
                                            {{ feesItem.title }} <span> <img style="width: 1rem;"
                                                    :src="'/icon/rightArrow.svg'" alt=""></span> {{
                                                        formatFn(feesItem.cash) }}
                                        </h5>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <h5 basis="100" flex="row" justify-space-between font-oswald>
                            SUBTOTAL:
                            <span text-bolder color-blue-dark style="font-size: 1.5rem">{{
                                formatFn(editInfo.totalWithComissions)
                                }}</span>
                        </h5>
                        <h5 basis="100" v-if="editInfo.statusPurchase !== 'START'" flex="row" justify-space-between
                            font-oswald>
                            PROCESAMIENTO DE ORDEN:
                            <span text-bolder color-blue-dark style="font-size: 1.5rem">{{
                                calculateGanwayFees
                                }}</span>
                        </h5>
                    </div>
                    <div style="max-width: 40%;">
                        <div flex-row wrap>
                            <h3 basis="100" style="font-weight: 600; color: black" font-oswald>
                                {{ formatFn(editInfo.finalTotalComissionsIVA) }}
                                <span> MXN</span>
                            </h3>
                            <p @click="
                                () => {
                                    editInfo.isShowTotalesDetail =
                                        !editInfo.isShowTotalesDetail;
                                    if (editInfo.isShowTotalesDetail) {
                                        scrollToRef('actionButtons_section');
                                    }
                                }
                            " flex="row" align-center style="text-decoration: underline; cursor: pointer" font-oswald>
                                Detalles de tu compra
                                <span><img v-if="!editInfo.isShowTotalesDetail"
                                        :src="'/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowTotalesDetail"
                                        :src="'/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                        </div>
                    </div>
                    <div style="max-width: 60%;  width: 100%;" flex="row" justify-center row-gap="1"
                        ref="actionButtons_section">
                        <TButton v-if="editInfo.statusPurchase === 'START'" basis="90" class="next__button-principal" v-bind="{
                            text: 'RESERVAR',
                            type: 'clickeable',
                            color: 'white',
                            backgroundColor: 'var(--gallos-orange)',
                        }" @click.prevent="onConfirmReservationSeats()" />
                        <section v-if="editInfo.statusPurchase !== 'START'" width-100 class="" flex-row col-gap="1">
                            <TButton grow="1" class="more_seats" v-bind="{
                                text: 'Asientos',
                                icon: '/icon/plus.svg',
                                type: 'clickeable',
                                displayIconWrappper: 'row-reverse',
                                color: 'var(--gallos-red)',
                                border: '1px solid var(--gallos-red)',
                                backgroundColor: 'white',
                            }" @click.prevent="onCancelReservation()" />
                            <TButton  style="" v-if="editInfo.statusPurchase === 'SEATSELECTED'" grow="1" class="next__button"
                                v-bind="{
                                    text: 'Siguiente',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="applyFees()" />
                            <TButton v-if="editInfo.statusPurchase === 'FEESSELECTED'" grow="1" class="next__button"
                                v-bind="{
                                    text: 'Proceder al pago',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="makePurchase()" />
                        </section>
                    </div>
                </div>
            </section>
            <section flex="row" wrap class="ticketPurchase__rigth" v-if="Object.keys((eventData as any)).length > 0"
                style="flex: 1;">
                <div flex="row" wrap basis="100"
                    style="align-content: start;height: calc(100vh - 15rem); padding-inline: 1rem" justify-center>
                    <figure basis="70" class="ticketPurchase__flyerContainer" box-shadow-gallo>
                        <img :src="(eventData as any).general?.media?.flayerUrl" alt="" />
                    </figure>
                    <div flex="row" class="ticketPurchase__infoContainer" width-100 padding-inline-2>
                        <h3 style="flex-grow: 1;" text-center font-oswald>
                            {{ (eventData as any).general.name }}
                        </h3>
                        <div basis="40" flex="row" v-if="
                            !editInfo.isAppliedCoupon &&
                            editInfo.statusPurchase === 'START'
                        ">
                            <!-- <div @click="onShowEventDetail()" basis="50" flex="row" grow="1" justify-center
                                align-center>
                                <p>más info</p>
                            </div> -->
                            <div basis="50" flex="row" justify-center v-if="
                                !editInfo.isAppliedCoupon &&
                                editInfo.statusPurchase === 'START'
                            ">
                                <TButton class="ticketPurchase__couponButton" v-bind="{
                                    icon: mode + '/assets/icon/ticketIcon.svg',
                                    text: 'Activar cupón',
                                    type: 'clickeable',
                                    color: 'var(--gallos-dark-blue)',
                                    border: '1px solid var(--gallos-dark-blue)',
                                    backgroundColor: 'white',
                                }" @click.prevent="onShowCouponAlert()" />
                            </div>
                            <section class="ticketPurchase__codeCoupon" v-if="editInfo.isAppliedCoupon" flex="row"
                                basis="50" justify-space-evenly align-center padding-inline-2>
                                <p>{{ (couponsApplied as any)[0]?.key_word }}</p>
                                <img class="iconMedia" :src="mode + '/assets/icon/ticketIcon.svg'" />
                            </section>
                        </div>
                    </div>
                    <!--  <div flex="row" class="ticketPurchase__placeAndDateContainer"  width-100 wrap
                        padding-inline-2>
                        <div basis="100" flex="row" padding-block-start-1>
                            
                            <div basis="50" flex="row" justify-center v-if="
                                !editInfo.isAppliedCoupon &&
                                editInfo.statusPurchase === 'START'
                            ">
                                <TButton class="ticketPurchase__couponButton" v-bind="{
                                    icon: mode + '/assets/icon/ticketIcon.svg',
                                    text: 'Activar cupón',
                                    type: 'clickeable',
                                    color: 'var(--gallos-electric-blue)',
                                    border: '1px solid var(--gallos-electric-blue)',
                                    backgroundColor: 'white',
                                }" @click.prevent="onShowCouponAlert()" />
                            </div>
                            <section class="ticketPurchase__codeCoupon" v-if="editInfo.isAppliedCoupon" flex="row"
                                basis="50" justify-space-evenly align-center padding-inline-2>
                                <p>{{ (couponsApplied as any)[0]?.key_word }}</p>
                                <img class="iconMedia" :src="mode + '/assets/icon/ticketIcon.svg'" />
                            </section>
                        </div>
                    </div> -->
                    <div style="
              border: 0.5px solid rgb(200, 200, 200);
              height: 0;
            " width-90></div>
                    <!-- prices -->
                    <div flex="column" class="ticketPurchase__pricesContainer" padding-inline-2 style="height: 50%;">
                        <h4 style="padding-block: 1rem" text-center>Mis Lugares</h4>
                        <h5 v-if="seatSelectedGrouped.length > 0" @click="showSeats(seatSelectedGrouped[0])"  text-center class="link">Streetview de lugares</h5>
                        <div style=" flex-grow: 1;" flex-row justify-center>

                            <div class="ticketPurchase__tablePrices" v-if="seatSelectedGrouped.length > 0" wrap
                                flex="row" justify-center align-center>
                                <div class="ticketPurchase__ticketPrice" flex="row" wrap
                                    v-for="(ticketItem, index) in (seatSelectedGrouped as any)" :key="index"
                                    @click="showSeats(ticketItem)">
                                    <div flex="row" basis="100" align-center>
                                        <figure basis="15" class="iconTicketItem" flex="row" justify-center>
                                            <img class="iconMedia" :src="mode + '/assets/icon/ticketIcon.svg'" alt="" />
                                        </figure>
                                        <h4 basis="70" class="nameZoneTicket" padding-inline-1>
                                            {{ ticketItem.nameSection }}
                                            <span class="counterTickets" style="margin-inline-start: 0.2rem">
                                                {{ ticketItem.count }}
                                            </span>
                                        </h4>
                                        <div basis="15" flex="row" justify-end>
                                            <p class="priceMaxZoneTicket" text-end>
                                                {{ formatFn((ticketItem as any).data.subprice) }}
                                            </p>
                                            <p class="priceMinZoneTicket" text-end>
                                                MXN mas comisiones
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ticketPurchase__tablePrices" v-else wrap flex="row" justify-center align-center
                                style="text-align: center; align-items: center">
                                <p style="color: var(--gallos-gray-lg)">
                                    Selecciona un asiento para empezar a mapear tu informacion
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
                <!-- info totales -->
                <div flex="row" basis="100" wrap align-center class="ticketPurchase__infoTotales"
                    style="position: relative;">
                    <div v-if="editInfo.isShowTotalesDetail" basis="100" padding-inline-4 padding-block-end
                        style="position: absolute; background: white !important; width: 100% !important;bottom: 6rem; box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; padding-top: 2rem;">
                        <h5 basis="100" flex="row" justify-space-between font-oswald>
                            BOLETAJE :
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'; ">
                                {{ calculateTicketingValue }}
                            </span>
                        </h5>
                        <div flex="row" wrap padding-bottom-1>
                            <p basis="100" @click="
                                () => {
                                    editInfo.isShowTicketingDetail =
                                        !editInfo.isShowTicketingDetail;
                                }
                            " flex="row" align-center style="text-decoration: underline; cursor: pointer" font-oswald>
                                *Desglosar boletaje
                                <span><img v-if="!editInfo.isShowTicketingDetail"
                                        :src="'/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowTicketingDetail"
                                        :src="'/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                            <div v-if="editInfo.isShowTicketingDetail" basis="100" padding-inline-4 padding-block-2>
                                <span flex-row wrap basis="100">
                                    <h5 basis="100" width-100 font-oswald>
                                        BOLETAJE <span> <img style="width: 1rem;"
                                                :src="'/icon/rightArrow.svg'" alt=""></span> {{
                                                    formatFn(editInfo.totalToPay) }}
                                    </h5>
                                </span>
                                <span flex-row wrap basis="100">
                                    <h5 basis="100" width-100 font-oswald>
                                        CARGO POR SERVICIO <span> <img style="width: 1rem;"
                                                :src="'/icon/rightArrow.svg'" alt=""></span>
                                        {{ formatFn(editInfo.inbropiFees) }}
                                        <!-- $$$ -->
                                    </h5>
                                </span>
                            </div>
                        </div>
                        <h5 v-if="couponsApplied.length > 0" basis="100" flex="row" justify-space-between font-oswald>
                            CUPÓN :
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">
                                {{ (couponsApplied as any)[0].key_word }} ->{{
                                    (couponsApplied as any)[0].typeCoupon === "VIP"
                                        ? "1 Boleto gratis"
                                        : (couponsApplied as any)[0].valueCash
                                }}
                            </span>
                        </h5>
                        <h5 v-if="editInfo.statusPurchase !== 'START'" basis="100" flex="row" justify-space-between
                            align-center font-oswald>
                            COMISIONES SELECCIONADAS:
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">{{
                                calculateFeesSelected
                            }}</span>
                        </h5>
                        <div flex="row" wrap v-if="editInfo.statusPurchase !== 'START'" padding-bottom-1>
                            <p font-oswald basis="100" @click="
                                () => {
                                    editInfo.isShowFeesDetail = !editInfo.isShowFeesDetail;
                                }
                            " flex="row" align-center style="text-decoration: underline; cursor: pointer">
                                *Desglosar comisiones
                                <span><img v-if="!editInfo.isShowFeesDetail"
                                        :src="'/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowFeesDetail"
                                        :src="'/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                            <div v-if="editInfo.isShowFeesDetail" basis="100" padding-inline-4 padding-block-2>
                                <span v-for="(feesGroup, index) in (eventData as any).fees" :key="index" flex-row wrap
                                    basis="100">
                                    <span v-for="feesItem in feesGroup" :key="feesItem.id" flex-row wrap basis="100">
                                        <h5 basis="100" v-if="
                                            feesItem.value === true &&
                                            feesItem.groupName !== 'OTROS'
                                        " width-100 font-oswald>
                                            {{ feesItem.title }} <span> <img style="width: 1rem;"
                                                    :src="'/icon/rightArrow.svg'" alt=""></span> {{
                                                        formatFn(feesItem.cash) }}
                                        </h5>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <h5 basis="100" flex="row" justify-space-between font-oswald>
                            SUBTOTAL:
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">{{
                                formatFn(editInfo.totalWithComissions)
                            }}</span>
                        </h5>
                        <h5 font-oswald basis="100" v-if="editInfo.statusPurchase !== 'START'" flex="row"
                            justify-space-between>
                            PROCESAMIENTO DE ORDEN:
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">{{
                                calculateGanwayFees
                            }}</span>
                        </h5>
                    </div>
                    <div basis="40" padding-inline-1>
                        <div flex-row wrap>
                            <h3 basis="100" style="font-weight: 600;font-size: 2.2rem !important; color: black;"
                                font-oswald>
                                {{ formatFn(editInfo.finalTotalComissionsIVA) }}
                                <span> MXN</span>
                            </h3>
                            <p @click="
                                () => {
                                    editInfo.isShowTotalesDetail =
                                        !editInfo.isShowTotalesDetail;
                                    if (editInfo.isShowTotalesDetail) {
                                        scrollToRef('actionButtons_section');
                                    }
                                }
                            " flex="row" align-center
                                style="font-size: 1.1rem !important; text-decoration: underline; cursor: pointer; font-weight: 600!important; ">
                                Detalles de tu compra
                                <span><img v-if="!editInfo.isShowTotalesDetail"
                                        :src="'/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowTotalesDetail"
                                        :src="'/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                        </div>
                    </div>
                    <div basis="60" flex="row" justify-center padding-inline-1 row-gap="1" ref="actionButtons_section">
                        <TButton v-if="editInfo.statusPurchase === 'START'" basis="90" class="next__button-principal" v-bind="{
                            text: 'RESERVAR',
                            type: 'clickeable',
                            color: 'white',
                            backgroundColor: 'var(--gallos-orange)',
                        }" @click.prevent="onConfirmReservationSeats()" />
                        <section v-if="editInfo.statusPurchase !== 'START'" width-100 class="" flex-row col-gap="1">
                            <TButton grow="1" class="more_seats" v-bind="{
                                text: 'Asientos',
                                icon:  '/icon/plus.svg',
                                displayIconWrappper: 'row-reverse',
                                type: 'clickeable',
                                color: 'var(--gallos-red)',
                                border: '1px solid var(--gallos-red)',
                                backgroundColor: 'white',
                            }" @click.prevent="onCancelReservation()" />
                            <TButton v-if="editInfo.statusPurchase === 'SEATSELECTED'" grow="1" class="next__button"
                                v-bind="{
                                    text: 'Siguiente',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="applyFees()" />
                            <TButton v-if="editInfo.statusPurchase === 'FEESSELECTED'" grow="1" class="next__button"
                                v-bind="{
                                    text: 'Proceder al pago',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="makePurchase()" />
                        </section>
                    </div>
                </div>
            </section>

        </div>
        <!-- -------------------------------------- MODAL ----------------------------------- -->
        <Transition name="slide-fade">
            <TModal v-if="editInfo.isShowCouponModal" @closeModal="
                () => {
                    editInfo.isShowCouponModal = false;
                }
            " :style="'height: 100% !important;width: 40%; margin-right: 0px; border-radius: 1rem 0 0 1rem'"
                class="modalCoupon">
                <template #modal__title> </template>
                <template #modal__content>
                    <section class="content-modal-wrapper" flex="row" align-space-evenly wrap style="height: 80dvh">
                        <div v-if="!editInfo.isAppliedCoupon" flex="row" wrap basis="100" width-100
                            style="align-content: center; row-gap: 5rem">
                            <div width-100>
                                <h1 class="wrapper__title-modal" text-center padding-block>
                                    Agrega un cupón
                                </h1>
                            </div>
                            <span flex-row wrap basis="100" row-gap="3">
                                <p text-center>
                                    ¿Tienes un cupón de regalo? agragalo y obten un descuento en
                                    tu compra.
                                </p>
                                <TInput id="codeCouponToAplied" basis="100" style="height: fit-content" v-bind="{
                                    label: 'Ingresa el código de tu cupón',
                                    placeholder: 'Escribe el código',
                                    error: '',
                                    value: editInfo.codeCouponAplied,
                                    type: 'text',
                                }" @input="
                                    async (event: any) => {
                                        editInfo.codeCouponAplied = event.target.value;
                                    }
                                " />
                                <TButton margin-inline-1 basis="100" class="" v-bind="{
                                    text: 'Aplicar',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="onValidCupon()" />
                            </span>
                        </div>
                        <div v-if="editInfo.isAppliedCoupon" flex="row" wrap>
                            <div width-100>
                                <h1 class="wrapper__title-modal" text-center padding-block>
                                    Selecciona tu boleto
                                </h1>
                                <p text-center>
                                    Selecciona un boleto haciendo doble click sobre un elemento de
                                    la tabla para aplicar el cupón.
                                </p>
                                <span flex-row width-100 col-gap="2" padding-block-start-2>
                                    <p basis="30">
                                        Tipo de Cupón:
                                        <strong> {{ (couponToAplied as any).typeCoupon }}</strong>
                                    </p>
                                    <p basis="30">
                                        Se aplica sobre:
                                        <strong>
                                            {{
                                                (couponToAplied as any).typeApplication === "TICKET"
                                                    ? "Ticket"
                                                    : "Compra"
                                            }}</strong>
                                    </p>
                                    <p basis="30">
                                        Tipo de descuento:
                                        <strong>
                                            {{
                                                (couponToAplied as any).typeDisacount === "CASH"
                                                    ? "Dinero"
                                                    : "Porcentage"
                                            }}</strong>
                                    </p>
                                </span>
                                <vue-good-table ref="couponAppliedTable" class="wrapper-table-order-service generators"
                                    padding-3 :columns="columnsAppliedCoupon" :rows="makeDataListCoupons"
                                    :pagination-options="paginationCouponTable"
                                    v-on:row-dblclick="selectionTicketCoupon" />
                            </div>
                        </div>
                    </section>
                </template>
            </TModal>
        </Transition>
        <!-- -------------------------------------- MODAL ----------------------------------- -->
        <Transition name="slide-fade">
            <TModal v-if="editInfo.isShowDetailEvent" @closeModal="
                () => {
                    editInfo.isShowDetailEvent = false;
                }
            " :style="'height: 100% !important;width: 40%; margin-right: 0px; border-radius: 1rem 0 0 1rem'"
                class="modalCoupon">
                <template #modal__title> </template>
                <template #modal__content>
                    <section class="content-modal-wrapper" flex="row" wrap width-100 align-start>
                        <div flex="row" wrap width-100>
                            <div width-100 wrap>
                                <h1 basis="100" class="wrapper__title-modal" text-center padding-block>
                                    Detalle del Evento
                                </h1>
                                <!-- <p text-center basis="100">Aquí va el detalle del evento</p> -->
                            </div>

                            <span flex-row basis="100" col-gap="1" style="min-height: 5rem" wrap>
                                <h3 basis="100" class="wrapper__title-modal" text-center padding-block>
                                    Información post-venta
                                </h3>
                                <p style="text-align: center; width: 100%" :class="!editInfo.morePostSaleInfo
                                    ? 'clipped-text'
                                    : 'expanded-text'
                                    ">
                                    {{ (eventData as any).general.postSale }}
                                </p>
                                <p basis="100" class="seeMore" @click="
                                    () => {
                                        editInfo.morePostSaleInfo = !editInfo.morePostSaleInfo;
                                    }
                                ">
                                    {{ editInfo.morePostSaleInfo ? "ver menos" : "ver mas" }}
                                </p>
                            </span>
                            <span flex-row basis="100" col-gap="1" wrap style="min-height: 5rem">
                                <h3 basis="100" class="wrapper__title-modal" text-center padding-block>
                                    Lugar del evento
                                </h3>
                                <section basis="100" flex="row" justify-center padding-bottom-2>
                                    <img style="padding-inline: 0.2rem" class="iconMedia"
                                        :src="'/icon/pinIcon.svg'" alt="" />
                                    <p style="padding-top: 0.2rem">
                                        {{ (eventData as any).general.enclosure.address }}
                                    </p>
                                </section>
                                <!-- :api-key="lacationFormSettings.GOOGLEMAP_APIKEY" -->
                                <GoogleMap class="mapEnclousure" ref="googleMap" :key="keysComponent.mapGoogle"
                                    :apiPromise="googleApiPromise" style="width: 100%; height: 300px"
                                    :center="lacationFormSettings.markerOptions.position"
                                    :zoom="lacationFormSettings.zoomMap" :streetViewControl="false"
                                    :fullscreenControl="false" @zoom_changed="onChangeZoomMap">
                                    <Marker :options="lacationFormSettings.markerOptions" />
                                </GoogleMap>
                            </span>
                        </div>
                    </section>
                </template>
            </TModal>
        </Transition>
        <!-- -------------------------------------- MODAL SHOW SEATS ----------------------------------- -->
        <Transition name="slide-fade">
            <TModal v-if="editInfo.showSeatsModal" @closeModal="
                () => {
                    editInfo.showSeatsModal = false;
                }
            " :style="'height: 100% !important;width: 40%; margin-right: 0px; border-radius: 1rem 0 0 1rem'"
                class="modalCoupon">
                <template #modal__title> </template>
                <template #modal__content>
                    <section class="content-modal-wrapper" flex="row" wrap width-100 align-start>
                        <div flex="row" wrap width-100>
                            <div width-100 wrap>
                                <h1 basis="100" class="wrapper__title-modal" text-center padding-block>
                                    Asientos de la Zona '{{ (editInfo.idZoneShowSeats as any).data.section }}''
                                </h1>
                                <!-- <p text-center basis="100">Aquí va el detalle del evento</p> -->
                            </div>

                            <span flex-row basis="100" col-gap="1" style="min-height: 5rem" wrap>
                                <template v-for="(item, index) in seatSelected" :key="index" flex-row wrap>

                                    <div box-shadow
                                        style="border-radius: 0.5rem; padding: 1rem; margin-block-end: 1rem; cursor: pointer !important;"
                                        flex="row" align-center basis="45"
                                        v-if="(item as any).idSection === (editInfo as any).idZoneShowSeats.data.idSection">
                                        <!-- <figure basis="15" class="iconTicketItem" flex="row" justify-center>
                                            <img class="iconMedia" :src="mode + '/assets/icon/ticketIcon.svg'" alt="" />
                                        </figure>

                                        <div basis="60" flex="row" justify-end>
                                            <div flex-row wrap justify-center>
                                                <span basis="100" width-100 text-center>zona:</span>
                                                <p basis="100" width-100 class="nameZoneTicket" text-center>
                                                    {{ (item as any).section }}
                                                </p>
                                            </div>
                                            <div>
                                                <span basis="100" width-100 text-center>bloque:</span>
                                                <p basis="100" width-100 class="priceMaxZoneTicket" text-center>
                                                    {{ (item as any).chunk }}
                                                </p>
                                            </div>
                                            <div flex-row wrap justify-center>
                                                <span basis="100" width-100 text-center>asiento:</span>
                                                <p basis="100" width-100 class="priceMaxZoneTicket" text-center>
                                                    {{ (item as any).row }} - {{ (item as any).seat }}
                                                </p>
                                            </div>
                                            <div flex-row wrap justify-center>
                                                <span basis="100" width-100 text-center>precio:</span>
                                                <p basis="100" width-100 class="priceMaxZoneTicket" text-center>
                                                    {{ formatFn((item as any).price) }}
                                                </p>
                                            </div>
                                        </div>
                                        <figure basis="20" class="iconTicketItem" flex="row" justify-center>
                                            <img class="iconMedia" :src="mode + '/assets/icon/eye.svg'" alt="" />
                                        </figure> -->
                                        <section basis-100 class="bonogalloPurchase__infoGeneralMemberWraper" flex-row
                                            wrap style="width: 100%;" @click="getStreetviewSeat(item)">
                                            <p basis="45" style="max-width: 100% !important;">ZONA: <span>{{ (item as
                                                any).section }}</span>
                                            </p>
                                            <p basis="45" style="max-width: 100% !important;">BLOQUE: <span>{{
                                                (item as any).chunk }}</span>
                                            </p>
                                            <p basis="45" style="max-width: 45% !important;">PUERTA: <span>{{
                                                (item as any).dor }}</span>
                                            </p>
                                            <p basis="45" style="max-width: 45% !important;">ASIENTO: <span>{{
                                                (item as any).row }} - {{ (item as any).seat }}</span>
                                            </p>
                                            <figure basis="100" class="iconTicketItem" flex="row" justify-center>
                                                
                                            </figure>
                                        </section>

                                    </div>
                                </template>
                            </span>
                        </div>
                    </section>
                </template>
            </TModal>
        </Transition>


        <!-- 
        
        {
  "nameSection": "AZUL CENTRAL",
  "count": 2,
  "data": {
    "idRow": 19,
    "seat": 52,
    "row": "A",
    "idChunk": 1226,
    "show": 1,
    "chunk": "124",
    "idSection": 1,
    "section": "AZUL CENTRAL",
    "status": "AVALIABLE",
    "price": 8,
    "subprice": 8
  }
} 
        -->
    </main>
    <!-- <div style="display: none ;height: calc(100dvh - 6rem); width: 100dvw; background: rgba(0, 0, 0, 0.4);  z-index:999999999999 !important; position: absolute;" flex-row wrap :class="editInfo.imageStreetView.length > 0 ? 'modalStreetviewVisible': ''">
    <figure basis="100">
        
    </figure>
    <figure v-if="editInfo.imageStreetView">
        <img style="width: 90%; height: auto;" :src="editInfo.imageStreetView" alt="">
    </figure>
    </div> -->
</template>
<style scoped>
.couponButton__mobile {
    display: none;
}

.ticketPurchase__placeAndDateContainer,
.ticketPurchase__pricesContainer {
    width: 100%;
}

.ticketPurchase__pricesContainer {
    cursor: pointer;
}

.ticketPurchase__tablePrices {
    flex-basis: 75%;
}

.ticketPurchase__left {
    flex-basis: 60%;
    max-width: 60% !important;
    overflow: auto;
    z-index: 100 !important;
    min-height: calc(100dvh - 6rem) !important;
    /* 6rem height of header */
    max-height: calc(100dvh - 6rem) !important;
    background: rgb(231, 231, 231);
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
        rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
        rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

.ticketPurchase__rigth {
    flex-basis: 40%;
    max-width: 40%;
    justify-content: center;
    padding-top: 1rem;
    /* min-height: calc(100vh- 7rem); */
    align-content: space-between;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    /* max-height: calc(100vh- 7rem) ; */
    /* overflow: auto; */

    /* background-color: aqua; */
    /* min-height: calc(100vh- 7rem); */
}

.seatsWrapper {
    max-width: 100%;
}

.ticketPurchase__flyerContainer {
    width: 100%;
    height: auto;
    max-height: 20rem;
    border-radius: 15px;

}

.ticketPurchase__flyerContainer>img {
    border-radius: 15px;
    width: 100%;
    height: 100%;
}

.ticketPurchase__infoContainer {
    height: fit-content;
    padding-block: 2.5rem;
}

.ticketPurchase__infoContainer>h3 {
    color: var(--gallos-dark-blue);
    font-weight: 500;
    font-size: 2rem !important;
    text-transform: uppercase;
}

.ticketPurchase__placeAndDateContainer>div>div>p {
    color: var(--gallos-electric-blue);
    font-weight: 700;
    font-size: 1.3rem !important;
    /* text-decoration: underline; */
    padding-top: 0.2rem;
}

.ticketPurchase__placeAndDateContainer>div>div>p:hover {
    transform: scale(1.1);
    cursor: pointer;
}

.ticketPurchase__ticketPrice {
    /* border: 1px dashed red; */
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
    min-height: 4.5rem;
    margin-block-end: 1.2rem;
    border-radius: 0.5rem;
    align-items: center;
    padding: 1rem;
    width: 100% !important;
    max-width: 100% !important;
    height: fit-content;
    /* background: var(--gallos-green-2); */
}

.mapContainer {
    transition: transform 1s ease;
    cursor: pointer;
    flex: 1 1 auto;
}

.rowTableSectionsSelected,
.hasSeats {
    background-color: var(--gallos-blue-lg) !important;
    color: white !important;
}

.rowTableSectionsHover {
    background-color: var(--gallos-gray-lg) !important;
    color: white !important;
}

.payment__button {
    border-radius: 2rem;
}

.more_seats {
    border: solid;
    border-width: thin;
    /* border-radius: 2rem; */
}

.nameZoneTicket {
    flex-basis: 70%;
    font-size: 1rem;
    color: var(--gallos-gray-2);
    font-weight: 500;
}

.priceMinZoneTicket {
    font-size: 0.8rem !important;
    color: var(--gallos-gray-2);
}

.priceMaxZoneTicket {
    font-size: 1.2rem !important;
    padding-inline-end: 5px;
    padding-top: 7px;
    color: var(--gallos-gray-2);
}

.ticketPriceHover {
    background: var(--business-yellow);
}

.ticketPurchase__infoTotalesMobile {
    display: none;
}

.ticketPurchase__infoTotales {
    /* background: var(--business-yellow); */
    border-top: 1px solid rgb(200, 200, 200);
    padding-block: 1rem;
    min-height: 5rem;
}

.counterTickets {
    background: var(--gallos-red);
    border-radius: 50%;
    width: 20px;
    min-width: 20px;
    height: 20px;
    min-height: 20px;
    text-align: center;
    align-content: center;
    color: white;
}

.ticketPurchase__title {
    font-size: 2.5rem;
    font-weight: 600;
}

.ticketPurchase__wrapperCompletePurchase {
    /* max-height: calc(100%- 8rem) !important; */
    /* height: calc(100% - 9rem) !important; */
    /* overflow: scroll;
    overflow-x: hidden; */
    padding-bottom: 2rem;
}

.ticketPurchase__codeCoupon {
    /* border: 1px solid var(--business-yellow); */
    background: var(--gallos-orange);
    /* color: var(--business-yellow); */
    border-radius: 0.375rem;
    width: 100%;
    height: 3rem;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
}

.ticketPurchase__codeCoupon>img {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(2879%) hue-rotate(249deg) brightness(110%) contrast(100%) !important;
}

.ticketPurchase__codeCoupon>p {
    font-size: 14px !important;
    padding-right: 10px;
    /* color: var(--business-yellow); */
    color: white !important;
    text-decoration: none !important;
    font-weight: 600;
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

.ticketPurchase__couponButton:hover {
    transform: scale(1.04);
}


.clipped-text {
    max-height: 4rem;
    white-space: normal;
    padding-inline: 2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    /* Número de líneas visibles */
    -webkit-box-orient: vertical;
    transition: max-height 1s ease, opacity 1s ease;
    opacity: 0.9;
}

.expanded-text {
    max-height: 1000px;
    /* Altura máxima para cubrir todo el contenido */
    overflow: visible;
    /* Elimina el overflow oculto */
    white-space: normal;
    /* Permite mostrar texto completo */
    display: block;
    /* Elimina el efecto de -webkit-line-clamp */
    padding-inline: 2rem;
    transition: max-height 1s ease, opacity 1s ease;
    opacity: 1;
}

.seeMore {
    color: #efb036;
    font-weight: 700;
    font-size: 1.1rem !important;
    text-decoration: underline;
    padding-top: 0.2rem;
    text-align: center;
}

.wrapper-table-order-service:hover {
    cursor: pointer;
}

.table-prices {
    width: auto;
    border-collapse: collapse;
    /* margin: 20px auto; */
    border-radius: 10px;
    margin: auto;
}

.table-prices>thead th,
.table-prices>tbody td {
    padding: 0.2rem 2rem;
    white-space: nowrap;
    /* Evita que se haga más ancha de lo necesario */
    text-align: center;
    font-size: 1rem;
}

.table-prices>tbody td {
    cursor: pointer;
}

.table-prices>thead th {
    border: none;
    /* Sin bordes en el header */
}

.table-prices thead {
    background-color: var(--gallos-electric-blue);
    /* Azul sólido */
    color: white;
    font-weight: bold;
    border-radius: 10px !important;
}

.table-prices thead tr th:nth-child(2) {
    border-top-left-radius: 10px !important;
}

.table-prices thead tr th:last-child {
    border-top-right-radius: 10px;
}

.table-prices>tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

.seat-wrapper-item {
    cursor: pointer;
    background: var(--business-light-gray);
    border: 0.2rem solid var(--business-gray-second);
    border-radius: 8px;
}

.seat-wrapper-item p {
    color: black;
    font-weight: 600;
}

.seat-wrapper-row {
    background: var(--business-medium-blue);
    border: 0.2rem solid var(--business-medium-blue);
    border-radius: 8px;
}

.seat-wrapper-row h4 {
    color: white;
    font-weight: 600;
}

.wrapper-seats-scroll {
    width: 100% !important;
    max-width: 100% !important;
    overflow: auto;
}

/* COLOR SEATS */

.seatNoExist {
    cursor: auto;
    background: transparent;
    border: transparent;
    border-radius: 8px;
}

.seatNoExist p {
    color: transparent;
}

.seat-selected {
    background-color: var(--business-medium-blue-2);
    border: 0.2rem solid var(--business-medium-blue);
}

.seat-selected p {
    color: var(--business-medium-blue);
}

.seatSold {
    cursor: auto;
    border-radius: 8px;
    background-color: var(--business-medium-blue);
    border: 0.2rem solid var(--business-medium-blue);
}

.seatSold p {
    color: white;
}

/* END COLOR SEATS */
.mapContainer {
    transition: transform 1s ease;
}

.rowTableSectionsSelected {
    background-color: var(--business-light-blue-clicked) !important;
    color: white !important;
}

.payment__button {
    border-radius: 2rem;
}

.more_seats {
    border: solid;
    border-width: thin;
    border-radius: 2rem;
}

.next__button-principal,.next__button {
    border-radius: 2rem;
}
 

.seatWithMargin {
    margin: 0.1rem;
}

.infoEventMobile {
    display: none;
}

.mapSection {
    align-content: space-evenly;
    max-height: calc(100dvh- 7rem);
    overflow-y: auto;
}

.ticketPurchase__infoTotales h5 {
    font-size: 1.45rem !important;
    color: black;
}

.more_seats,
.next__button {
    max-width: 47% !important;
    padding-inline: 0 !important;
    margin-inline: auto;
}

.ticketPurchase__infoTotales p {
    font-size: 1.2rem !important;
    text-decoration: none !important;
    letter-spacing: 0.7px;
}
.mapSection__content>div {
        align-items: anchor-center; width: auto /* -webkit-fill-available */
    }


@media (orientation: portrait) or ((width >=300px) and (width <=850px)) {
    .ticketPurchase__rigth {
        display: none !important;
    }

    .ticketPurchase__left {
        flex-basis: 100%;
        max-width: 100% !important;
        overflow: auto;
        min-height: calc(100dvh - 11rem) !important;
        max-height: calc(100dvh - 11rem) !important;
    }

    .infoEventMobile {
        display: flex;
        padding-block: 2rem !important;
        padding-block-end: 1rem !important;
    }


    .ticketPurchase__title {
        text-align: center;
        /* flex-basis: 80% !important; */
        font-size: 1rem !important;
    }

    .mapSection {
        justify-content: center;
        overflow: hidden;
    }

    .mapSection>h3 {
        padding-bottom: 1rem !important;
    }

    .mapSection__content {
        flex-wrap: wrap;
    }

    .mapSection__content>div {
        flex-basis: 100% !important;
         width: -webkit-fill-available
    }

    .mapContainer {
        max-width: 700px !important;
        margin-inline: auto !important;
    }

    .ticketPurchase__infoTotalesMobile {
        display: flex;
        z-index: 9999;
        width: 100%;
    }

    .separator {
        margin-block: 0.5rem !important;
    }


    .table-prices>thead th,
    .table-prices>tbody td {
        padding: 0.2rem 2rem;
        text-align: center;
        font-size: 1rem;
    }

    .table-prices>tbody td {
        font-size: 1.1rem;
    }

    .ticketPurchase__infoTotalesMobile {
        background-color: aliceblue;
        position: absolute;
        bottom: 0;
    }


    .ticketPurchase__wrapperCompletePurchase {
        padding-inline: 1.5rem !important;
    }

    .ticketPurchase__title_timer,
    .ticketPurchase__timer {
        padding-block: 0 !important;
    }

    .ticketPurchase__timer-text {
        padding-block: 1rem !important;
    }

    .ticketPurchase__comissions-general-wrapper>h3 {
        padding-block: 1rem !important;
    }

    .eventDetail__payment-form-wrapper {
        padding-inline: 0 !important;
    }

    .couponButton__mobile {
        display: flex;
    }

    .ticketPurchase__timer_header_wrapper {
        position: absolute;
        top: 15px;
        z-index: 9999999;
        /* right: 35%; */
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .ticketPurchase__timer_header_wrapper>.ticketPurchase__timer-text {
        display: none;
    }

    .ticketPurchase__tablePrices {
        flex-basis: 90%;
    }

    
}


.bonogalloPurchase__infoMemberSeatWraper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: space-evenly;
    flex-wrap: wrap;
    row-gap: 0.7rem !important;
    width: 100%;
    text-align: center !important;
}

.bonogalloPurchase__infoGeneralMemberWraper {
    padding-top: 1rem;
    justify-content: center;
    border-top: 1px solid var(--gallos-electric-blue);

}

.bonogalloPurchase__infoMemberSeatWraper>p,
.bonogalloPurchase__infoGeneralMemberWraper>p {
    color: black !important;
    text-align: center;
    font-size: 0.8rem !important;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    font-weight: 600 !important;

}

.bonogalloPurchase__infoGeneralMemberWraper>p>span,
.bonogalloPurchase__infoMemberSeatWraper>p>span {
    text-align: center !important;
    color: var(--gallos-gray-2);
    font-size: 0.9rem !important;
    flex-basis: 100%;
    padding-top: 0.0rem;
    padding-bottom: 1.5rem;

}


.modalStreetviewVisible {
    display: flex !important;
}
</style>

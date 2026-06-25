<script lang="ts">
/// @ts-ignore
import { scrollToRef, formatMoney,unformatMoney } from "@/utils/generals";
import TButton from "@/components/shared/TButton.vue";
import Swal from 'sweetalert2'
import seatsDataDoc from "@/utils/data/seatsDataDoc";
//@ts-ignore
import _ from "lodash";
export default {
    name: 'TTickets__proccessSale',
    components: {
        TButton
    },
    methods: {
        scrollToRef,
        formatMoney,
        unformatMoney,
        async showSeats(itemsZone: any) {
            try {
                this.showSeat.idZone = itemsZone;
                this.editInfo.showSeatsModal = true

            } catch (error) {
                console.log(error);
            }
        },
        async loadSvgFile() {
            try {
                // Hacemos un fetch a la ruta del archivo
               /*  const response = await fetch(this.eventData.general.media.enclosurePath);
                if (response.ok) {
                    // Extraemos el texto puro del SVG y se lo asignamos a la data
                    this.eventData.general.media.enclosureSVGContent = await response.text();
                } else {
                    console.error("No se pudo cargar el archivo SVG");
                } */

                    
                const response = await fetch('/images/enclosure/auditorioJosefa.svg')
        
        if (response.ok) {
          // Guardamos el texto del SVG en nuestra variable de data usando 'this'
          this.eventData.general.media.enclosureSVGContent = await response.text()
        } else {
          console.error('Error al cargar el SVG:', response.statusText)
        }
            } catch (error) {
                console.error("Error cargando el SVG:", error);
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

                    (this.eventData as any).prices.forEach((ticketType: any) => {
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
        async addClickColorZone(classNameZone: any, itemTicket:any) {
            /* metodos para agregar estilos al mapa */
            try {
                if (this.editInfo.statusPurchase === "START") {
                
                        const elementsTableSelected = document.getElementsByClassName(
                            "rowTableSectionsSelected"
                        );
    
                        Array.from(elementsTableSelected).forEach((elemento) => {
                            (elemento as any).classList.remove("rowTableSectionsSelected");
                        });
    
                        (this.eventData as any).prices.forEach((ticketType: any) => {
                            ticketType.isActive = false;
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
                    
                }
            } catch (error) {
                console.log(error);
            }
        },
        async onSelectZoneMap(event: any) {
            /* metodos para agregar estilos al mapa */
            const element = document.elementFromPoint(event.clientX, event.clientY);
            if (element && element.classList.contains("chunkMap")) {
                await this.onClearTableNamesSections();
                
                (this.editInfo.chunkSelected as any) = element.id;
                
                let classesBlockMapSelected = Array.from(element.classList);
                let nameZoneSelected = "";
                classesBlockMapSelected.forEach((className: any) => {
                    if (className !== "chunkMap" && className !== "block-svg-selected") {
                        nameZoneSelected = className;
                        (this.editInfo.sectionSelect as any) = className;
                    }
                });
                console.log(nameZoneSelected);
                const zoneSelected :any = (this.eventData as any).prices.find((zone:any)=>zone.className === nameZoneSelected)

                if(zoneSelected !== undefined){
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
                this.scrollToRef(this,"selection_seat_section"); 
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
        async onClearTableNamesSections() {
            const elementsTableSelected = document.getElementsByClassName(
                "rowTableSectionsSelected"
            );
            const elementsSVGSelected =
                document.getElementsByClassName("block-svg-click");

            Array.from(elementsSVGSelected).forEach((elemento) => {
                (elemento as any).classList.remove("block-svg-click");
            });
            const colors:any = document.getElementsByClassName("block-svg-selected");
            for (let index = 0; index < colors.length; index++) {
                colors[index].classList.remove("block-svg-selected");
            }
        },
        async colorizeRowTable(nameZone: any) {
            try {
                (this.eventData as any).prices.forEach((ticketType: any) => {
                    if (ticketType.className !== nameZone) {
                        ticketType.isSelected = false;
                    } else {
                        ticketType.isSelected = true;
                    }
                });
            } catch (error) {
                console.log(error);
            }
        },
       async zoom(type: any) {
            try {
                if (type === 1) {
                    let heightContainerSeat:any = this.styleSeats.sizeSeat.split("rem")[0];
                    if (heightContainerSeat > this.styleSeats.minimumSizeSeat) {
                        this.styleSeats.sizeSeat =
                            Number(heightContainerSeat) - 0.2 + "rem";
                    } else {
                        await this.calculateSizeSeats();
                    }
                } else if (type === 2) {
                    let heightContainerSeat:any = this.styleSeats.sizeSeat.split("rem")[0];
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
        async calculateSizeSeats() {
            try {
                const seatsCounter: any = (this.seatsData as any).totalElementsByRow[0].column;
                const rowsCounter: any = (this.seatsData as any).totalElementsByRow.length;

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
        getRefName(rowItem: any, columnItem: any) {
            /* 
                                    este metodo retorna un nombre para identificar a 
                                    cada recuadro como un asiento.
                                    */
            try {
                let seatItem = (this.seatsData as any).seat[
                    (rowItem - 1) * (this.seatsData as any).totalElementsByRow[0].column +
                    (columnItem - 1)
                ];
                return seatItem.row + "-" + seatItem.seatName + "-" + seatItem.idChunk;
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

                let seatItem: any = (this.seatsData as any).seat[
                    (rowItem - 1) * (this.seatsData as any).totalElementsByRow[0].column +
                    (columnItem - 1)
                ];
                const existInSelectedByUser = this.seatSelected.find(
                    (seatSelectedItem: any) =>
                        seatSelectedItem.seatName === seatItem.seatName &&
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
        /* --------------- Functions Api------------- */
        async onGetSeatsByChunk() {
            try {
                
                (this.seatsData as any).seat = seatsDataDoc.seatsEvent1.map((item)=>{
                    return {
                        ...item,
                        chunk: this.editInfo.chunkSelected,
                        section:  this.editInfo.sectionSelect
                    } 
                });
                (this.seatsData as any).totalElementsByRow = (seatsDataDoc.totalSeats as any);
                
                /* this.calculateSizeSeats(); */
                this.keysComponent.seatsBlocks++;
                    Swal.fire({
                        title: "Modulo seleccionado",
                        text: "Se ha seleccionado el modulo correctamente",
                        confirmButtonText: "Aceptar",
                        timer: 1000,
                        toast: true,
                        position: "bottom-right",
                    });

            } catch (error) {
                console.log(error);
            }
        },
        async selectSeat(rowItem: any, columnItem: any) {
            try {
                
                let seatItem = (this.seatsData as any).seat[
                    (rowItem - 1) * (this.seatsData as any).totalElementsByRow[0].column +
                    (columnItem - 1)
                ];
                const exist = await this.validIfExitst(seatItem); //this valid if seat is already selected by the customer
                if (!exist) {
                    let seatAvailable = await this.validSeatSold(seatItem); //this valid if seat is already sold

                    if (seatAvailable) {
                        debugger
                            let ticketPrice: any = (this.eventData as any).prices.find(
                                (ticketItem: any) => ticketItem.nameZone === seatItem.section
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
                                seatItem.seatName +
                                "-" +
                                seatItem.idChunk;
                            const containerSelected: any = (
                                this.$refs[nameRefContainer] as any
                            )[0];
                            if (containerSelected) {
                                containerSelected.classList.add("seat-selected");
                            }
                            await this.onCalculateSubTotalPurchase();
                            await this.calculateFinalTotal();
                            const widthScreen = window.innerWidth
                            if (widthScreen < 850) {
                                scrollToRef(this, 'seatsMobileRef')
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
         async validIfExitst(seatItem: any) {
            try {
                
                const exist = this.seatSelected.find(
                    (seatSelectedItem: any) =>
                        seatSelectedItem.seatName === seatItem.seatName &&
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
                    
                    this.editInfo.totalToPay += amoutToSum;
                });

                let totalTicketing: any = 0;
                this.seatSelected.forEach((seatItem: any) => {
                    totalTicketing += seatItem.price;
                });

                this.editInfo.totalToPay = totalTicketing;

                /* set values */
                this.editInfo.totalWithComissions = 0;
                this.editInfo.totalWithComissions =
                    this.editInfo.totalToPay + this.editInfo.comissionQuantity;
                
                /* format values */
                (this.editInfo.totalToPay as any) = await this.formatMoney(
                    this.editInfo.totalToPay
                );
                (this.editInfo.totalWithComissions as any) = await this.formatMoney(
                    this.editInfo.totalWithComissions
                );
            } catch (error) {
                console.log(error);
            }
        },
        async calculateFinalTotal() {
            if (this.editInfo.statusPurchase === "START") {
                this.editInfo.finalTotalComissionsIVA = await unformatMoney(
                    this.editInfo.totalWithComissions
                );
            } else {
                this.editInfo.iva = 0;
                this.editInfo.finalTotalComissionsIVA = 0;

                let unformatQuentity: any = await unformatMoney(
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
    },
    data() {
        return {
            
            editInfo: {
                statusPurchase: "START",
                isShowTotalesDetail: false,
                isShowTicketingDetail: false,
                isShowFeesDetail: false,
                totalToPay: 0,
                inbropiFees: 0,
                totalFeesNotForced: 0,
                totalFeesForced: 0,
                comissionGangway: 0,
                iva: 0,
                totalWithComissions: 0,
                finalTotalComissionsIVA: 0,
                comissionQuantity: 0,
                showSeatsModal:false,
                chunkSelected: "",
                sectionSelect: "",
            },
            styleSeats: {
                minimumSizeSeat: "",
                maxSizeSeat: "",
                sizeSeat: "",
                heightContainerSeats: "",
                hasPadding: false,
            },
            keysComponent:{
              map:0,  
              seatsBlocks: 0
            },
            showSeat:{
                idZone: 0,
            },
            seatSelectedGrouped: [],
            seatSelected: [],
            seatsData: {},
            eventData: {
                general: {
                    name: 'Dia de muertos',
                    media: {
                        flayerUrl: '/images/events/lasCatrinas.jpg',
                        enclosurePath: '/iages/enclosure/auditorioJosefa.svg',
                        enclosureSVGContent: ''
                    }
                },
                prices: [
                    {
                        idZoneEvent: 1,
                        nameZone: 'VIP',
                        price: 200,
                        className: 'VIP',
                        isActive: false
                    },
                    {
                        idZoneEvent: 2,
                        nameZone: 'ORO',
                        price: 200,
                        className: 'ORO',
                        isActive: false
                    },
                    {
                        idZoneEvent: 3,
                        nameZone: 'PLATA',
                        price: 200,
                        className: 'PLATA',
                        isActive: false
                    },
                    {
                        idZoneEvent: 4,
                        nameZone: 'BCENTRAL',
                        price: 200,
                        className: 'BCENTAL',
                        isActive: false
                    },
                    {
                        idZoneEvent: 5,
                        nameZone: 'BDERECHO',
                        price: 200,
                        className: 'BDERECHO',
                        isActive: false
                    },
                    {
                        idZoneEvent: 6,
                        nameZone: 'BIZQUIERDO',
                        price: 200,
                        className: 'BIZQUIERDO',
                        
                    },
                    {
                        idZoneEvent: 6,
                        nameZone: 'PDISCA',
                        price: 200,
                        className: 'PDISCA',
                        
                    },
                ]
            },        }
    },
    async created() {
        await this.loadSvgFile()
    },
    computed: {
        mode() {
            return import.meta.env.VITE_PATH_MEDIA
        },
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

        

                return Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(totalTicketing);
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
    }
}
</script>
<template>
    <main class="eventDetail eventDetail-container">
        <div class="ticketPurchase" flex-row v-if="Object.keys((eventData as any)).length >= 0">
            <section class="ticketPurchase__left map__wrapper" ref="container" flex-row>

                <div v-if="editInfo.statusPurchase === 'START'" basis-100 flex-row wrap class="mapSection">
                    <h3  class="ticketPurchase__title" text-center >
                        Selecciona una zona en el mapa para escoger tus asientos
                    </h3>
                    <div flex-row w-100 class="mapSection__content">
                        <div ref="tableElement" flex-row justify-center style="margin-left: 25px;">
                            <table class="table-prices" style="top: auto !important">
                                <thead>
                                    <tr>
                                        <th scope="col" hidden>idTicket</th>
                                        <th scope="col">Zona</th>
                                        <th scope="col">Precio</th>
                                    </tr>
                                </thead>
                                <tbody v-if="(eventData as any).prices !== undefined">
                                    <tr v-for="(itemTicket, index) in (eventData as any).prices"
                                        :key="itemTicket.idZoneEvent" :class="itemTicket.className"
                                        @mouseover.stop="addHoverColorZone(itemTicket.className)"
                                        @click.stop="addClickColorZone(itemTicket.className, itemTicket)"
                                        @mouseout.stop="quitHoverColorZone(itemTicket.className)" 
                                        >
                                        <!-- @click.stop="addClickColorZone(itemTicket.className, itemTicket)" -->
                                        <td hidden>{{ itemTicket.idZoneEvent }}</td>
                                        <td>{{ itemTicket.nameZone }}</td>
                                        <td>{{ formatMoney(itemTicket.price) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div flex-row justify-center :key="keysComponent.map" class="mapContainer"
                            ref="svgContainer" v-html="(eventData as any).general.media.enclosureSVGContent" cursor-pointer
                            @click.prevent="onSelectZoneMap($event)"></div>
                    </div>
                </div>
                <div class="seatsWrapper" ref="selection_seat_section" @key="keysComponent.seatsBlocks" grow-1
                    basis-100 flex-row wrap text-center justify-center
                    v-if="(seatsData as any).seat && editInfo.statusPurchase === 'START'">
                    <h3 class="ticketPurchase__title" basis-100>
                        Selecciona la ubicación de tus asientos en el bloque
                        {{ (seatsData as any)?.seat[0].chunk }}
                    </h3>
                    <template w-100 style=" padding-inline: 1.5rem;" flex-row wrap justify-start>
                        <div class="zoomButtonsSeats" flex-row basis-100>
                            <TButton class="zoom__mobile" v-bind="{
                                type: 'clickeable',
                                color: 'white',
                                /* class: 'noHasPadding', */
                                backgroundColor: 'var(--color-accent-dark)',
                                icon:  '/icon/zoom/less.svg',
                            }" @click.prevent="zoom(1)" />
                            <TButton class="zoom__mobile" v-bind="{
                                type: 'clickeable',
                                text: 'Reset',
                                /* class: 'noHasPadding', */
                                color: 'var(--color-primary-dark)',
                                backgroundColor: 'var(--color-accent-dark)',
                            }" @click.prevent="zoom(3)" />
                            <TButton class="zoom__mobile" v-bind="{
                                type: 'clickeable',
                                color: 'white',
                                /* class: 'noHasPadding', */
                                backgroundColor: 'var(--color-accent-dark)',
                                icon:  '/icon/zoom/plus.svg',
                            }" @click.prevent="zoom(2)" />
                        </div>
                    </template>

                    <div flex-row class="wrapper-seats-scroll" >
                        <div basis-100 flex-column class="wrapper-seats" w-100>
                            <span v-for="(rowItem) in (seatsData as any).totalElementsByRow.length" :key="rowItem" flex-row
                                justify-space-between grow="1">
                                <span v-for="(columnItem) in (seatsData as any).totalElementsByRow[0].column"
                                    :key="columnItem" flex-row grow-1>
                                    <div class="seat-wrapper-row" flex-row justify-center align-center
                                        v-if="columnItem === 1" :style="'width:' +
                                            styleSeats.sizeSeat +
                                            ';height: ' +
                                            styleSeats.sizeSeat +
                                            ';margin-right: .8rem'
                                            ">
                                        <h4>{{ (seatsData as any)?.totalElementsByRow[rowItem - 1].row }}</h4>
                                    </div>

                                    <div :ref="'container-' + getRefName(rowItem, columnItem)"
                                        class="seat-wrapper-item" :style="'width:' +
                                            styleSeats.sizeSeat +
                                            ';height: ' +
                                            styleSeats.sizeSeat
                                            " flex-row justify-center align-center
                                        :class="[setClassSeat(rowItem, columnItem)]"
                                        @click="selectSeat(rowItem, columnItem)">
                                        <p
                                            :style="'font-size: calc(' + styleSeats.sizeSeat + ' -' + ((styleSeats as any).minimumSizeSeat / 2) + ' rem) !important'">
                                            {{
                                                (seatsData as any).seat[
                                                    (rowItem - 1) * (seatsData as any).totalElementsByRow[0].column +
                                                    (columnItem - 1)
                                                ].seatName
                                            }}
                                        </p>
                                    </div>
                                </span>
                            </span>
                        </div>
                    </div>


                    <div style=" flex-grow: 1; margin-block: 2rem;" flex-row justify-center class="ticketPurchase__infoTotalesMobile"
                        ref="seatsMobileRef">

                        <div class="ticketPurchase__tablePrices" v-if="seatSelectedGrouped.length > 0" wrap flex="row"
                            justify-center align-center>
                            <div class="ticketPurchase__ticketPrice" flex="row" wrap
                                v-for="(ticketItem, index) in (seatSelectedGrouped as any)" :key="index"
                                @click="showSeats(ticketItem)">
                                <div flex="row" basis="100" align-center>
                                    <figure basis="15" class="iconTicketItem" flex="row" justify-center>
                                        <img class="iconMedia" :src=" '/icon/ticketIcon.svg'" alt="" />
                                    </figure>
                                    <h4 basis="70" class="nameZoneTicket" padding-inline-1>
                                        {{ ticketItem.nameSection }}
                                        <span class="counterTickets" style="margin-inline-start: 0.2rem">
                                            {{ ticketItem.count }}
                                        </span>
                                    </h4>
                                    <div basis="15" flex="row" justify-end>
                                        <p class="priceMaxZoneTicket" text-end>
                                            {{ formatMoney((ticketItem as any).data.subprice) }}
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



            </section>
            <section flex-row class="ticketPurchase__rigth" v-if="Object.keys((eventData as any)).length >= 0">
                <div flex-row wrap basis-100 align-start justify-center
                    style="height: calc(100vh - 15rem)" >
                    <figure basis="70" class="ticketPurchase__flyerContainer" box-shadow-gallo>
                        <img :src=" (eventData as any).general?.media?.flayerUrl" alt="" />
                    </figure>
                    <div flex="row" class="ticketPurchase__infoContainer" width-100 padding-inline-2>
                        <h3 style="flex-grow: 1; font-family: 'SN Pro' !important; font-size: 2rem !important; font-weight: 600; color: var(--color-neutral-900)" text-center>
                            {{ (eventData as any).general.name }}
                        </h3>
                       
                    </div>
                    <div style="
              border: 0.5px solid rgb(200, 200, 200);
              height: 0;
            " width-90></div>
<!-- prices -->
                    <div flex-column class="ticketPurchase__pricesContainer">
                        <h4 text-center style="font-weight: 400; font-size: 22px; padding-bottom: 8px; color: var(--color-neutral-600);" >Mis Lugares</h4>
                        <div style=" flex-grow: 1;" flex-row justify-center>
                            <div class="ticketPurchase__tablePrices" v-if="seatSelectedGrouped.length > 0" wrap
                                flex-row justify-start align-start>
                                <div class="ticketPurchase__ticketPrice" flex-row wrap
                                    v-for="(ticketItem, index) in (seatSelectedGrouped as any)" :key="index"
                                    @click="showSeats(ticketItem)">
                                    <div flex-row basis-100 align-center>
                                        
                                        <h4 class="nameZoneTicket"  style="flex-basis: 70%;">
                                            {{ ticketItem.nameSection }}
                                            <span class="counterTickets" style="margin-inline-start: 0.2rem">
                                                {{ ticketItem.count }}
                                            </span>
                                        </h4>
                                        <div style="flex-basis: 15%;" flex-row justify-end>
                                            <p class="priceMaxZoneTicket" text-end>
                                                {{ formatMoney((ticketItem as any).data.subprice) }}
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
                                <p style="color: var(--color-neutral-400); font-family: 'Quicksand'; font-size: 14px;">
                                    Selecciona un asiento para empezar a mapear tu informacion
                                </p>
                            </div>


                        </div>
                    </div>


                </div>
                <div flex-row wrap align-center basis-100 class="ticketPurchase__infoTotales">
                    <div v-if="editInfo.isShowTotalesDetail" basis="100" padding-inline-4 padding-block-end
                        style="position: absolute; background: white !important; width: 100% !important;bottom: 6rem; box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset; padding-top: 2rem;">
                        <h5 basis="100" flex-row justify-space-between font-oswald>
                            BOLETAJE :
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'; ">
                                {{ calculateTicketingValue }}
                            </span>
                        </h5>
                        <div flex-row wrap padding-bottom-1>
                            <p basis="100" @click="
                                () => {
                                    editInfo.isShowTicketingDetail =
                                        !editInfo.isShowTicketingDetail;
                                }
                            " flex-row align-center style="text-decoration: underline; cursor: pointer" font-oswald>
                                *Desglosar boletaje
                                <span><img v-if="!editInfo.isShowTicketingDetail"
                                        :src=" '/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowTicketingDetail"
                                        :src=" '/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" /></span>
                            </p>
                            <div v-if="editInfo.isShowTicketingDetail" basis="100" padding-inline-4 padding-block-2>
                                <span flex-row wrap basis="100">
                                    <h5 basis="100" width-100 font-oswald>
                                        BOLETAJE <span> <img style="width: 1rem;"
                                                :src=" '/icon/rightArrow.svg'" alt=""></span> {{
                                                    formatMoney(editInfo.totalToPay) }}
                                    </h5>
                                </span>
                                <span flex-row wrap basis="100">
                                    <h5 basis="100" width-100 font-oswald>
                                        CARGO POR SERVICIO <span> <img style="width: 1rem;"
                                                :src=" '/icon/rightArrow.svg'" alt=""></span>
                                        {{ formatMoney(editInfo.inbropiFees) }}
                                       
                                    </h5>
                                </span>
                            </div>
                        </div>
                        <h5 v-if="editInfo.statusPurchase !== 'START'" basis="100" flex-row justify-space-between
                            align-center font-oswald>
                            COMISIONES SELECCIONADAS:
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">{{
                                calculateFeesSelected
                            }}</span>
                        </h5>
                        <div flex-row wrap v-if="editInfo.statusPurchase !== 'START'" padding-bottom-1>
                            <p font-oswald basis="100" @click="
                                () => {
                                    editInfo.isShowFeesDetail = !editInfo.isShowFeesDetail;
                                }
                            " flex-row align-center style="text-decoration: underline; cursor: pointer">
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
                                                    :src=" '/icon/rightArrow.svg'" alt=""></span> {{
                                                        formatMoney(feesItem.cash) }}
                                        </h5>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <h5 basis="100" flex-row justify-space-between font-oswald>
                            SUBTOTAL:
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">{{
                                formatMoney(editInfo.totalWithComissions)
                            }}</span>
                        </h5>
                        <h5 font-oswald basis="100" v-if="editInfo.statusPurchase !== 'START'" flex-row
                            justify-space-between>
                            PROCESAMIENTO DE ORDEN:
                            <span text-bolder color-blue-dark style="font-size: 1.7rem; font-family: 'oswald'">{{
                                calculateGanwayFees
                            }}</span>
                        </h5>
                    </div>
                    <div class="wrapInfoTot">
                        <div flex-row wrap>
                            <h3 basis="100" style="font-weight: 700 !important;font-size: 28px !important; color: black; font-family: 'SN Pro';">
                                <!-- @ts-ignore -->
                                {{ formatMoney(editInfo.finalTotalComissionsIVA) }}
                                <span> MXN</span>
                            </h3>
                            <p @click="
                                () => {
                                    editInfo.isShowTotalesDetail =
                                        !editInfo.isShowTotalesDetail;
                                    if (editInfo.isShowTotalesDetail) {
                                        scrollToRef(this, 'actionButtons_section',);
                                    }
                                }
                            " flex-row align-center
                                style="font-size: 14px !important; text-decoration: underline !important; cursor: pointer; font-family: 'Quicksand'; ">
                                Detalles de tu compra
                                <span>
                                    <img v-if="!editInfo.isShowTotalesDetail"
                                        :src=" '/icon/selector_arrow_down.svg'" class="iconMedia" alt="" />
                                    <img v-if="editInfo.isShowTotalesDetail"
                                        :src=" '/icon/selector_arrow_up.svg'" class="iconMedia"
                                        alt="" />
                                </span>
                            </p>
                        </div>
                    </div>
                    <div flex-row style="flex-basis: 50%" justify-end ref="actionButtons_section">
                        <TButton v-if="editInfo.statusPurchase === 'START'" class="next__button-principal"
                            v-bind="{
                                text: 'RESERVAR',
                                type: 'clickeable',
                                color: 'var(--color-primary-light)',
                                backgroundColor: 'var(--color-accent-dark)',
                            }" @click.prevent="() => { }" />
                        <section v-if="editInfo.statusPurchase !== 'START'" width-100 class="" flex-row col-gap="1">
                            <TButton grow="1" class="more_seats" v-bind="{
                                text: 'Asientos',
                                icon:  '/icon/plus.svg',
                                displayIconWrappper: 'row-reverse',
                                type: 'clickeable',
                                color: 'var(--gallos-red)',
                                border: '1px solid var(--gallos-red)',
                                backgroundColor: 'white',
                            }" @click.prevent="() => { }" />
                            <TButton v-if="editInfo.statusPurchase === 'SEATSELECTED'" grow="1" class="next__button"
                                v-bind="{
                                    text: 'Siguiente',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="() => { }" />
                            <TButton v-if="editInfo.statusPurchase === 'FEESSELECTED'" grow="1" class="next__button"
                                v-bind="{
                                    text: 'Proceder al pago',
                                    type: 'clickeable',
                                    color: 'white',
                                    backgroundColor: 'var(--gallos-orange)',
                                }" @click.prevent="() => { }" />
                        </section>
                    </div>
                </div>
            </section>

        </div>
    </main>
</template>
<style scoped>
.ticketPurchase__left {
    flex-basis: 60%;
    flex-wrap: wrap;
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
    flex: 1
}

.mapSection {
    align-content: start;
    max-height: calc(100dvh- 7rem);
    overflow-y: auto;
}
.mapContainer {
    transition: transform 1s ease;
    cursor: pointer;
    flex: 1 1 auto;
}

.ticketPurchase__title {
    font-size: 24px;
    font-weight: 500;
    font-family: 'SN Pro';
    width: 70%;
    padding-block: 40px;
    margin-inline: auto;
}

.mapSection__content>div {
        align-items: anchor-center; width: auto /* -webkit-fill-available */
    }
.table-prices {
    width: auto;
    border-collapse: collapse;
    /* margin: 20px auto; */
    border-radius: 10px;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
    background-color: var(--color-primary-dark);
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

.ticketPurchase__rigth {
    flex-wrap: wrap;
    flex: 1;
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

/* .ticketPurchase__infoTotales {
    position: relative;
} */
.ticketPurchase__infoTotalesMobile {
    display: none;
}

.ticketPurchase__infoTotales {
    /* background: var(--business-yellow); */
    border-top: 1px solid rgb(200, 200, 200);
    padding-block: 1rem;
    min-height: 5rem;
}
.ticketPurchase__infoTotales h5 {
    font-size: 1.45rem !important;
    color: black;
}
.ticketPurchase__infoTotales p {
    font-size: 1.2rem !important;
    text-decoration: none !important;
    letter-spacing: 0.7px;
}

.wrapInfoTot{
    flex-basis: 40%;
    padding-inline: 1rem;
}
.next__button-principal{
    
}

.ticketPurchase__placeAndDateContainer,
.ticketPurchase__pricesContainer {
    width: 100%;
}

.ticketPurchase__pricesContainer {
    cursor: pointer;
    height: 50%;
    flex-basis: 75%;
}

.ticketPurchase__flyerContainer {
    width: 100%;
    height: auto;
    max-height: 20rem;
    border-radius: 15px;
    padding-top: 20px;
}

.ticketPurchase__flyerContainer>img {
    border-radius: 15px;
    width: 80%;
    margin-inline: auto;
    height: auto;
}

.seat-wrapper-item {
    cursor: pointer;
    background: var(--color-neutral-200);
    border: 0.15rem solid var(--color-neutral-500);
    border-radius: 8px;
    margin: 2px;
}

.seat-wrapper-item p {
    color: var(--color-neutral-600);
    font-weight: 400;
    font-family: 'SN Pro';
}

.seat-wrapper-row {
    background: var(--color-accent-dark);
    border: 0.2rem solid var(--color-accent-dark);
    border-radius: 8px;
    min-width: 25px;
    min-height: 25px;
    
}

.seat-wrapper-row h4 {
    color: var(--color-primary-dark);
    font-weight: 600;
    font-size: 16px;
}

.seatsWrapper {
    max-width: 100%;
}

.wrapper-seats-scroll {
    width: 100% !important;
    max-width: 100% !important;
    overflow: auto;
    padding-bottom: 20px;
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
    background-color: var(--color-primary-lightest  );
    border: 0.2rem solid var(--color-primary-dark);
}

.seat-selected p {
    color: var(--color-primary-dark);
}

.seatSold {
    cursor: auto;
    border-radius: 8px;
    background-color: var(--color-primary-dark);
    border: 0.2rem solid var(--color-primary-dark);
}

.seatSold p {
    color: white;
}

/* END COLOR SEATS */
.zoomButtonsSeats{
    column-gap: 10px;  
    padding-bottom: 20px;      
}


.ticketPurchase__tablePrices {
    flex-basis: 75%;
    margin-top: 12px;
}

.ticketPurchase__ticketPrice {
    /* border: 1px dashed red; */
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
    min-height: 4.5rem;
    margin-block-end: 1.2rem;
    border-radius: 0.5rem;
    background: rgb(231, 231, 231);
    align-items: center;
    padding: 1rem;
    width: 100% !important;
    max-width: 100% !important;
    height: fit-content;
    padding-left: 20px;
    /* background: var(--gallos-green-2); */
}

.nameZoneTicket {
    flex-basis: 70%;
    font-size: 15px !important;
    color: var(--color-primary-dark);
    font-weight: 500;
    font-family: 'SN Pro';
}

.counterTickets {
    background: var(--color-accent-dark);
    border-radius: 50%;
    width: 20px;
    min-width: 20px;
    height: 20px;
    min-height: 20px;
    text-align: center;
    align-content: center;
    color: var(--color-primary-dark);
    font-weight: 400;
    font-family: 'SN Pro';
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

.priceMaxZoneTicket, .priceMinZoneTicket {
    padding-inline-end: 5px;
    padding-top: 7px;
    font-family: 'SN Pro' !important;
    color: var(--color-primary-darkest);
    font-weight: 300;
    font-size: 16px !important;
}
.priceMinZoneTicket{
    font-weight: 700 !important;
    font-size: 12px !important;
}

@media (orientation: portrait) or ((width >=300px) and (width <=850px)) {
    .ticketPurchase__infoTotalesMobile {
        display: flex;
        z-index: 9999;
        width: 100%;
        background-color: aliceblue;
        position: absolute;
        bottom: 0;
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

    .ticketPurchase__title {
        text-align: center;
        /* flex-basis: 80% !important; */
        font-size: 1rem !important;
    }
     .ticketPurchase__title_timer,
    .ticketPurchase__timer {
        padding-block: 0 !important;
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

    .ticketPurchase__tablePrices {
        flex-basis: 90%;
    }
}
</style>
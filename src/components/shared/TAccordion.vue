<script lang="ts">
export default {
    name: 'TAccordion',
    props: {
        name: {
            type: String,
            default: 'nameDefault',
        },
        title: {
            type: String,
            default: 'title default',
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {}
    },
    computed: {
		mode() {
			return import.meta.env.VITE_PATH_MEDIA
		},
	},
}
</script>
<template>
    <details :id="'accordion-' + name" :disabled="disabled">
        <summary flex="row">
            <!-- <h1>{{ title }}</h1> -->
            <slot name="slot__title" />
            <span class="arow" flex="row"><img class="imagen__arrow" :src="mode + 'icon/selector_arrow.svg'"
                    alt="" /></span>
        </summary>
        <div class="content">
            <slot name="slot__content" />
        </div>
    </details>
</template>

<style>
details {
    padding-block: 0.2rem;

}

summary {
    padding-block: 0.1rem;
    padding-inline: 0rem;
    background: transparent;
    color: rgb(112, 112, 112);
    align-items: center;
    justify-content: space-between;
    transition: all 0.25s ease-in;
    -webkit-transition: all 0.25s ease-in;

}

details[open] {}

details[open] summary {}

details>summary {
    list-style-type: none;
}

details[disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
}

.imagen__arrow {
    width: 2rem;
    height: 2rem;
}

details[open]>summary>span.arow {
    transform: rotate(180deg);
    -webkit-transition: max-height 0.5s ease-in-out;
    transition: max-height 0.5s ease-in-out;
}

.arow {
    border: 1.5px solid rgb(112, 112, 112);
    border-radius: 50%;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    min-height: 2rem;
    min-width: 2rem;
}

.content {
    padding: 1rem;
}
</style>

<template>
    <button
        v-on:click="handleClick"
        class="button"
        v-bind:class="{
            primary: variant === 'primary'||variant === 'dark',
            secondary: variant === 'secondary',
            dark: variant === 'dark'
        }"
    >
        {{label}}
    </button>
</template>

<script>
    export default {
        name: "Button",
        props: {
            label: String,
            variant: {
                default: "secondary",
                validator: function(value) {
                    return ["primary", "secondary", "dark"].indexOf(value) !== -1
                }
            },
            handleClick: Function
        }
    }
</script>

<style scoped>
    .button {
        cursor: pointer;
        font-size: 1.2rem;
        text-transform: uppercase;
    }

    .primary {
        font-weight: 400;
        background-color: #fff;
        border: 0.1rem solid #FFF;
        border-radius: 0.5rem;
        padding: 0.5rem 2.2rem;
        transition: all 0.2s ease;
    }

    .primary:hover {
        transform: scale(0.95);
        color: hsl(349, 71%, 52%);
    }
    
    .secondary {
        color: #FFF;
        font-weight: 600;
        background-color: transparent;
        border: 0.1rem solid #FFF;
        border-radius: 0.5rem;
        padding: 0.5rem 2.2rem;
        transition: all 0.2s ease;
    }

    .secondary:hover {
        color: hsl(229, 25%, 31%);
        background-color: #FFF;
    }

    .dark {
        background: hsl(214, 47%, 23%);
        color: #FFF;
    }

    .dark:hover {
        background: hsl(214, 47%, 93%);
    }

    @media screen and (min-width: 900px) {
        .button.primary {
            font-size: 1.6rem;
            padding: 0.75rem 2.7rem;
        }
        
    }
</style>
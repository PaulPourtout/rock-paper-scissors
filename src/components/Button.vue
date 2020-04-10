<template>
    <button
        v-on:click="handleClick"
        class="button"
        v-bind:class="{primary: variant === 'primary', secondary: variant === 'secondary'}"
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
                    return ["primary", "secondary"].indexOf(value) !== -1
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
        background-color: hsl(0, 0%, 70%);
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
</style>
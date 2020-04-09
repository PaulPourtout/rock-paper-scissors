<template>
    <div>
        <button
            v-if="type"
            class="button"
            v-bind:class="{rock: type === 'rock', paper: type === 'paper', scissors: type === 'scissors', disabled: disabled}"
            v-on:click="onClick"
        >
            <div class="button-content">
                <img v-bind:src="require('@/assets/icon-' + type + '.svg')" alt="" />
            </div>
        </button>
        <div v-else class="empty-type-button">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonGame",
        props: {
            type: {
                default: null,
                validator: function(value) {
                    return ["rock", "paper", "scissors"].indexOf(value) !== -1
            }},
            onClick: {
                default: () => null,
                type: Function
            },
            disabled: {
                default: false,
                type: Boolean
            }
        }
    }
</script>

<style scoped>
    .rock {
        background: linear-gradient(180deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
        box-shadow: inset 0 -0.3rem 0 hsl(349, 90%, 36%);
    }

    .paper {
        background: linear-gradient(180deg, hsl(230, 89%, 62%), hsl(230, 89%, 65%));
        box-shadow: inset 0 -0.3rem 0 hsl(230, 80%, 50%);
    }
    .scissors {
        background: linear-gradient(180deg, hsl(39, 89%, 49%), hsl(40, 84%, 53%));
        box-shadow: inset 0 -0.3rem 0 hsl(35, 100%, 38%);
    }

    .button {
        cursor: pointer;
        padding: 0.8rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .empty-type-button {
        background: hsl(219, 50%, 17%);
        height: 6rem;
        width: 6rem;
        border-radius: 3rem;
        margin: 0.8rem;
    }

    .button:hover {
        /* box-shadow: inset 0 -0.2rem 0 hsl(349, 70%, 36%); */
        transform: scale(1.05);
    }

    .button:hover .button-content {
        box-shadow: inset 0 0.1rem 0 hsl(217, 5%, 80%);
    }

    .button-content {
        height: 6rem;
        width: 6rem;
        border-radius: 3rem;
        box-shadow: inset 0 0.25rem 0 hsl(217, 5%, 80%);
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .disabled {
        cursor: default;
    }

    .disabled:hover {
        transform: scale(1);
    }

    .disabled:hover .button-content {
        box-shadow: inset 0 0.25rem 0 hsl(217, 5%, 80%);
    }
</style>
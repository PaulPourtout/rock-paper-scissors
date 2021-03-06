<template>
    <div class="button-container">
        <div v-if="type">
            <button
                class="button"
                v-bind:class="{rock: type === 'rock', paper: type === 'paper', scissors: type === 'scissors', disabled: disabled, 'button-active': !disabled}"
                v-on:click="handleClick"
            >
                <div class="button-content">
                    <img v-bind:src="require('@/assets/icon-' + type + '.svg')" alt="" />
                </div>
            </button>
            <div class="pulse-effect"
                v-bind:class="{
                    'clicked-effect': clicked,
                    'pulse-active-effect': pulse}"
            ></div>
            <div class="pulse-effect"
                v-bind:class="{
                    'clicked-effect': clicked,
                    'pulse-active-effect': pulse,
                    'second-pulse': clicked||pulse}"
            ></div>
            <div class="pulse-effect"
                v-bind:class="{
                    'clicked-effect': clicked,
                    'pulse-active-effect': pulse,
                    'third-pulse': clicked||pulse}"
            ></div>
        </div>
        <div v-else class="empty-type-button">
        </div>
    </div>
</template>

<script>
    export default {
        name: "ButtonGame",
        props: {
            pulse: {
                default: false,
                type: Boolean
            },
            type: {
                default: null,
                validator: function(value) {
                    return ["rock", "paper", "scissors"].indexOf(value) !== -1
            }},
            onClick: {
                default: null,
                type: Function
            },
            disabled: {
                default: false,
                type: Boolean
            }
        },
        data: () => ({
            clicked: false
        }),
        methods: {
            handleClick: function() {
                if (this.onClick) {
                    this.clicked = true;
                    setTimeout(this.onClick, 300);
                    setTimeout(() => this.clicked = false, 2000);
                }
            }
        }
    }
</script>

<style scoped>
    .rock {
        background: linear-gradient(180deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
        box-shadow: inset 0 -0.3rem hsl(349, 90%, 36%), 0 0.15rem hsl(349, 0%, 10%);
    }

    .paper {
        background: linear-gradient(180deg, hsl(230, 89%, 62%), hsl(230, 89%, 65%));
        box-shadow: inset 0 -0.3rem 0 hsl(230, 80%, 50%), 0 0.15rem hsl(349, 0%, 10%);
    }
    .scissors {
        background: linear-gradient(180deg, hsl(39, 89%, 49%), hsl(40, 84%, 53%));
        box-shadow: inset 0 -0.3rem 0 hsl(35, 100%, 38%), 0 0.15rem hsl(349, 0%, 10%);
    }

    .button-container {
        position: relative;
    }

    .button {
        position: relative;
        cursor: pointer;
        padding: 0.8rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        z-index: 5;
    }

    .button:focus {
        outline: none;
    }

    .button-active:active {
        transform: scale(0.95) !important;
    }
   
    .button-active:active .button-content {
        box-shadow: inset 0 0.40rem 0 hsl(217, 5%, 80%) !important;
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
        z-index: 5;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .disabled {
        cursor: default;
    }

    .disabled:hover {
        transform: none;
    }

    .disabled:hover .button-content {
        box-shadow: inset 0 0.25rem 0 hsl(217, 5%, 80%);
    }

    .pulse-effect {
        position: absolute;
        background-color: rgb(255,255,255);
        border-radius: 3.5rem;
        width: 7rem;
        height: 7rem;
        z-index: 0;
        top: 5%;
        left: 50%;
        transform: translate(-50%);
    }

    .pulse-active-effect {
        animation: 2s ease-out infinite pulse;
    }

    .second-pulse {
        animation-delay: 0.7s;
    }

    .third-pulse {
        animation-delay: 1.4s;
    }

    .clicked-effect {
        animation: 0.2s ease-out clicked-pulse;
    }

    @keyframes clicked-pulse {
        from {
            transform: translate(-50%) scale(1);
            opacity: 0.1;
        } to {
            transform: translate(-50%) scale(2);
            opacity: 0;
        }
    }

    @keyframes pulse {
        from {
            transform: translate(-50%) scale(1);
            opacity: 0.04;
        } to {
            transform: translate(-50%) scale(2);
            opacity: 0;
        }
    }

    @media screen and (min-width: 500px) {
        .button-content, .empty-type-button {
            height: 8rem;
            width: 8rem;
            border-radius: 4rem;
        }
        .empty-type-button {
            margin: 1.2rem;
        }
        .button {
            padding: 1.2rem;
        }

         .button img {
            width: 3.5rem;
        }

        .pulse-effect {
            border-radius: 4.5rem;
            width: 9rem;
            height: 9rem;
        }  
    }

    @media screen and (min-width: 900px) {
        .button-content, .empty-type-button {
            height: 12rem;
            width: 12rem;
            border-radius: 6rem;
        }

        .empty-type-button {
            margin: 1.8rem;
        }

        .button {
            padding: 1.8rem;
        }

        .button img {
            width: 5rem;
        }

        .pulse-effect {
            border-radius: 6rem;
            width: 12rem;
            height: 12rem;
            top: 9%;
        }  
        .rock {
            box-shadow: inset 0 -0.7rem hsl(349, 90%, 36%), 0 0.25rem hsl(349, 0%, 10%);
        }

        .paper {
            box-shadow: inset 0 -0.7rem 0 hsl(230, 80%, 50%), 0 0.25rem hsl(349, 0%, 10%);
        }
        .scissors {
            box-shadow: inset 0 -0.7rem 0 hsl(35, 100%, 38%), 0 0.25rem hsl(349, 0%, 10%);
        }
    }
</style>
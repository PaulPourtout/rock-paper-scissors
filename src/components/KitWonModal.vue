<template>
    <div
        v-if="open"
        class="modal-container"
    >
        <div class="modal-content">
            <h3>{{title}}</h3>

            <div>
                <p>Bravo Kitty tu as gagné la partie ! <span v-if="!won">...ou pas</span></p>
                <p v-if="!won">Mais c'est ton anniversaire alors on va dire que oui.</p>
                <p> Tu as mérité une super surprise. Pour la découvrir cliques sur ce bouton.</p>
                <a target="_blank" href="" class="button-container">
                    <Button
                        label="Ta surprise"
                        variant="dark"
                        :handle-click="handleDoNothing"
                    />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from "./Button";

    export default {
        name: "KitWonModal",
        components: {
            Button,
        },
        props: {
            open: Boolean,
            title: String,
            won: String
        },
        methods: {
            handleDoNothing: function() {
                return;
            },
            handleCopyURLToClipboard: function () {
                Document.execCommand('copy')
            }
        }
    }
</script>

<style scoped>
    .modal-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 19;
    }
    .modal-content {
        background-color: #FFF;
        padding: 1.5rem;
        border-radius: 0.5rem;
        z-index: 20;
        max-width: 30rem;
        box-sizing: border-box;
    }

    .button-container {
        margin-top: 1rem;
        display: block;
    }

    .modal-content h3 {
        text-transform: uppercase;
        text-align: left;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .modal-content p {
        margin: .5rem 0;
        text-align: left;
    }

    .room-link {
        user-select: all;
    }
</style>
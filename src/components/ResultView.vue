<template>
     <transition
        name="slide-to-top"
    >
        <div v-if="winner" class="result-part">
            <p>{{winner === "player" ? 'You win' : winner === "even" ? "Tie !" : 'You lose'}}</p>
            <Button
                label="Play again"
                variant="primary"
                v-bind:handle-click="handleNewGame"
            />
        </div>
    </transition>
</template>

<script>
    import Button from "./Button";
    export default {
        name: "ResultView",
        components: {
            Button
        },
        props: {
            winner: String,
            handleNewGame: Function
        }
    }
</script>

<style scoped>
    .result-part p {
        color: #fff;
        font-size: 2.5rem;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0.5rem 0;
    }

    .slide-to-top-enter {
        transform: scale(1.5);
        z-index: 10;
        opacity: 0;
    }

    .slide-to-top-enter-active {
        transition: all .15s ease-in;
    }

     @media screen and (min-width: 900px){
        .result-part p {
            font-size: 3.5rem;
            margin: 1rem 0;
        }
    }
</style>
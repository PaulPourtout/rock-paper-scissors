<template>
    <header>
        <div id="container">
            <img
                id="logo"
                src="../assets/logo.svg"
                alt="Logo Rock Paper Scissors"
            >
            <Score v-bind:score={score} />
        </div>
    </header>
</template>

<script>
    import Score from "./Score.vue";

    export default {
        name: "Header",
        props: {
            score: Number
        },
        components: {
            Score
        }
    }
</script>

<style>
    header {
        padding: 1rem;
    }
    #container {
        border: 3px solid hsl(217, 16%, 45%);
        border-radius: 5px;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #logo {
        width: 6rem;
    }
</style>
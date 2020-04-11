<template>
    <header>
        <div class="header-container">
            <img
                id="logo"
                src="../assets/logo.svg"
                alt="Logo Rock Paper Scissors"
            >
            <Score v-bind:score="score" />
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

<style >
    header {
        padding: 2rem 0;
    }
    .header-container {
        margin: auto;
        border: 3px solid hsl(217, 16%, 45%);
        border-radius: 5px;
        padding: .7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    #logo {
        width: 6rem;
    }

    @media screen and (min-width: 500px) {
        .header-container {
            max-width: 30rem;
        }

    }
    @media screen and (min-width: 900px) {
        .header-container {
            max-width: 40rem;
        }
        #logo {
            width: 12rem;
        }

    }
</style>
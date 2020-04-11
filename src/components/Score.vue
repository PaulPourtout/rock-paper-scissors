<template>
    <div class="container">
        <p class="text">score</p>
        <p class="text score">{{score}}</p>
    </div>
</template>

<script>
    export default {
        name: "Score",
        props: {
            score: Number
        }
    }

</script>

<style scoped>
    .text {
        color: hsl(229, 64%, 46%);
        margin: 0;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
    }
    .score {
        color: hsl(229, 25%, 31%);
        font-size: 2rem;
        font-weight: 700 !important;
    }
    .container {
        background-color: #fff;
        padding: 0.5rem 1.2rem;
        border-radius: 0.5rem;
    }

    @media screen and (min-width: 900px) {
         .text {
            font-size: 1rem;
        }
        .score {
            font-size: 4rem;
        }
        .container {
            background-color: #fff;
            padding: 0.5rem 2.5rem;
            border-radius: 0.5rem;
        }
    }
</style>
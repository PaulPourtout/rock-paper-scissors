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
        font-weight: 600;
    }
    .score {
        color: hsl(229, 25%, 31%);
        font-size: 2rem;
        font-weight: 700;
    }
    .container {
        background-color: #fff;
        padding: 0.5rem 1.5rem;
        border-radius: 0.5rem;
    }
</style>
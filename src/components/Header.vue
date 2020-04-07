<template>
    <div>
        <img
            id="logo"
            src="../assets/logo.svg"
            alt="Logo Rock Paper Scissors"
        >
        score {{score}}
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            score: Number
        }
    }
</script>

<style>
    #logo {
        
    }
</style>
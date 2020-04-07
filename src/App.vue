<template>
    <div id="app">
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
        <!-- <div>
        Score
        Rules

        You Picked
        The House Picked

        You Win
        You Lose

        Play Again
        </div> -->
        <Header  score="3" />
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="#">Your Name Here</a>.
        </div>
    </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
    name: 'App',
    components: {
        Header
    }
}
</script>

<style>
    body {
        margin: 0;  
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin: 0;
        background: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
        height: 100vh;
        color: #2c3e50;
    }

    .attribution {
        font-size: 11px;
        text-align: center;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
    }

    .attribution a {
        color: hsl(228, 45%, 44%);
    }
</style>
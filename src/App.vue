<template>
    <div id="app">
        <Header :score="score" />
        <div class="main-zone">
            <GameArea
                :set-score="setScore"
            />
        </div>

        <div class="rules-bnt-container">
            <Button
                label="Rules"
                variant="secondary"
                :handle-click="handleToggleClick"
            />
        </div>
        <RulesPage
            :is-open="isModalOpen"
            :handle-close="handleToggleClick"
        />
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="https://github.com/PaulPourtout">Paul Pourtout</a>.
        </div>
    </div>
</template>

<script>
    import Button from './components/Button.vue';
    import Header from './components/Header.vue';
    import RulesPage from './components/RulesPage.vue';
    import GameArea from './components/GameArea.vue';

    export default {
        name: 'App',
        components: {
            Header,
            RulesPage,
            Button,
            GameArea
        },
        data: () => ({
                isModalOpen: false,
                score: 0
        }),
        methods: {
            handleToggleClick: function () {
                this.isModalOpen = !this.isModalOpen;
            },
            setScore: function (increase) {
                this.score = increase ? this.score + 1 : this.score - 1;
            }
        }
    }
</script>

<style>
    * {
        outline: none;
        font-family: 'Barlow Semi Condensed', sans-serif;
    }
    body, h1, h2, h3, h4, p, button {
        margin: 0;
        background: none;
        box-shadow: none;
        border: none;
    }

    body {
        background: radial-gradient(hsl(214, 47%, 23%), hsl(237, 49%, 15%));
    }

    #app {
        padding: 0 2rem;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        margin: auto;
        height: 100vh;
        color: #2c3e50;
        display: flex;
        max-width: 1000px;
        flex-direction: column;
        overflow: hidden;
    }

    .main-zone {
        flex: 1;
        display: flex;
        /* justify-content: center;
        align-items: center; */
    }

    .rules-bnt-container {
        margin: 1rem 0;
    }

    .attribution {
        font-size: 11px;
        margin: 1rem 0;
        color: #fff;
    }

    .attribution a {
        color: hsl(228, 45%, 44%);
    }
    
    .attribution a:hover {
        color: hsl(349, 71%, 52%);
    }

    @media screen and (min-width: 500px) {
        .rules-bnt-container {
            align-self: end;
        }
    }
</style>
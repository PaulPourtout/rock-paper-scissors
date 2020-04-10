<template>
    <div class="container">
        <div v-if="!playerChoice" class="first-step">
            <div class="row">
                <ButtonGame
                    type="paper"
                    v-bind:on-click="() => handleChoseAction('paper')"
                />
                <ButtonGame
                    type="scissors"
                    v-bind:on-click="() => handleChoseAction('scissors')"
                />
            </div>
            <div class="row">
                <ButtonGame
                    type="rock"
                    v-bind:on-click="() => handleChoseAction('rock')"
                />
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="pick-container">
                    <ButtonGame
                        v-bind:type="playerChoice"
                        v-bind:disabled="true"
                    />
                    <p class="pick-label">You picked</p>
                </div>
                <div class="pick-container">
                    <ButtonGame
                        v-bind:type="computerChoice"
                        v-bind:disabled="true"
                    />
                    <p class="pick-label">The house picked</p>
                </div>
            </div>
            <div v-if="playerWin !== null" class="result-part">
                <p>{{this.playerWin ? 'You win' : 'You lose'}}</p>
                <Button
                    label="Play again"
                    variant="primary"
                    v-bind:handle-click="handleNewGame"
                />
            </div>
        </div>

    </div>
</template>

<script>
    import ButtonGame from "./ButtonGame";
    import Button from "./Button";

    export default {
        name: "GameArea",
        components: {
            ButtonGame,
            Button
        },
        data: () => ({
            playerChoice: null,
            computerChoice: null,
            playerWin: null,
        }),
        props: {
            setScore: Function
        },
        methods: {
            checkPlayerVictory: function (playerPlay, computerPlay) {
                switch(playerPlay) {
                    case "rock":
                        this.playerWin = computerPlay !== "paper";
                        break;
                    case "paper":
                        this.playerWin = computerPlay !== "scissors";
                        break;
                    case "scissors":
                        this.playerWin = computerPlay !== "rock";
                        break;
                }

                this.setScore(this.playerWin);
            },
            handleChoseAction: function (choice) {
                this.playerChoice = choice;
                setTimeout(this.generateComputerAnswer, 700);
            },
            generateComputerAnswer: function() {
                const possibleResults = ["rock", "paper", "scissors"].filter(choice => choice !== this.playerChoice);
                const resultIndex = Math.floor(Math.random() * 2);
                this.computerChoice = possibleResults[resultIndex];

                setTimeout(() => this.checkPlayerVictory(this.playerChoice, this.computerChoice), 700);
            },
            handleNewGame: function () {
                this.playerChoice = null;
                this.computerChoice = null;
                this.playerWin = null;
            }
        }
    }


</script>

<style scoped>
    .container {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .first-step {
        background: url("../assets/bg-triangle.svg");
        background-size: 50%;
        background-position: 50%;
        background-repeat: no-repeat;
        display: flex;
        /* flex: 1; */
        flex-direction: column;
        width: 100%;
        height: 20rem;
        justify-content: space-around;
    }

    .row {
        display: flex;
        justify-content: space-around;
    }

    .pick-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .pick-label {
        margin-top: 1rem;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
    }

    .result-part {
        flex: 1;
        /* background-color: red; */
    }

    .result-part p {
        color: #fff;
        font-size: 2.5rem;
        font-weight: 700;
        text-transform: uppercase;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    @media screen and (min-width: 500px) {
        .first-step {
            width: 31rem;
        }
    }

    @media screen and (min-width: 750px) {
        .first-step {
            width: 40rem;
            height: 30rem;
        }
    }
</style>
<template>
    <div class="container">
        <transition name="slide-fade">
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
        </transition>
        <transition
            name="slide-fade"
            enter-class="slide-fade-enter"
            leave-to-class="fade-out"
        >
            <div v-if="step === 2" class="step-2-container">
                <div class="row row-result">
                    <div class="pick-container">
                        <ButtonGame
                            v-bind:type="playerChoice"
                            v-bind:disabled="true"
                            v-bind:pulse="winner === 'player'"
                        />
                        <p class="pick-label">You picked</p>
                    </div>
                    <div class="result-part-container--desktop">
                        <ResultView
                            :handleNewGame="handleResartGame"
                            :winner="winner"
                        />
                    </div>
                    <div class="pick-container">
                            <ButtonGame
                                v-bind:type="computerChoice||adversaryChoice"
                                v-bind:disabled="true"
                                v-bind:pulse="winner === 'computer'"
                            />
                        <p class="pick-label">The house picked</p>
                    </div>
                </div>
                <div class="result-part-container--mobile">
                    <ResultView
                        :handleNewGame="handleResartGame"
                        :winner="winner"
                    />
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import ButtonGame from "./ButtonGame";
    import ResultView from "./ResultView";
    import { store } from "../store";

    export default {
        name: "GameArea",
        components: {
            ButtonGame,
            ResultView
            // Button
        },
        computed: {
            adversaryChoice: function() {
                return this.$store.state.adversaryChoice;
            },
            restartGame: function() {
                return this.$store.state.restartGame;
            }
        },
        data: () => ({
            step: 1,
            playerChoice: null,
            computerChoice: null,
            winner: null,
        }),
         watch: {
            adversaryChoice: function() {
                setTimeout(() => this.checkPlayerVictory(this.playerChoice, this.adversaryChoice), 1000);
            },
            restartGame: function() {
                console.log("NEW GAME SET")
                this.$store.state.restartGame = false;
                this.setNewGame();
            }
        },
        props: {
            setScore: Function,
            socket: Object
        },
        methods: {
            checkPlayerVictory: function (playerPlay, computerPlay) {
                if (!!playerPlay && playerPlay === computerPlay) {
                    this.winner = "even";
                } else {
                    switch(playerPlay) {
                        case "rock":
                            this.winner = computerPlay !== "paper" ? "player" : "computer";
                        break;
                    case "paper":
                        this.winner = computerPlay !== "scissors" ? "player" : "computer";
                        break;
                    case "scissors":
                        this.winner = computerPlay !== "rock" ? "player" : "computer";
                        break;
                    }
                }

                if (playerPlay !== computerPlay) {
                    this.setScore(this.winner === "player");
                }

                this.$store.state.playerWon = this.winner === "player";
                this.$store.state.kittyPlayed = true;
            },
            handleChoseAction: function (choice) {
                this.playerChoice = choice;
                this.sendChoiceToSocket(choice);
                setTimeout(() => this.step = 2, 550);

                if (!this.$store.state.multiplayerMode) {
                    setTimeout(this.generateComputerAnswer, 2000);
                }
                else if (this.$store.state.multiplayerMode && !!this.$store.state.adversaryChoice) {
                    setTimeout(() => this.checkPlayerVictory(this.playerChoice, this.$store.state.adversaryChoice), 1000);
                }
            },
            sendChoiceToSocket: function(choice) {
                store.dispatch("playerChoice", choice);
            },
            generateComputerAnswer: function() {
                const possibleResults = ["rock", "paper", "scissors"];
                const resultIndex = Math.floor(Math.random() * 3);
                this.computerChoice = possibleResults[resultIndex];

                setTimeout(() => this.checkPlayerVictory(this.playerChoice, this.computerChoice), 700);
            },
            handleResartGame: function() {
                this.setNewGame();
                this.$store.dispatch("restartGame");
            },
            setNewGame: function () {
                this.step = 1;
                setTimeout(() => {
                    this.playerChoice = null;
                    this.computerChoice = null;
                    this.winner = null;
                }, 800)
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

    .step-2-container {
        display: flex;
        flex-direction: column;
        height: 18rem;
        width: 100%;
        justify-content: space-between;
    }

    .row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        /* flex: 1; */
    }

    .row-result {
        transition: all 0.3s ease;
    }

    .pick-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0;
    }

    .pick-label {
        margin: 1.5rem 0;
        color: #fff;
        text-transform: uppercase;
        font-weight: 600;
    }

    .result-part-container--desktop {
        display: none;
        /* margin: 0 2rem; */
    }
    
    .result-part-container--mobile {
        display: block;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    
    .slide-fade-enter {
        transform: translateX(-10px);
        opacity: 0;
    }
    
    .slide-fade-leave-to {
        transform: translateX(10px);
        opacity: 0;
    }

    .slide-to-top-enter {
        transform: scale(1.5);
        z-index: 10;
        opacity: 0;
    }
    .slide-to-top-enter-active {
        transition: all .15s ease-in;
    }

    .fade-out {
        opacity: 0;
    }

    @media screen and (min-width: 500px) {
        .first-step {
            width: 31rem;
        }

        .step-2-container {
            height: 23rem;
        }
    }

    @media screen and (min-width: 900px) {
        .first-step {
            width: 40rem;
            height: 30rem;
        }

        .step-2-container {
            height: 23rem;
        }

        .result-part-container--desktop {
            display: block;
        }

        .row-result {
            justify-content: space-between !important;
            padding: 0 2rem;
        }
    
        .result-part-container--mobile {
            display: none;
        }

        .pick-container {
            flex-flow: column-reverse;
        }

        .pick-label {
            font-size: 1.4rem;
        }
    }
</style>
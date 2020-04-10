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
        <transition name="slide-fade">
            <div v-if="step === 2">
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
                <div v-if="winner" class="result-part">
                    <p>{{winner === "player" ? 'You win' : winner === "even" ? "Equality !" : 'You lose'}}</p>
                    <Button
                        label="Play again"
                        variant="primary"
                        v-bind:handle-click="handleNewGame"
                    />
                </div>
            </div>
        </transition>

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
            step: 1,
            playerChoice: null,
            computerChoice: null,
            winner: null,
        }),
        props: {
            setScore: Function
        },
        methods: {
            checkPlayerVictory: function (playerPlay, computerPlay) {
                if (playerPlay === computerPlay) {
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
            },
            handleChoseAction: function (choice) {
                this.playerChoice = choice;
                setTimeout(this.generateComputerAnswer, 1000);
            },
            generateComputerAnswer: function() {
                const possibleResults = ["rock", "paper", "scissors"];
                const resultIndex = Math.floor(Math.random() * 3);
                this.computerChoice = possibleResults[resultIndex];

                setTimeout(() => this.checkPlayerVictory(this.playerChoice, this.computerChoice), 700);
                this.step = 2;
            },
            handleNewGame: function () {
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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .7s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(10px);
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
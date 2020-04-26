<template>
    <div id="app">
        <Header :score="score" />
        <div class="main-zone">
            <GameArea
                :set-score="setScore"
                :socket="socket"
            />
        </div>

        <div class="rules-bnt-container">
            <div v-if="!multiplayerMode">
                <Button
                    label="Multiplayer Mode"
                    variant="secondary"
                    :handle-click="handleLaunchMultiplayer"
                />
            </div>
            <div v-if="multiplayerMode">
                <Button
                    label="Single Mode"
                    variant="secondary"
                    :handle-click="handleLaunchSinglePlayer"
                />
            </div>
            <Button
                label="Rules"
                variant="secondary"
                :handle-click="handleToggleClick"
            />
        </div>

        <!-- <div v-if="multiplayerMode">
            <p>You want to create a multiplayer room ?</p>
            <p>Pass this link to the second player</p>
            <p>http://localhost:8080?multiplayerRoom={{multiplayerRoomId}}</p>

            <div v-if="multiplayerMode && !adversaryConnected">
                <p style="font-size: 3rem;">WAITING FOR OTHER PLAYER</p>
            </div>
            <div v-if="multiplayerMode && adversaryConnected">
                <p style="font-size: 3rem; color: red;">OTHER PLAYER HERE</p>
            </div>
        </div> -->

        <MultiplayerModal
            :open="isMultiplayerModalOpen"
            title="Launch a multiplayer game"
        />

        <KitWonModal
            :open="kittyPlayed"
            title="Happy Birthday !!!!"
            :won="playerWon"
        />

        <RulesPage
            :is-open="isRuleModalOpen"
            :handle-close="handleToggleClick"
        />
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. 
            Coded by <a href="https://github.com/PaulPourtout">Paul Pourtout</a>.
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    import Button from './components/Button.vue';
    import Header from './components/Header.vue';
    import RulesPage from './components/RulesPage.vue';
    import GameArea from './components/GameArea.vue';
    import MultiplayerModal from './components/MultiplayerModal.vue';
    import KitWonModal from './components/KitWonModal';
    import { mapState } from 'vuex';

    export default {
        name: 'App',
        components: {
            Header,
            RulesPage,
            Button,
            GameArea,
            MultiplayerModal,
            KitWonModal
        },
        sockets: {
            success(socketid) {
                this.$store.dispatch("connect", socketid);
            },
            playerChoice(data) {
                console.log("coucou", data)
                if (data.user !== this.$store.playerId) {
                    this.$store.dispatch("adversaryChoice", data.choice);
                }
            },
            restartGame() {
                this.$store.state.restartGame = true;
            },
            adversaryConnected() {
                console.log("adversary connected");
                this.$store.state.adversaryConnected = "connected";
            },
            createdRoom() {
                console.log("YEAAAH");
            }
        },
        computed: {
            ...mapState(["multiplayerMode", "multiplayerRoomId", "adversaryConnected", "kittyPlayed", "playerWon"])
        },
        data: () => ({
                isRuleModalOpen: false,
                isMultiplayerModalOpen: false,
                score: 0,
                playerId: null,
                multiplayer: false,
                multiplayerLink: null,
                socket: io('localhost:4113'),
        }),
        mounted: function () {
            // GET URI AND CHECK FOR SOCKET ROOM
            let uri = window.location.href.split('?');
            if (uri.length == 2) {
                let vars = uri[1].split('&');
                let getVars = {};
                let tmp = '';
                vars.forEach(function(v){
                    tmp = v.split('=');
                    if(tmp.length == 2)
                    getVars[tmp[0]] = tmp[1];
                });
                console.log(getVars);
                if (getVars.multiplayerRoom) {
                    this.$store.multiplayerRoomId = getVars.multiplayerRoom;
                    this.$store.multiplayerMode = true;
                    this.socket.emit('joinRoom', getVars.multiplayerRoom);
                }
            }
        },
        methods: {
            handleToggleClick: function () {
                this.isRuleModalOpen = !this.isRuleModalOpen;
            },
            setScore: function (increase) {
                this.score = increase ? this.score + 1 : this.score > 0 ? this.score - 1 : this.score;
            },
            handleLaunchMultiplayer: function() {
                this.$store.state.multiplayerMode = true;
                this.generateMultiplayerRoom();
            },
            generateMultiplayerRoom: function() {
                // const roomId = uuid();
                // this.socket.emit('create', roomId);
                // this.$store.state.multiplayerRoomId = roomId;
                this.$store.dispatch("generateMultiplayerRoom");
            },
            handleLaunchSinglePlayer: function() {
                this.$store.state.multiplayerRoomId = null;
                // this.socket.emit('disconnect');
                this.$store.state.multiplayerMode = false;
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
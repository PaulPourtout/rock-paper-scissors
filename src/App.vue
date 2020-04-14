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
            <div v-if="!multiplayer">
                <Button
                    label="Multiplayer"
                    variant="secondary"
                    :handle-click="handleLaunchMultiplayer"
                />
            </div>
            <Button
                label="Rules"
                variant="secondary"
                :handle-click="handleToggleClick"
            />
        </div>

        <div v-if="multiplayer">
            <p>You want to create a multiplayer room ?</p>
            <p>Pass this link to the second player</p>
            <p>http://localhost:8080?multiplayerRoom={{multiplayerRoom}}</p>
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
    import { uuid } from 'uuidv4';
    import io from 'socket.io-client';
    import Button from './components/Button.vue';
    import Header from './components/Header.vue';
    import RulesPage from './components/RulesPage.vue';
    import GameArea from './components/GameArea.vue';
    // import { store } from "./store";
import { mapState } from 'vuex';

    export default {
        name: 'App',
        components: {
            Header,
            RulesPage,
            Button,
            GameArea
        },
        sockets: {
            connect: function () {
                console.log("new socket connected");
            },
            'success': function(socketid) {
                this.$store.dispatch("connect", socketid);
            },
            playerChoice: function (data) {
                if (data.user !== this.$store.playerId) {
                    this.$store.dispatch("adversaryChoice", data.choice);
                }
            }
        },
        computed: {
            ...mapState({
                store: state => state
            })
        },
        data: () => ({
                isModalOpen: false,
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
                    this.multiplayerRoom = getVars.multiplayerRoom;
                    this.socket.emit('connect', this.multiplayerRoom);
                }
            }
        },
        beforeDestroy: function () {

        },
        methods: {
            handleToggleClick: function () {
                this.isModalOpen = !this.isModalOpen;
            },
            setScore: function (increase) {
                this.score = increase ? this.score + 1 : this.score > 0 ? this.score - 1 : this.score;
            },
            handleLaunchMultiplayer: function() {
                this.multiplayer = true;
                this.generateMultiplayerRoom();
            },
            generateMultiplayerRoom: function() {
                const roomId = uuid();
                this.socket.emit('create', roomId);
                this.multiplayerRoom = roomId;
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
import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client';

Vue.use(Vuex);

export const store = new Vuex.Store({
state : {
    multiplayerMode: true,
    playerChoice: null,
    adversaryChoice: null,
    playerId: null,
    restartGame: false,
    socket: io('localhost:4113')
},
getters : {
    "playerChoice"() {
        return this.adversaryChoice;
    }
},
mutations : {
    "playerChoice"(state, playerChoice) {
        this.playerChoice = playerChoice;
        state.socket.emit('playerChoice', {
            user: this.playerId,
            choice: playerChoice
        })
    },
    "adversaryChoice"(state, adversaryChoice) {
        state.adversaryChoice = adversaryChoice;
        console.log("adversary choice is", state.adversaryChoice)
    },
    "connect"(state, socketId) {
        this.playerId = socketId;
        console.log("Connected to socket", socketId);
    },
    'restartGame'(state) {
        state.socket.emit('restartGame', {});
        state.adversaryChoice = null;
        state.playerChoice = null;
        state.restartGame = true;
    }
},
actions : {
    "playerChoice"(context, playerChoice) {
        context.commit("playerChoice", playerChoice);
    },
    "connect"(context, socketId) {
        context.commit("connect", socketId);
    },
    "adversaryChoice"(context, adversaryChoice) {
        context.commit("adversaryChoice", adversaryChoice);
    },
    "restartGame"(context) {
        context.commit("restartGame");
    }
}
})
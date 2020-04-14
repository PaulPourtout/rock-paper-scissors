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
    socket: io('localhost:4113')
},
getters : {},
mutations : {
    "playerChoice"(state, playerChoice) {
        this.playerChoice = playerChoice;
        state.socket.emit('playerChoice', {
            user: this.playerId,
            choice: playerChoice
        })
    },
    "adversaryChoice"(state, adversaryChoice) {
        this.adversaryChoice = adversaryChoice;
    },
    "connect"(state, socketId) {
        this.playerId = socketId;
        console.log("Connected to socket", socketId);
    },
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
    }
}
})
import Vue from 'vue'
import Vuex from 'vuex'
import io from 'socket.io-client';
import { uuid } from 'uuidv4';

Vue.use(Vuex);

export const store = new Vuex.Store({
state : {
    multiplayerMode: false,
    multiplayerRoomId: null,
    playerChoice: null,
    adversaryChoice: null,
    adversaryConnectedState: null,
    playerWon: null,
    kittyPlayed: false,
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
        state.playerChoice = playerChoice;
        state.socket.emit('playerChoice', {
            user: state.playerId,
            choice: playerChoice
        })
    },
    "adversaryChoice"(state, adversaryChoice) {
        state.adversaryChoice = adversaryChoice;
        console.log("adversary choice is", state.adversaryChoice)
    },
    "connect"(state, socketId) {
        state.playerId = socketId;
        console.log("Connected to socket", socketId);
    },
    'restartGame'(state) {
        state.socket.emit('restartGame', {});
        state.adversaryChoice = null;
        state.playerChoice = null;
        state.restartGame = true;
    },
    'generateMultiplayerRoom'(state, roomId) {
        state.adversaryConnectedState = "pending";
        state.multiplayerRoomId = roomId;
        state.socket.emit('create', roomId);
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
    },
    "generateMultiplayerRoom"(context) {
        const roomId = uuid();
        context.commit("generateMultiplayerRoom", roomId);
        return roomId;
    }
}
})
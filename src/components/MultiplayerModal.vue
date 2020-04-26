<template>
    <div
        v-if="open"
        class="modal-container"
    >
        <div class="modal-content">
            <h3>{{title}}</h3>

            <div v-if="!adversaryConnectedState">
                <p>To launch a multiplayer game generate a link and give it to your chosen adversary.</p>
                <Button
                    label="Generate Link"
                    variant="dark"
                    :handle-click="handleGenerateLink"
                />
            </div>
            <div v-if="adversaryConnectedState === 'pending'">
                <p>Waiting for adversary</p>
                <p>Share this link for her/him to join the game :</p>
                <div>
                    <p
                        class="room-link"
                    >http://localhost:8080?multiplayerRoom={{ multiplayerRoomId }}</p>
                </div>
            </div>
            <div v-if="adversaryConnectedState === 'connected'">
                <p>Adversary connected</p>
            </div>
        </div>
    </div>
</template>

<script>
    import Button from "./Button";
import { mapState } from 'vuex';

    export default {
        name: "MultiplayerModal",
        watch: {
            adversaryConnected: function() {
                console.log("COUCOU UUUUU");
            }
        },
        computed: {
            ...mapState(["adversaryConnectedState", "multiplayerRoomId"])
        },
        components: {
            Button,
        },
        props: {
            open: Boolean,
            title: String,
        },
        methods: {
            handleGenerateLink: function () {
                this.$store.dispatch("generateMultiplayerRoom");
            },
            handleCopyURLToClipboard: function () {
                Document.execCommand('copy')
            }
        }
    }
</script>

<style scoped>
    .modal-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 19;
    }
    .modal-content {
        background-color: #FFF;
        padding: 1rem;
        border-radius: 0.5rem;
        z-index: 20;
        max-width: 20rem;
        box-sizing: border-box;
    }

    .modal-content h3 {
        text-transform: uppercase;
    }

    .room-link {
        user-select: all;
    }
</style>
<template>
    <transition name="slide-fade">
        <div v-if="isOpen" class="container">
            <div class="content">
                <p>Rules</p>
                <img src="../assets/image-rules.svg" alt="">
                <button v-on:click="handleClose">
                    <img src="../assets/icon-close.svg" alt="">
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "RulesPage",
        props: {
            isOpen: Boolean,
            handleClose: Function
        }
    }
</script>

<style scoped>
    p {
        color: hsl(229, 25%, 31%);
        font-weight: 700;
        font-size: 2rem;
    }

    .content{
        padding: 1rem;
        background-color: #fff;
        flex: 1;
        z-index: 15;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
    }

    .container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        display: flex;
        justify-content: center;
        align-items: stretch;
        background-color: rgba(0,0,0,0.3);
    }

    button {
        justify-items: flex-end;
        border-radius: 50%;
        height: 2.5rem;
        width: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        cursor: pointer;
    }

    button:hover {
        background-color: hsl(217, 10%, 90%);
    }

    .slide-fade-enter-active {
        transition: all .3s ease-out;
    }
    .slide-fade-leave-active {
        transition: all .4s ease-in;
        opacity: .5;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }

    @media screen and (min-width: 500px) {
        .container {
            align-items: center;
        }

        .content {
            border-radius: 0.5rem;
            flex: 0;
        }
    }
</style>
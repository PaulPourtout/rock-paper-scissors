<template v-if={isOpen}>
    <div class="container">
        <p>Rules</p>
        <img src="../assets/image-rules.svg" alt="">
        <button>
            <img src="../assets/icon-close.svg" alt="">
        </button>
    </div>
</template>

<script>
    export default {
        name: "RulesPage",
        props: {
            isOpen: Boolean
        }
    }
</script>

<style scoped>
    p {
        color: hsl(229, 25%, 31%);
        font-weight: 700;
        font-size: 2rem;
    }

    .container{
        position: absolute;
        padding: 1rem 0;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: #fff;
        z-index: 10;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
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
</style>
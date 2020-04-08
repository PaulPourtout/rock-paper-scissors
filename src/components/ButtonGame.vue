<template>
    <button class="button">
        <div class="button-content">
            <img
                src="../assets/icon-rock.svg" alt=""
            />
        </div>
    </button>
</template>

<script>
    export default {
        name: "ButtonGame",
        props: {
            imageSrc: String
        }
    }
</script>

<style scoped>
    .button {
        cursor: pointer;
        background: linear-gradient(180deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%));
        padding: 0.8rem;
        /* height: 100px;
        width: 100px; */
        border-radius: 50%;
        box-shadow: inset 0 -0.3rem 0 hsl(349, 70%, 36%);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button-content {
        height: 6rem;
        width: 6rem;
        border-radius: 3rem;
        box-shadow: inset 0 0.25rem 0 hsl(217, 5%, 80%);
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
<template>
    <div class="container">
        <div class="row">
            <ButtonGame
                type="paper"
            />
            <ButtonGame
                type="scissors"
            />
        </div>
        <div class="row">
            <ButtonGame
                type="rock"
            />
        </div>
        <!-- <ButtonGame
            image-src="../assets/icon-rock.svg"
        />
        <ButtonGame
            image-src="../assets/icon-rock.svg"
        /> -->
    </div>
</template>

<script>
    import ButtonGame from "./ButtonGame";

    export default {
        name: "GameArea",
        components: {
            ButtonGame
        },
        props: {

        }
    }

</script>

<style scoped>
    .container {
        position: relative;
        background: url("../assets/bg-triangle.svg");
        background-size: 10rem;
        background-position: 50%;
        background-repeat: no-repeat;
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .row {
        display: flex;
        justify-content: space-around;
    }
</style>
<template>
    <div>
        GAME AREA
        <ButtonGame
            image-src="../assets/icon-rock.svg"
        />
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

<style>

</style>
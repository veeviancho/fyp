<template>
<div class="modal is-active">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
        <img :src="roomImg">
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
export default {
    methods: {
        close() {
            this.$emit('close')
        }
    },
    props: ['roomImg']
}
</script>

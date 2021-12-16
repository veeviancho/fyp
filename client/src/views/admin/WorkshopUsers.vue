<template>
<div class="modal is-active" v-if="workshopItem">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="box">
            <div class="field">
                <label class="label">Registered Users for {{ workshopItem.title }}</label>
                <br>
                <div class="control">
                    <li v-for="(item, index) in workshopItem.users" :key="index">
                    {{index}} - {{item}}
                    </li>
                </div>
                <br>
                <label class="label">Total: {{ workshopItem.users.length }}/{{ workshopItem.maxUsers }}</label>
            </div> 
        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
export default {
    props: ['workshopItem'],
    methods: {
        close() {
            this.$emit('close')
        }
    },
}
</script>


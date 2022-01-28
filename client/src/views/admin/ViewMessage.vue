<template>
<div class="modal is-active" v-if="contactItem">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
        <div class="box">

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Name</label>
                <div class="control">{{ contactItem.contact.name }}</div>
            </div>
        </div>

        <div class="column">
            <div class="field">
                <label class="label">Email</label>
                <div class="control">{{ contactItem.contact.email }}</div>
            </div>
        </div>
        </div>

        <div class="field">
            <label class="label">Message</label>
            <div class="control">{{ contactItem.contact.message }}</div>
        </div>

        <a :href="'mailto:' + contactItem.contact.email">
            <button type="submit" class="button is-outlined is-fullwidth">
            Reply
        </button>
        </a>

        </div>
    </div>
</div>
</template>

<script>
export default {
    props: ['contactItem'],
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.box {
    padding: 2rem 3rem;
}

.modal-content {
    min-width: 55vw;
}

.button {
    color: black;
}
</style>



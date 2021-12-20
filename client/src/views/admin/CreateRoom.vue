<template>
<div class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="create">
  
        <div class="field">
            <label class="label">Title</label>
            <div class="control"><input class="input is-warning" type="text" placeholder="John Doe" v-model="title" required></div>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control"><textarea class="textarea is-warning" type="textarea" placeholder="Enter information about the room." v-model="description"></textarea></div>
        </div>

        <!-- Error message -->
        <!-- <p class="has-text-danger has-text-centered mb-3" v-if="roomError.create">{{ roomError.create }}</p> -->

        <button type="submit" class="button is-outlined is-fullwidth">
            Create Room
        </button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
        return {
            title: '',
            description: ''
        }
    },
    computed: {
        ...mapGetters(['roomStatus', 'roomError'])
    },
    methods: {
        ...mapActions(['createRoom']),
        close() {
            this.$emit('close')
        },
        create() {
            let room = {
                title: this.title,
                description: this.description
            }
            this.createRoom(room)
                .then(() => {
                    if (this.roomStatus.create == "success") {
                        window.location.reload()
                        console.log("success")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>

<style scoped>
.button {
    color: black;
}

.button:hover {
    color: white
}
</style>

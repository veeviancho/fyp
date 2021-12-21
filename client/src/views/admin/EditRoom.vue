<template>
<div class="modal is-active" v-if="room">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="editRoom">

        <div class="field">
            <label class="label">Title &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[0]" @click="show[0]=true;">Edit</small>
                <small class="edit-btn" v-if="show[0]" @click="this.title=''; show[0]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[0]">{{ room.title }}</p>
                <input class="input is-warning" type="text" placeholder="Lifelong Learning Workshop" v-if="show[0]" v-model="title">
            </div>
        </div> 

        <div class="field">
            <label class="label">Description &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[1]" @click="show[1]=true">Edit</small>
                <small class="edit-btn" v-if="show[1]" @click="this.description=''; show[1]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[1]">{{ room.description }}</p>
                <textarea class="textarea is-warning" type="textarea" maxlength="500" placeholder="Enter information about the room." v-if="show[1]" v-model="description"></textarea>
            </div>
        </div>
    
        <!-- update message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="roomError.update">{{ roomError.update }}</p>
        <!-- <p class="has-text-success has-text-centered mb-3 white" v-if="success_msg">{{ success_msg }}</p> -->

        <button type="submit" class="button is-outlined is-fullwidth" v-if="showBtn()">
            Update
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
            title: this.title,
            description: this.title,
            show: [false, false],
        }
    },
    computed: {
        ...mapGetters(['roomStatus', 'roomError'])
    },
    props: ['room'],
    methods: {
        ...mapActions(['updateRoom']),
        close() {
            this.$emit('close')
        },
        showBtn() {
            for (let i=0; i<this.show.length; i++) {
                if (this.show[i] == true) {
                    return true
                }
            }
        },
        editRoom() {
            const room = {
                id: this.room._id,
                title: this.title,
                description: this.description
            }
            this.updateRoom(room).then( () => {
                if (this.roomStatus.update == "success") {
                    // console.log("success")
                    window.location.reload();
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
.box {
    padding: 2rem 3rem;
}

.modal-content {
    min-width: 55vw;
}

.edit-btn {
    color: #329AA0;
    font-weight: normal;
    cursor: pointer;
    text-decoration: underline;
}

.edit-btn:hover {
    color: #184f52;
    /* font-weight: bold; */
    text-decoration: none;
}

.button {
    color: black;
}
</style>
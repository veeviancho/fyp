<template>
<div class="modal is-active" v-if="room">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="editRoom">

        <div class="field">
            <label class="label">Image &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[3]" @click="show[3]=true">Edit</small>
                <small class="edit-btn" v-if="show[3]" @click="this.imageLink=''; show[3]=false">Cancel</small>
            </label>
            <div class="control" v-if="room.imageLink">
                <img class="image" v-if="!show[3]" :src="getImgURL(room.imageLink)">
             
                <div class="columns" v-if="show[3]">
                    <div class="column">
                        <div class="file mb-2">
                            <label class="file-label">
                                <input class="file-input" type="file" accept=".jpg,.jpeg,.png" @change="onFileSelected">
                                <span class="file-cta">
                                    <span class="file-icon"><fa icon="upload"/></span>
                                    <span class="file-label">Upload Image</span>
                                </span>
                                <span class="file-name" v-if="selectedFile">{{ selectedFile.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Title &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[0]" @click="show[0]=true;">Edit</small>
                <small class="edit-btn" v-if="show[0]" @click="this.title=''; show[0]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[0]">{{ room.title }}</p>
                <input class="input is-warning" type="text" placeholder="Lifelong Learning Room" v-if="show[0]" v-model="title">
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

        <div class="field">
            <label class="label">Maximum seats &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[2]" @click="show[2]=true">Edit</small>
                <small class="edit-btn" v-if="show[2]" @click="this.maxUsers=''; show[2]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[2]">{{ room.maxUsers }}</p>
                <input class="input is-warning" type="number" id="maxUsers" name="maxUsers" placeholder="Enter a number" v-model="maxUsers" v-if="show[2]" required>
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
            description: this.description,
            imageLink: this.imageLink,
            maxUsers: this.maxUsers,
            show: [false, false, false, false],
            selectedFile: null
        }
    },
    computed: {
        ...mapGetters(['roomStatus', 'roomError'])
    },
    props: ['room'],
    methods: {
        ...mapActions(['updateRoom']),
        close() {
            this.show.forEach((element, index) => {
                this.show[index] = false
            })
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

            // const room = {
            //     id: this.room._id,
            //     title: this.title,
            //     description: this.description,
            //     imageLink: this.imageLink,
            //     maxUsers: this.maxUsers
            // }

            const formData = new FormData();

            formData.append('id', this.room._id);
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('imageLink', this.selectedFile);
            formData.append('maxUsers', this.maxUsers);

            this.updateRoom(formData).then( () => {
                if (this.roomStatus.update == "success") {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        getImgURL(pic) {
            return require('@/../../uploads/' + pic)
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

.image {
    width: 50%;
}
</style>
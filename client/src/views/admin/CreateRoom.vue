<template>
<div class="modal is-active">
  <div class="modal-background" @click="close()"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="create">
  
        <div class="field">
            <label class="label">Room Name</label>
            <div class="control"><input class="input is-warning" type="text" placeholder="Room Name" v-model="title" required></div>
        </div>

        <div class="field">
            <label class="label">Description</label>
            <div class="control"><textarea class="textarea is-warning" type="textarea" placeholder="Enter information about the room." v-model="description"></textarea></div>
        </div>

        <div class="field">
            <label class="label">Image</label>
            <div class="control">
                <div class="file mb-2">
                <label class="file-label">
                    <input class="file-input" type="file" accept=".jpg,.jpeg,.png" @change="onFileSelected">
                    <span class="file-cta">
                        <span class="file-icon"><fa icon="upload"/></span>
                        <span class="file-label">Upload image</span>
                    </span>
                    <span class="file-name" v-if="selectedFile">{{ selectedFile.name }}</span>
                </label>
                </div>
                <!-- ...or paste a link: -->
                <!-- <input class="input is-warning" type="text" placeholder="Image link" v-model="imageLink"> -->
            </div>
        </div>

        <div class="field">
            <label class="label">Maximum seats</label>
            <div class="control">
            <input class="input is-warning" type="number" id="maxUsers" name="maxUsers" min="0" placeholder="Enter a number" v-model="maxUsers" required>
            </div>
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
            description: '',
            // imageLink: '',
            maxUsers: '',

            selectedFile: null,
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
            // let room = {
            //     title: this.title,
            //     description: this.description,
            //     imageLink: this.imageLink,
            //     maxUsers: this.maxUsers
            // }

            const formData = new FormData();
            formData.append('title', this.title);
            formData.append('description', this.description);
            formData.append('imageLink', this.selectedFile);
            formData.append('maxUsers', this.maxUsers);

            console.log(formData)

            this.createRoom(formData)
                .then(() => {
                    if (this.roomStatus.create == "success") {
                        window.location.reload()
                        console.log("success")
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        }
    }
}
</script>

<style scoped>
.box {
    padding: 2rem 3rem;
    /* width: ; */
}

.modal-content {
    min-width: 55vw;
}

.button {
    color: black;
}

.button:hover {
    color: white
}
</style>

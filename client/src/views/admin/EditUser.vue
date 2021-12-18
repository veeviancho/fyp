<template>
<div class="modal is-active" v-if="userItem">
  <div class="modal-background"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="editUser">

        <div class="columns">
        <div class="column">
        <div class="field">
            <label class="label">Name &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[0]" @click="show[0]=true;">Edit</small>
                <small class="edit-btn" v-if="show[0]" @click="this.name=''; show[0]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[0]">{{ userItem.name }}</p>
                <input class="input is-warning" type="text" placeholder="John Doe" v-if="show[0]" v-model="name">
            </div>
        </div> 
        </div> 

        <div class="column">
        <div class="field">
            <label class="label">Username &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[1]" @click="show[1]=true;">Edit</small>
                <small class="edit-btn" v-if="show[1]" @click="this.username=''; show[1]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[1]">{{ userItem.username }}</p>
                <input class="input is-warning" type="text" placeholder="johndoe" v-if="show[1]" v-model="username">
            </div>
        </div> 
        </div>
        </div> 

        <div class="columns">
        <div class="column">
        <div class="field">
            <label class="label">Email Address &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[2]" @click="show[2]=true;">Edit</small>
                <small class="edit-btn" v-if="show[2]" @click="this.email=''; show[2]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[2]">{{ userItem.email }}</p>
                <input class="input is-warning" type="email" placeholder="johndoe@e.ntu.edu.sg" v-if="show[2]" v-model="email">
            </div>
        </div> 
        </div> 

        <div class="column">
            <div class="field">
                <label class="label">Programme  &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[3]" @click="show[3]=true">Edit</small>
                    <small class="edit-btn" v-if="show[3]" @click="this.programme=''; show[3]=false">Cancel</small>
                </label>
                <div class="control">
                    <p v-if="!show[3]">{{ userItem.programme }}</p>
                    <div class="select is-fullwidth is-warning" v-if="show[3]">
                    <select name="programme" v-model="programme">
                        <option value="" disabled selected>Change Programme</option>
                        <option>Communications Engineering</option>
                        <option>Computer Control & Automation</option>
                        <option>Electronics</option>
                        <option>Power Engineering</option>
                        <option>Signal Processing</option>
                        <option>Green Electronics</option>
                        <option>Integrated Circuit Design</option>
                    </select>
                </div>
                </div>
            </div>
        </div>
        </div> 

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Verified Status &nbsp;&nbsp;
                    <small class="edit-btn" v-if="!show[5]" @click="show[5]=true">Edit</small>
                    <small class="edit-btn" v-if="show[5]" @click="this.isVerified=null; show[5]=false">Cancel</small>
                </label>
                <div class="control">
                    <div v-if="!show[5]">
                        <p v-if="userItem.isVerified === false">Not Verified</p>
                        <p v-if="userItem.isVerified === true">Verified</p>
                    </div>
                    <div class="select is-fullwidth is-warning" v-if="show[5]">
                    <select v-model="isVerified">
                        <option value="" disabled selected>Change Verified Status</option>
                        <option value=true>Verified</option>
                        <option value=false>Not Verified</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Member since</label>
                <div class="control">{{ String(userItem.date).slice(0,10) }}</div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
        <div class="field">
            <label class="label">About &nbsp;&nbsp;
                <small class="edit-btn" v-if="!show[4]" @click="show[4]=true">Edit</small>
                <small class="edit-btn" v-if="show[4]" @click="this.about=''; show[4]=false">Cancel</small>
            </label>
            <div class="control">
                <p v-if="!show[4]">{{ userItem.about }}</p>
                <textarea class="textarea is-warning" type="textarea" maxlength="1000" placeholder="Describe the user" v-if="show[4]" v-model="about"></textarea>
            </div>
        </div>
        </div>
        </div>
        

        <!-- Error message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="error.update">{{ error.update }}</p>

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
            name: this.name,
            username: this.username,
            email: this.email,
            programme: this.programme,
            about: this.about,
            isVerified: this.isVerified,
            show: [false, false, false, false, false, false]
        }
    },
    props: ['userItem'],
    computed: {
        ...mapGetters(['error'])
    },
    methods: {
        ...mapActions(['update']),
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
        capitalize() {
            let str = this.name.toLowerCase().split(" ");
            for (let i=0; i<str.length; i++) {
                str[i] = str[i][0].toUpperCase() + str[i].slice(1);
            }
            this.name = str.join(" ");
            },
        editUser() {
            if (this.name) {
                this.capitalize()
            }
            let user = {
                id: this.userItem._id,
                name: this.name,
                username: this.username,
                email: this.email,
                programme: this.programme,
                about: this.about,
                isVerified: this.isVerified,
            }
            this.update(user)
            .then(res => {
                if (res.data.success) {
                    window.location.reload()
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
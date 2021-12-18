<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="createUser">

        
        <div class="field">
            <label class="label">Name</label>
            <div class="control"><input class="input is-warning" type="text" placeholder="John Doe" v-model="name" required></div>
        </div>
        
        <div class="field">
            <label class="label">Username</label>
            <div class="control"><input class="input is-warning" type="text" placeholder="johndoe" v-model="username" required></div>
        </div> 

        <div class="field">
            <label class="label">Email Address</label>
            <div class="control"><input class="input is-warning" type="email" placeholder="johndoe@e.ntu.edu.sg" v-model="email" required></div>
        </div> 

        <div class="field">
            <label class="label">Password</label>
            <div class="control"><input class="input is-warning" type="password" placeholder="******" v-model="password" required></div>
        </div> 

        <div class="field">
            <label class="label">Confirm Password</label>
            <div class="control"><input class="input is-warning" type="password" placeholder="******" v-model="password2" required></div>
        </div> 

        <div class="field">
            <label class="label">Programme</label>
            <div class="control">
                <div class="select is-fullwidth is-warning">
                <select name="programme" v-model="programme">
                    <option selected>Communications Engineering</option>
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

        <!-- Error message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="error.register">{{ error.register }}</p>

        <button type="submit" class="button is-outlined is-fullwidth">
            Create User
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
            name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            programme: 'Communications Engineering',
        }
    },
    computed: {
        ...mapGetters(['error'])
    },
    methods: {
        ...mapActions(['register']),
        close() {
            this.$emit('close')
        },
        capitalize() {
            let str = this.name.toLowerCase().split(" ");
            for (let i=0; i<str.length; i++) {
                str[i] = str[i][0].toUpperCase() + str[i].slice(1);
            }
            this.name = str.join(" ");
            },
        createUser() {
            if (this.name) {
                this.capitalize()
            }
            let user = {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
                password2: this.password2,
                programme: this.programme,
            }
            console.log(user)

            this.register(user)
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

.button, .select {
    color: black;
}
</style>
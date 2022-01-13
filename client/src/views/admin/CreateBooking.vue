<template>
<div class="modal is-active">
    <div class="modal-background" @click="close()"></div>
    <div class="modal-content">
    
        <form class="box" @submit.prevent="create">

            <div class="field">Booking room for <router-link class="link-workshop" :to="{ name: 'Admin Workshop' }">workshop</router-link> instead?</div>

            <div class="field">
                <label class="label">Date</label>
                <div class="control"><input class="input is-warning" type="date" v-model="date" required></div>
            </div>

            <div class="field">
                <div class="columns">
                    <div class="column">
                        <label class="label">Start Time</label>
                        <div class="control"><input class="input is-warning" type="time" v-model="start" required></div>
                    </div>
                    <div class="column">
                        <label class="label">End Time</label>
                        <div class="control"><input class="input is-warning" type="time" v-model="end" required></div>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label">Purpose</label>
                <div class="control"><textarea class="textarea is-warning" v-model="purpose" placeholder="State purpose of booking of room" type="textarea"></textarea></div>
            </div>

            <div class="field">
                <label class="label">Username</label>
                <div class="control"><input class="input is-warning" v-model="username" placeholder="Enter username of student if relevant" type="text" required></div>
            </div>

            <button type="submit" class="button is-outlined is-fullwidth">
                Add Booking
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
            date: '',
            start: '',
            end: '',
            purpose: '',
            username: this.username
        }
    },
    props: ['id'],
    computed: {
        ...mapGetters(['userByUsername'])
    },
    methods: {
        ...mapActions(['createBooking', 'findByUsername']),
        close() {
            this.$emit('close')
        },
        create() {
            this.findByUsername(this.username)
            let user = this.userByUsername
            let booking = {
                date: this.date,
                start: this.start,
                end: this.end,
                purpose: this.purpose,
                userId: user._id,
                roomId: this.id
            }
            this.createBooking(booking)
            .then(res => {
                if (res.data.success) {
                    console.log('success')
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

.link-workshop {
    color: black;
    font-weight: bold;
}

.link-workshop:hover {
    color: black;
    text-decoration: underline;
}
</style>
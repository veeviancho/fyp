<template>
<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    
    <form class="box" @submit.prevent="createNewWorkshop">

        <div class="field">
            <label class="label">Title</label>
            <div class="control">
            <input class="input is-warning" type="text" placeholder="New Workshop" v-model="title" required>
            </div>
        </div> 

        <div class="field">
            <label class="label">Description</label>
            <div class="control">
            <textarea class="textarea is-warning" type="textarea" placeholder="Enter information about the workshop." v-model="description"></textarea>
            </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Date</label>
                <div class="control">
                <input class="input is-warning" type="date" v-model="date" required>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">Venue</label>
                <div class="control">
                <input class="input is-warning" type="text" placeholder="Enter a room" v-model="venue" required>
                </div>
            </div>
        </div>
        </div>

        <div class="columns">
        <div class="column">
            <div class="field">
                <label class="label">Start Time</label>
                <div class="control">
                <input class="input is-warning" type="time" v-model="startTime" required>
                </div>
            </div>
        </div>
        <div class="column">
            <div class="field">
                <label class="label">End Time</label>
                <div class="control">
                <input class="input is-warning" type="time" v-model="endTime" required>
                </div>
            </div>
        </div>
        </div>

        <div class="field">
            <label class="label">Organiser</label>
            <div class="control">
            <input class="input is-warning" type="text" id="organiser" name="organiser" placeholder="Enter the oganiser's name" v-model="organiser">
            </div>
        </div>

        <div class="field">
            <label class="label">Programme</label>
            <div class="select is-fullwidth is-warning">
            <select name="programme" v-model="programme">
                <option disabled>Change Programme</option>
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

        <div class="field">
            <label class="label">Category</label>
            <div class="control">
            <input class="input is-warning" type="text" placeholder="Category" v-model="category">
            </div>
        </div>

        <div class="field">
            <label class="label">Maximum number of participants</label>
            <div class="control">
            <input class="input is-warning" type="number" id="maxUsers" name="maxUsers" placeholder="Enter a number" v-model="maxUsers" required>
            </div>
        </div>

        <!-- Error message -->
        <p class="has-text-danger has-text-centered mb-3" v-if="workshopError.create">{{ workshopError.create }}</p>

        <button type="submit" class="button is-outlined is-fullwidth">Create New Workshop</button>

    </form>

  </div>
  <button class="modal-close is-large" aria-label="close" @click="close()"></button>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            title: '',
            description: '',
            date: null,
            startTime: null,
            endTime: null,
            venue: '',
            organiser: '',
            programme: '',
            category: '',
            maxUsers: null
        }
    },
    computed: {
        ...mapGetters(['workshopError'])
    },
    methods: {
        ...mapActions(['createWorkshop']),
        close() {
            this.$emit('close')
        },
        createNewWorkshop() {
            let workshop = {
                title: this.title,
                description: this.description,
                date: this.date,
                startTime: this.startTime,
                endTime: this.endTime,
                venue: this.venue,
                organiser: this.organiser,
                programme: this.programme,
                category: this.category,
                maxUsers: this.maxUsers
            }
            this.createWorkshop(workshop)
            .then( res => {
                if (res.data.success) {
                    window.location.reload();
                }
            })
            .catch( err => {
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

.select {
    font-size: 1rem;
}
</style>